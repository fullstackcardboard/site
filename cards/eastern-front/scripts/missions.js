class Mission {
  constructor(id, startCard, endCard, hasCommandShuffle, hasDefenseShuffle) {
    this.id = id;
    this.startCard = startCard;
    this.endCard = endCard;
    this.missionInstructionsUrl =
      "/cards/eastern-front/pdfs/" + this.id + ".pdf";
    this.hasCommandShuffle = hasCommandShuffle;
    this.hasDefenseShuffle = hasDefenseShuffle;
  }
}
const baseUrl = "/cards/eastern-front/images/";
const missions = [
  new Mission("search-and-destroy", 15, 55, false, false),
  new Mission("tank-hunt", 13, 55, false, false),
  new Mission("hunting-chernov", 1, 43, false, false),
  new Mission("partisans", 1, 41, false, false),
  new Mission("nkvd-german", 6, 43, false, false),
  new Mission("nkvd-soviet", 13, 52, false, false),
  new Mission("the-gap-soviet", 3, 43, false, false),
  new Mission("the-gap-german", 13, 55, false, false),
];

function getCurrentMission() {
  const parameters = new URLSearchParams(window.location.search);
  const missionParameter = parameters.get("mission");
  const mission = missions.filter((x) => x.id === missionParameter)[0];
  return mission;
}

export default getCurrentMission;
