const ConstructComponent = function(app, chronobot, type, modal) {
  let html = "";
  let building = { type };
  function bindEvents() {
    if (!app.constructEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target.dataset.action || e.target.parentElement.dataset.action) {
          const targetElement = e.target;
          const action =
            targetElement.dataset.action ||
            targetElement.parentElement.dataset.action;
          if (action === "build") {
            const newBuilding = {
              type:
                targetElement.dataset.type ||
                targetElement.parentElement.dataset.type
            };
            newBuilding.vp =
              targetElement.dataset.vp ||
              targetElement.parentElement.dataset.vp;
            chronobot.properties.buildings.push(newBuilding);
            chronobot.properties.vp += parseInt(newBuilding.vp);
            modal.hide();
            chronobot.updateDisplay();
            app.updateState();
          }
        }
      });

      app.constructEventsBound = true;
    }
  }
  function executeAction(dieHtml) {
    const matchingBuildings = chronobot.properties.buildings.filter(function(
      x
    ) {
      return x.type === building.type;
    });
    const buildable =
      matchingBuildings != undefined && matchingBuildings.length < 3;
    return generateHtml(buildable, dieHtml);
  }

  function generateHtml(buildable, dieHtml) {
    html = `
    <div>
        <h3><img src="/chronobot/content/images/construct.png" style="height: 7vh;" /> ${generateBuildingImageHtml()} ${dieHtml}</h3>
        
    </div>
    <div>
        <ul class="list-unstyled mb-1 mt-1">
            <li class="badge-dark col-12 mb-2 rounded">
                <p>Place a powered up exosuit in an available Construct space with the following preferences:</p>
                <ul class="list-unstyled">
                    <li><p>Top Construct Space > Bottom Construct Space > World Council Space (1st player) > World Council Space</p></li>
                </ul>
            </li>`;

    generateBuildingStepHtml(buildable);

    generateBuildingActionHtml(buildable);

    return html;  

    function generateBuildingActionHtml(buildable) {
      if (buildable) {
        if (building.type === "super") {
          html += `
            <div class="row">
              <div class="col-2 offset-1">
                <button
                  class="btn btn-secondary"
                  data-vp="4"
                  data-type="${type}"
                  data-action="build"
                >
                  4 ${generateVpImageHtml()}
                </button>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-secondary"
                  data-vp="5"
                  data-type="${type}"
                  data-action="build"
                >
                  5 ${generateVpImageHtml()}
                </button>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-secondary"
                  data-vp="6"
                  data-type="${type}"
                  data-action="build"
                >
                  6 ${generateVpImageHtml()}
                </button>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-secondary"
                  data-vp="7"
                  data-type="${type}"
                  data-action="build"
                >
                  7 ${generateVpImageHtml()}
                </button>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-secondary"
                  data-vp="8"
                  data-type="${type}"
                  data-action="build"
                >
                  8 ${generateVpImageHtml()}
                </button>
              </div>
            </div>
          `;
          html += `
                <div class="col-md-8 mx-auto mt-2">
                    <button class="btn btn-block btn-info mb-2" data-action="fail" data-vp-only="true">Gain VP (Pre-Collapse)</button>
                </div>`;
        } else {
          html += `
            <div class="row">
              <div class="col-3">
                <button
                  class="btn btn-secondary"
                  data-vp="1"
                  data-type="${type}"
                  data-action="build"
                >
                  1 ${generateVpImageHtml()}
                </button>
              </div>
              <div class="col-3">
                <button
                  class="btn btn-secondary"
                  data-vp="2"
                  data-type="${type}"
                  data-action="build"
                >
                  2 ${generateVpImageHtml()}
                </button>
              </div>
              <div class="col-3">
                <button
                  class="btn btn-secondary"
                  data-vp="3"
                  data-type="${type}"
                  data-action="build"
                >
                  3 ${generateVpImageHtml()}
                </button>
              </div>
              <div class="col-3">
                <button
                  class="btn btn-secondary"
                  data-vp="4"
                  data-type="${type}"
                  data-action="build"
                >
                  4 ${generateVpImageHtml()}
                </button>
              </div>
            </div>
          `;
        }

        html += `
                <div class="col-md-8 mx-auto mt-2">
                    <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
                </div>`;
      } else {
        html += `
                <div class="col-md-8 m-auto">
                    <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
                </div>`;
      }
    }

    function generateBuildingStepHtml(buildable) {
      if (buildable) {
        let preferences = "<p>Most VP > Secondary Building</p>";
        if (building.type === "super") {
          preferences = "<p>Most VP > Oldest</p>";
          html += `
        <li  class="rounded badge-dark col-12">
              <p>If Collapse has occured, construct a ${generateBuildingImageHtml()} with the following preferences:</p>
            <ul class="list-unstyled">
                <li>
                    ${preferences}
                </li>
            </ul>
        </li>`;
        } else {
          html += `
        <li  class="rounded badge-dark col-12">
            <p>Construct a ${generateBuildingImageHtml()} with the following preferences:</p>
            <ul class="list-unstyled">
                <li>
                    ${preferences}
                </li>
            </ul>
        </li>`;
        }
      } else {
        html += `<li>
            <p class="text-danger">Max number of ${generateBuildingImageHtml()} constructed; do not place a building tile.</p>
        </li>`;
      }
      html += `</ul></div>`;
    }
  }

  function generateBuildingImageHtml() {
    return `<img src="/chronobot/content/images/${building.type}.png" style=" height: 7vh;" />`;
  }

  function generateVpImageHtml() {
    return '<img src="/chronobot/content/images/vp.png" class="img-fluid" />';
  }

  bindEvents();

  return {
    executeAction
  };
};

export default ConstructComponent;
