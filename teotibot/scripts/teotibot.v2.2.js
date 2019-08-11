const failedText =
  "If neither of the above steps were successful, the bot gains 5 cocoa instead, powers up it's lowest powered worker, and then advances it";
const succeededText =
  "If either of the above steps were successfully performed, power up a worker on the relevant action board (this might trigger an Ascension, which is resolved normally). Then advance the powered-up worker (or the new worker, if the old one triggered ascension).";

const wood = "./content/images/wood.png";
const stone = "./content/images/stone.png";
const gold = "./content/images/gold.png";

const pyramid = {
  // Positions start at the tip of the pyramid, and move towards the bottom, going from left to right in each row.
  positionOne: {
    tile: {},
    triggerNumbers: [6, 7, 8],
    rightReplace: "positionTwo",
    leftReplace: "positionThree"
  },
  positionTwo: {
    tile: {},
    triggerNumbers: [4, 5],
    rightReplace: "positionFour",
    leftReplace: "positionFive"
  },
  positionThree: {
    tile: {},
    triggerNumbers: [9, 10],
    rightReplace: "positionFive",
    leftReplace: "positionSix"
  },
  positionFour: {
    tile: {},
    triggerNumbers: [2, 3],
    rightReplace: "outOfPlay",
    leftReplace: "outOfPlay"
  },
  positionFive: {
    tile: {},
    triggerNumbers: [0],
    rightReplace: "outOfPlay",
    leftReplace: "outOfPlay"
  },
  positionSix: {
    tile: {},
    triggerNumbers: [11, 12],
    rightReplace: "outOfPlay",
    leftReplace: "outOfPlay"
  },
  selectedTile: {
    tile: {}
  },
  outOfPlay: {
    tile: {},
    rightReplace: "selectedTile",
    leftReplace: "selectedTile"
  },
  directionalSelectionTiles: {
    current: {},
    next: {}
  }
};

const tiles = [
  {
    title: "Construction",
    imageUrl: "./content/images/construction.png",
    instructions: [
      {
        text: `Has 2 <img src="${stone}" height=25 /> and ≥ 1 worker(s) on Construction <img src="./content/images/number_8.png" height=25/>`,
        steps: [
          `Spends 2 <img src="${stone}" height=25 />;`,
          "Builds the leftmost available Pyramid Tile;",
          "Places the Tile (randomly oriented) onto the top left, lowest level available space;",
          "Scores VP in accordance with level + 2.",
          "Advances on the pyramid track.",
          "Advances on any temple."
        ]
      },
      {
        text: `If the above step failed and the bot has at least one worker on the Stone Quarry <img src="./content/images/number_3.png" height=25/>, gain 2 <img src="${stone}" height=25 />.`
      },
      {
        text: succeededText
      },
      {
        text: failedText
      }
    ],
    drawn: false
  },
  {
    title: "Worship",
    imageUrl: "./content/images/worship.png",
    instructions: [
      {
        text: `Advance the bot's worker on a Worship space to the next clockwise Worship space on a temple sidebar (remember: Teotibot always ignores the Palace <img src="./content/images/number_1.png" height=25/> action board).`,
        steps: [
          "If there is one of your workers on that space, the bot unlocks that worker;",
          "The bot advances on the matching temple by 2 spaces, gaining rewards for both (gaining printed bonuses instead of Discovery tiles);",
          `If the activated space is on the Decorations <img src="./content/images/number_7.png" height=25/> action board, the bot advances on any temple by 3 instead.`
        ]
      },
      {
        text:
          "Discard the Discovery tile near the activated space, and immediately draw a replacement for it."
      }
    ],
    drawn: false
  },
  {
    title: "Alchemy",
    imageUrl: "./content/images/alchemy.png",
    instructions: [
      {
        text: `If the bot has 1 or more <img src="${gold}" height=25 />, and at least one worker on the Alchemy <img src="./content/images/number_5.png" height=25/> action board, it spends 1 <img src="${gold}" height=25 /> and then gains the technology of the lowest number that does not have any markers (yours, or Teotibot's).`,
        steps: [
          "If all remaining tiles have one of your markers, then the bot gains the lowest numbered technology it does not have. You score 3 VP as normal;",
          "Either way, advance on the the temple matching the gained technology and power up a worker on this action board (this might trigger an Ascension, which is resolved normally). Then advance the powered-up worker (or the new worker, if the old one triggered ascension)."
        ]
      },
      {
        text:
          "If the above step failed, power up it's lowest powered worker by two. Do not execute any actions, or advance any workers."
      }
    ],
    drawn: false
  },
  {
    title: "Mask Collection",
    imageUrl: "./content/images/mask_collection.png",
    instructions: [
      {
        text: `If the bot does not yet have one of the masks available near one of the Worship actions (on the Palace <img src="./content/images/number_1.png" height=25/> action board, or any of the 4 temple bands) and it can pay the cost, it pays that cost and immediately gains that mask.`,
        steps: [
          "Draw a replacement for it immediately;",
          "Do not move any dice;",
          "Take the lowest number mask first;",
          `If tied, it picks the first one clockwise from (and including) the Palace <img src="./content/images/number_1.png" height=25/> action board.`
        ]
      },
      {
        text:
          "If the action failed, the bot gains 5 cocoa instead, powers up it's lowest powered worker, and then advances it."
      }
    ]
  },
  {
    title: "Mastery",
    imageUrl: "./content/images/mastery.png",
    instructions: [
      {
        text: "Find the bot's highest powered unlocked die."
      },
      {
        text: "Perform that action board's action if possible:",
        steps: [
          `Forest (2): Gain 2 <img src="${wood}" height=25" />;`,
          `Stone Quarry (3): Gain 2 <img src="${stone}" height=25" />;`,
          `Gold Deposits (4): Gain 2 <img src="${gold}" height=25" />;`,
          "Alchemy (5): Attempt the board's action;",
          "Nobles (6): Attempt the board's action;",
          "Decorations (7): Attempt the board's action;",
          "Construction (8): Attempt the board's action."
        ]
      },
      {
        text:
          "If the action failed, find the bot's next highest powered unlocked worker, and repeat step 2."
      },
      {
        text:
          "If an action is successful, power up the worker in question (this might trigger an Ascension, which is resolved normally). Then advance the powered-up worker (or the new worker, if the old one triggered ascension)."
      },
      {
        text:
          "In the extremely unlikely event of all workers failing to perform an action, the bot gains 5 cocoa instead, powers up it's lowest powered worker, and then advances it."
      }
    ],
    drawn: false
  },
  {
    title: "Nobles",
    imageUrl: "./content/images/nobles.png",
    instructions: [
      {
        text: `If the bot has at least 2 <img src="${wood}" height=25 /> and one worker on the Nobles <img src="./content/images/number_6.png" height=25/> action board, it spends 2 <img src="${wood}" height=25 /> and builds a building.`,
        steps: [
          "Before the first Eclipse, place it in the first (top) row;",
          "After the first Eclipse, but before the second, place it in the second (center) row;",
          "If a row is full, place it in the space with the lowest printed VP;",
          "Score the VP depicted on the selected space, and advance the bot on the Avenue of the Dead."
        ]
      },
      {
        text: `If the above step failed and the bot has at least one worker on the Forest <img src="./content/images/number_2.png" height=25/> action board, it gains 2 <img src="${wood}" height=25 />.`
      },
      {
        text: succeededText
      },
      {
        text: failedText
      }
    ]
  },
  {
    title: "Decorations",
    imageUrl: "./content/images/decorations.png",
    instructions: [
      {
        text: `If the bot has 2 or more <img src="${gold}" height=25 /> and at least one worker on the Decorations <img src="./content/images/number_7.png" height=25/> action board, it spends 2 <img src="${gold}" height=25 /> and places the top most Decoration tile onto an available Decorations space on the Pyramid (clockwise from the top). Then the bot:`,
        steps: [
          "Scores 5 VP;",
          "Advances on the Pyramid Track;",
          "Advances on any temple track by 1."
        ]
      },
      {
        text: `If the above step failed and the bot has at least one worker on the Gold Deposits <img src="./content/images/number_4.png" height=25/> action board, it gains 2 <img src="${gold}" height=25 />.`
      },
      {
        text: succeededText
      },
      {
        text: failedText
      }
    ]
  }
];
const directionalTiles = [
  {
    currentDirection: "",
    directions: ["left", "right"],
    getImageUrl: function() {
      return this.currentDirection === "left"
        ? "./content/images/left.png"
        : "./content/images/right.png";
    }
  },
  {
    currentDirection: "",
    directions: ["left", "right"],
    getImageUrl: function() {
      return this.currentDirection === "left"
        ? "./content/images/left.png"
        : "./content/images/right.png";
    }
  }
];

