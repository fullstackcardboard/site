export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function findBootstrapEnvironment() {
  let envs = ["xs", "sm", "md", "lg", "xl"];

  let el = document.createElement("div");
  document.body.appendChild(el);

  let curEnv = envs.shift();

  for (let env of envs.reverse()) {
    el.classList.add(`d-${env}-none`);

    if (window.getComputedStyle(el).display === "none") {
      curEnv = env;
      break;
    }
  }

  document.body.removeChild(el);
  return curEnv;
}

export default { shuffle, deepCopy, findBootstrapEnvironment };
