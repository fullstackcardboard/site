const TimeTravelComponent = function(app, chronoBot, modal) {
  function bindEvents() {
    if (!app.timeTravelEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target.dataset.action || e.target.parentElement.dataset.action) {
          const action =
            e.target.dataset.action || e.target.parentElement.dataset.action;
          if (action == "time") {
            chronoBot.properties.timeTravelTrack.currentSpace++;
            chronoBot.properties.timePoints =
              chronoBot.properties.timeTravelTrack.spaces[
                chronoBot.properties.timeTravelTrack.currentSpace
              ].vp;
            modal.hide();
            app.updateState();
            chronoBot.updateDisplay();
          }
        }

        app.timeTravelEventsBound = true;
      });
    }
  }

  bindEvents();

  function executeAction(dieHtml) {
    const baseImageUrl = "/chronobot/content/images/";
    let html = "";
    html += `
    <div>
        <h3><img src="${baseImageUrl}time.png" style="height: 12vh" /> ${dieHtml}</h3>
    </div>`;
    if (
      chronoBot.properties.timeTravelTrack.currentSpace <
      chronoBot.properties.timeTravelTrack.spaces.length - 1
    ) {
      html += `
    <div>
        <ul class="list-unstyled">
            <li>
                <p class="badge-dark col rounded m-auto">Remove any one Warp tile from the past Timeline tile where Chronobot has the most Warp tiles (oldest if tied).</p>                
            </li>
        </ul>
    </div>    

      <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>
        <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-secondary mb-2" data-action="time"><img src="${baseImageUrl}warp-remove.png" style="height: 7vh" /></button>
        </div>`;
    } else {
      html += `  
      <div>
        <h3 class="rounded badge-danger col-12">Action not possible.</h3>
      </div>
      <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>`;
    }

    return html;
  }

  return {
    executeAction
  };
};

export default TimeTravelComponent;
