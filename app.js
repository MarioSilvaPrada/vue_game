new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
      this.monsterHealth -= this.calculateDemage(3, 10);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    specialAttack: function() {
      this.monsterHealth -= this.calculateDemage(10, 20);
      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealth <= 92) {
        this.playerHealth += 8;
        this.monsterAttack();
      } else {
          this.playerHealth = 100;
      }
    },
    giveUp: function() {
        this.gameIsRunning = false;
    },
    monsterAttack: function() {
      this.playerHealth -= this.calculateDemage(5, 12);
      this.checkWin();
    },
    calculateDemage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        confirm("You won! New Game?")
          ? this.startGame()
          : (this.gameIsRunning = false);
        return true;
      } else if (this.playerHealth <= 0) {
        confirm("You lost! New Game?")
          ? this.startGame()
          : (this.gameIsRunning = false);
        return true;
      }
      return false;
    }
  }
});
