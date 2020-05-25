class Mission {
  constructor(id, startCard, endCard) {
    this.id = id;
    this.startCard = startCard;
    this.endCard = endCard;
    this.missionInstructionsUrl = "/cards/eastern-front/pdfs/" +this.id + ".pdf";
  }
}
const baseUrl = "/cards/eastern-front/images/";
const missions = [
  new Mission("search-and-destroy", 15, 55),
  new Mission("tank-hunt", 13, 55),
  new Mission("hunting-chernov", 1, 43),
  new Mission("partisans", 1, 41),
  new Mission("nkvd-german", 6, 43),
  new Mission("nkvd-soviet", 13, 52),
  new Mission("the-gap-soviet", 3, 43),
  new Mission("the-gap-german", 13, 55),
];

function getCurrentMission() {
  const parameters = new URLSearchParams(window.location.search);
  const missionParameter = parameters.get("mission");
  const mission = missions.filter((x) => x.id === missionParameter)[0];
  return mission;
}

export default getCurrentMission;
