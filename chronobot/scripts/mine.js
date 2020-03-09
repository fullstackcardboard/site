const MineComponent = function(app, chronobot, modal) {
  let resourcesIncremented = 0;
  function bindEvents() {
    if (!app.mineEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target.dataset.action || e.target.parentElement.dataset.action) {
          const targetElement = e.target;
          const parentElement = e.target.parentElement;
          const action =
            targetElement.dataset.action || parentElement.dataset.action;
          if (action === "mine") {
            const failButton = document.querySelector("[data-action=fail");
            failButton.classList.add("disabled");
            failButton.disabled = true;
            const resource =
              targetElement.dataset.resource || parentElement.dataset.resource;
            chronobot.properties[resource]++;
            resourcesIncremented++;
            if (resourcesIncremented == 2) {
              resourcesIncremented = 0;
              modal.hide();
            } else {
              const neutroniumLabel = document.getElementById(
                "mine-neutronium"
              );
              neutroniumLabel.innerHTML = chronobot.properties.neutronium;
              const uraniumLabel = document.getElementById("mine-uranium");
              uraniumLabel.innerHTML = chronobot.properties.uranium;
              const goldLabel = document.getElementById("mine-gold");
              goldLabel.innerHTML = chronobot.properties.gold;
              const titaniumLabel = document.getElementById("mine-titanium");
              titaniumLabel.innerHTML = chronobot.properties.titanium;
            }
            if (chronobot.resourcesScoreable) {
              chronobot.properties.neutronium--;
              chronobot.properties.gold--;
              chronobot.properties.uranium--;
              chronobot.properties.titanium--;
              chronobot.properties.vp += 5;
            }
            chronobot.updateDisplay();
            app.updateState();
          }
        }

        app.mineEventsBound = true;
      });
    }
  }

  function executeAction(dieHtml) {
    const baseImageUrl = "/chronobot/content/images/";
    return `
      <div>
        <h3><img src="${baseImageUrl}mine.png" style="height: 7vh;" /> ${dieHtml}</h3>
      </div>
      <div class="col">
        <h4>Current Resources</h4>
        <div class="row">
          <div class="col">
            <p>
              <img src="${baseImageUrl}neutronium.png" style="height: 7vh;" />:
              <label id="mine-neutronium">${chronobot.properties.neutronium}</label>
            </p>
          </div>
          <div class="col">
            <p>
              <img src="${baseImageUrl}uranium.png" style="height: 7vh;" />:
              <label id="mine-uranium">${chronobot.properties.uranium}</label>
            </p>
          </div>
          <div class="col">
            <p>
              <img src="${baseImageUrl}gold.png" style="height: 7vh;" />:
              <label id="mine-gold" />${chronobot.properties.gold}</label>
            </p>
          </div>
          <div class="col">
            <p>
              <img src="${baseImageUrl}titanium.png" style="height: 7vh;" />:
              <label id="mine-titanium" />${chronobot.properties.titanium}</label>
            </p>
          </div>
        </div>
      </div>
      <div>
        <ul class="list-unstyled  col">
          <li class="badge-dark col-12 mb-2 rounded">
            <p>
              Place a powered up exosuit in an available Mine space with the
              following preferences:
            </p>
            <ul class="list-unstyled  col">
              <li>
                <p>
                  Top Mine Space > Bottom Mine Space > Middle Mine Space
                </p>
              </li>
            </ul>
          </li>
          <li class="badge-dark col-12 mb-2 rounded">
            <p>
              Take resources that Chronobot does not yet have; with the
              following preferences:
            </p>
            <ul class="list-unstyled  col">
              <li>
                <p>
                  <img
                    src="${baseImageUrl}neutronium.png"
                    style="height: 7vh;"
                  />
                  >
                  <img src="${baseImageUrl}uranium.png" style="height: 7vh;" />
                  > <img src="${baseImageUrl}gold.png" style="height: 7vh;" /> >
                  <img src="${baseImageUrl}titanium.png" style="height: 7vh;" />
                </p>
              </li>
            </ul>
          </li>
          <li class="badge-dark col-12 mb-2 rounded">
            <p>
              If not available, or tied, take resources following the above
              preferences.
            </p>
          </li>
        </ul>
      </div>
      <div class="row mb-2 text-center">
        <div class="col-3">
          <button
            class="btn btn-secondary"
            data-action="mine"
            data-resource="neutronium"
          >
            <img src="${baseImageUrl}neutronium.png" style="height: 7vh;" />
          </button>
        </div>
        <div class="col-3">
          <button
            class="btn btn-secondary"
            data-action="mine"
            data-resource="uranium"
          >
            <img src="${baseImageUrl}uranium.png" style="height: 7vh;" />
          </button>
        </div>
        <div class="col-3">
          <button
            class="btn btn-secondary"
            data-action="mine"
            data-resource="gold"
          >
            <img src="${baseImageUrl}gold.png" style="height: 7vh;" />
          </button>
        </div>
        <div class="col-3">
          <button
            class="btn btn-secondary"
            data-action="mine"
            data-resource="titanium"
          >
            <img src="${baseImageUrl}titanium.png" style="height: 7vh;" />
          </button>
        </div>
      </div>
      <div class="col-md-8 m-auto">
        <button class="btn btn-block btn-danger mb-2" data-action="fail">
          Action Failed
        </button>
      </div>
    `;
  }

  bindEvents();

  return {
    executeAction
  };
};

export default MineComponent;
