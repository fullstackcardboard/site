const RecruitComponent = function(app, chronobot, modal) {
  const baseImageUrl = "/chronobot/content/images/";
  function bindEvents() {
    if (!app.recruitEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target.dataset.action || e.target.parentElement.dataset.action) {
          const action =
            e.target.dataset.action || e.target.parentElement.dataset.action;
          if (action === "recruit") {
            let selectedWorker = (
              e.target.dataset.worker || e.target.parentElement.dataset.worker
            ).toLowerCase();
            selectedWorker =
              selectedWorker === "genius" ? "geniuses" : selectedWorker + "s";
            chronobot.properties[selectedWorker]++;
            modal.hide();
            if (chronobot.workersScoreable) {
              chronobot.properties.scientists--;
              chronobot.properties.engineers--;
              chronobot.properties.administrators--;
              chronobot.properties.geniuses--;
              chronobot.properties.vp += 5;
            }
            chronobot.updateDisplay();
            app.updateState();
          }
        }
      });

      app.recruitEventsBound = true;
    }
  }

  function executeAction(dieHtml) {
    return `
      <div>
        <h3>Recruit ${dieHtml}</h3>
      </div>
      <h4>Workers</h4>
      <div class="row">
        <div class="col">
          <p>
            <img src="${baseImageUrl}scientist.png" style="height: 7vh;" />:
            ${chronobot.properties.scientists}
          </p>
        </div>
        <div class="col">
          <p>
            <img src="${baseImageUrl}engineer.png" style="height: 7vh;" />:
            ${chronobot.properties.engineers}
          </p>
        </div>
        <div class="col">
          <p>
            <img src="${baseImageUrl}administrator.png" style="height: 7vh;" />:
            ${chronobot.properties.administrators}
          </p>
        </div>
        <div class="col">
          <p>
            <img src="${baseImageUrl}genius.png" style="height: 7vh;" />:
            ${chronobot.properties.geniuses}
          </p>
        </div>
        <div>
          <ul class="list-unstyled  col col">
            <li class="badge-dark col-12 rounded mb-2">
              <p>
                Place a powered up exosuit in an available Recruit space with
                the following preferences:
              </p>
              <ul class="list-unstyled  col">
                <li>
                  <p>
                    Top Recruit Space > Middle Recruit Space > Bottom Recruit
                    Space > World Council Space (1st player) > World Council
                    Space
                  </p>
                </li>
              </ul>
            </li>
            <li class="badge-dark col-12 rounded mb-2">
              <p>
                Take a worker that Chronobot does not yet have; with the
                following preferences:
              </p>
              <ul class="list-unstyled  col">
                <li>
                  <p>
                    <img src="${baseImageUrl}genius.png" style="height: 7vh;" />
                    >
                    <img
                      src="${baseImageUrl}administrator.png"
                      style="height: 7vh;"
                    />
                    >
                    <img
                      src="${baseImageUrl}engineer.png"
                      style="height: 7vh;"
                    />
                    >
                    <img
                      src="${baseImageUrl}scientist.png"
                      style="height: 7vh;"
                    />
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="row mb-2 col text-center">
          <div class="col-3">
            <button
              class="btn btn-secondary"
              data-action="recruit"
              data-worker="genius"
            >
              <img src="${baseImageUrl}genius.png" style="height: 7vh;" />
            </button>
          </div>
          <div class="col-3">
            <button
              class="btn btn-secondary"
              data-action="recruit"
              data-worker="administrator"
            >
              <img
                src="${baseImageUrl}administrator.png"
                style="height: 7vh;"
              />
            </button>
          </div>
          <div class="col-3">
            <button
              class="btn btn-secondary"
              data-action="recruit"
              data-worker="engineer"
            >
              <img src="${baseImageUrl}engineer.png" style="height: 7vh;" />
            </button>
          </div>
          <div class="col-3">
            <button
              class="btn btn-secondary"
              data-action="recruit"
              data-worker="scientist"
            >
              <img src="${baseImageUrl}scientist.png" style="height: 7vh;" />
            </button>
          </div>
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
export default RecruitComponent;
