const AnomalyComponent = function(app, chronobot, modal) {
  const baseImageUrl = "/chronobot/content/images/";
  function bindEvents() {
    if (!app.anomalyEventsBound) {
      document.addEventListener("click", function(e) {
        const target = e.target;
        const parentElement = target.parentElement;
        const targetAction = target.dataset.action;
        const parentElementAction = parentElement.dataset.action;
        const action = targetAction ? targetAction : parentElementAction;

        if (action && action === "anomaly") {
          handleAnomalyRemoval(e);
        }

        handleParadoxAddition(e);
        app.anomalyEventsBound = true;
      });

      function handleAnomalyRemoval() {
        modal.hide();
        let resourcesSpent = 0;
        chronobot.properties.water -= 2;
        if (
          chronobot.properties.titanium +
            chronobot.properties.gold +
            chronobot.properties.uranium >=
          2
        ) {
          for (let index = 0; index < 2; index++) {
            if (chronobot.properties.titanium > 0 && resourcesSpent < 2) {
              chronobot.properties.titanium--;
              resourcesSpent++;
            }
            if (chronobot.properties.gold > 0 && resourcesSpent < 2) {
              chronobot.properties.gold--;
              resourcesSpent++;
            }
            if (chronobot.properties.uranium > 0 && resourcesSpent < 2) {
              chronobot.properties.uranium--;
              resourcesSpent++;
            }
          }
        } else if (
          chronobot.properties.neutronium > 0 &&
          resourcesSpent === 0
        ) {
          chronobot.properties.neutronium--;
        }

        chronobot.properties.anomalies--;
        chronobot.properties.vp += 3;
        chronobot.updateDisplay();
        app.updateState();
      }

      function handleParadoxAddition(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "addParadox"
        ) {
          chronobot.properties.paradox++;
          if (chronobot.properties.paradox === 3) {
            chronobot.properties.anomalies++;
            chronobot.properties.vp -= 3;
            chronobot.properties.paradox = 0;
          }
          chronobot.updateDisplay();
          app.updateState();
        }
      }
    }
  }

  bindEvents();

  function executeAction(dieHtml) {
    if (
      chronobot.properties.anomalies > 0 &&
      chronobot.properties.water >= 2 &&
      (chronobot.properties.titanium +
        chronobot.properties.gold +
        chronobot.properties.uranium >=
        2 ||
        chronobot.properties.neutronium > 0)
    ) {
      return `<div>
    <h3><img src="${baseImageUrl}anomaly.png" style="height: 12vh;" /><img src="${baseImageUrl}remove.png" style="height: 4vh;' />${dieHtml}</h3>
      <p>Remove an anomaly</p>
      <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-secondary mb-2" data-action="anomaly"><img src="${baseImageUrl}anomaly.png" style="height: 7vh;" /><img src="${baseImageUrl}remove.png" style="height: 4vh;" /></button>
        </div>
        </div>`;
    }

    return `
    <div>
    <h3><img src="${baseImageUrl}anomaly.png" style="height: 7vh;" /><img src="${baseImageUrl}remove.png" style="height: 4vh;" />${dieHtml}</h3>
    </div>
      <div>
        <h3 class="class="rounded badge-danger col-12"">Action not possible.</h3>
      </div>
      <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>`;
  }

  return {
    executeAction
  };
};

export default AnomalyComponent;
