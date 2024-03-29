new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      let demage = this.calculateDemage(3, 10);
      this.monsterHealth -= demage;
      if (this.checkWin()) {
        return;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${demage}`
      });
      this.monsterAttack();      
    },
    specialAttack: function() {
      let demage = this.calculateDemage(10, 20);
      this.monsterHealth -= demage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster HARD for ${demage}`
      });
      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealth <= 92) {
        this.playerHealth += 8;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for 10`
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttack: function() {
      let demage = this.calculateDemage(5, 12);
      this.playerHealth -= demage;
      this.checkWin();

      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${demage}`
      });
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
