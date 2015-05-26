// libs
var connector = require('../libs/connector');
var execute = require('./libs/execute');

// models
var Candidate = require('../models/candidate');

if (process.argv[2] === 'reset') {
  execute([
    // drop queue
    {
      action: 'flushqueue'
    },

    // drop collections
    
    {
      action: 'drop',
      collection: 'votes'
    },{
      action: 'drop',
      collection: 'candidates'
    },{
      action: 'drop',
      collection: 'polls'
    },

    // candidates
    
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000001'),
        name: 'Aline',
        picture: 'aline-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000002'),
        name: 'Amanda',
        picture: 'amanda-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000003'),
        name: 'Cassio',
        picture: 'cassio-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000004'),
        name: 'Clara',
        picture: 'clara-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000005'),
        name: 'Franciele',
        picture: 'franciele-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000006'),
        name: 'Fernanda',
        picture: 'fernanda-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000007'),
        name: 'Jonas',
        picture: 'jonas-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000008'),
        name: 'Marcelo',
        picture: 'marcelo-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000009'),
        name: 'Marco',
        picture: 'marco-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000010'),
        name: 'Roni',
        picture: 'roni-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000011'),
        name: 'Vanessa',
        picture: 'vanessa-picture.png'
      }
    },
    {
      action: 'seed',
      model: Candidate,
      data: {
        _id: connector('mongoose').Types.ObjectId('000000000000000000000012'),
        name: 'Yuri',
        picture: 'yuri-picture.png'
      }
    },
  ]);
} else {
  process.exit(0);
}
