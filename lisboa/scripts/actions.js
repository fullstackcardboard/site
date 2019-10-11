class Action {
  constructor(id, title, steps, type, image) {
    this.id = id;
    this.title = title;
    this.steps = steps;
    this.type = type;
    this.image = image;
  }
}

const payInfluenceStep = "Pay influence as normal. Or, if Lacerda has no influence, pay with wigs"

const officialsStateActionSteps = [
  "Moves 2 officials from his play area to the 2 offices with the fewest of Lacerda’s Officials",
  "In case of a tie, starts from the left office",
  "Lacerda’s officials are never removed"
];
const officialsStateAction = new Action(
  "recruit",
  "Lacerda Recruits State Officials",
  officialsStateActionSteps,
  "State",
  "OFFICIALS.png"
);

const plansStateActionSteps = [
  "Takes the top Plan with the most Officials depicted, and places it in his play area",
  "In case of a tie, takes the blue architect’s Plan"
];
const plansStateAction = new Action(
  "plan",
  "Lacerda Acquires a Plan",
  plansStateActionSteps,
  "State",
  "BLUEPRINT.png"
);

const shipStateActionSteps = [
  "Takes the top ship from the deck, and places it in his area",
  "This ship is available to be used by you, following the usual rules",
  `Lacerda also moves the treasury up one space; then earns influence equal to
    the influence on the ship, plus the total influence in your portfolio`
];
const shipStateAction = new Action(
  "ship",
  "Lacerda Builds a Ship",
  shipStateActionSteps,
  "State",
  "SHIP.png"
);

const produceStateActionSteps = [
  "Places all goods produced in his play area and moves the prices down following the usual rules"
];
const produceStateAction = new Action(
  "produce",
  "Lacerda Produces Goods",
  produceStateActionSteps,
  "State",
  "PRODUCE.png"
);

const cardinalStateActionSteps = [
  "Moves the Cardinal 2 spaces, takes and discards the tile in front of the Cardinal, gaining the wigs on the tile’s back",
  "If the Cardinal lands on or passes over the Treasury symbol, move the treasury up one space",
  "If he passes the Influence icon, the church scoring is triggered",
  `During church scoring Lacerda does not discard any
    tiles (because he does not have any) but he always
    earns influence equal to the influence in the top of
    your portfolio plus the influence on Lacerda’s ships`
];
const cardinalStateAction = new Action(
  "cardinal",
  "Lacerda Meets the Cardinal",
  cardinalStateActionSteps,
  "State",
  "CLERGY.png"
);

const royalFavorStateActionSteps = [
  "Lacerda always takes a Royal Favor he does not have, starting from the Builder, going right",
  "Lacerda always uses his Royal Favors to follow your visit. He pays influence according to the usual rules",
  "When following a visit, Lacerda always takes the Noble’s action"
];
const royalFavorStateAction = new Action(
  "favor",
  "Lacerda Gains a Royal Favor",
  royalFavorStateActionSteps,
  "State",
  "FAVOUR.png"
);

const stateActions = [
  officialsStateAction,
  plansStateAction,
  shipStateAction,
  produceStateAction,
  cardinalStateAction,
  royalFavorStateAction
];

const builderNobleActionSteps = [
  payInfluenceStep,
  "Lacerda always chooses the free space in downtown that gives him the most immediate wigs",
  "In case of a tie, he chooses the leftmost empty space of the topmost row",
  "If two different types of stores can fit in the chosen space, Lacerda always chooses the one facing left",
  "Lacerda ignores the bonus in the space",
  "Lacerda does not pay for the space, and always takes the least expensive cube associated with the space and moves it into his player area",
  "If both the column and the row have the least expensive cube, Lacerda always takes rubble from the bottom of the column",
  "Lacerda scores the store as usual"
];
const builderNobleAction = new Action(
  "builder",
  "Lacerda Builds a Store",
  builderNobleActionSteps,
  "Noble",
  "BUILD.png"
);

const ministerNobleActionSteps = [
  payInfluenceStep,
  "Lacerda takes the 2 decrees from the left of the display and moves them to his area",
  "Then he slides all the cards to the left, and fills the display with two more",
  "The Decrees he takes will score 3 Wigs each at the end of the game",
  "If Decree card #69 is revealed, discard it and draw another one"
];
const ministerNobleAction = new Action(
  "minister",
  "Lacerda Takes a Decree",
  ministerNobleActionSteps,
  "Noble",
  "DECREE.png"
);

const kingNobleActionSteps = [
  payInfluenceStep,
  "Lacerda always opens the Public Building in the construction space that gives him the most immediate relative points (the wigs Lacerda earns, minus the wigs you earn)",
  "In case of a tie, he places the building on the empty construction space closest to the west end of row D, going clockwise",
  "In case both available Public Buildings give the same number of relative points, the Helper position determines which tile must be placed",
  "If the Helper is above the King or Treasury deck, he places the green architect’s tile; otherwise, the blue",
  "When Opening a Public Building, Lacerda ignores the reward, but moves both rubble cubes to his play area",
  "Lacerda does not move/hire any Officials from the offices or use any Plans"
];
const kingNobleAction = new Action(
  "king",
  "Lacerda Opens a Public Building",
  kingNobleActionSteps,
  "Noble",
  "OPEN.png"
);

const nobleActions = [builderNobleAction, ministerNobleAction, kingNobleAction];

export default { stateActions, nobleActions };
