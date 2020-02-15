!function(t){var e={};function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=6)}({2:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));class n{save(t,e){window.localStorage.setItem(t,JSON.stringify(e))}load(t){return JSON.parse(window.localStorage.getItem(t))}clear(t){window.localStorage.removeItem(t)}}},6:function(t,e,a){"use strict";a.r(e);class n{constructor(t,e,a,n,i){this.id=t,this.title=e,this.steps=a,this.type=n,this.image=i}}const i="Pay influence as normal. Or, if Lacerda has no influence, pay with wigs";var s={stateActions:[new n("recruit","Lacerda Recruits State Officials",["Moves 2 officials from his play area to the 2 offices with the fewest of Lacerda’s Officials","In case of a tie, starts from the left office","Lacerda’s officials are never removed"],"State","OFFICIALS.png"),new n("plan","Lacerda Acquires a Plan",["Takes the top Plan with the most Officials depicted, and places it in his play area","In case of a tie, takes the blue architect’s Plan"],"State","BLUEPRINT.png"),new n("ship","Lacerda Builds a Ship",["Takes the top ship from the deck, and places it in his area","This ship is available to be used by you, following the usual rules","Lacerda also moves the treasury up one space; then earns influence equal to\n    the influence on the ship, plus the total influence in your portfolio"],"State","SHIP.png"),new n("produce","Lacerda Produces Goods",["Places all goods produced in his play area and moves the prices down following the usual rules"],"State","PRODUCE.png"),new n("cardinal","Lacerda Meets the Cardinal",["Moves the Cardinal 2 spaces, takes and discards the tile in front of the Cardinal, gaining the wigs on the tile’s back","If the Cardinal lands on or passes over the Treasury symbol, move the treasury up one space","If he passes the Influence icon, the church scoring is triggered","During church scoring Lacerda does not discard any\n    tiles (because he does not have any) but he always\n    earns influence equal to the influence in the top of\n    your portfolio plus the influence on Lacerda’s ships"],"State","CLERGY.png"),new n("favor","Lacerda Gains a Royal Favor",["Lacerda always takes a Royal Favor he does not have, starting from the Builder, going right","Lacerda always uses his Royal Favors to follow your visit. He pays influence according to the usual rules","When following a visit, Lacerda always takes the Noble’s action"],"State","FAVOUR.png")],nobleActions:[new n("builder","Lacerda Builds a Store",[i,"Lacerda always chooses the free space in downtown that gives him the most immediate wigs","In case of a tie, he chooses the leftmost empty space of the topmost row","If two different types of stores can fit in the chosen space, Lacerda always chooses the one facing left","Lacerda ignores the bonus in the space","Lacerda does not pay for the space, and always takes the least expensive cube associated with the space and moves it into his player area","If both the column and the row have the least expensive cube, Lacerda always takes rubble from the bottom of the column","Lacerda scores the store as usual"],"Noble","BUILD.png"),new n("minister","Lacerda Takes a Decree",[i,"Lacerda takes the 2 decrees from the left of the display and moves them to his area","Then he slides all the cards to the left, and fills the display with two more","The Decrees he takes will score 3 Wigs each at the end of the game","If Decree card #69 is revealed, discard it and draw another one"],"Noble","DECREE.png"),new n("king","Lacerda Opens a Public Building",[i,"Lacerda always opens the Public Building in the construction space that gives him the most immediate relative points (the wigs Lacerda earns, minus the wigs you earn)","In case of a tie, he places the building on the empty construction space closest to the west end of row D, going clockwise","In case both available Public Buildings give the same number of relative points, the Helper position determines which tile must be placed","If the Helper is above the King or Treasury deck, he places the green architect’s tile; otherwise, the blue","When Opening a Public Building, Lacerda ignores the reward, but moves both rubble cubes to his play area","Lacerda does not move/hire any Officials from the offices or use any Plans"],"Noble","OPEN.png")]};class o{constructor(t,e,a,n,i,s,o){this.title=e,this.bottomStateActionId=n,this.topStateActionId=a,this.id=t,this.moveNext=i,this.image=s,this.royalFavor=o,this.nobleAction={},this.topStateAction={},this.bottomStateAction={}}}var r=[new o("builder","The Builder","recruit","plan","minister","builder.png","builder_favor.png"),new o("minister","The Marquis","ship","produce","king","marquis.png","marquis_favor.png"),new o("king","The King","cardinal","favor","builder","king.png","king_favor.png")];class l{constructor(t,e,a,n,i){this.id=t,this.title=e,this.moveNext=a,this.stateAction=n,this.image=i}}var c=[new l("builder","Builder Deck","minister","bottomStateAction","builder_deck.png"),new l("minister","Marquis Deck","king","bottomStateAction","marquis_deck.png"),new l("king","King Deck","treasury","topStateAction","king_deck.png"),new l("treasury","Treasury Deck","builder","topStateAction","treasury_deck.png")];function d(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}class u{constructor(){d(this,"getActionHtml",(t,e,a)=>{if(!t)return"";let n=`\n  <div class="${a?"slide-in":""}">\n  <div class="text-center">\n    <img src="./content/images/${t.image}" class="img-fluid" style="max-height: 11.8vh;" />\n    <h5>${t.title}</h5>\n  </div>\n  <div style="font-size: 1.8vh;">\n    <ul class="list-unstyled mb-1 mt-1">\n      <li class="badge-dark col-12 col-lg-6 mx-auto mb-2 rounded">    \n        <p><img src="/lisboa/content/images/${e.currentDeck.image}" class="img-fluid mr-2"  style="height: 3vh;"/>\n        Helper location: ${e.currentDeck.title}</p>\n      </li>\n        `;for(let e=0;e<t.steps.length;e++){n+=`<li class="badge-dark col-12 col-lg-6 mx-auto mb-2 rounded"><p>${t.steps[e]}</p></li>`}return n+="\n    </div>\n    </div>",n}),d(this,"courtier",t=>{if(!t.currentNoble)return"";return`\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" disabled><i class="fas fa-arrow-left mr-2"></i>Back</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="state">State Action<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>\n  <div  class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">\n    <img src="./content/images/${t.currentNoble.image}" class="img-fluid" style="max-height: 60vh;" />\n    <p class="badge-dark col-12 col-lg-6 mx-auto rounded">Lacerda's courtier visits ${t.currentNoble.title}</p>\n  </div>\n  <div>`}),d(this,"state",t=>{if(!t.currentStateAction)return"";return` \n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="courtier"><i class="fas fa-arrow-left mr-2"></i>Courtier Visit</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="noble">Noble Action<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div> \n    <div class="col-12 text-center mt-3 mt-lg-0 slide-in">\n    <div class="text-center">\n      ${this.getActionHtml(t.currentStateAction,t)}\n    </div>\n  </div>`}),d(this,"noble",t=>{if(!t.currentNobleAction)return"";return`  \n\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="state"><i class="fas fa-arrow-left mr-2"></i>State Action</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="discardDeck">Discard<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>    \n  <div class="col-12 text-center mt-3 mt-lg-0 slide-in">\n  <div class="text-center">\n    ${this.getActionHtml(t.currentNobleAction,t)}\n  </div>\n</div>`}),d(this,"discardDeck",t=>{if(!t.currentDeck)return"";return`\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="noble"><i class="fas fa-arrow-left mr-2"></i>Noble Action</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="moveDeck">Move Helper<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>\n    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">\n    <img src="./content/images/${t.currentDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />\n    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda discards from the ${t.currentDeck.title} (if able)</p>\n    </div>`}),d(this,"moveDeck",t=>{if(!t.currentDeck)return"";return`\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="previousDiscardDeck"><i class="fas fa-arrow-left mr-2"></i>Discard</button>\n      <button type="button" class="btn btn-secondary" data-action="skipDeck">Skip Deck</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="follow">Follow<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>\n    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">\n    <img src="./content/images/${t.currentDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />\n    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda's helper moves to the ${t.currentDeck.title} (if able, otherwise skip deck)</p>\n    </div>`}),d(this,"previousDiscardDeck",t=>{if(!t.currentDeck)return"";return`\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="noble"><i class="fas fa-arrow-left mr-2"></i>Noble Action</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="moveDeck">Move Helper<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>\n    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">\n    <img src="./content/images/${t.previousDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />\n    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda discards from the ${t.previousDeck.title} (if able)</p>\n    </div>`}),d(this,"follow",t=>{if(!t.currentNoble)return"";return`\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="moveDeck"><i class="fas fa-arrow-left mr-2"></i>Move Helper</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="playerTurn">Player Turn<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>\n    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">\n    <img src="./content/images/${t.currentNoble.royalFavor}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />\n    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Player is able to follow with a royal favor from ${t.currentNoble.title}</p>\n    </div>`}),d(this,"lacerdaFollow",t=>`\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="playerTurn"><i class="fas fa-arrow-left mr-2"></i>Player Turn</button>\n      <button type="button" class="btn btn-secondary" data-action="nextAction" >Next Turn<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>\n    <div class="col-12 text-center mt-3 mt-lg-0 ${t?"":"slide-in"}" style="font-size: 1.8vh;">\n    <div class="row">\n      <div class="col">\n        <img src="./content/images/builder_favor.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" data-action="step" data-step-to="builderFollow"/>\n      </div>\n      <div class="col">\n        <img src="./content/images/marquis_favor.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" data-action="step" data-step-to="marquisFollow"/>\n      </div>\n      <div class="col">\n        <img src="./content/images/king_favor.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" data-action="step" data-step-to="kingFollow" />\n      </div>\n    </div>    \n    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda is able to follow if player visited a noble, and he has the proper royal favor</p>\n    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Click a royal favor to see action instructions</p>\n    </div>`),d(this,"builderFollow",t=>`${this.lacerdaFollow(!0)}    \n    ${this.getActionHtml(s.nobleActions.filter(t=>"builder"===t.id)[0],t,!0)}`),d(this,"marquisFollow",t=>`${this.lacerdaFollow(!0)}    \n    ${this.getActionHtml(s.nobleActions.filter(t=>"minister"===t.id)[0],t,!0)}`),d(this,"kingFollow",t=>`${this.lacerdaFollow(!0)}    \n    ${this.getActionHtml(s.nobleActions.filter(t=>"king"===t.id)[0],t,!0)}`)}playerTurn(){return'\n    <div id="controlsContainer" class="col text-center mt-2">\n    <div class="btn-group" role="group" aria-label="Basic example">\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="follow"><i class="fas fa-arrow-left mr-2"></i>Follow</button>\n      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="lacerdaFollow">Lacerda Follow<i class="fas fa-arrow-right ml-2"></i></button>\n    </div>\n    </div>\n    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">\n    <img src="./content/images/WIGS.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />\n    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Player Turn</p>\n    </div>'}getSetupHtml(t){let e="";return"builder"===t.id||"minister"===t.id?e+="<li>Place the top blue architect Public Building tile to the west of row D.</li>":e+="<li>Place the top green architect Public Building tile to the east of row D.</li>",e+="<li>Discard the cubes on the space.</li>",e}}const h=new u;function p(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}const m=new class{preload(){const t=["background.png","BLUEPRINT.png","BUILD.png","CLERGY.png","DECREE.png","FAVOUR.png","OFFICIALS.png","OPEN.png","PRODUCE.png","SHIP.png","king_deck.png","marquis_deck.png","builder_deck.png","treasury_deck.png","builder.png","marquis.png","king.png","arrow-right-solid.svg","arrow-left-solid.svg","forward-solid.svg","king_favor.png","builder_favor.png","marquis_favor.png","WIGS.png"];for(let e=0;e<t.length;e++){const a=t[e];(new Image).src="./content/images/"+a}}};const g=new(a(2).a),b="lisboa";const v=new class{set(t){g.save(b,t)}clear(){g.clear(b)}getSavedState(){return g.load(b)}},f=new class{constructor(){this.templates=new u}handle(t,e){return(0,this.templates[t])(e)}};new class{constructor(t,e,a,n,i,s){p(this,"getCurrentNobleAction",()=>this.view.viewModel.currentNoble.nobleAction),p(this,"getCurrentStateAction",()=>{const t=this.view.viewModel,e=t.currentNoble[t.currentDeck.stateAction];return e||console.log(`${t.currentNoble.id} does not have a ${this.currentDeck.stateAction}`),e});m.preload();const o=setInterval(r=>{"complete"===document.readyState&&(clearInterval(o),this.view=t,this.viewModel=this.view.viewModel,this.nobles=e,this.decks=a,this.actions=n,this.stepManager=i,this.gameState=s,function(t,e){for(let a=0;a<t.length;a++){const n=t[a];n.nobleAction=e.nobleActions.filter(t=>t.id===n.id)[0],n.bottomStateAction=e.stateActions.filter(t=>t.id===n.bottomStateActionId)[0],n.topStateAction=e.stateActions.filter(t=>t.id===n.topStateActionId)[0]}}(this.nobles,this.actions),this.viewModel.currentDeck=a[Math.floor(Math.random()*this.decks.length)],this.viewModel.currentNoble=e[Math.floor(Math.random()*this.nobles.length)],this.view.updateView(),this.view.hideLoading(),this.bindEventHandlers(),this.gameState.getSavedState()&&this.view.showLoadGameModal())},1e3)}bindEventHandlers(){document.addEventListener("click",t=>{if(t.target&&t.target.dataset&&t.target.dataset.action||t.target.parentElement&&t.target.parentElement.dataset&&t.target.parentElement.dataset.action){const e=t.target.dataset.action?t.target:t.target.parentElement,a=e.dataset.action;this.handleClick(a,e)}})}handleClick(t,e){if("nextAction"===t)this.nextAction(),this.gameState.set(this.view.viewModel);else if("displayAction"===t)this.displayAction(e),this.gameState.set(this.view.viewModel);else if("nextDeck"===t)this.nextDeck(),this.view.updateView(),this.gameState.set(this.view.viewModel);else if("skipDeck"===t)this.skipDeck(),this.handleStep(),this.gameState.set(this.view.viewModel);else if("step"===t){const t=e.dataset.stepTo;this.view.viewModel.currentStep=t,this.handleStep(),this.gameState.set(this.view.viewModel)}else"load"===t?this.loadGame():"new"===t?(this.gameState.clear(),window.location.reload()):"clear"===t&&this.gameState.clear()}displayAction(t){const e=t.dataset.actionId;let a=this.actions.nobleActions.filter(t=>t.id===e)[0];a||(a=this.actions.stateActions.filter(t=>t.id===e)[0]),this.viewModel.displayAction=a,this.view.updateView(),this.view.showModal()}nextAction(){this.viewModel.movedDecks=!1,this.nextNoble(),this.view.viewModel.currentStep="courtier",this.handleStep()}nextNoble(){this.viewModel.currentNoble=this.nobles.filter(t=>t.id===this.viewModel.currentNoble.moveNext)[0]}nextDeck(){this.viewModel.previousDeck=JSON.parse(JSON.stringify(this.viewModel.currentDeck)),this.viewModel.currentDeck=this.decks.filter(t=>t.id===this.viewModel.currentDeck.moveNext)[0]}skipDeck(){this.viewModel.currentDeck=this.decks.filter(t=>t.id===this.viewModel.currentDeck.moveNext)[0]}loadGame(){this.view.viewModel=this.gameState.getSavedState(),this.viewModel=this.view.viewModel,this.viewModel.currentNobleAction=this.getCurrentNobleAction(),this.viewModel.currentStateAction=this.getCurrentStateAction();const t=this.stepManager.handle(this.viewModel.currentStep,this.viewModel);this.view.updateView(t)}handleStep(){this.viewModel.firstTurn=!1,"moveDeck"!==this.view.viewModel.currentStep||this.viewModel.movedDecks||(this.viewModel.movedDecks=!0,this.nextDeck()),this.viewModel.currentNobleAction=this.getCurrentNobleAction(),this.viewModel.currentStateAction=this.getCurrentStateAction();const t=this.stepManager.handle(this.view.viewModel.currentStep,this.view.viewModel);this.view.updateView(t)}}(new class{constructor(t){this.viewModel=t,this.gameContainer=document.getElementById("gameContainer"),this.actionsContainer=document.getElementById("actionsContainer"),this.setupContainer=document.getElementById("setupContainer"),this.modal=$("#modal"),this.navBarGameControlButton=document.getElementById("navBarGameControl"),this.loading=document.getElementById("loading")}hideLoading(){this.loading.classList.add("d-none")}updateView(t){this.viewModel.firstTurn?document.getElementById("setupSteps").insertAdjacentHTML("beforeend",h.getSetupHtml(this.viewModel.currentDeck)):(this.setupContainer.classList.add("d-none"),this.gameContainer.classList.remove("d-none"),this.navBarGameControlButton.textContent="New Game",this.navBarGameControlButton.dataset.action="new"),this.actionsContainer.innerHTML=t}showLoadGameModal(){$("#loadModal").modal("show")}showModal(){this.modal.modal("show")}}(new class{constructor(){this.firstTurn=!0,this.movedDecks=!1,this.currentNoble=null,this.currentDeck=null,this.currentNobleAction=null,this.currentStateAction=null,this.previousDeck=null,this.modalAction=null,this.currentStep=""}}),r,c,s,f,v)}});