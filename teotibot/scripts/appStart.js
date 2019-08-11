(() => {
  const completeState = "complete";
  preloadImages();
  const interval = setInterval(function() {
    if (document.readyState === completeState) {
      clearInterval(interval);
      document.getElementById("loading").classList.add("d-none");
      document.getElementById("loading").classList.remove("d-flex");
      document.getElementById("app").classList.remove("d-none");
    }
  }, 1000);

  function preloadImages() {
    preloadDiceImages();
    preloadTileImages();
    preloadStartingTileImages();
    preloadTechnologyTiles();
  }

  function preloadTechnologyTiles() {
    const technologyTilesBaseUrl = "./content/images/TECHNOLOGY TILES";
    for (let index = 0; index < 9; index++) {
      const techTileImage = new Image();
      techTileImage.src = technologyTilesBaseUrl + (index + 1) + ".jpg";
    }
  }

  function preloadStartingTileImages() {
    const startingTilesBaseUrl = "./content/images/STARTING TILES";
    for (let index = 0; index < 18; index++) {
      const startingTileImage = new Image();
      startingTileImage.src = startingTilesBaseUrl + (index + 1) + ".jpg";
    }
  }

  function preloadTileImages() {
    const tileBaseUrl = "./content/images/";
    const construction = new Image();
    construction.src = tileBaseUrl + "construction.png";
    const worship = new Image();
    worship.src = tileBaseUrl + "worship.png";
    const alchemy = new Image();
    alchemy.src = tileBaseUrl + "alchemy.png";
    const maskCollection = new Image();
    maskCollection.scroll = tileBaseUrl + "mask_collection.png";
    const mastery = new Image();
    mastery.src = tileBaseUrl + "mastery.png";
    const nobles = new Image();
    nobles.src = tileBaseUrl + "nobles.png";
    const decorations = new Image();
    decorations.src = tileBaseUrl + "decorations.png";
    const leftDirection = new Image();
    leftDirection.src = tileBaseUrl + "left.png";
    const rightDirection = new Image();
    rightDirection.src = tileBaseUrl + "right.png";
  }

  function preloadDiceImages() {
    const dieUrlBase = "./content/images/die_";
    const dieOne = new Image();
    dieOne.src = dieUrlBase + "1.png";
    const dieTwo = new Image();
    dieTwo.src = dieUrlBase + "2.png";
    const dieThree = new Image();
    dieThree.src = dieUrlBase + "3.png";
    const dieFour = new Image();
    dieFour.src = dieUrlBase + "4.png";
    const dieFive = new Image();
    dieFive.src = dieUrlBase + "5.png";
    const dieSix = new Image();
    dieSix.src = dieUrlBase + "6.png";
  }
})();
