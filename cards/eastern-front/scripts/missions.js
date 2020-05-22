class Mission {
  constructor(id, startCard, endCard) {
    this.id = id;
    this.startCard = startCard;
    this.endCard = endCard;
    this.missionInstructionsUrl = "/cards/eastern-front/pdfs/" +this.id + ".pdf";
  }
}
const baseUrl = "/cards/eastern-front/images/";
const missions = [new Mission("search-and-destroy", 15, 55)];

function getCurrentMission() {
  const parameters = new URLSearchParams(window.location.search);
  const missionParameter = parameters.get("mission");
  const mission = missions.filter((x) => x.id === missionParameter)[0];
  return mission;
}

export default getCurrentMission;
