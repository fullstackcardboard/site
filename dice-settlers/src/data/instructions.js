const instructions = {
  getRecruitInstructions: numberOfDice => {
    let body = "";
    const steps = [];
    const priorities = [
      `A colour the bot has access to but has the
          least of (in its queue or around the Action
          hex)`,
      `If multiple options: The rarest colour
          available in the supply`,
      `If tied: Your choice`
    ];

    if (numberOfDice > 0 && numberOfDice < 3) {
      body = "Recruit 1 die.";
    } else if (numberOfDice == 3) {
      body = "Recruit 2 dice.";
    } else if (numberOfDice > 3) {
      body = `Recruit 2 dice & score ${numberOfDice - 3} VP.`;
    }

    body += ` Acquired dice are added to the back of the bot’s dice queue.`;

    return {
      body,
      priorities,
      steps
    };
  },
  getExploreInstructions: numberOfDice => {
    const scoreText = numberOfDice > 1 ? `Score ${numberOfDice - 1} VP.` : "";
    const body = `${scoreText} Take the top tile of the Map tile stack and
    place it with the following priority:`;
    const steps = [];
    const priorities = [
      `Where you do not have a presence on an
        adjacent tile (if possible)`,
      `As far away from
        tiles with your own tents as possible`,
      `If there are multiple placement options available,
        you choose where the tile should go.`
    ];

    return {
      body,
      priorities,
      steps
    };
  },
  getSettleInstructions: numberOfDice => {
    const tentText = numberOfDice > 1 ? `${numberOfDice} tents` : "1 tent";
    const body = `While it has tents to place,
      the bot places (up to) ${tentText} onto the map
      from its supply, one at a time, using the following
      priorities (but obeying usual rules for settling:
      must be on a tile it already has presence on, or
      one neighbouring such a tile):`;
    const steps = [
      `If the bot ever gets 3 more tents than you on
        any Map tile without an existing house on, it
        immediately converts 3 of its tents on that tile
        into a house (as a free action)`,
      `If it has 0 tents left in its personal supply, but
        has some remaining strength:
        ˚ 1 strength left: it takes 3 tents from the
        general supply;
        ˚ 2+ strength left: it takes 5 tents from the
        general supply (with all its remaining
        strength)`,
      `Either way, it then places 1 of the newly acquired
        tents on a tile (using the above priorities, but
        requiring no strength to do this)`,
      `In the unlikely event the bot has less tents left in the
        general supply than it needs to take, the bot scores
        1 VP for each remaining strength`
    ];
    const priorities = [
      `On a tile of a colour it currently has no
          existing presence on`,
      `On a tile it has no presence on already (except
            if the tile gives 0VP for 2nd place and you
            have built a house on it already)`,
      `On a tile where it is the least number of tents
        away from building a house`,
      `On a tile where it would stop you from being
        the sole controlling player`,
      `On a tile where it would stop you from being
        shared controlling player`,
      `On a tile that provides the most VPs first 1st place`,
      `If still tied: your choice`
    ];

    return {
      body,
      priorities,
      steps
    };
  },
  getRaidInstructions: () => {
    const body = "";
    const priorities = [];
    const steps = [
      `If you have researched a technology that
          ignores Raid icons, reduce the bot’s strength
          by that amount. If the bot’s strength is now 0,
          it receives 1VP instead of raiding`,
      `If it has at least 1 strength remaining, select
          the Map tile where the most strength can be
          spent (tents can be swapped) as one action`,
      `If multiple tiles are tied, resolve ties using the
          following priorities:
           1. On a tile where it would stop you from being
          the sole controlling player;
           2. On a tile where it would stop you from being
          shared controlling player;
           3. On a tile where it is the least tents away
          from building a house;
           4. On a tile that provides the most VPs for 1st
          place;
          5. If still tied: your choice`,
      `For each strength:
          1. Remove one of your tents;
          2. Add one of the bot’s tents
         to the tile, from its
         personal supply, if
         it has any left;
         3. If it runs out of tents to place, or has none to
         start with, it stops raiding and scores 1 VP
         if it has any remaining strength`,
      `If the bot ever gets 3 more tents than you on
         any Map tile without an existing house on, it
         immediately converts 3 of its tents on that tile
         into a house (as a free action). It will continue
         raiding any remaining tents you have on the
         tile after doing this, if it still has strength and
         tents left to use.`
    ];

    return {
      body,
      priorities,
      steps
    };
  },
  getTradeInstructions: numberOfDice => {
    const discardNumber = numberOfDice * 3;
    const body = `For each strength, the bot discards up to ${discardNumber} stored
      resources, gaining 2 VP for each resource. For
      each point of strength remaining when it has no
      stored resources left, the bot scores 1 VP`;
    const steps = [];
    const priorities = [];

    return {
      body,
      steps,
      priorities
    };
  },
  getResearchInstructions: () => {
    const body = "";
    const steps = [
      `Select the Technology card with the highest
        VP the bot can currently research. If tied,
        pick the topmost/leftmost technology on
        display it hasn’t yet researched`,
      `Terrain requirements apply to the bot as
        usual, and it needs to be able to pay resources
        from its stored resources`,
      `For each excess point of strength not required
        to research the selected card, the bot scores
        1 VP`,
      `Note: The bot never benefits from abilities of
        Technology cards`
    ];
    const priorities = "";

    return {
      body,
      steps,
      priorities
    };
  }
};

export default instructions;
