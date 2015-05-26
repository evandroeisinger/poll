var url      = 'http://' + document.location.host + '/api';
var token    = '5n3v9Ko5oDi0D6azGGUkQ9oevfgpXl3J';
var key      = 'api-access-token';

function api(path) {
  var xhr = new XMLHttpRequest();

  return {
    get: function(callback) {
      xhr.open('GET', url + path);
      xhr.setRequestHeader(key, token);
      xhr.setRequestHeader('Content-Type', 'application/json;');
      xhr.addEventListener('load', function() {
        callback(xhr.response, xhr.status);
      });
      xhr.send();
    },

    post: function(data, callback) {
      xhr.open('POST', url + path);
      xhr.setRequestHeader(key, token);
      xhr.setRequestHeader('Content-Type', 'application/json;');
      xhr.addEventListener('load', function() {
        callback(xhr.response, xhr.status);
      });
      xhr.send(JSON.stringify(data));
    },

    put: function(callback) {
      xhr.open('PUT', url + path);
      xhr.setRequestHeader(key, token);
      xhr.setRequestHeader('Content-Type', 'application/json;');
      xhr.addEventListener('load', function() {
        callback(xhr.response, xhr.status);
      });
      xhr.send();
    },
  }
}

module.exports = api;
