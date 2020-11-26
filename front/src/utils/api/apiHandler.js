import axios from "axios";
import apiConfig from './config';

class ApiHandler {
  static getGameState() {
    const { url, mapData } = apiConfig.getGameStatus;

    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        if (response && response.status === 200) {
          resolve(mapData(response.data));
        }
        reject(response);
      }).catch(response => reject(response));
    });
  }

  static makeMove(index) {
    const { url, mapData } = apiConfig.makeMove;
    const params = {
      index,
    };

    return new Promise((resolve, reject) => {
      axios.post(url, params).then((response) => {
        if (response && response.status === 200) {
          resolve(mapData(response.data));
        }
        reject(response);
      }).catch(response => reject(response));
    });
  }

  static startNewGame() {
    const { url, mapData } = apiConfig.startNewGame;

    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        if (response && response.status === 200) {
          resolve(mapData(response.data));
        }
        reject(response);
      }).catch(response => reject(response));
    });
  }

  static getScoreStats() {
    const { url, mapData } = apiConfig.getScoreStats;

    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        if (response && response.status === 200) {
          resolve(mapData(response.data));
        }
        reject(response);
      }).catch(response => reject(response));
    });
  }
}

export default ApiHandler;