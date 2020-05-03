!function(e){var t={};function a(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(i,r,function(t){return e[t]}.bind(null,r));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=8)}([function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));class i{constructor(e,t,a,i,r){this.id=e,this.frontImage=t,this.rearImage=a,this.instructions=i,this.group=r}}},function(e,t,a){"use strict";t.a={shuffle:function(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},findBootstrapEnvironment:function(){let e=["xs","sm","md","lg","xl"],t=document.createElement("div");document.body.appendChild(t);let a=e.shift();for(let i of e.reverse())if(t.classList.add(`d-${i}-none`),"none"===window.getComputedStyle(t).display){a=i;break}return document.body.removeChild(t),a}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));class i{save(e,t){window.localStorage.setItem(e,JSON.stringify(t))}load(e){return JSON.parse(window.localStorage.getItem(e))}clear(e){window.localStorage.removeItem(e)}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));class i{constructor(){this.cards=[],this.drawnCards=[],this.currentCard=null,this.nextCard=null,this.deckEmpty=!1,this.reshuffling=!1,this.hideDrawnCards=!1,this.showDiscardPile=!1,this.topDiscard=null,this.setTopDiscard=!1}}},function(e,t,a){"use strict";var i=a(1);a.d(t,"a",(function(){return d}));const r=new class{preloadCardImages(e){for(let t=0;t<e.length;t++){const a=e[t];(new Image).src=a.frontImage,(new Image).src=a.rearImage}}};class d{constructor(e,t,a,i,d,s,n){this.cardViewModel=d,this.gameState=a,this.deckBuilderCallback=i,this.reshuffleCallback=s,this.updateCallback=n;r.preloadCardImages(e);const c=setInterval(a=>{"complete"===document.readyState&&(clearInterval(c),this.cardViewModel.cards=e,this.buildDeck(),this.cardView=t,this.bindEventHandlers(),this.cardView.toggleLoadingVisibility(),this.cardView.toggleAppVisibility(),this.updateCards(),this.updateView(),this.gameState.getSavedState()&&this.cardView.showLoadGameModal())},1e3)}drawNextCard(){this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length-1]),this.updateCards(),this.cardViewModel.deckEmpty&&(this.cardViewModel.nextCard=null),this.cardViewModel.hideDrawnCards=!1,this.cardViewModel.setTopDiscard=!0}resetCards(){i.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.cards=this.cardViewModel.cards.concat(i.a.deepCopy(this.cardViewModel.drawnCards)),this.cardViewModel.drawnCards=[]}updateCards(){this.cardViewModel.currentCard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1],this.cardViewModel.nextCard=this.cardViewModel.cards[this.cardViewModel.cards.length-1],this.cardViewModel.currentCard&&(this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=this.cardViewModel.currentCard.id)),this.cardViewModel.drawnCards.length>1&&this.cardViewModel.setTopDiscard&&(this.cardViewModel.topDiscard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-2]),this.cardViewModel.deckEmpty=0===this.cardViewModel.cards.length}updateView(){this.cardView.updateCardDisplay(this.cardViewModel)}buildDeck(){this.deckBuilderCallback()}bindEventHandlers(){document.addEventListener("click",e=>{if(e.target&&e.target.dataset&&e.target.dataset.action){const t=e.target.dataset.action;"draw"===t?(this.drawNextCard(),this.updateView(this.cardViewModel),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel)):"railEra"===t?(this.resetCards(),this.buildDeck(),this.updateCards(),this.cardViewModel.era="rail",this.updateView(),this.gameState.set(this.cardViewModel)):"load"===t?(this.cardViewModel=this.gameState.getSavedState(),this.updateView(),this.updateCallback&&this.updateCallback(this.cardViewModel)):"newGame"===t?(this.gameState.clear(),window.location.reload()):"reshuffle"===t&&(this.reshuffleCallback?this.reshuffleCallback():this.resetCards(),this.updateCards(),this.updateView(),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel))}})}}},function(e,t,a){"use strict";var i=a(1);a.d(t,"a",(function(){return d}));const r=new class{constructor(){this.currentEnvironment=i.a.findBootstrapEnvironment()}createCurrentCardTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}createNextCardTemplate(e){if(!e)return'<div id="nextCardImageContainer"></div>';return`<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.rearImage}"/></div>`}createDiscardPileTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}get slideClass(){return"md"===this.currentEnvironment||"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?"slide":"slide-mobile"}get imageHeight(){return"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?50:30}};class d{get currentCardContainer(){return document.getElementById("currentCard")}get nextCardContainer(){return document.getElementById("nextCard")}get discardPileContainer(){return document.getElementById("discardPile")}updateCardDisplay(e){if(this.toggleDrawButton(e),this.hideRailEraButton(e),e.deckEmpty&&e.era&&"rail"===e.era){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}else if(e.deckEmpty){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}e.hideDrawnCards||(this.currentCardContainer.innerHTML=r.createCurrentCardTemplate(e.currentCard)),e.showDiscardPile&&e.topDiscard&&(this.discardPileContainer.innerHTML=r.createDiscardPileTemplate(e.topDiscard)),this.nextCardContainer.innerHTML=r.createNextCardTemplate(e.nextCard)}hideRailEraButton(e){"rail"===e.era&&document.querySelectorAll("[data-canal]").forEach(e=>e.classList.add("d-none"))}toggleDrawButton(e){const t=document.querySelector("[data-action=draw]"),a=document.querySelector("[data-action=reshuffle]");e.deckEmpty?(t.classList.add("disabled"),t.disabled=!0,a&&a.classList.remove("d-none")):(t.classList.remove("disabled"),a&&a.classList.add("d-none"),t.disabled=!1)}showLoadGameModal(){$("#loadModal").modal("show")}toggleLoadingVisibility(){const e=document.getElementById("loading");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}toggleAppVisibility(){const e=document.getElementById("app");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}}},,,function(e,t,a){"use strict";a.r(t);var i=a(4),r=a(5),d=a(0);const s="/cards/dinosaurisland/content/images/",n=s+"back.png";var c={cards:[new d.a(1,s+"easy_1.png",n,"","easy"),new d.a(2,s+"easy_2.png",n,"","easy"),new d.a(3,s+"easy_3.png",n,"","easy"),new d.a(4,s+"easy_4.png",n,"","easy"),new d.a(5,s+"difficult_1.png",n,"","difficult"),new d.a(6,s+"difficult_2.png",n,"","difficult"),new d.a(7,s+"difficult_3.png",n,"","difficult"),new d.a(8,s+"difficult_4.png",n,"","difficult"),new d.a(9,s+"difficult_5.png",n,"","difficult"),new d.a(10,s+"difficult_6.png",n,"","difficult"),new d.a(11,s+"difficult_7.png",n,"","difficult"),new d.a(12,s+"difficult_8.png",n,"","difficult")]};const l=new(a(2).a),o="dinosaurisland";var u=a(3),h=a(1);const f=new u.a,w=new class{set(e){l.save(o,e)}clear(){l.clear(o)}getSavedState(){return l.load(o)}showLoadGameModal(){$("#loadModal").modal("show")}},g=new class{constructor(e){!function(e,t,a){t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a}(this,"buildDeck",()=>{const e=this.cardViewModel.cards.filter(e=>"easy"===e.group);h.a.shuffle(e);const t=e.slice(0,2),a=this.cardViewModel.cards.filter(e=>"difficult"===e.group);h.a.shuffle(a);const i=a.slice(0,7),r=t.concat(i);h.a.shuffle(r),this.cardViewModel.cards=r}),this.cardViewModel=e}}(f),m=new r.a;new i.a(c.cards,m,w,g.buildDeck,f)}]);