((tiles, directionalTiles, pyramid) => {
  const DiceViewModel = function(dieOneValue, dieTwoValue) {
    const html = `
        <div class="overlay">
            <div class="col-12 text-center fa-10x overlay-text" style="color: #f4f0e1">
                <div><img src="./content/images/die_${dieOneValue}.png" height=70 /><img src="./content/images/die_${dieTwoValue}.png" height=70/></div>
            </div>
        </div>`;

    return {
      html
    };
  };
  const ActionViewModel = function(tile) {
    function buildHtml() {
      let html = `
        <div class="col-md-12 col-lg-6 mb-3 d-flex overlay-text" >
            <div class="card flex-fill">
            <img class="card-img-top" src="./content/images/card_top.png" alt="Card image cap">
                <div class="card-body" style="background-color: #f4f0e1">                
                <h3 class="card-title text-center"><img src="${
                  tile.imageUrl
                }" height=70 />${tile.title}</h3>`;
      for (let index = 0; index < tile.instructions.length; index++) {
        const currentInstructions = tile.instructions[index];
        let cssClass = 'dark';
        if (currentInstructions.text.includes('fail') || currentInstructions.text.includes('neither')) {
          cssClass = 'danger';
        } else if (currentInstructions.text.includes('success')) {
          cssClass = 'success'
        }
        html += `<div class="rounded mb-1 badge-secondary col border border-${cssClass} wide-border shadow">${index + 1}. ${currentInstructions.text}</div>`;
        if (currentInstructions.steps) {
          html += "<div class='mb-1 badge-secondary col rounded border border-dark wide-border shadow'><ul>";
          for (
            let stepIndex = 0;
            stepIndex < currentInstructions.steps.length;
            stepIndex++
          ) {
            const step = currentInstructions.steps[stepIndex];
            html += `<li>${step}</li>`;
          }
          html += "</ul></div>";
        }
      }
      html +=
        '<button id="closeOverlayButton" class="m-auto btn btn-block teo-blue-color" data-close="true">Close</button></div><div>';
      html += "</div></div>";
      return html;
    }

    const html = buildHtml();
    return {
      html
    };
  };

  const InstallInfoViewModel = function() {
    function buildHtml() {
      let html = `
        <div class="col-md-12 col-lg-6 mb-3 d-flex overlay-text">
            <div class="card flex-fill">
                <img class="card-img-top" src="./content/images/card_top.png" alt="Card image cap">
                <div class="card-body" style="background-color: #f4f0e1">                
                    <h3 class="card-title text-center">Install</h3>
                    <div>
                        <p>To download this app for offline use, refer to instructions for your device:</p>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <div>
                                    <h5>Android/Almost Any Device Capable of Running Chrome</h5>
                                </div>
                                <div>
                                    <ul>
                                        <li>Open your browser's menu and click/tap Install Teotibot...</li>
                                        <li>Follow the prompts...</li>
                                        <li>And done! You are now able to use this app offline/outside of your browser!</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h5>iOS</h5>
                                </div>
                                <div>
                                    <ul>
                                        <li>Open your browser's menu and click/tap Add to Homescreen...</li>
                                        <li>Follow the prompts...</li>
                                        <li>And done! You are now able to use this app offline/outside of your browser!</li>
                                    </ul>
                                </div>
                            </li>
                            </ul>
                            </div>
                    <button id="closeInfoOverlayButton" class="m-auto btn btn-block teo-blue-color" data-close="true">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
      return html;
    }

    const html = buildHtml();
    return {
      html
    };
  };

  const EclipseScoringViewModel = function(
    eclipseCounter,
    neutralSpacesViewModel
  ) {
    const pyramidTrackPoints = () => {
      if (eclipseCounter.currentEclipse === 1) {
        return 4;
      }
      if (eclipseCounter.currentEclipse === 2) {
        return 3;
      }

      if (eclipseCounter.currentEclipse === 3) {
        return 2;
      }
    };

    const title = () => {
      return eclipseCounter.currentEclipse === 3
        ? "Game End"
        : "Eclipse Scoring";
    };
    let html = `<div class="col-md-12 col-lg-6 mb-3 d-flex overlay-text">
            <div class="card flex-fill">
                <img class="card-img-top" src="./content/images/card_top.png" alt="Card image cap">
                <div class="card-body" style="background-color: #f4f0e1">                
                    <h3 class="card-title text-center">${title()}</h3>
                    <div>
                        <ol>
                            <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">
                                Score lowest visible number on the Buildings row for each step progressed on the Avenue of the Dead.
                            </li>
                            <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">
                                The player (or players) furthest ahead on the Pyramid track scores 4 Victory Points.
                            </li>
                            <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">
                                Each player scores ${pyramidTrackPoints()} points for each step they have moved up on the Pyramid track.
                            </li>`;
    if (eclipseCounter.currentEclipse !== 3) {
      html += `
                            <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">
                                Reset the Pyramid track for all players, by moving all player markers to their starting position. This is the only track which resets after each Eclipse!
                            </li>`;
    }
    html += `<li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">
                                Each player organizes their masks into one or more sets, where each set is comprised of different masks. Then each set scores points, depending on the number of masks in that set:
                                <ul>
                                    <li>
                                        Each set of 1/2/3/4/5/6/7 masks score 1/3/6/10/15/21/28 Victory Points.
                                    </li>
                                </ul>
                            </li>
                            <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">
                                Each player must now pay a salary of 1 cocoa per worker,
                                and an additional cocoa for each worker with a power of 4
                                or 5. For each cocoa a player is unwilling or unable to pay,
                                that player loses 3 Victory Points. If at any time this reduces
                                a player’s Victory Point total to 0, that player loses no more
                                Victory Points.
                            </li> `;
    if (eclipseCounter.currentEclipse === 3) {
      html += `<li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col"> Each player who has
                    qualified for one or more Temple Bonus tiles (by being on
                    the penultimate or topmost step of a temple) scores additional
                    Victory Points based on any Bonus tiles they have reached.
                    Refer to the Appendix for an explanation of all Bonus tiles.</li>
                        </ol>
                    </div>`
                    
      html += `
      <div>
        <h4>Teotibot Scoring</h4>
      </div>
      <div><p>Teotibot scores as above with the following changes/exceptions:</p></div>
      <div>
        <ul>
          <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">1 Victory Point per resource/cocoa.</li>
          <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">2 Victory Points per released technology.
          <li class="mb-1 badge-secondary border border-dark wide-border shadow rounded col">15 Victory Points for each Temple Bonus Tile it has reached (as opposed to scoring them manually).
        </ul>
      </div>`;
    } else if (eclipseCounter.currentEclipse !== 3) {
      html += `</ol>
                    </div>`;
    }

    if (eclipseCounter.currentEclipse !== 3) {
      html += neutralSpacesViewModel.html;
    }

    html += `<button id="closeInfoOverlayButton" class="m-auto btn btn-block teo-blue-color">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
    return {
      html
    };
  };

  const SetupViewModel = function(
    neutralSpacesViewModel,
    teotiotSetupViewModel,
    boardRandomizationViewModel
  ) {
    let html = `<div class="col-md-12 col-lg-6 mb-3 d-flex overlay-text">
            <div class="card flex-fill">
                <img class="card-img-top" src="./content/images/card_top.png" alt="Card image cap">
                <div class="card-body" style="background-color: #f4f0e1">                
                    <h3 class="card-title text-center">${
                      teotiotSetupViewModel ? "Game Setup" : ""
                    }</h3>`;

    if (boardRandomizationViewModel) {
      html += boardRandomizationViewModel.html;
    }

    if (neutralSpacesViewModel) {
      html += neutralSpacesViewModel.html;
    }
    if (teotiotSetupViewModel) {
      html += teotiotSetupViewModel.html;
    }

    html += `<button id="closeInfoOverlayButton" class="m-auto btn btn-block teo-blue-color">Close</button>
                    </div>
                </div>
            </div>
        </div>`;

    return {
      html
    };
  };

  const TeotibotSetupViewModel = function() {
    const html = `<div class="text-center mt-2">
                        <h4>Teotibot Setup</h4>
                    </div>
                    <div>
                        <b>Worker Dice</b>
                    </div>
                    <div>
                        <div class="row mb-3">
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_2.png" height=50/><img src="./content/images/number_4.png" height=50 />
                          </div>
                          <div>Gold Deposits</div>
                          </div>
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_2.png" height=50/><img src="./content/images/number_6.png" height=50 />
                          </div>
                          <div>Nobles</div>
                          </div>
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_2.png" height=50/><img src="./content/images/number_8.png" height=50 />
                          </div>
                          <div>Construction</div>
                          </div>
                        </div>
                        </div>
                        <div>
                        <b>Worship Die</b>
                    </div>
                    <div>
                        <div class="row mb-3">
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_1.png" height=50/><img src="./content/images/number_7.png" height=50 />
                          </div>
                          <div>Decorations</div>
                          </div>
                        </div>
                        </div>
                        <div>
                        <b>Resources</b>
                    </div>
                    <div>
                        <div class="row mb-3">
                          <div class="col-12">
                          <div>
                          <b>2x</b><img src="./content/images/stone.png" height=50/><b class="ml-2">2x</b><img src="./content/images/wood.png" height=50 /><b class="ml-2">2x</b><img src="./content/images/gold.png" height=50 />
                          </div>
                          </div>
                        </div>`;

    return {
      html
    };
  };

  const BoardRandomizationViewModel = function(
    startingTiles,
    technologyTiles,
    templeTiles
  ) {
    let startingTilesHtml = `                    
    <div class="text-center mt-2">
      <h4>Starting Tiles (Choose 2)</h4>
    </div>
    <div class="row mb-3">
      `;

    for (let index = 0; index < startingTiles.length; index++) {
      const startingTile = startingTiles[index];
      startingTilesHtml += `<div class="col-3"><img src="${
        startingTile.imageUrl
      }" height=100 /></div>`;
    }

    startingTilesHtml += `
    </div>`;

    let technologyTilesHtml = `
    <div class="text-center mt-2">
      <h4>Technology Tiles</h4>
    </div>
    <div class="row mb-3">`;

    for (let index = 0; index < technologyTiles.length; index++) {
      const technologyTile = technologyTiles[index];
      technologyTilesHtml += `<div class="col-4"><img src="${
        technologyTile.imageUrl
      }" height=100 /></div>`;
    }

    technologyTilesHtml += `
    </div>`;

    let templeTilesHtml = `
    <div class="text-center mt-2">
      <h4>Temple Tiles</h4>
    </div>
    <div class="row mb-3">`;

    for (let index = 0; index < templeTiles.length; index++) {
      const templeTile = templeTiles[index];
      templeTilesHtml += `<div class="col-4"><img src="${
        templeTile.imageUrl
      }" height=50 /></div>`;
    }

    templeTilesHtml += `
    </div>`;

    const html = `${startingTilesHtml}${technologyTilesHtml}${templeTilesHtml}`;

    return {
      html
    };
  };

  const NeutralSpacesViewModel = function(neutralOne, neutralTwo) {
    const html = `
                    <div class="text-center mt-2">
                        <h4>Neutral Player Placement</h4>
                    </div>
                    <div>
                        <b>Neutral Player One</b>
                    </div>
                    <div>
                        <p>Place dice as follows:</p>
                        <div class="row mb-3">
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_1.png" height=50/><img src="./content/images/number_${
                            neutralOne.spaceOne.space
                          }.png" height=50 />
                          </div>
                          <div>${neutralOne.spaceOne.title}</div>
                          </div>
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_2.png" height=50/><img src="./content/images/number_${
                            neutralOne.spaceTwo.space
                          }.png" height=50 />
                          </div>
                          <div>${neutralOne.spaceTwo.title}</div>
                          </div>
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_3.png" height=50/><img src="./content/images/number_${
                            neutralOne.spaceThree.space
                          }.png" height=50 />
                          </div>
                          <div>${neutralOne.spaceThree.title}</div>
                          </div>
                        </div>
                        </div>
                    <div>
                        <b>Neutral Player Two</b>
                    </div>
                    <div>
                        <p>Place dice as follows:</p>
                        <div class="row mb-3">
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_1.png" height=50/><img src="./content/images/number_${
                            neutralTwo.spaceOne.space
                          }.png" height=50 />
                          </div>
                          <div>${neutralTwo.spaceOne.title}</div>
                          </div>
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_2.png" height=50/><img src="./content/images/number_${
                            neutralTwo.spaceTwo.space
                          }.png" height=50 />
                          </div>
                          <div>${neutralTwo.spaceTwo.title}</div>
                          </div>
                          <div class="col-4">
                          <div>
                          <img src="./content/images/die_3.png" height=50/><img src="./content/images/number_${
                            neutralTwo.spaceThree.space
                          }.png" height=50 />
                          </div>
                          <div>${neutralTwo.spaceThree.title}</div>
                          </div>
                        </div>
                        </div>`;

    return {
      html
    };
  };

  const EclipseViewModel = function(eclipseCounter) {
    const html = `
    <div>${eclipseCounter.turnsLeft}
    </div>
    <div>
        <small class="">Turns Until Eclipse</small>
    </div>`;

    return {
      html
    };
  };

  const PyramidViewModel = function(pyramid) {
    const leftArrowClass = "left-direction";
    const rightArrowClass = "right-direction";

    const html = `<div class="row m-auto">
            <div class="col-4 offset-4 text-center p-0">
                    <img src="${
                      pyramid.positionOne.tile.imageUrl
                    }" class="image-fluid tile-js height-limit"  data-tile-title="${
      pyramid.positionOne.tile.title
    }"/>
            </div>
        </div>
        <div class="row mb-1">
            <div class="col-4 offset-2 text-center p-0">                
                    <img src="${
                      pyramid.positionTwo.tile.imageUrl
                    }" class="image-fluid tile-js height-limit"  data-tile-title="${
      pyramid.positionTwo.tile.title
    }"/>
            </div>
            <div class="col-4 text-center p-0">             
                    <img src="${
                      pyramid.positionThree.tile.imageUrl
                    }" class="image-fluid tile-js height-limit"  data-tile-title="${
      pyramid.positionThree.tile.title
    }"/>
            </div>
        </div>
        <div class="row mb-1">
            <div class="col-4 p-0">            
                    <img src="${
                      pyramid.positionFour.tile.imageUrl
                    }" class="image-fluid tile-js height-limit"  data-tile-title="${
      pyramid.positionFour.tile.title
    }"/>
            </div>
            <div class="col-4 p-0">       
                    <img src="${
                      pyramid.positionFive.tile.imageUrl
                    }" class="image-fluid tile-js height-limit"  data-tile-title="${
      pyramid.positionFive.tile.title
    }"/>
            </div>
            <div class="col-4 p-0">
                    <img src="${
                      pyramid.positionSix.tile.imageUrl
                    }" class="image-fluid tile-js height-limit"  data-tile-title="${
      pyramid.positionSix.tile.title
    }"/>
            </div>
        </div>
        <div class="row">
            <div class="col-4 offset-2">                
                    <img src="${pyramid.directionalSelectionTiles.current.getImageUrl()}" class="image-fluid tile-js height-limit" />
               
            </div>
            <div class="col-4">                
                    <img src="${pyramid.directionalSelectionTiles.next.getImageUrl()}" class="image-fluid tile-js height-limit" />
            </div>
        </div>
        <div class="row">
            <div class="col-4 offset-4 text-center">
                    <img src="${
                      pyramid.outOfPlay.tile.imageUrl
                    }" class="image-fluid tile-js height-limit"  data-tile-title="${
      pyramid.outOfPlay.tile.title
    }"/>
            </div>
        </div>`;

    return {
      html
    };
  };

  const Model = function() {
    let tiles = {};
    let pyramid = {};
    let directionalTiles = {};
    const boardSpaces = [
      { space: 1, title: "Palace" },
      { space: 2, title: "Forest" },
      { space: 3, title: "Stone Quarry" },
      { space: 4, title: "Gold Deposits" },
      { space: 5, title: "Alchemy" },
      { space: 6, title: "Nobles" },
      { space: 7, title: "Decorations" },
      { space: 8, title: "Construction" }
    ];
    let startingTiles = [];
    let technologyTiles = [];
    let templeTiles = [];

    const eclipseCounter = {
      lightStart: 0,
      darkStart: 10,
      currentLight: 0,
      currentDark: 10,
      get turnsLeft() {
        if (options.darkEclipse) {
          return this.currentDark - this.currentLight;
        }

        return this.currentDark + 1 - this.currentLight;
      },
      currentEclipse: 0,
      forceEndGame: false
    };
    const neutralOne = {
      spaceOne: 0,
      spaceTwo: 0,
      spaceThree: 0
    };
    const neutralTwo = {
      spaceOne: 0,
      spaceTwo: 0,
      spaceThree: 0
    };

    const options = {
      darkEclipse: false,
      moveNeutral: false
    };

    return {
      tiles,
      pyramid,
      directionalTiles,
      eclipseCounter,
      boardSpaces,
      neutralOne,
      neutralTwo,
      options,
      startingTiles,
      technologyTiles,
      templeTiles
    };
  };

  const View = function() {
    const drawTileButton = document.getElementById("drawNextTile");
    const pyramidContainer = document.getElementById("pyramidContainer");
    const actionContainer = document.getElementById("actionContainer");
    const diceContainer = document.getElementById("diceContainer");
    const eclipseContainer = document.getElementById("eclipseContainer");
    const infoContainer = document.getElementById("infoContainer");
    const installInfo = document.getElementById("install");
    const darkEclipseCheckbox = document.getElementById("darkEclipse");
    const moveNeutralCheckbox = document.getElementById("moveNeutral");
    const triggerEndGameLink = document.getElementById("endGame");
    const ascendButton = document.getElementById("ascend");
    const newGameButton = document.getElementById("newGame");

    function getElement(id) {
      return document.getElementById(id);
    }

    function renderPyramid(pyramidViewModel) {
      pyramidContainer.innerHTML = pyramidViewModel.html;
    }

    function hideDrawTileButton() {
      drawTileButton.classList.add("d-none");
    }

    function hidePyramid() {
      pyramidContainer.classList.add("d-none");
    }

    function hideEclipseContainer() {
      eclipseContainer.classList.add("d-none");
    }

    function renderAction(viewModel) {
      actionContainer.innerHTML = viewModel.html;
      actionContainer.classList.add("d-block");
      actionContainer.classList.remove("d-none");
    }

    function hideInfoContainer() {
      infoContainer.classList.remove("d-block");
      infoContainer.classList.add("d-none");
    }

    function hideActionContainer() {
      actionContainer.classList.remove("d-block");
      actionContainer.classList.add("d-none");
    }

    function renderDice(viewModel) {
      diceContainer.innerHTML = viewModel.html;
      diceContainer.classList.remove("d-none");
      diceContainer.classList.add("d-block");
    }

    function hideDice() {
      diceContainer.classList.remove("d-block");
      diceContainer.classList.add("d-none");
    }

    function hideAscendButton() {
      ascendButton.classList.add("d-none");
    }

    function renderMoreInfo(viewModel) {
      infoContainer.innerHTML = viewModel.html;
      infoContainer.classList.add("d-block");
      infoContainer.classList.remove("d-none");
    }

    function renderEclipse(viewModel) {
      eclipseContainer.innerHTML = viewModel.html;
    }

    function hideInteractiveElements() {
      hideDice();
      hidePyramid();
      hideDrawTileButton();
      hideEclipseContainer();
      hideAscendButton();
    }

    function init() {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        installInfo.classList.add("d-none");
      }
    }

    return {
      drawTileButton,
      renderAction,
      renderPyramid,
      get closeOverlayButton() {
        return getElement("closeOverlayButton");
      },
      get closeInfoOverLayButton() {
        return getElement("closeInfoOverlayButton");
      },
      hideActionContainer,
      hideInfoContainer,
      actionContainer,
      infoContainer,
      darkEclipseCheckbox,
      moveNeutralCheckbox,
      renderAction,
      renderDice,
      hideDice,
      installInfo,
      renderMoreInfo,
      renderEclipse,
      hideInteractiveElements,
      triggerEndGameLink,
      ascendButton,
      newGameButton,
      diceContainer,
      init
    };
  };

  const Controller = function(model, view, tiles, directionalTiles, pyramid) {
    function init() {
      model.tiles = tiles;
      model.directionalTiles = directionalTiles;
      model.pyramid = pyramid;
      populateModelStartingTiles();
      populateModelTechnologyTiles();
      populateModelTempleTiles();
      bindDomEvents();
      setupDirectionTiles();
      setUpPyramid();
      setNeutralSpaces();
      view.renderPyramid(new PyramidViewModel(model.pyramid));
      view.renderEclipse(new EclipseViewModel(model.eclipseCounter));
      view.renderMoreInfo(
        new SetupViewModel(
          new NeutralSpacesViewModel(model.neutralOne, model.neutralTwo),
          new TeotibotSetupViewModel(),
          new BoardRandomizationViewModel(
            model.startingTiles,
            model.technologyTiles,
            model.templeTiles
          )
        )
      );
      view.init();
    }

    function populateModelStartingTiles() {
      const startingTilesBaseUrl = "./content/images/STARTING TILES";
      for (let index = 0; index < 18; index++) {
        model.startingTiles.push({
          imageUrl: startingTilesBaseUrl + (index + 1) + ".jpg"
        });
      }

      shuffle(model.startingTiles);
      const selectedStartingTiles = [];
      for (let index = 0; index < 4; index++) {
        selectedStartingTiles.push(
          model.startingTiles.find(function(element) {
            return !selectedStartingTiles.includes(element);
          })
        );
      }


      model.startingTiles.length = 0;

      model.startingTiles = selectedStartingTiles;
    }

    function populateModelTechnologyTiles() {
      const techTileBaseUrl = "./content/images/TECHNOLOGY TILES";
      for (let index = 0; index < 9; index++) {
        model.technologyTiles.push({
          imageUrl: techTileBaseUrl + (index + 1) + ".jpg"
        });
      }

      shuffle(model.technologyTiles);

      const selectedTechnologyTiles = [];
      for (let index = 0; index < 6; index++) {
        selectedTechnologyTiles.push(
          model.technologyTiles.find(function(element) {
            return !selectedTechnologyTiles.includes(element);
          })
        );
      }
      model.technologyTiles.length = 0;

      model.technologyTiles = selectedTechnologyTiles;
    }

    function populateModelTempleTiles() {
      const templeTileBaseUrl = "./content/images/BONUS TEMPLE TILES";
      for (let index = 0; index < 7; index++) {
        model.templeTiles.push({
          imageUrl: templeTileBaseUrl + (index + 1) + ".jpg"
        });
      }

      shuffle(model.templeTiles);

      const selectedTempleTiles = [];
      for (let index = 0; index < 3; index++) {
        selectedTempleTiles.push(
          model.templeTiles.find(function(element) {
            return !selectedTempleTiles.includes(element);
          })
        );
      }
      model.templeTiles.length = 0;

      model.templeTiles = selectedTempleTiles;
    }

    function bindDomEvents() {
      $(window).bind("orientationchange resize", function(event) {
        if (event.orientation) {
          if (event.orientation == "landscape") {
            if (window.rotation == 90) {
              rotate(this, -90);
            } else {
              rotate(this, 90);
            }
          }
        }
      });

      function rotate(el, degs) {
        iedegs = degs / 90;
        if (iedegs < 0) iedegs += 4;
        transform = "rotate(" + degs + "deg)";
        iefilter =
          "progid:DXImageTransform.Microsoft.BasicImage(rotation=" +
          iedegs +
          ")";
        styles = {
          transform: transform,
          "-webkit-transform": transform,
          "-moz-transform": transform,
          "-o-transform": transform,
          filter: iefilter,
          "-ms-filter": iefilter
        };
        $(el).css(styles);
      }

      view.drawTileButton.addEventListener("click", function() {
        drawNextTile();
      });

      view.installInfo.addEventListener("click", function() {
        view.renderMoreInfo(new InstallInfoViewModel());
      });

      view.darkEclipseCheckbox.addEventListener("click", function() {
        model.options.darkEclipse = view.darkEclipseCheckbox.checked;
        view.renderEclipse(new EclipseViewModel(model.eclipseCounter));
      });

      view.moveNeutralCheckbox.addEventListener("click", function() {
        model.options.moveNeutral = view.moveNeutralCheckbox.checked;
      });

      view.triggerEndGameLink.addEventListener("click", function() {
        view.hideInteractiveElements();
        model.eclipseCounter.forceEndGame = true;
        updateEclipse();
      });

      view.ascendButton.addEventListener("click", function() {
        updateEclipse();
      });

      view.newGameButton.addEventListener("click", function() {
        window.location.reload();
      });

      document.addEventListener("click", function(e) {
        handleTileClick(e, view, ActionViewModel, model);
        handleActionContainerEvents(e, view);
        handleInfoContainerEvents(e, view);
        handleDiceContainerEvents(e, view);
      });
    }

    function drawNextTile() {
      let dieOneValue = 0;
      let dieTwoValue = 0;
      let index = 0;

      // Set an interval to simulate the dice roll
      let interval = setInterval(() => {
        dieOneValue = Math.floor(Math.random() * 6);
        dieTwoValue = Math.floor(Math.random() * 6);
        dieOneValue = dieOneValue === 0 ? 1 : dieOneValue;
        dieTwoValue = dieTwoValue === 0 ? 1 : dieTwoValue;
        view.renderDice(new DiceViewModel(dieOneValue, dieTwoValue));
        index++;

        if (index + 1 === 7) {
          clearInterval(interval);
          let timeOut = setTimeout(() => {
            selectPyramidTile(dieOneValue, dieTwoValue);
            view.renderAction(
              new ActionViewModel(model.pyramid.selectedTile.tile)
            );
            if (model.options.moveNeutral) {
              setNeutralSpaces();
              view.renderMoreInfo(
                new SetupViewModel(
                  new NeutralSpacesViewModel(model.neutralOne, model.neutralTwo)
                )
              );
            }
            clearTimeout(timeOut);
            replaceEmptyTiles();
            view.renderPyramid(new PyramidViewModel(model.pyramid));
            view.hideDice();
            updateEclipse();
          }, 750);
        }
      }, 150);
    }

    function updateEclipse() {
      if (model.eclipseCounter.forceEndGame) {
        model.eclipseCounter.currentEclipse = 2;
        triggerEclipse(
          model,
          setNeutralSpaces,
          view,
          EclipseScoringViewModel,
          NeutralSpacesViewModel
        );
      }
      model.eclipseCounter.currentLight++;
      if (
        model.eclipseCounter.currentLight ===
          model.eclipseCounter.currentDark &&
        model.options.darkEclipse === true
      ) {
        triggerEclipse(
          model,
          setNeutralSpaces,
          view,
          EclipseScoringViewModel,
          NeutralSpacesViewModel
        );
      } else if (
        model.eclipseCounter.currentLight ===
          model.eclipseCounter.currentDark + 1 &&
        model.options.darkEclipse === false
      ) {
        triggerEclipse(
          model,
          setNeutralSpaces,
          view,
          EclipseScoringViewModel,
          NeutralSpacesViewModel
        );
      }

      view.renderEclipse(new EclipseViewModel(model.eclipseCounter));
      if (model.eclipseCounter.currentEclipse === 3) {
        view.hideInteractiveElements();
      }
    }

    function setNeutralSpaces() {
      model.neutralOne.spaceOne = getRandomElement(model.boardSpaces);
      model.neutralOne.spaceTwo = getRandomElement(model.boardSpaces);
      while (
        model.neutralOne.spaceTwo.space === model.neutralOne.spaceOne.space
      ) {
        model.neutralOne.spaceTwo = getRandomElement(model.boardSpaces);
      }
      model.neutralOne.spaceThree = getRandomElement(model.boardSpaces);
      while (
        model.neutralOne.spaceThree.space === model.neutralOne.spaceTwo.space ||
        model.neutralOne.spaceThree.space === model.neutralOne.spaceOne.space
      ) {
        model.neutralOne.spaceThree = getRandomElement(model.boardSpaces);
      }
      model.neutralTwo.spaceOne = getRandomElement(model.boardSpaces);
      model.neutralTwo.spaceTwo = getRandomElement(model.boardSpaces);
      while (
        model.neutralTwo.spaceTwo.space === model.neutralTwo.spaceOne.space
      ) {
        model.neutralTwo.spaceTwo.space = getRandomElement(model.boardSpaces);
      }
      model.neutralTwo.spaceThree = getRandomElement(model.boardSpaces);
      while (
        model.neutralTwo.spaceThree.space === model.neutralTwo.spaceTwo.space ||
        model.neutralTwo.spaceThree.space === model.neutralTwo.spaceOne.space
      ) {
        model.neutralTwo.spaceThree = getRandomElement(model.boardSpaces);
      }
    }

    function getRandomElement(array) {
      const element = array[Math.floor(Math.random() * array.length)];
      return element;
    }

    function shuffle(array) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function setupDirectionTiles() {
      for (let index = 0; index < model.directionalTiles.length; index++) {
        const directionalTile = model.directionalTiles[index];
        directionalTile.currentDirection = getRandomElement(
          directionalTile.directions
        );
      }
    }

    function setUpPyramid() {
      model.tiles = shuffle(model.tiles);
      model.pyramid.positionOne.tile = model.tiles[0];
      model.pyramid.positionTwo.tile = model.tiles[1];
      model.pyramid.positionThree.tile = model.tiles[2];
      model.pyramid.positionFour.tile = model.tiles[3];
      model.pyramid.positionFive.tile = model.tiles[4];
      model.pyramid.positionSix.tile = model.tiles[5];
      model.pyramid.outOfPlay.tile = model.tiles[6];
      model.pyramid.directionalSelectionTiles.current =
        model.directionalTiles[0];
      model.pyramid.directionalSelectionTiles.next = model.directionalTiles[1];
    }

    function selectPyramidTile(dieOneValue, dieTwoValue) {
      const diceTotal = dieOneValue + dieTwoValue;

      for (const property in model.pyramid) {
        if (model.pyramid.hasOwnProperty(property)) {
          let position = model.pyramid[property];
          if (position.triggerNumbers) {
            if (position.triggerNumbers.includes(diceTotal)) {
              model.pyramid.selectedTile.tile = position.tile;
              position.tile = null;
            }
          }
        }
      }
    }

    function replaceEmptyTiles() {
      let tileCounter = 0;
      const pyramidPropertyKeys = Object.keys(pyramid);
      for (let index = 0; index < pyramidPropertyKeys.length; ) {
        const propertyKey = pyramidPropertyKeys[index];
        const position = model.pyramid[propertyKey];
        // Tile has been moved
        if (position.tile === null && propertyKey != "selectedTile") {
          // Start the loop over and run through until no more tiles are null
          index = 0;
          if (
            model.pyramid.directionalSelectionTiles.current.currentDirection ===
            "left"
          ) {
            const replacementTile = Reflect.get(pyramid, position.leftReplace)
              .tile;
            position.tile = replacementTile;
            model.pyramid[position.leftReplace].tile = null;
            if (tileCounter <= 2) {
              swapDirectionTiles();
            }

            tileCounter++;
          } else {
            const replacementTile = Reflect.get(pyramid, position.rightReplace)
              .tile;
            position.tile = replacementTile;
            model.pyramid[position.rightReplace].tile = null;
            if (tileCounter <= 2) {
              swapDirectionTiles();
            }

            tileCounter++;
          }
        } else {
          index++;
        }
      }
    }

    function replaceEmptyTilesOld() {
      let tileCounter = 0;
      for (const property in model.pyramid) {
        if (model.pyramid.hasOwnProperty(property)) {
          const position = model.pyramid[property];
          // Tile has been moved
          if (position.tile === null && position != "selectedTile") {
            for (const key in model.pyramid) {
              if (model.pyramid.hasOwnProperty(key)) {
                const positionTwo = model.pyramid[key];
                if (
                  model.pyramid.directionalSelectionTiles.current
                    .currentDirection === "left"
                ) {
                  if (key === position.leftReplace) {
                    position.tile = positionTwo.tile;
                    positionTwo.tile = null;
                    if (tileCounter <= 2) {
                      swapDirectionTiles();
                    }

                    tileCounter++;
                  }
                } else {
                  if (key === position.rightReplace) {
                    position.tile = positionTwo.tile;
                    positionTwo.tile = null;
                    if (tileCounter <= 2) {
                      swapDirectionTiles();
                    }

                    tileCounter++;
                  }
                }
              }
            }
          }
        }
      }
    }

    function swapDirectionTiles() {
      const currentTile = model.pyramid.directionalSelectionTiles.current;
      model.pyramid.directionalSelectionTiles.current =
        model.pyramid.directionalSelectionTiles.next;
      currentTile.currentDirection =
        currentTile.currentDirection == "left" ? "right" : "left";

      model.pyramid.directionalSelectionTiles.next = currentTile;
    }

    function handleActionContainerEvents(e, view) {
      if (
        e.target &&
        view.closeOverlayButton &&
        e.target.id === view.closeOverlayButton.id
      ) {
        view.hideActionContainer();
      }
      if (e.target && e.target.id === view.actionContainer.id) {
        view.hideActionContainer();
      }
    }

    function handleDiceContainerEvents(e, view) {
      if (
        e.target &&
        view.closeOverlayButton &&
        e.target.id === view.closeOverlayButton.id
      ) {
        view.hideDice();
      }
      if (e.target && e.target.id === view.diceContainer.id) {
        view.hideDice();
      }
    }

    function handleInfoContainerEvents(e, view) {
      if (
        e.target &&
        view.closeInfoOverLayButton &&
        e.target.id === view.closeInfoOverLayButton.id
      ) {
        view.hideInfoContainer();
      }
      if (e.target && e.target.id === view.infoContainer.id) {
        view.hideInfoContainer();
      }
    }

    function handleTileClick(e, view, ActionViewModel, model) {
      if (e.target && e.target.classList.contains("tile-js")) {
        const tileTitle = e.target.dataset.tileTitle;
        view.renderAction(
          new ActionViewModel(
            model.tiles.find(function(tile) {
              return tile.title === tileTitle;
            })
          )
        );
      }
    }

    function triggerEclipse(
      model,
      setNeutralSpaces,
      view,
      EclipseScoringViewModel,
      NeutralSpacesViewModel
    ) {
      model.eclipseCounter.darkStart--;
      model.eclipseCounter.currentLight = model.eclipseCounter.lightStart;
      model.eclipseCounter.currentDark = model.eclipseCounter.darkStart;
      setNeutralSpaces();
      model.eclipseCounter.currentEclipse++;
      view.renderMoreInfo(
        new EclipseScoringViewModel(
          model.eclipseCounter,
          new NeutralSpacesViewModel(model.neutralOne, model.neutralTwo)
        )
      );
    }

    return {
      init
    };
  };

  const model = new Model();
  const view = new View();
  const controller = new Controller(
    model,
    view,
    tiles,
    directionalTiles,
    pyramid
  );
  controller.init();
})(tiles, directionalTiles, pyramid);
