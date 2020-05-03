!function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=7)}([function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));class n{constructor(e,t,a,n,i){this.id=e,this.frontImage=t,this.rearImage=a,this.instructions=n,this.group=i}}},function(e,t,a){"use strict";t.a={shuffle:function(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},findBootstrapEnvironment:function(){let e=["xs","sm","md","lg","xl"],t=document.createElement("div");document.body.appendChild(t);let a=e.shift();for(let n of e.reverse())if(t.classList.add(`d-${n}-none`),"none"===window.getComputedStyle(t).display){a=n;break}return document.body.removeChild(t),a}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));class n{save(e,t){window.localStorage.setItem(e,JSON.stringify(t))}load(e){return JSON.parse(window.localStorage.getItem(e))}clear(e){window.localStorage.removeItem(e)}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));class n{constructor(){this.cards=[],this.drawnCards=[],this.currentCard=null,this.nextCard=null,this.deckEmpty=!1,this.reshuffling=!1,this.hideDrawnCards=!1,this.showDiscardPile=!1,this.topDiscard=null,this.setTopDiscard=!1}}},function(e,t,a){"use strict";var n=a(1);a.d(t,"a",(function(){return s}));const i=new class{preloadCardImages(e){for(let t=0;t<e.length;t++){const a=e[t];(new Image).src=a.frontImage,(new Image).src=a.rearImage}}};class s{constructor(e,t,a,n,s,r,d){this.cardViewModel=s,this.gameState=a,this.deckBuilderCallback=n,this.reshuffleCallback=r,this.updateCallback=d;i.preloadCardImages(e);const o=setInterval(a=>{"complete"===document.readyState&&(clearInterval(o),this.cardViewModel.cards=e,this.buildDeck(),this.cardView=t,this.bindEventHandlers(),this.cardView.toggleLoadingVisibility(),this.cardView.toggleAppVisibility(),this.updateCards(),this.updateView(),this.gameState.getSavedState()&&this.cardView.showLoadGameModal())},1e3)}drawNextCard(){this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length-1]),this.updateCards(),this.cardViewModel.deckEmpty&&(this.cardViewModel.nextCard=null),this.cardViewModel.hideDrawnCards=!1,this.cardViewModel.setTopDiscard=!0}resetCards(){n.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.cards=this.cardViewModel.cards.concat(n.a.deepCopy(this.cardViewModel.drawnCards)),this.cardViewModel.drawnCards=[]}updateCards(){this.cardViewModel.currentCard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1],this.cardViewModel.nextCard=this.cardViewModel.cards[this.cardViewModel.cards.length-1],this.cardViewModel.currentCard&&(this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=this.cardViewModel.currentCard.id)),this.cardViewModel.drawnCards.length>1&&this.cardViewModel.setTopDiscard&&(this.cardViewModel.topDiscard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-2]),this.cardViewModel.deckEmpty=0===this.cardViewModel.cards.length}updateView(){this.cardView.updateCardDisplay(this.cardViewModel)}buildDeck(){this.deckBuilderCallback()}bindEventHandlers(){document.addEventListener("click",e=>{if(e.target&&e.target.dataset&&e.target.dataset.action){const t=e.target.dataset.action;"draw"===t?(this.drawNextCard(),this.updateView(this.cardViewModel),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel)):"railEra"===t?(this.resetCards(),this.buildDeck(),this.updateCards(),this.cardViewModel.era="rail",this.updateView(),this.gameState.set(this.cardViewModel)):"load"===t?(this.cardViewModel=this.gameState.getSavedState(),this.updateView(),this.updateCallback&&this.updateCallback(this.cardViewModel)):"newGame"===t?(this.gameState.clear(),window.location.reload()):"reshuffle"===t&&(this.reshuffleCallback?this.reshuffleCallback():this.resetCards(),this.updateCards(),this.updateView(),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel))}})}}},function(e,t,a){"use strict";var n=a(1);a.d(t,"a",(function(){return s}));const i=new class{constructor(){this.currentEnvironment=n.a.findBootstrapEnvironment()}createCurrentCardTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}createNextCardTemplate(e){if(!e)return'<div id="nextCardImageContainer"></div>';return`<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.rearImage}"/></div>`}createDiscardPileTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}get slideClass(){return"md"===this.currentEnvironment||"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?"slide":"slide-mobile"}get imageHeight(){return"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?50:30}};class s{get currentCardContainer(){return document.getElementById("currentCard")}get nextCardContainer(){return document.getElementById("nextCard")}get discardPileContainer(){return document.getElementById("discardPile")}updateCardDisplay(e){if(this.toggleDrawButton(e),this.hideRailEraButton(e),e.deckEmpty&&e.era&&"rail"===e.era){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}else if(e.deckEmpty){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}e.hideDrawnCards||(this.currentCardContainer.innerHTML=i.createCurrentCardTemplate(e.currentCard)),e.showDiscardPile&&e.topDiscard&&(this.discardPileContainer.innerHTML=i.createDiscardPileTemplate(e.topDiscard)),this.nextCardContainer.innerHTML=i.createNextCardTemplate(e.nextCard)}hideRailEraButton(e){"rail"===e.era&&document.querySelectorAll("[data-canal]").forEach(e=>e.classList.add("d-none"))}toggleDrawButton(e){const t=document.querySelector("[data-action=draw]"),a=document.querySelector("[data-action=reshuffle]");e.deckEmpty?(t.classList.add("disabled"),t.disabled=!0,a&&a.classList.remove("d-none")):(t.classList.remove("disabled"),a&&a.classList.add("d-none"),t.disabled=!1)}showLoadGameModal(){$("#loadModal").modal("show")}toggleLoadingVisibility(){const e=document.getElementById("loading");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}toggleAppVisibility(){const e=document.getElementById("app");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}}},,function(e,t,a){"use strict";a.r(t);var n=a(4),i=a(5),s=a(0);const r="/cards/excavation-earth/content/images/",d=r+"back.png",o=[];for(let e=0;e<6;e++)o.push(new s.a(`${e}command`,`${r}command_${e+1}.png`,d,"","command"));for(let e=0;e<8;e++)o.push(new s.a(`${e}excavate`,`${r}excavate_${e+1}.png`,d,"","excavate"));for(let e=0;e<2;e++)o.push(new s.a(`${e}market`,`${r}market_${e+1}.png`,d,"","market"));for(let e=0;e<4;e++)o.push(new s.a(`${e}sell`,`${r}sell_${e+1}.png`,d,"","sell"));for(let e=0;e<2;e++)o.push(new s.a(`${e}snipe`,`${r}snipe_${e+1}.png`,d,"","snipe"));for(let e=0;e<2;e++)o.push(new s.a(`${e}survey`,`${r}survey_${e+1}.png`,d,"","survey"));var l={cards:o};const c=new(a(2).a),h="dinosaurisland";var u=a(3),f=a(1);function m(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function w(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}new class{constructor(){w(this,"bindEvents",()=>{document.addEventListener("click",e=>{e.target&&e.target.dataset&&e.target.dataset.instructions&&this[e.target.dataset.instructions].call()})}),w(this,"command",()=>{this.setModalBody(` <div class="container">\n      <h4>Command</h4>\n      If Zu has 0 cubes available to place, it takes a Failed Action instead.\n      Each of the Command cards specifies a specific Market and matching Command\n      Centre Zu is looking to influence. Zu will place:\n      <ul>\n        <li>1 Trader in the Market specified</li>\n        <li>\n          If Zu has no Traders there already; 1 Envoy in the matching Command\n          Centre\n        </li>\n      </ul>\n      <em\n        >Note: If Zu only has 1 cube available to place, it skips placing a\n        Trader and just places an Envoy.</em\n      >\n    </div>\n      ${this.failedAction()}`),this.showModal()}),w(this,"excavate",()=>{this.setModalBody(` \n    <div class="container">\n    <h4>Excavate</h4>\n    The Excavate cards specify one of two options:\n      <ul>\n        <li>\n          Excavate 1-2 Artefacts from one of the two colours stated (whichever\n          is most popular)\n        </li>\n        <li>\n          OR, Excavate 1-2 Artefacts from the most popular Artefact colour.\n          <ul>\n            <li>\n              If the most popular colour has no legal Artefacts available to\n              Excavate from any Dig Sites, go to the next most popular colour,\n              etc., until a colour is chosen.\n            </li>\n          </ul>\n        </li>\n      </ul>\n      If Zu needs to choose between multiple colours when determining which is\n      most popular, it chooses from the following priority list:\n      <ul>\n        <li>\n          A colour where it can pick up the most Artefacts (i.e. taking 2 is\n          preferable to taking 1, if Zu has space in its Cargo Hold, but noting\n          the limitations below on which Artefacts it can pick up);\n        </li>\n        <li>\n          A colour for which it does not currently have any Artefacts;\n        </li>\n        <li>\n          A colour for which it does not currently have any Artefacts;\n        </li>\n        <li>A colour for which you have the fewest Artefacts</li>\n        <li>Then, Random choice between the tied colours.</li>\n      </ul>\n      Zu will excavate 2 Artefacts from dig sites if possible; else if will\n      settle for just excavating 1 Artefact. <br />To determine whether Zu can\n      excavate a specific Artefact, check the following list of conditions (for\n      each Artefact Zu wants to excavate):\n      <ul>\n        <li>\n          If Zu’s Cargo Hold and Hidden Hold are both full when trying to\n          excavate the first Artefact, it will Offload to Black Market (see\n          Smuggle) instead;\n        </li>\n        <li>\n          If Zu has no space left in its Cargo Hold when trying to excavate the\n          first Artefact, but does have space in its Hidden Hold, it will\n          Acquire from Black Market (see\n          <a data-instructions="smuggle">Smuggle</a>) instead;\n        </li>\n        <li>\n          Zu tries to excavate Artefacts of the chosen colour, ignoring\n          Artefacts that it already has samples for in its Gallery or already\n          has copies of in its Cargo or Hidden Holds. It chooses the specific\n          Artefacts according to this priority:\n          <ul>\n            <li>\n              Artefacts of the chosen colour that you do not have samples of;\n            </li>\n            <li>\n              Artefacts with fewest copies of themselves on the map;\n            </li>\n            <li>\n              Rarest Artefacts (i.e. highest cost);\n            </li>\n            <li>\n              Then, random choice between the tied Artefacts.\n            </li>\n          </ul>\n        </li>\n      </ul>\n      If Zu is unable to excavate any Artefacts of the desired colours (i.e.\n      none left of that colour on the map, or it ignored all available Artefacts\n      as it already has samples/copies of all of them), it will Acquire from\n      Black Market (see\n      <a data-instructions="smuggle">Smuggle</a>) instead.<br/> If Zu excavated\n      anything, place the chosen Artefacts in Zu’s Cargo Hold. Then, if Zu has\n      cubes available, place 1 cube per Artefact it Excavated into its Gallery\n      to mark that it sampled that Artefact. If Zu took 2 Artefacts but has only\n      1 cube left to place, randomly decide which Artefact it places the sample\n      cube for.\n    </div>\n      ${this.failedAction()}`),this.showModal()}),w(this,"smuggle",()=>{this.setModalBody(`<div class="container">\n        <h4>Smuggle</h4>\n        Zu will only take a Smuggle action as a result of being unable to\n        excavate an Artefact during an Excavate action. Which Smuggle action Zu\n        takes is determined by what Zu failed to do during the Excavate action -\n        see the <a data-instructions="excavate">Excavate</a> action for details.\n        <h5>Acquire from Black Market</h5>\n        When wanting to Acquire from the Black Market, Zu will always acquire\n        just 1 Artefact in a turn. The colour of Artefact Zu wants will have\n        been determined in the Excavate action. Zu pays for purchases from the\n        Black Market in the same way you do (Artefact cost + 1).\n        <br />Restrictions on which Artefact Zu will purchase:\n        <ul>\n          <li>\n            It must be one that Zu does not already have a sample of in its\n            Gallery, or a copy of in its Cargo/Hidden Hold;\n          </li>\n          <li>\n            Zu must have enough Credits to purchase the Artefact in question; if\n            it cannot afford the desired Artefact, it will try to Offload to\n            Black Market instead (see below).\n          </li>\n        </ul>\n        If there is not a valid Artefact of the desired colour available to\n        acquire in the Black Market:\n        <ul>\n          <li>\n            Zu picks the next available colour to the right within the Black\n            Market (continuing left to right, and wrapping around, until an\n            available option is found);\n          </li>\n          <li>\n            If there are no valid Artefacts of any colour in the Black Market,\n            Zu will Offload to Black Market instead (see below).\n          </li>\n        </ul>\n        If Zu was able to acquire an Artefact from the Black Market, it places\n        the Artefact in its Hidden Hold; if the Hidden Hold is full, it instead\n        places the Artefact in its Cargo Hold. Then, if Zu has cubes available,\n        place a cube for the Artefact it bought in its Gallery to mark that it\n        sampled that Artefact.\n\n        <h5>Offload to Black Market</h5>\n        If Zu has no Artefacts to offload when trying to Offload to Black\n        Market, it takes a Failed Action.\n        <br />When Zu offloads to the Black Market, it will offload its 2 most\n        expensive Artefacts, of 2 different colours (as per the core rules). If\n        Zu only has 1 Artefact to offload, it offloads just that one.\n        <br />Break ties for most expensive Artefact in the following priority\n        order: •\n        <ul>\n          <li>Artefacts from the Cargo Hold before the Hidden Hold;</li>\n          <li>Artefacts from the least popular colours;</li>\n          <li>Then, choose randomly between the tied Artefacts.</li>\n        </ul>\n      </div>\n      ${this.failedAction()}`),this.showModal()}),w(this,"market",()=>{this.setModalBody(` <div class="container">\n      <h4>Market</h4>\n      If Zu has 0 cubes available to place, or all Markets have at least 1 Zu\n      Trader in already, it takes a Failed Action instead.<br />\n      Zu places 1-2 Traders (2 if possible, 1 otherwise), each in a different\n      Market where Zu has no Traders yet. Place Zu’s cube(s) in the Trader spot\n      in the chosen Market.<br />\n      If tied between Markets, Zu chooses according to this priority list:\n      <ul>\n        <li>\n          The Market with the most Buyers, including white, matching Zu’s single\n          most popular Artefact;\n        </li>\n        <li>\n          The Market that would receive the largest influence swing (assume they\n          will get promoted to Envoys at some point);\n        </li>\n        <li>\n          Random choice between the tied Markets.\n        </li>\n      </ul>\n      Zu then adds 1 white Buyer (if available) and 1 coloured Buyer (if\n      available) to each of the Markets where the Traders were added. The\n      coloured Buyer should be the colour that matches Zu’s most popular\n      artefact, then the colour Zu has more of, then random choice.\n    </div>\n      ${this.failedAction()}`),this.showModal()}),w(this,"sell",()=>{this.setModalBody(`\n    <div class="container">\n      <h4>Sell</h4>\n      If Zu has no Artefacts to Sell or if there are no matching coloured/white\n      Buyers for any of its Artefacts at the Markets where it has Traders (this\n      includes when it has no Traders in any Markets), it takes a Failed Action\n      instead.<br />\n      Zu always wants to sell to the most lucrative Market(s). Zu will always\n      sell to as many Markets as it is legally able to (i.e. up to three, with a\n      Zu Trader in each Market in question).<br />\n      Zu sells its chosen Artefact(s) as per the core Sell action rules. If it\n      has a choice of Artefacts in the chosen colour, it favours selling the\n      cheapest ones. If tied for cheapest, choose randomly between the tied\n      Artefacts.\n    </div>\n      ${this.failedAction()}`),this.showModal()}),w(this,"snipe",()=>{this.setModalBody(`<div class="container">\n      <h4>Snipe</h4>\n        If Zu has no Artefacts to Sell, or no Traders and no cubes to place as\n        Traders, or there are no Buyers in Markets matching any of its\n        Artefacts, it takes a Failed Action instead.<br />\n        Zu wants to sell 1 Artefact, possibly adding a Trader to a Market first\n        in order to achieve this. To pick the Market to sell at, it picks\n        whichever Market has most Buyers matching whichever Artefact colour Zu\n        has at least one of, but least of (if tied, it picks the highest\n        popularity Artefact; and if still tied, randomly chooses). If tied\n        between Markets, it picks the most lucrative Market.<br />\n        Then:\n        <ul>\n          <li>\n            If it has no Trader present in the chosen Market, it places 1 Trader\n            there;\n          </li>\n          <li>\n            It takes a Sell action, selling a single Artefact matching the Buyer\n            colour chosen (cheapest Artefact if tied) at the chosen Market,\n            using usual Sell action rules.\n          </li>\n        </ul>\n      </div>\n      ${this.failedAction()}`),this.showModal()}),w(this,"survey",()=>{this.setModalBody(`<div class="container">\n      <h4>Survey</h4>\n        Zu discards the left-most card with no cube on it from the Surveyor\n        Forecast, then draws a card from the Action deck and places it face-up\n        in the space in the Forecast line-up.<br />\n        It then places one of its cubes on that card (if it has any, else it\n        doesn’t place a cube). It then draws 2 Artefacts from the supply,\n        matching the colour of the card it placed, and then:\n        <ul>\n          <li>\n            Buys one of the Artefacts for twice its price, if it doesn’t have\n            one or both, and it has room in its Cargo Hold, and it can afford\n            it. If it doesn’t have either Artefact drawn, it picks the one it\n            can afford, then the rarest of the two, then random choice;\n          </li>\n          <li>\n            Places the remaining Artefact onto the map; if it didn’t buy an\n            Artefact, it randomly picks which one to place on the map, and\n            discards the other.\n          </li>\n        </ul>\n      </div>\n      ${this.failedAction()}`),this.showModal()}),w(this,"failedAction",()=>'<div class="container">\n        <h4>Failed Action</h4>\n        If Zu is ever unable to do anything the drawn card says to do, it gains\n        10 Credits instead.\n      </div>'),w(this,"showModal",()=>{$("#instructionsModal").modal("show")}),w(this,"setModalBody",e=>{document.getElementById("instructionsModalBody").innerHTML=e}),this.bindEvents()}};const p=new u.a,g=new class{set(e){c.save(h,e)}clear(){c.clear(h)}getSavedState(){return c.load(h)}showLoadGameModal(){$("#loadModal").modal("show")}},v=new class{constructor(e){m(this,"removeSelectedCards",(e,t)=>{for(let a=0;a<e.length;a++){let n=e[a];t=t.filter(e=>e.id!=n.id)}return t}),m(this,"reshuffle",()=>{if(this.cardViewModel.round++,3==this.round){const e=document.querySelector("[data-action=reshuffle]");e.parentNode.removeChild(e)}this.utilities.shuffle(this.cardViewModel.drawnCards);const e=2==this.round?this.roundTwoDeck:this.roundThreeDeck;this.cardViewModel.cards=e.concat(this.cardViewModel.drawnCards.slice(0,3)),this.utilities.shuffle(this.cardViewModel.cards),this.cardViewModel.drawnCards=[]}),m(this,"updateStats",e=>{const t=document.getElementById("currentCardImageContainer"),a=document.getElementById("instructionsTrigger");a&&a.parentNode.removeChild(a),t&&t.insertAdjacentHTML("beforeend",`<button\n          class="btn btn-info btn-block mx-auto mt-1"\n          style="width: 10vw"\n          data-instructions="${e.currentCard.group}"\n        >\n          <i\n            class="fas fa-question"\n            data-instructions="${e.currentCard.group}"\n          ></i>\n        </button>`);const n=document.getElementById("stats");switch(e.round){case 1:n.innerHTML=`<h2>Round One</h2>\n          <div class="row text-light">\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Deck Construction</h3>\n              <table class="table text-light">\n                <th>\n                  <tr>\n                    <td>\n                      Card Type\n                    </td>\n                    <td>\n                      Number\n                    </td>\n                  </tr>\n                </th>\n                <tbody>\n                  <tr>\n                    <td>\n                      Command\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Excavate\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Market\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Sell\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Snipe\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Survey\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Cards Drawn</h3>\n              ${this.getDrawnCardsHtml(e)}\n            </div>\n          </div>`;break;case 2:n.innerHTML=`<h2>Round Two</h2>\n          <div class="row text-light">\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Deck Construction</h3>\n              <table class="table text-light">\n                <th>\n                  <tr>\n                    <td>\n                      Card Type\n                    </td>\n                    <td>\n                      Number\n                    </td>\n                  </tr>\n                </th>\n                <tbody>\n                  <tr>\n                    <td>\n                      Command\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Excavate\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Sell\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Survey\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Carried Over From Last Round\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Cards Drawn</h3>\n              ${this.getDrawnCardsHtml(e)}\n            </div>\n          </div>`;break;case 3:n.innerHTML=`<h2>Round Three</h2>\n          <div class="row text-light">\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Deck Construction</h3>\n              <table class="table text-light">\n                <th>\n                  <tr>\n                    <td>\n                      Card Type\n                    </td>\n                    <td>\n                      Number\n                    </td>\n                  </tr>\n                </th>\n                <tbody>\n                  <tr>\n                    <td>\n                      Command\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Excavate\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Sell\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Carried Over From Last Round\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Cards Drawn</h3>\n              ${this.getDrawnCardsHtml(e)}\n            </div>\n          </div>`}}),m(this,"getDrawnCardsHtml",e=>{let t='\n      <table class="table table-responsive">\n        <th>\n          <tr>\n            <td class="text-light">Turn</td>\n            <td class="text-light">Card</td>\n          </tr>\n        </th>\n        <tbody>\n    ';for(let a=0;a<e.drawnCards.length;a++){const n=e.drawnCards[a];t+=`<tr>\n        <td class="text-light">${a+1}</td>\n        <td class="text-light">${n.group.charAt(0).toUpperCase()+n.group.slice(1)}</td>\n      </tr>`}return t+="</tbody></table>",t}),m(this,"buildDecks",()=>{this.commandCards=this.cardViewModel.cards.filter(e=>"command"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.commandCards,this.cardViewModel.cards),this.utilities.shuffle(this.commandCards),this.excavateCards=this.cardViewModel.cards.filter(e=>"excavate"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.excavateCards,this.cardViewModel.cards),this.utilities.shuffle(this.excavateCards),this.marketCards=this.cardViewModel.cards.filter(e=>"market"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.marketCards,this.cardViewModel.cards),this.utilities.shuffle(this.marketCards),this.snipeCards=this.cardViewModel.cards.filter(e=>"snipe"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.snipeCards,this.cardViewModel.cards),this.utilities.shuffle(this.snipeCards),this.surveyCards=this.cardViewModel.cards.filter(e=>"survey"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.surveyCards,this.cardViewModel.cards),this.utilities.shuffle(this.surveyCards),this.sellCards=this.cardViewModel.cards.filter(e=>"sell"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.sellCards,this.cardViewModel.cards),this.utilities.shuffle(this.sellCards),this.buildRoundOneDeck(),this.buildRoundTwoDeck(),this.buildRoundThreeDeck(),this.cardViewModel.cards=this.roundOneDeck,this.utilities.shuffle(this.cardViewModel.cards),this.updateStats(this.cardViewModel)}),m(this,"buildRoundThreeDeck",()=>{let e=this.commandCards.slice(0,3);this.commandCards=this.removeSelectedCards(e,this.commandCards);let t=this.excavateCards.slice(0,2);this.excavateCards=this.removeSelectedCards(t,this.excavateCards);let a=this.sellCards.slice(0,2);this.sellCards=this.removeSelectedCards(a,this.sellCards),this.roundThreeDeck=e.concat(t,a)}),m(this,"buildRoundTwoDeck",()=>{let e=this.commandCards.slice(0,2);this.commandCards=this.removeSelectedCards(e,this.commandCards);let t=this.excavateCards.slice(0,3);this.excavateCards=this.removeSelectedCards(t,this.excavateCards);let a=this.sellCards.slice(0,1);this.sellCards=this.removeSelectedCards(a,this.sellCards);let n=this.surveyCards.slice(0,1);this.surveyCards=this.removeSelectedCards(n,this.surveyCards),this.roundTwoDeck=e.concat(t,a,n)}),m(this,"buildRoundOneDeck",()=>{let e=this.commandCards.slice(0,1);this.commandCards=this.removeSelectedCards(e,this.commandCards);let t=this.excavateCards.slice(0,3);this.excavateCards=this.removeSelectedCards(t,this.excavateCards);let a=this.marketCards.slice(0,2);this.marketCards=this.removeSelectedCards(a,this.marketCards);let n=this.sellCards.slice(0,1);this.sellCards=this.removeSelectedCards(n,this.sellCards);let i=this.snipeCards.slice(0,2);this.snipeCards=this.removeSelectedCards(i,this.snipeCards);let s=this.surveyCards.slice(0,1);this.surveyCards=this.removeSelectedCards(s,this.surveyCards),this.roundOneDeck=e.concat(t,a,n,i,s)}),this.cardViewModel=e,this.cardViewModel.round=1,this.roundOneDeck=[],this.roundTwoDeck=[],this.roundThreeDeck=[],this.utilities=f.a,this.cardViewModel.showReshuffle=!0}deepCopy(e){return JSON.parse(JSON.stringify(e))}}(p),C=new i.a;new n.a(l.cards,C,g,v.buildDecks,p,v.reshuffle,v.updateStats)}]);