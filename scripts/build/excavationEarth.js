!function(e){var t={};function r(d){if(t[d])return t[d].exports;var s=t[d]={i:d,l:!1,exports:{}};return e[d].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,d){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:d})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var d=Object.create(null);if(r.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(d,s,function(t){return e[t]}.bind(null,s));return d},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));class d{constructor(e,t,r,d,s){this.id=e,this.frontImage=t,this.rearImage=r,this.instructions=d,this.group=s}}},function(e,t,r){"use strict";t.a={shuffle:function(e){for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},findBootstrapEnvironment:function(){let e=["xs","sm","md","lg","xl"],t=document.createElement("div");document.body.appendChild(t);let r=e.shift();for(let d of e.reverse())if(t.classList.add(`d-${d}-none`),"none"===window.getComputedStyle(t).display){r=d;break}return document.body.removeChild(t),r}}},function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));class d{save(e,t){window.localStorage.setItem(e,JSON.stringify(t))}load(e){return JSON.parse(window.localStorage.getItem(e))}clear(e){window.localStorage.removeItem(e)}}},function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));class d{constructor(){this.cards=[],this.drawnCards=[],this.currentCard=null,this.nextCard=null,this.deckEmpty=!1,this.reshuffling=!1,this.hideDrawnCards=!1,this.showDiscardPile=!1,this.topDiscard=null,this.setTopDiscard=!1}}},function(e,t,r){"use strict";var d=r(1);r.d(t,"a",(function(){return a}));const s=new class{preloadCardImages(e){for(let t=0;t<e.length;t++){const r=e[t];(new Image).src=r.frontImage,(new Image).src=r.rearImage}}};class a{constructor(e,t,r,d,a,i,n){this.cardViewModel=a,this.gameState=r,this.deckBuilderCallback=d,this.reshuffleCallback=i,this.updateCallback=n;s.preloadCardImages(e);const l=setInterval(r=>{"complete"===document.readyState&&(clearInterval(l),this.cardViewModel.cards=e,this.buildDeck(),this.cardView=t,this.bindEventHandlers(),this.cardView.toggleLoadingVisibility(),this.cardView.toggleAppVisibility(),this.updateCards(),this.updateView(),this.gameState.getSavedState()&&this.cardView.showLoadGameModal())},1e3)}drawNextCard(){this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length-1]),this.updateCards(),this.cardViewModel.deckEmpty&&(this.cardViewModel.nextCard=null),this.cardViewModel.hideDrawnCards=!1,this.cardViewModel.setTopDiscard=!0}resetCards(){d.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.cards=this.cardViewModel.cards.concat(d.a.deepCopy(this.cardViewModel.drawnCards)),this.cardViewModel.drawnCards=[]}updateCards(){this.cardViewModel.currentCard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1],this.cardViewModel.nextCard=this.cardViewModel.cards[this.cardViewModel.cards.length-1],this.cardViewModel.currentCard&&(this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=this.cardViewModel.currentCard.id)),this.cardViewModel.drawnCards.length>1&&this.cardViewModel.setTopDiscard&&(this.cardViewModel.topDiscard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-2]),this.cardViewModel.deckEmpty=0===this.cardViewModel.cards.length}updateView(){this.cardView.updateCardDisplay(this.cardViewModel)}buildDeck(){this.deckBuilderCallback()}bindEventHandlers(){document.addEventListener("click",e=>{if(e.target&&e.target.dataset&&e.target.dataset.action){const t=e.target.dataset.action;"draw"===t?(this.drawNextCard(),this.updateView(this.cardViewModel),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel)):"railEra"===t?(this.resetCards(),this.buildDeck(),this.updateCards(),this.cardViewModel.era="rail",this.updateView(),this.gameState.set(this.cardViewModel)):"load"===t?(this.cardViewModel=this.gameState.getSavedState(),this.updateView(),this.updateCallback&&this.updateCallback(this.cardViewModel)):"newGame"===t?(this.gameState.clear(),window.location.reload()):"reshuffle"===t&&(this.reshuffleCallback?this.reshuffleCallback():this.resetCards(),this.updateCards(),this.updateView(),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel))}})}}},function(e,t,r){"use strict";var d=r(1);r.d(t,"a",(function(){return a}));const s=new class{constructor(){this.currentEnvironment=d.a.findBootstrapEnvironment()}createCurrentCardTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}createNextCardTemplate(e){if(!e)return'<div id="nextCardImageContainer"></div>';return`<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.rearImage}"/></div>`}createDiscardPileTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}get slideClass(){return"md"===this.currentEnvironment||"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?"slide":"slide-mobile"}get imageHeight(){return"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?50:30}};class a{get currentCardContainer(){return document.getElementById("currentCard")}get nextCardContainer(){return document.getElementById("nextCard")}get discardPileContainer(){return document.getElementById("discardPile")}updateCardDisplay(e){if(this.toggleDrawButton(e),this.hideRailEraButton(e),e.deckEmpty&&e.era&&"rail"===e.era){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}else if(e.deckEmpty){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}e.hideDrawnCards||(this.currentCardContainer.innerHTML=s.createCurrentCardTemplate(e.currentCard)),e.showDiscardPile&&e.topDiscard&&(this.discardPileContainer.innerHTML=s.createDiscardPileTemplate(e.topDiscard)),this.nextCardContainer.innerHTML=s.createNextCardTemplate(e.nextCard)}hideRailEraButton(e){"rail"===e.era&&document.querySelectorAll("[data-canal]").forEach(e=>e.classList.add("d-none"))}toggleDrawButton(e){const t=document.querySelector("[data-action=draw]"),r=document.querySelector("[data-action=reshuffle]");e.deckEmpty?(t.classList.add("disabled"),t.disabled=!0,r&&r.classList.remove("d-none")):(t.classList.remove("disabled"),r&&r.classList.add("d-none"),t.disabled=!1)}showLoadGameModal(){$("#loadModal").modal("show")}toggleLoadingVisibility(){const e=document.getElementById("loading");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}toggleAppVisibility(){const e=document.getElementById("app");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}}},,function(e,t,r){"use strict";r.r(t);var d=r(4),s=r(5),a=r(0);const i="/cards/excavation-earth/content/images/",n=i+"back.png",l=[];for(let e=0;e<6;e++)l.push(new a.a(`${e}command`,`${i}command_${e+1}.png`,n,"","command"));for(let e=0;e<8;e++)l.push(new a.a(`${e}excavate`,`${i}excavate_${e+1}.png`,n,"","excavate"));for(let e=0;e<2;e++)l.push(new a.a(`${e}market`,`${i}market_${e+1}.png`,n,"","market"));for(let e=0;e<4;e++)l.push(new a.a(`${e}sell`,`${i}sell_${e+1}.png`,n,"","sell"));for(let e=0;e<2;e++)l.push(new a.a(`${e}snipe`,`${i}snipe_${e+1}.png`,n,"","snipe"));for(let e=0;e<2;e++)l.push(new a.a(`${e}survey`,`${i}survey_${e+1}.png`,n,"","survey"));var c={cards:l};const o=new(r(2).a),h="dinosaurisland";var u=r(3),m=r(1);function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const w=new u.a,g=new class{set(e){o.save(h,e)}clear(){o.clear(h)}getSavedState(){return o.load(h)}showLoadGameModal(){$("#loadModal").modal("show")}},v=new class{constructor(e){C(this,"removeSelectedCards",(e,t)=>{for(let r=0;r<e.length;r++){let d=e[r];t=t.filter(e=>e.id!=d.id)}return t}),C(this,"reshuffle",()=>{if(this.cardViewModel.round++,3==this.round){const e=document.querySelector("[data-action=reshuffle]");e.parentNode.removeChild(e)}this.utilities.shuffle(this.cardViewModel.drawnCards);const e=2==this.round?this.roundTwoDeck:this.roundThreeDeck;this.cardViewModel.cards=e.concat(this.cardViewModel.drawnCards.slice(0,3)),this.utilities.shuffle(this.cardViewModel.cards),this.cardViewModel.drawnCards=[]}),C(this,"updateStats",e=>{const t=document.getElementById("stats");switch(e.round){case 1:t.innerHTML=`<h2>Round One</h2>\n          <div class="row text-light">\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Deck Construction</h3>\n              <table class="table text-light">\n                <th>\n                  <tr>\n                    <td>\n                      Card Type\n                    </td>\n                    <td>\n                      Number\n                    </td>\n                  </tr>\n                </th>\n                <tbody>\n                  <tr>\n                    <td>\n                      Command\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Excavate\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Market\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Sell\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Snipe\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Survey\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Cards Drawn</h3>\n              ${this.getDrawnCardsHtml(e)}\n            </div>\n          </div>`;break;case 2:t.innerHTML=`<h2>Round Two</h2>\n          <div class="row text-light">\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Deck Construction</h3>\n              <table class="table text-light">\n                <th>\n                  <tr>\n                    <td>\n                      Card Type\n                    </td>\n                    <td>\n                      Number\n                    </td>\n                  </tr>\n                </th>\n                <tbody>\n                  <tr>\n                    <td>\n                      Command\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Excavate\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Sell\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Survey\n                    </td>\n                    <td>\n                      1\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Carried Over From Last Round\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Cards Drawn</h3>\n              ${this.getDrawnCardsHtml(e)}\n            </div>\n          </div>`;break;case 3:t.innerHTML=`<h2>Round Three</h2>\n          <div class="row text-light">\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Deck Construction</h3>\n              <table class="table text-light">\n                <th>\n                  <tr>\n                    <td>\n                      Card Type\n                    </td>\n                    <td>\n                      Number\n                    </td>\n                  </tr>\n                </th>\n                <tbody>\n                  <tr>\n                    <td>\n                      Command\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Excavate\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Sell\n                    </td>\n                    <td>\n                      2\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      Carried Over From Last Round\n                    </td>\n                    <td>\n                      3\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div class="col-sm-12 col-md-6 text-light">\n              <h3>Cards Drawn</h3>\n              ${this.getDrawnCardsHtml(e)}\n            </div>\n          </div>`}}),C(this,"getDrawnCardsHtml",e=>{let t='\n      <table class="table table-responsive">\n        <th>\n          <tr>\n            <td class="text-light">Turn</td>\n            <td class="text-light">Card</td>\n          </tr>\n        </th>\n        <tbody>\n    ';for(let r=0;r<e.drawnCards.length;r++){const d=e.drawnCards[r];t+=`<tr>\n        <td class="text-light">${r+1}</td>\n        <td class="text-light">${d.group.charAt(0).toUpperCase()+d.group.slice(1)}</td>\n      </tr>`}return t+="</tbody></table>",t}),C(this,"buildDecks",()=>{this.commandCards=this.cardViewModel.cards.filter(e=>"command"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.commandCards,this.cardViewModel.cards),this.utilities.shuffle(this.commandCards),this.excavateCards=this.cardViewModel.cards.filter(e=>"excavate"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.excavateCards,this.cardViewModel.cards),this.utilities.shuffle(this.excavateCards),this.marketCards=this.cardViewModel.cards.filter(e=>"market"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.marketCards,this.cardViewModel.cards),this.utilities.shuffle(this.marketCards),this.snipeCards=this.cardViewModel.cards.filter(e=>"snipe"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.snipeCards,this.cardViewModel.cards),this.utilities.shuffle(this.snipeCards),this.surveyCards=this.cardViewModel.cards.filter(e=>"survey"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.surveyCards,this.cardViewModel.cards),this.utilities.shuffle(this.surveyCards),this.sellCards=this.cardViewModel.cards.filter(e=>"sell"==e.group),this.cardViewModel.cards=this.removeSelectedCards(this.sellCards,this.cardViewModel.cards),this.utilities.shuffle(this.sellCards),this.buildRoundOneDeck(),this.buildRoundTwoDeck(),this.buildRoundThreeDeck(),this.cardViewModel.cards=this.roundOneDeck,this.utilities.shuffle(this.cardViewModel.cards),this.updateStats(this.cardViewModel)}),C(this,"buildRoundThreeDeck",()=>{let e=this.commandCards.slice(0,3);this.commandCards=this.removeSelectedCards(e,this.commandCards);let t=this.excavateCards.slice(0,2);this.excavateCards=this.removeSelectedCards(t,this.excavateCards);let r=this.sellCards.slice(0,2);this.sellCards=this.removeSelectedCards(r,this.sellCards),this.roundThreeDeck=e.concat(t,r)}),C(this,"buildRoundTwoDeck",()=>{let e=this.commandCards.slice(0,2);this.commandCards=this.removeSelectedCards(e,this.commandCards);let t=this.excavateCards.slice(0,3);this.excavateCards=this.removeSelectedCards(t,this.excavateCards);let r=this.sellCards.slice(0,1);this.sellCards=this.removeSelectedCards(r,this.sellCards);let d=this.surveyCards.slice(0,1);this.surveyCards=this.removeSelectedCards(d,this.surveyCards),this.roundTwoDeck=e.concat(t,r,d)}),C(this,"buildRoundOneDeck",()=>{let e=this.commandCards.slice(0,1);this.commandCards=this.removeSelectedCards(e,this.commandCards);let t=this.excavateCards.slice(0,3);this.excavateCards=this.removeSelectedCards(t,this.excavateCards);let r=this.marketCards.slice(0,2);this.marketCards=this.removeSelectedCards(r,this.marketCards);let d=this.sellCards.slice(0,1);this.sellCards=this.removeSelectedCards(d,this.sellCards);let s=this.snipeCards.slice(0,2);this.snipeCards=this.removeSelectedCards(s,this.snipeCards);let a=this.surveyCards.slice(0,1);this.surveyCards=this.removeSelectedCards(a,this.surveyCards),this.roundOneDeck=e.concat(t,r,d,s,a)}),this.cardViewModel=e,this.cardViewModel.round=1,this.roundOneDeck=[],this.roundTwoDeck=[],this.roundThreeDeck=[],this.utilities=m.a,this.cardViewModel.showReshuffle=!0}deepCopy(e){return JSON.parse(JSON.stringify(e))}}(w),p=new s.a;new d.a(c.cards,p,g,v.buildDecks,w,v.reshuffle,v.updateStats)}]);