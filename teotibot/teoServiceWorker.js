self.addEventListener("install", function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function() {
  console.log("Installing web app");
  return caches.open("offline").then(function(cache) {
    console.log("caching index and important routes");
    return cache.addAll([
      "./content/images/card_top.png",
      "./content/images/sun.png",
      "./content/images/almost_eclipse.png",
      "./content/images/eclipse.png",
      "./content/images/die_1.png",
      "./content/images/die_2.png",
      "./content/images/die_3.png",
      "./content/images/die_4.png",
      "./content/images/die_5.png",
      "./content/images/die_6.png",
      "./content/images/number_1.png",
      "./content/images/number_2.png",
      "./content/images/number_3.png",
      "./content/images/number_4.png",
      "./content/images/number_5.png",
      "./content/images/number_6.png",
      "./content/images/number_7.png",
      "./content/images/number_8.png",
      "./content/images/STARTING TILES1.jpg",
      "./content/images/STARTING TILES2.jpg",
      "./content/images/STARTING TILES3.jpg",
      "./content/images/STARTING TILES4.jpg",
      "./content/images/STARTING TILES5.jpg",
      "./content/images/STARTING TILES6.jpg",
      "./content/images/STARTING TILES7.jpg",
      "./content/images/STARTING TILES8.jpg",
      "./content/images/STARTING TILES9.jpg",
      "./content/images/STARTING TILES10.jpg",
      "./content/images/STARTING TILES11.jpg",
      "./content/images/STARTING TILES12.jpg",
      "./content/images/STARTING TILES13.jpg",
      "./content/images/STARTING TILES14.jpg",
      "./content/images/STARTING TILES15.jpg",
      "./content/images/STARTING TILES16.jpg",
      "./content/images/STARTING TILES17.jpg",
      "./content/images/STARTING TILES18.jpg",
      "./content/images/TECHNOLOGY TILES1.jpg",
      "./content/images/TECHNOLOGY TILES2.jpg",
      "./content/images/TECHNOLOGY TILES3.jpg",
      "./content/images/TECHNOLOGY TILES4.jpg",
      "./content/images/TECHNOLOGY TILES5.jpg",
      "./content/images/TECHNOLOGY TILES6.jpg",
      "./content/images/TECHNOLOGY TILES7.jpg",
      "./content/images/TECHNOLOGY TILES8.jpg",
      "./content/images/TECHNOLOGY TILES9.jpg",
      "./content/images/BONUS TEMPLE TILES1.jpg",
      "./content/images/BONUS TEMPLE TILES2.jpg",
      "./content/images/BONUS TEMPLE TILES3.jpg",
      "./content/images/BONUS TEMPLE TILES4.jpg",
      "./content/images/BONUS TEMPLE TILES5.jpg",
      "./content/images/BONUS TEMPLE TILES6.jpg",
      "./content/images/BONUS TEMPLE TILES7.jpg",
      "./content/images/stone.png",
      "./content/images/wood.png",
      "./content/images/gold.png",
      "./content/images/background.jpg",
      "./content/images/left.png",
      "./content/images/right.png",
      "./content/images/vp.png",
      "./content/images/worship.png",
      "./content/images/nobles.png",
      "./content/images/mastery.png",
      "./content/images/mask_collection.png",
      "./content/images/logo.jpg",
      "./content/images/decorations.png",
      "./content/images/construction.png",
      "./content/images/alchemy.png",
      "./content/css/teotibot.css",
      "./scripts/teotibot.v2.2.js",
      "./index.html"
    ]);
  });
};

self.addEventListener("fetch", function(event) {
  event.respondWith(
    checkResponse(event.request).catch(function() {
      return returnFromCache(event.request);
    })
  );
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request) {
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response) {
      if (response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function(request) {
  return caches.open("offline").then(function(cache) {
    return fetch(request).then(function(response) {
      console.log(response.url + " was cached");
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request) {
  return caches.open("offline").then(function(cache) {
    return cache.match(request).then(function(matching) {
      if (!matching || matching.status == 404) {
        return cache.match("offline.html");
      } else {
        return matching;
      }
    });
  });
};