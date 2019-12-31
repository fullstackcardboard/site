import instructions from "../data/instructions.js";

const hasDice = () => {
  this.dice.length > 0;
};

export default class ActionHex {
  constructor() {
    this.activeSideIndex = 0
    this.sides = [
      {
        title: "Recruit",
        dice: [],
        instructions: () => {
          return instructions.getRecruitInstructions(this.activeSide.dice.length);
        },
        hasDice
      },
      {
        title: "Explore",
        dice: [],
        instructions: () => {
          return instructions.getExploreInstructions(this.activeSide.dice.length);
        },
        hasDice
      },
      {
        title: "Settle",
        dice: [],
        instructions: () => {
          return instructions.getSettleInstructions(this.activeSide.dice.length);
        },
        hasDice
      },
      {
        title: "Raid",
        dice: [],
        instructions: () => {
          return instructions.getRaidInstructions(this.activeSide.dice.length);
        },
        hasDice
      },
      {
        title: "Trade",
        dice: [],
        instructions: () => {
          return instructions.getTradeInstructions(this.activeSide.dice.length);
        },
        hasDice
      },
      {
        title: "Research",
        dice: [],
        instructions: () => {
          return instructions.getResearchInstructions(this.activeSide.dice.length);
        },
        hasDice
      }
    ];
  }

  get activeSide(){
      return this.sides[this.activeSideIndex];
  }

  setActiveSide(numberOfSidesToMove) {
    let spacesMoved = 0;
    let startingIndex =
      this.activeSideIndex == this.sides.length - 1 ? 0 : this.activeSideIndex;
    while (spacesMoved != numberOfSidesToMove) {
      for (let index = startingIndex; index < this.sides.length; index++) {
        const side = this.sides[index];
        if (side.hasDice()) {
          spacesMoved++;
          if (spacesMoved == numberOfSidesToMove) {
            this.activeSideIndex = index;
          }
        }
      }

      startingIndex = 0;
    }
  }
}