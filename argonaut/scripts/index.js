const failedText = "If action fails, Argonaut receives $40.";
const upgrade = {
  title: "Upgrade",
  steps: [
    "Discard the lowest level, available upgrade of the first (from left to right) open row.",
    "Mark the selected upgrade row as unavailable",
    failedText
  ],
  turnOrder: true
};
const refinedMarket = {
  get title() {
    return `Refined Market ${this.market}`;
  },
  get steps() {
    return [
      "Sell to as many spaces as possible; beginning with the highest grade (available) spaces.",
      "Note: Argonaut's oil is considered high-grade and does not require refinement.",
      `Take (up to) ${this.crudeAmount} crude oil.`,
      "Argonaut may not exceed it's 4 (per color) oil limit at any time.",
      failedText
    ];
  },
  turnOrder: false,
  contract: true,
  get market() {
    return [1, 2, 3][Math.floor(Math.random() * 3)];
  },
  get crudeAmount() {
    return [1, 2][Math.floor(Math.random() * 2)];
  },
  get oilType() {}
};
const contracts = {
  title: "Contracts & Loans",
  steps: [
    "Take the leftmost available contract of the level Argonaut has least of.",
    "If tied, preference is as follows: High-Grade > Mid-Grade > Low-Grade",
    "Take $15; do not take a penalty cube."
  ],
  turnOrder: true,
  contract: true
};
const crudeMarket = {
  title: "Crude Market",
  get steps() {
    return [
      `Take (up to) ${this.crudeAmount} <img src="./content/images/orange.png" style="height: 3vh" /> oil.`,
      `Take (up to) ${this.crudeAmount}  <img src="./content/images/silver.png" style="height: 3vh" /> oil.`,
      `Take (up to) ${this.crudeAmount}  <img src="./content/images/teal.png" style="height: 3vh" /> oil.`,
      "Argonaut may not exceed it's 4 (per color) oil limit at any time.",
      "If NO oil is purchasable, Argonaut receives $40."
    ];
  },
  turnOrder: false,
  contract: true,
  get crudeAmount() {
    return [1, 2][Math.floor(Math.random() * 2)];
  }
};
const machines = {
  title: "Machines & Pipes",
  steps: [
    "Discard the cheapest machine (if any available).",
    "Discard two random pipes (if any available).",
    "If both steps are unable to be completed, Argonaut receives $40."
  ],
  turnOrder: true
};
const tanks = {
  title: "Tanks & Pipes",
  steps: [
    "Discard the two cheapest tanks (if any available).",
    "Discard two random pipes (if any available).",
    "If both steps are unable to be completed, Argonaut receives $40."
  ],
  turnOrder: true
};
const orders = {
  get title() {
    return `Orders - ${this.grade}`;
  },
  steps: [
    `Attempt to fulfill the leftmost order of the indicated level.`,
    "Gain money per normal rules",
    "Discard fulfilled order tiles.",
    failedText
  ],
  get grade() {
    const grades = ["Low-Grade", "Mid-Grade", "High-Grade"];
    return grades[Math.floor(Math.random() * grades.length)];
  }
};
const governmentTiles = {
  title: "Government Tiles",
  steps: [
    "Discard 2 tiles from an open quadrant.",
    "Quardrant Selection: Begin at the top-left quadrant and move clockwise until a valid quadrant is found - i.e. an open quadrant containing tiles.",
    "Tile Selection: Begin at the top left space of the quadrant and proceed clockwise until two tiles have been discarded.",
    "If Argonaut cannot discard at least 1 pipe, it gains $40."
  ]
};

const actions = [
  upgrade,
  refinedMarket,
  contracts,
  crudeMarket,
  tanks,
  machines,
  orders,
  governmentTiles
];

const ActionTemplate = function(action) {
  let html = `
  <div>
    <h2 class="text-light mt-1">Action Phase</h2>
  </div>
    <div>
        <h4>${action.title}</h4>       
    </div>`;
  html += `
    <div>
        <ul class="list-unstyled mb-1 mt-1">`;
  for (let index = 0; index < action.steps.length; index++) {
    const step = action.steps[index];
    html += ` <li class="badge-dark col-12 mb-2 rounded">
            <p>${step}</p>
        </li>`;
  }

  html += `</ul>
       </div> `;

  if (action.turnOrder) {
    const turnOrder = randomizeTurnOrder();
    if (turnOrder > 0) {
      html += `<div><h2 class="text-light mt-1">Argonaut Turn Order</h2></div> 
          <div>
          <ul class="list-unstyled mb-1 mt-1">
          <li class="badge-dark col-12 mb-2 rounded">
              <p>Argonuat takes the #${turnOrder} on the turn order track.</p>
          </li>
          </ul>
          </div>`;
    }
  }
  if (action.contract) {
    html += `
  <div>
    <h2 class="text-light mt-1">Contract Phase</h2>
  </div>
  <div>
  <ul class="list-unstyled mb-1 mt-1">
  <li class="badge-dark col-12 mb-2 rounded">
  <p>Attempt to fulfill contract requirements; gain money per normal rules. Contracts may be partially fulfilled.</p>
  </li>
  <li class="badge-dark col-12 mb-2 rounded">
  Fulfillment priority:
  <ul>
  <li> Highest value spaces > High-Grade Contracts > Mid-Grade Contracts > Low-Grade Contracts</li>
  </ul>
  </li>
  </ul>
  </div>
  `;
  }

  return { html };
};

const LogTemplate = function(app) {
  let html = `
    <div>
    <h2>Game Log</h2>
    </div>
    <div>    
  <ul class="list-unstyled mb-1 mt-1">`;
  for (let index = 0; index < app.actions.length; index++) {
    const action = app.actions[index];
    html += `
    <li class="badge-dark col-12 mb-2 rounded">
    <p>Turn ${index + 1} - ${action}</p>
    </li>`;
  }
  html += `</ul></div>`;

  return {
    html
  };
};

const app = {
  turn: 0,
  botScore: 0,
  playerScore: 0,
  difficulty: "",
  winner: "",
  actions: [],
  setWinner: function() {
    this.winner = this.playerScore > this.botScore ? "Player" : "Argonaut";
  }
};

function bindDomEvents() {
  document.addEventListener("click", function(e) {
    const modalBody = document.getElementById("modalBody");
    if (e.target && e.target.dataset && e.target.dataset.action === "next") {
      if (app.turn < 18) {
        const action = actions[Math.floor(Math.random() * actions.length)];
        const actionTemplate = new ActionTemplate(action);
        modalBody.innerHTML = actionTemplate.html;
        $("#modal").modal("show");
        app.turn++;
        app.actions.push(action.title);
      } else {
        document.getElementById("endGame").classList.remove("d-none");
      }

      document.getElementById("gameLog").innerHTML = new LogTemplate(app).html;
    } else if (
      e.target &&
      e.target.dataset &&
      e.target.dataset.action === "end"
    ) {
      const botScore = document.getElementById("botScore");
      app.botScore = botScore.value;
      const difficulty = document.getElementById("difficulty").value;
      app.difficulty = difficulty;
      const playerScore = document.getElementById("playerScore");
      app.playerScore = playerScore.value;
      app.setWinner();
      Sentry.captureMessage(app);
      app.turn = 0;
      app.botScore = 0;
      app.actions = [];
      document.getElementById("endGame").classList.add("d-none");
    }
  });
}

function randomizeTurnOrder() {
  const turnOrder = [0, 1, 2];
  const result = turnOrder[Math.floor(Math.random() * turnOrder.length)];
  return result;
}

bindDomEvents();
