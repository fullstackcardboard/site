import instructions from "../data/instructions.js";

export default class ActionHex {
  constructor() {
    this.activeSideIndex = 0;
    this.resources = [];
    this.sides = [
      {
        title: "Recruit",
        dice: [],
        instructions: () => {
          return instructions.getRecruitInstructions(
            this.activeSide.dice.length
          );
        }
      },
      {
        title: "Explore",
        dice: [],
        instructions: () => {
          return instructions.getExploreInstructions(
            this.activeSide.dice.length
          );
        }
      },
      {
        title: "Settle",
        dice: [],
        instructions: () => {
          return instructions.getSettleInstructions(
            this.activeSide.dice.length
          );
        }
      },
      {
        title: "Raid",
        dice: [],
        instructions: () => {
          return instructions.getRaidInstructions(this.activeSide.dice.length);
        }
      },
      {
        title: "Trade",
        dice: [],
        instructions: () => {
          return instructions.getTradeInstructions(this.activeSide.dice.length);
        }
      },
      {
        title: "Research",
        dice: [],
        instructions: () => {
          return instructions.getResearchInstructions(
            this.activeSide.dice.length
          );
        }
      }
    ];
  }

  get activeSide() {
    return this.sides[this.activeSideIndex];
  }

  get anyDicePlaced() {
    return this.sides.filter(x => x.dice.length > 0).length > 0;
  }

  setActiveSide(dieResult) {
    console.log(this);
    if (!this.anyDicePlaced) {
      return;
    }
    let spacesMoved = 0;
    let startingIndex =
      this.activeSideIndex == this.sides.length - 1 ? 0 : this.activeSideIndex;
    while (spacesMoved != dieResult) {
      for (let index = startingIndex; index < this.sides.length; index++) {
        const side = this.sides[index];
        if (side.dice.length > 0) {
          side.dice.forEach(() => {
            if (spacesMoved < dieResult) {
              spacesMoved++;
            }
          });
          if (spacesMoved == dieResult) {
            this.activeSideIndex = index;
          }
        }
      }

      startingIndex = 0;
    }
  }

  addDieToSide(die) {
    const sideMatchingDie = this.sides.filter(
      x => x.title.toLowerCase() == die.title
    )[0];

    if (sideMatchingDie) {
      sideMatchingDie.dice.push(die);
    } else {
      if (die.title === "hat") {
        this.addHatDie(die);
      } else {
        this.addResourceDie(die);
      }
    }
  }

  addHatDie(die) {
    // Find the side with the minimum number of dice across all sides.
    const minimumDiceNumber = this.sides.reduce(function(
      lowestNumberOfDice,
      currentSideInfo
    ) {
      return lowestNumberOfDice < currentSideInfo.numberOfDice
        ? lowestNumberOfDice
        : currentSideInfo.numberOfDice;
    },
    {});

    let dieIsNotPlaced = true;
    // Find the first side clockwise from active side that has the minimum number.
    while (dieIsNotPlaced) {
      for (
        let index = this.activeSideIndex + 1;
        index < this.sides.length;
        index++
      ) {
        const currentSide = this.sides[index];
        if (currentSide.dice.length == minimumDiceNumber) {
          currentSide.dice.push(die);
          dieIsNotPlaced = false;
          break;
        }
        if (index == this.sides.length - 1) {
          index = 0;
        }
      }
    }
  }

  addResourceDie(die) {
    // Check if there are any resources on the action hex, if not, add one.
    if (this.resources.length <= 0) {
      this.resources.push(die);
      return;
    }

    const sidesWithNoResources = this.sides.filter(x => x.dice.length === 0);
    // If there are resources on the hex already and sides with no dice, add this die to the first empty space clockwise.
    if (sidesWithNoResources) {
      let dieIsNotPlaced = true;
      while (dieIsNotPlaced) {
        for (let index = 0; index < this.sides.length; index++) {
          const currentSide = this.sides[index];
          if (sidesWithNoResources.filter(x => x.title === currentSide.title)) {
            currentSide.dice.push(die);
            dieIsNotPlaced = false;
            break;
          }
        }
      }
    }
    // Otherwise, just add the resource.
    else {
      this.resources.push(die);
    }
  }
}
