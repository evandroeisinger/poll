var apiUrl      = 'http://' + document.location.host + '/api';
var apiToken    = '';
var apiKey      = 'api-access-token';
var captchaKey  = '';

var titleElement;
var candidatesElement;
var actionsElement;
var captchaElement;
var overlayElement;
var wrapperElement;
var messageElement;
var voteButton;

var poll;

function captcha(event) {
  event.preventDefault();

  overlayElement.appendChild(captchaElement);
  wrapperElement.appendChild(overlayElement);

  voteButton.innerHTML = 'Authenticating';
  voteButton.classList.add('poll__vote-button--processing');

  poll.captcha = grecaptcha.render(captchaElement, {
    sitekey: captchaKey,
    callback: vote,
  });
}

function selectCandidate(event) {
  event.preventDefault();

  poll.candidates.forEach(function(candidate) {
    if (candidate.id === event.currentTarget.id) {
      candidate.element.classList.add('poll__candidate--selected');
      poll.selected = candidate;
      return;
    }

    candidate.element.classList.remove('poll__candidate--selected');
  });

  voteButton.disabled = false;
}

function addCandidate(candidate) {
  candidate.id                = candidate._id,
  candidate.votes             = candidate.votes,
  candidate.result            = Math.round((candidate.votes * 100) / poll.votes) || 0;
  candidate.element           = document.createElement('span');
  candidate.element.id        = candidate.id;
  candidate.element.className = 'poll__candidate';
  candidate.element.innerHTML = [
    '<figure class="poll__candidate-picture">',
      '<img src="build/images/' + candidate.picture + '">',
    '</figure>',
    '<span class="poll__candidate-name">' + candidate.name + '</span>',
    '<span class="poll__candidate-result">' + candidate.result + '%</span>',
  ].join('');

  candidate.element.addEventListener('click', selectCandidate);
  candidatesElement.appendChild(candidate.element);
  poll.candidates.push(candidate);
}

function results() {
  if (poll.xhr.status !== 201)
    return;

  messageElement           = document.createElement('p');
  messageElement.className = 'poll__message';
  messageElement.innerHTML = 'Congratulations! Your vote for ' + poll.selected.name + ' was successfully sent!';
  titleElement.innerHTML   = 'Resultado parcial';

  poll.candidates.forEach(function(candidate) {
    candidate.element.removeEventListener('click', selectCandidate);
  });

  candidatesElement.classList.add('poll__candidates--results');
  wrapperElement.removeChild(voteButton);
  wrapperElement.removeChild(overlayElement);
  wrapperElement.appendChild(messageElement);
}

function vote() {
  var data = JSON.stringify({
    token: grecaptcha.getResponse(poll.captcha)
  });

  overlayElement.removeChild(captchaElement);
  voteButton.innerHTML = 'Sending vote';

  poll.xhr = new XMLHttpRequest(),
  poll.xhr.addEventListener('load', results);

  poll.xhr.open('post', '/api/vote/' + poll.id + '/' + poll.selected.id);
  poll.xhr.setRequestHeader(apiKey, apiToken);
  poll.xhr.setRequestHeader('Content-Type', 'application/json;');
  poll.xhr.send(data);
}

function show() {
  var data;

  candidatesElement.classList.remove('poll__candidates--loading');

  if (poll.xhr.status !== 200) {
    wrapperElement.innerHTML = '';
    titleElement.innerHTML   = 'No poll initialized';
    wrapperElement.appendChild(titleElement);

    return;
  }

  data            = JSON.parse(poll.xhr.response);
  poll.id         = data._id;
  poll.votes      = data.votes;

  data.candidates.forEach(addCandidate);
  voteButton.addEventListener('click', captcha);
}

function initialize() {
  wrapperElement    = document.querySelector('.poll__wrapper');
  titleElement      = document.querySelector('.poll__title');
  candidatesElement = document.querySelector('.poll__candidates');
  actionsElement    = document.querySelector('.poll__actions');
  voteButton        = document.querySelector('.poll__vote-button');
  overlayElement    = document.createElement('div');
  captchaElement    = document.createElement('div');

  overlayElement.className  = 'poll__overlay';
  captchaElement.className  = 'poll__captcha';

  poll = {
    xhr: new XMLHttpRequest(),
    selected: null,
    candidates: [],
  };

  poll.xhr.addEventListener('load', show);

  poll.xhr.open('get', apiUrl + '/poll/current');
  poll.xhr.setRequestHeader('Accept', 'application/json');
  poll.xhr.setRequestHeader(apiKey, apiToken);
  poll.xhr.send();

  voteButton.disabled = true;
  candidatesElement.classList.add('poll__candidates--loading');
}

document.addEventListener('DOMContentLoaded', initialize);
