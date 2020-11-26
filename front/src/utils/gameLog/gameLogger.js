class GameLogger {
  static log = [];

  static addToLog(index, player) {
    this.log.unshift({
      player,
      moveTo: index,
    });
  }

  static reset() {
    this.log = [];
  }
}

export default GameLogger;