export default class SaveManager {
  save(key, gameStateObject) {
    window.localStorage.setItem(key, JSON.stringify(gameStateObject));
  }

  load(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  clear(key) {
    window.localStorage.removeItem(key);
  }
}
