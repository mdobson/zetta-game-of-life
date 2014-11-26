var zetta = require('zetta');
var Game = require('./game_scout');

zetta()
  .use(Game, 5, [[2, 1], [2, 2], [2, 3]])
  .listen(1337, function(err) {
    if(err) {
      console.log(err);
    }
  });
