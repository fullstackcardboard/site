import ConstructComponent from "./construct.js";
import TimeTravelComponent from "./timeTravel.js";
import AnomalyComponent from "./anomaly.js";
import DieComponent from "./die.js";
import FailComponent from "./fail.js";
import MineComponent from "./mine.js";
import ResearchComponent from "./research.js";
import SupplyComponent from "./supply.js";
import RecruitComponent from "./recruit.js";
import ModalComponent from "./modal.js";
import WaterComponent from "./water.js";
import ActionDisplayComponent from "./actions.js";
import Chronobot from "./chronobot.js";
import OptionsComponent from "./options.js";
import SaveManager from "../../scripts/shared/saveManager.js";

const storageKey = "chronobot";
const saveManager = new SaveManager();
let actionDisplay = {};
const modal = new ModalComponent();
const chronobot = new Chronobot();

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const app = {
  isInitialized: false,
  constructEventsBound: false,
  mineEventsBound: false,
  failEventsBound: false,
  state: [],
  updateState: function() {
    this.state.push({
      actions: deepCopy(actions),
      properties: deepCopy(chronobot.properties)
    });
    if (this.isInitialized) {
      this.saveGame();
    }
  },
  undo: function() {
    if (this.state.length > 1) {
      this.state = this.state.filter(element => {
        return element != this.state[this.state.length - 1];
      });
      const previousState = this.state[this.state.length - 1];
      actions = previousState.actions;
      chronobot.properties = previousState.properties;
      chronobot.updateDisplay();
      actionDisplay.updateDisplays(actions);
    }
  },
  saveGame: function() {
    saveManager.save(storageKey, this.state);
  },
  loadGame: function() {
    this.state = saveManager.load(storageKey);
    const currentState = this.state[this.state.length - 1];
    chronobot.properties = currentState.properties;
    chronobot.updateDisplay();
    actionDisplay.updateDisplays(currentState.actions);
  },
  previousGameExists: function() {
    return saveManager.load(storageKey);
  },
  clearSavedGame: function() {
    saveManager.clear(storageKey);
  }
};

const components = {
  recruit: new RecruitComponent(app, chronobot, modal),
  power: new ConstructComponent(app, chronobot, "power", modal),
  lab: new ConstructComponent(app, chronobot, "lab", modal),
  support: new ConstructComponent(app, chronobot, "support", modal),
  factory: new ConstructComponent(app, chronobot, "factory", modal),
  anomaly: new AnomalyComponent(app, chronobot, modal),
  mine: new MineComponent(app, chronobot, modal),
  research: new ResearchComponent(app, chronobot, modal),
  supply: new SupplyComponent(
    app,
    chronobot,
    new RecruitComponent(app, chronobot, modal),
    modal
  ),
  time: new TimeTravelComponent(app, chronobot, modal),
  water: new WaterComponent(app, chronobot, modal),
  waterTemp: new WaterComponent(app, chronobot, modal),
  super: new ConstructComponent(app, chronobot, "super", modal)
};

let actions = {
  power: { triggers: [1], nextAction: "time" },
  time: { triggers: [], nextAction: "anomaly" },
  anomaly: { triggers: [], nextAction: "power" },
  supply: { triggers: [], nextAction: "lab" },
  lab: { triggers: [2], nextAction: "research" },
  research: { triggers: [], nextAction: "mine" },
  mine: { triggers: [3], nextAction: "support" },
  support: { triggers: [4], nextAction: "recruit" },
  recruit: { triggers: [], nextAction: "factory" },
  factory: { triggers: [], nextAction: "supply" },
  waterTemp: { triggers: [5], nextAction: "support" },
  water: { triggers: [6], nextAction: "super" },
  super: { triggers: [], nextAction: "water" }
};

function bindEvents() {
  document.addEventListener("click", async function(e) {
    handleUndoClick(e);
    handleVisibilityClick(e);
    await handleNextActionClick(e);
    handleLoadClick(e);
    handleClearClick(e);
  });

  function handleLoadClick(e) {
    if (
      e.target &&
      e.target.dataset.action &&
      e.target.dataset.action === "load"
    ) {
      app.loadGame();
    }
  }

  function handleClearClick(e) {
    if (
      e.target &&
      e.target.dataset.action &&
      e.target.dataset.action === "clear"
    ) {
      app.clearSavedGame();
    }
  }

  function handleUndoClick(e) {
    if (
      e.target &&
      e.target.dataset &&
      e.target.dataset.action &&
      e.target.dataset.action === "undo"
    ) {
      app.undo();
    }
  }

  async function handleNextActionClick(e) {
    if (e.target && e.target.id && e.target.id === "nextAction") {
      const die = new DieComponent(modal);
      const result = await die.roll();
      updateActionTriggers(result.die, result.html);
    }
  }

  function handleVisibilityClick(e) {
    if (e.target && e.target.dataset.visible) {
      const targetElement = e.target;
      const visible = targetElement.dataset.visible !== "false";
      if (!visible) {
        document.getElementById("possibleActions").classList.add("d-none");
        document.getElementById("allActions").classList.remove("d-none");
        targetElement.innerHTML = `
            Show Possible <i class="far fa-eye-slash"></i>`;
        targetElement.dataset.visible = "true";
      } else {
        document.getElementById("possibleActions").classList.remove("d-none");
        document.getElementById("allActions").classList.add("d-none");
        targetElement.dataset.visible = "false";
        document.getElementById("visibility").innerHTML = `
            Show All <i class="far fa-eye"></i>`;
      }
    }
  }
}

function triggerAction(action){
  const component = components[action];
  modal.show();
  modal.setBody(component.executeAction(""));
}

function updateActionTriggers(dieResult, dieHtml) {
  console.log("Rolled " + dieResult);
  const keys = Object.keys(actions);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const action = actions[key];
    if (action.triggers.includes(dieResult)) {
      const nextAction = actions[action.nextAction];
      nextAction.triggers.push(dieResult);
      if (nextAction.triggers.length >= 3) {
        handleTriggerLimit(nextAction);
      }
      action.triggers = action.triggers.filter(function(x) {
        return x != dieResult;
      });

      const component = components[key];
      modal.show();
      if (component && "executeAction" in component) {
        modal.setBody(component.executeAction(dieHtml));
      } else {
        console.log(key.toUpperCase() + " failed");
      }

      actionDisplay.updateDisplays(actions);
      return;
    }
  }
}

function handleTriggerLimit(action) {
  const max = action.triggers.reduce(function(a, b) {
    return Math.max(a, b);
  });

  const nextAction = actions[action.nextAction];
  nextAction.triggers.push(max);
  action.triggers = action.triggers.filter(function(x) {
    return x != max;
  });
}

function init() {
  bindEvents();
  const failComponent = new FailComponent(app, chronobot, modal);
  const options = new OptionsComponent(app);
  app.updateState();
  chronobot.updateDisplay();
  actionDisplay = new ActionDisplayComponent();
  actionDisplay.updateDisplays(actions);
  if (app.previousGameExists()) {
    modal.showLoadGameModal();
  }
  app.isInitialized = true;
}

init();
window.triggerAction = triggerAction;