const Chronobot = function() {
  const baseImageUrl = "/chronobot/content/images/";
  return {
    properties: {
      vp: 0,
      paradox: 0,
      anomalies: 0,
      buildings: [],
      timePoints: 0,
      moralePoints: 0,
      water: 0,
      uranium: 0,
      titanium: 0,
      gold: 0,
      neutronium: 0,
      scientists: 0,
      engineers: 0,
      administrators: 0,
      geniuses: 0,
      moraleTrack: {
        currentSpace: 0,
        spaces: [
          { cost: 5, vp: 0 },
          { cost: 6, vp: 2 },
          { cost: 7, vp: 5 },
          { cost: 7, vp: 8 }
        ]
      },
      timeTravelTrack: {
        currentSpace: 0,
        spaces: [
          { vp: 0 },
          { vp: 2 },
          { vp: 4 },
          { vp: 6 },
          { vp: 8 },
          { vp: 10 },
          { vp: 12 }
        ]
      },
      breakthroughs: {
        circle: 0,
        triangle: 0,
        square: 0
      }
    },
    get powerPlants() {
      return this.properties.buildings.filter(function(building) {
        return building.type === "power";
      }).length;
    },
    get factories() {
      return this.properties.buildings.filter(function(building) {
        return building.type === "factory";
      }).length;
    },
    get supports() {
      return this.properties.buildings.filter(function(building) {
        return building.type === "support";
      }).length;
    },
    get labs() {
      return this.properties.buildings.filter(function(building) {
        return building.type === "lab";
      }).length;
    },
    get superProjects() {
      return this.properties.buildings.filter(function(building) {
        return building.type === "super";
      }).length;
    },
    get resourcesScoreable() {
      return (
        this.properties.uranium > 0 &&
        this.properties.titanium > 0 &&
        this.properties.gold > 0 &&
        this.properties.neutronium > 0
      );
    },
    get workersScoreable() {
      return (
        this.properties.scientists > 0 &&
        this.properties.engineers > 0 &&
        this.properties.administrators > 0 &&
        this.properties.geniuses > 0
      );
    },
    get breakthroughsScoreable() {
      return (
        this.properties.breakthroughs.circle > 0 &&
        this.properties.breakthroughs.square > 0 &&
        this.properties.breakthroughs.triangle > 0
      );
    },
    updateDisplay: function() {
      document.getElementById("stats").innerHTML = `
        <div class="col">
          <div class="row text-center">
            <div class="col">
              <p>
                <img src="${baseImageUrl}vp.png" style="height: 8vh" />
                ${this.properties.vp +
                  this.properties.timePoints +
                  this.properties.moralePoints}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}water.png" style="height: 8vh" />
                ${this.properties.water}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}paradox.png" style="height: 8vh" />
                ${this.properties.paradox}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}anomaly.png" style="height: 8vh" />
                ${this.properties.anomalies}
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row text-center">
            <div class="col">
              <p>
                <img src="${baseImageUrl}neutronium.png" style="height: 8vh" />
                ${this.properties.neutronium}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}uranium.png" style="height: 8vh" />
                ${this.properties.uranium}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}gold.png" style="height: 8vh" />
                ${this.properties.gold}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}titanium.png" style="height: 8vh" />
                ${this.properties.titanium}
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row text-center">
            <div class="col">
              <p>
                <img src="${baseImageUrl}scientist.png" style="height: 8vh" />
                ${this.properties.scientists}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}engineer.png" style="height: 8vh" />
                ${this.properties.engineers}
              </p>
            </div>
            <div class="col">
              <p>
                <img
                  src="${baseImageUrl}administrator.png"
                  style="height: 8vh"
                /> ${this.properties.administrators}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}genius.png" style="height: 8vh" />
                ${this.properties.geniuses}
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row text-center">
            <div class="col">
              <p>
                <img src="${baseImageUrl}power.png" style="height: 8vh" />
                ${this.powerPlants}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}factory.png" style="height: 8vh" />
                ${this.factories}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}support.png" style="height: 8vh" />
                ${this.supports}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}lab.png" style="height: 8vh" />
                ${this.labs}
              </p>
            </div>
            <div class="col">
              <p>
                <img src="${baseImageUrl}super.png" style="height: 8vh" />
                ${this.superProjects}
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row text-center">
            <div class="col">
              <p>
                Circle
                <img
                  src="${baseImageUrl}breakthrough.png"
                  style="height: 8vh"
                /> ${this.properties.breakthroughs.circle}
              </p>
            </div>
            <div class="col">
              <p>
                Square<img
                  src="${baseImageUrl}breakthrough.png"
                  style="height: 8vh"
                /> ${this.properties.breakthroughs.square}
              </p>
            </div>
            <div class="col">
              <p>
                Triangle<img
                  src="${baseImageUrl}breakthrough.png"
                  style="height: 8vh"
                /> ${this.properties.breakthroughs.triangle}
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row text-center">
            <div class="col">
              <img src="${baseImageUrl}time.png" style="height: 8vh" />
              ${this.properties.timePoints}
            </div>
            <div class="col">
              <img src="${baseImageUrl}morale.png" style="height: 8vh" />
              ${this.properties.moralePoints}
            </div>
          </div>
        </div>
      `;
    }
  };
};

export default Chronobot;
