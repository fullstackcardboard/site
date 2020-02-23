const ActionsDisplayComponent = function() {
  const baseImageUrl = "/chronobot/content/images/";
  function updateDisplays(actions) {
    updateAllDisplay(actions);
    updatePossibleDisplay(actions);
  }

  function updateAllDisplay(actions) {
    const allActionsContainer = document.getElementById("allActions");
    let html = ``;

    const keys = Object.keys(actions);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      let triggerNumbers = "";
      let nextTriggerNumbers = "";
      const action = actions[key];
      if (actions[key].triggers.length > 0) {
        for (let index = 0; index < actions[key].triggers.length; index++) {
          const number = actions[key].triggers[index];
          triggerNumbers += `<img src='content/images/trigger_${number}.png' class="rounded-circle" style="height: 7vh;" />`;
        }
      }

      html += `<div
            class="col-xs-12 col-sm-6 border shadow rounded bg-dark text-white action text-center mb-2"
            data-action="${key}"
            style="height: 12vh;"
          >
              ${getImageHtml(key)} ${triggerNumbers}
          </div>`;
    }

    allActionsContainer.innerHTML = html;
  }

  function updatePossibleDisplay(actions) {
    const possibleActionsContainer = document.getElementById("possibleActions");
    let html = ``;

    const keys = Object.keys(actions);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      let triggerNumbers = "";
      if (actions[key].triggers.length > 0) {
        const action = actions[key];
        for (let index = 0; index < actions[key].triggers.length; index++) {
          const number = actions[key].triggers[index];
          triggerNumbers += `<img src='content/images/trigger_${number}.png' class="rounded-circle mr-1" style="height: 7vh;" />`;
        }
        html += `
            <div
              class="col-xs-12 col-md-6 mb-2 border shadow rounded bg-dark text-white action text-center"
              data-action="${key}"
              style="height: 10vh;"
            >
              ${getImageHtml(key)} ${triggerNumbers}
            </div>
        `;
      }
    }

    possibleActionsContainer.innerHTML = html;
  }

  function getImageHtml(key) {
    switch (key) {
      case "lab":
        return `
        <img src="${baseImageUrl}construct.png" style="height: 7vh;" />
        <img src="${baseImageUrl}lab.png" style="height: 7vh;" />
      `;
      case "power":
        return `
        <img src="${baseImageUrl}construct.png" style="height: 7vh;" />
        <img src="${baseImageUrl}power.png" style="height: 7vh;" />
      `;
      case "support":
        return `
        <img src="${baseImageUrl}construct.png" style="height: 7vh;" />
        <img src="${baseImageUrl}support.png" style="height: 7vh;" />
      `;
      case "factory":
        return `
        <img src="${baseImageUrl}construct.png" style="height: 7vh;" />
        <img src="${baseImageUrl}factory.png" style="height: 7vh;" />
      `;
      case "super":
        return `
        <img src="${baseImageUrl}construct.png" style="height: 7vh;" />
        <img src="${baseImageUrl}super.png" style="height: 7vh;" />
      `;
      case "supply":
        return `
        <img src="${baseImageUrl}supply.png" style="height: 7vh;" />
        <img src="${baseImageUrl}recruit.png" style="height: 7vh;" />
      `;
      default:
      case "power":
        return `
        <img src="${baseImageUrl}${key}.png" style="height: 7vh;" />
      `;
    }
  }

  return {
    updateDisplays
  };
};

export default ActionsDisplayComponent;
