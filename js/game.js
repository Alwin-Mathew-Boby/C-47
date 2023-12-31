var players
var form

class Game {
    constructor() {
      this.gameState;
    }
  
    getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on('value', (data) => {
        this.gameState = data.val();
      });
    }
  
    update(state) {
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start() {
      if (this.gameState === 0) {
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once('value');
        if (playerCountRef.exists()) {
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form();
        form.display();
      }
  
      player1 = createSprite(200, 500);
      player1.addImage('player1', basketImg);
  
      player2 = createSprite(800, 500);
      player2.addImage('player2', basketImg);
  
      players = [player1, player2];
    }
  
    play() {
      form.hide();
      Player.getPlayerInfo();
      player.getPlayerAtEnd();
      var x = 100;
      var y = 200;
      var index = 0;
      drawSprites();
      for (var plr in allPlayers) {
        index = index + 1;
        x = 500 - allPlayers[plr].distance;
        y = 500;
        players[index - 1].x = x;
        players[index - 1].y = y;
  
        if (index === player.index) {
          fill('black');
          textSize(25);
          text(allPlayers[plr].name, x - 25, y + 25);
        }
  
        text('Player 1: ' + allPlayers.player1.score, 50, 50);
        text('Player 2: ' + allPlayers.player2.score, 50, 100);
      }
  
      if (player.score >= 5) {
        gameState = 2;
        player.rank += 1;
        Player.updatePlayerAtEnd(player.rank);
        player.update();
        this.showRank();
      }
  
      if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
        player.distance -= 10;
        player.update();
      }
      if (keyIsDown(LEFT_ARROW) && player.index !== null) {
        player.distance += 10;
        player.update();
      }
    }
  
    showRank() {
      alert('Congratulations! Your rank is: ' + player.rank);
    }
  
    gameOver() {
      fill('black');
      textSize(40);
      text('Game Over', displayWidth / 2 - 400, displayHeight / 2 - 200);
    }
  }