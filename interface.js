$(document).ready(function() {

  var game = new Game();

  updateFrame();
  startFrame();
  $('.bonus-rolls-feature').hide();
  $('#game-over').hide();

  $('#ball').on('click', function() {
    $('#hint').hide();
    game.roll();
    updateFrame();
    if(game.currentFrame().isFinished()) { checkGameStatus() }
  });

  function checkGameStatus() {
    if (game.frameNumber() === 10) {
      game.endGame();
      endGame()
    } else {
      game.updateAndStore()
      endFrame()
    }
  }

  $('#new-frame').on('click', function() {
    log();
    updateFrame();
    startFrame();
  });

  function startFrame() {
    $('.end-frame').hide();
    $('.start-frame').show();
    $('#new-frame').hide();
  }

  function endFrame() {
    updateFrameOver()
    $('.start-frame').hide();
    $('.end-frame').show();
  }

  function updateFrameOver() {
    $('#last-frame-points').text(game.lastFrame().points());
    $('#bonus-feature').text(game.lastFrame().bonusFeature());
  }

  function updateFrame() {
    $('#this-frame-number').text(game.currentFrame().number());
    $('#this-frame-points').text(game.currentFrame().points());
    $('#this-frame-roll').text(game.currentFrame().currentRoll());
    $('#pins').attr("src", 'pins/' + game.currentFrame().pins() + '_pins.png');
  };

  function log() {
    writeLog()
    updateLog()
  }

  function writeLog() {
    var num = game.lastFrame().number();
    $('#game-stats').append('<p>frame ' + num + ': <span id="frame_' + num + '"></span></p>')
  }

  function updateLog() {
    $('#total-score').text(game.total());
    game._frames.forEach(function(frame) {
      $('#frame_' + frame.number()).text(frame.points());
    });
  }

  function endGame() {
    log();
    if(game.isFinished()) {
      gameOver()
    } else {
      bonusRolls()
    }
  }

  function gameOver() {
    updateLog()
    $('#bonus-rolls').hide();
    $('#frame-stats').hide();
    $('#controls').hide();
    $('#gutter-perfect').text(game.gutterPerfect());
    $('#game-over').show();
  }

  function updateBonusRolls() {
    $('#bonus-rolls-points').text(game.currentFrame().points());
    $('#bonus-rolls-allowed').text(game.currentFrame().numberAllowed());
    $("#pins").attr("src", 'pins/' + game.currentFrame().pins() + '_pins.png');
  }

  function bonusRolls() {
    $('#frame-stats').hide();
    $("#pins").show();
    updateBonusRolls()
    $('.bonus-rolls-feature').show();
    $('#ball').hide();
  }

  $('#bonus-ball').on('click', function() {
    game.roll();
    updateBonusRolls()
    if(game.currentFrame().isFinished()) {
      game.endGame()
      logBonusPoints()
      gameOver()
    }
  });

  function logBonusPoints() {
    $('#game-stats').append('<p>bonus roll points: <span id="final-bonus"></span></p>')
    $('#final-bonus').text(game.currentFrame().points());
  }

  function animateBall() {
    $('#ball').animate( {
      bottom: '100px',
    } );
  }

});
