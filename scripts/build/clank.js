!function(e){var t={};function a(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(r,i,function(t){return e[t]}.bind(null,i));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=13)}([function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{constructor(e,t,a,r,i){this.id=e,this.frontImage=t,this.rearImage=a,this.instructions=r,this.group=i}}},function(e,t,a){"use strict";t.a={shuffle:function(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},findBootstrapEnvironment:function(){let e=["xs","sm","md","lg","xl"],t=document.createElement("div");document.body.appendChild(t);let a=e.shift();for(let r of e.reverse())if(t.classList.add(`d-${r}-none`),"none"===window.getComputedStyle(t).display){a=r;break}return document.body.removeChild(t),a},hide:function(e){(e||e.classList)&&e.classList.add("d-none")},show:function(e){(e||e.classList)&&e.classList.remove("d-none")}}},function(e,t,a){"use strict";t.a={CARD_DRAWN:"cardDrawn",RESHUFFLED:"reshuffled",RESHUFFLE:"reshuffle",GAME_LOADED:"loaded"}},function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{save(e,t){window.localStorage.setItem(e,JSON.stringify(t))}load(e){return JSON.parse(window.localStorage.getItem(e))}clear(e){window.localStorage.removeItem(e)}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{constructor(){this.cards=[],this.drawnCards=[],this.currentCard=null,this.nextCard=null,this.deckEmpty=!1,this.reshuffling=!1,this.hideDrawnCards=!1,this.showDiscardPile=!1,this.topDiscard=null,this.setTopDiscard=!1}}},function(e,t,a){"use strict";var r=a(1);var i=a(2);a.d(t,"a",(function(){return s}));const d=new class{preloadCardImages(e){for(let t=0;t<e.length;t++){const a=e[t];(new Image).src=a.frontImage,(new Image).src=a.rearImage}}};class s{constructor(e,t,a,r,s,n,c,l){this.cardViewModel=s,this.gameState=a,this.deckBuilderCallback=r,this.reshuffleCallback=n,this.updateCallback=c,this.eventBus=l;d.preloadCardImages(e);const o=setInterval(a=>{"complete"===document.readyState&&(clearInterval(o),this.cardViewModel.cards=e,this.buildDeck(),this.cardView=t,this.bindEventHandlers(),this.cardView.toggleLoadingVisibility(),this.cardView.toggleAppVisibility(),this.updateCards(),this.updateView(),this.gameState.getSavedState()&&this.cardView.showLoadGameModal(),this.eventBus&&this.eventBus.subscribe(i.a.RESHUFFLE,()=>{this.reshuffle()}))},1e3)}drawNextCard(){this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length-1]),this.updateCards(),this.cardViewModel.deckEmpty&&(this.cardViewModel.nextCard=null),this.cardViewModel.hideDrawnCards=!1,this.cardViewModel.setTopDiscard=!0}resetCards(){r.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.cards=this.cardViewModel.cards.concat(r.a.deepCopy(this.cardViewModel.drawnCards)),r.a.shuffle(this.cardViewModel.cards),this.cardViewModel.drawnCards=[]}updateCards(){this.cardViewModel.currentCard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1],this.cardViewModel.nextCard=this.cardViewModel.cards[this.cardViewModel.cards.length-1],this.cardViewModel.currentCard&&(this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=this.cardViewModel.currentCard.id)),this.cardViewModel.drawnCards.length>1&&this.cardViewModel.setTopDiscard&&(this.cardViewModel.topDiscard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-2]),this.cardViewModel.deckEmpty=0===this.cardViewModel.cards.length}updateView(){this.cardView.updateCardDisplay(this.cardViewModel)}buildDeck(){this.deckBuilderCallback()}bindEventHandlers(){document.addEventListener("click",e=>{if(e.target&&e.target.dataset&&e.target.dataset.action){const t=e.target.dataset.action;"draw"===t?(this.drawNextCard(),this.updateView(this.cardViewModel),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(i.a.CARD_DRAWN,this.cardViewModel.currentCard)):"railEra"===t?(this.resetCards(),this.buildDeck(),this.updateCards(),this.cardViewModel.era="rail",this.updateView(),this.gameState.set(this.cardViewModel)):"load"===t?(this.cardViewModel=this.gameState.getSavedState(),this.updateView(),this.eventBus&&this.eventBus.publish(i.a.GAME_LOADED),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(i.a.CARD_DRAWN,this.cardViewModel.currentCard)):"newGame"===t?(this.gameState.clear(),window.location.reload()):"reshuffle"===t&&this.reshuffle()}})}reshuffle(){this.reshuffleCallback?this.reshuffleCallback():this.resetCards(),this.updateCards(),this.updateView(),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(i.a.RESHUFFLED)}}},function(e,t,a){"use strict";var r=a(1);a.d(t,"a",(function(){return d}));const i=new class{constructor(){this.currentEnvironment=r.a.findBootstrapEnvironment()}createCurrentCardTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}createNextCardTemplate(e){if(!e)return'<div id="nextCardImageContainer"></div>';return`<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.rearImage}"/></div>`}createDiscardPileTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}get slideClass(){return"md"===this.currentEnvironment||"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?"slide":"slide-mobile"}get imageHeight(){return"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?50:30}};class d{get currentCardContainer(){return document.getElementById("currentCard")}get nextCardContainer(){return document.getElementById("nextCard")}get discardPileContainer(){return document.getElementById("discardPile")}updateCardDisplay(e){if(this.toggleDrawButton(e),this.hideRailEraButton(e),e.deckEmpty&&e.era&&"rail"===e.era){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}else if(e.deckEmpty){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}e.hideDrawnCards||(this.currentCardContainer.innerHTML=i.createCurrentCardTemplate(e.currentCard)),e.showDiscardPile&&e.topDiscard&&(this.discardPileContainer.innerHTML=i.createDiscardPileTemplate(e.topDiscard)),this.nextCardContainer.innerHTML=i.createNextCardTemplate(e.nextCard)}hideRailEraButton(e){"rail"===e.era&&document.querySelectorAll("[data-canal]").forEach(e=>e.classList.add("d-none"))}toggleDrawButton(e){const t=document.querySelector("[data-action=draw]"),a=document.querySelector("[data-action=reshuffle]");e.deckEmpty?(t.classList.add("disabled"),t.disabled=!0,a&&!e.showReshuffle&&a.classList.remove("d-none")):(t.classList.remove("disabled"),a&&!e.showReshuffle&&a.classList.add("d-none"),t.disabled=!1)}showLoadGameModal(){$("#loadModal").modal("show")}toggleLoadingVisibility(){const e=document.getElementById("loading");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}toggleAppVisibility(){const e=document.getElementById("app");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}}},,,,,,,function(e,t,a){"use strict";a.r(t);var r=a(5),i=a(6),d=a(0);const s="/cards/clank/images/";var n={cards:[new d.a(1,s+"Card1.png",s+"Back1.png","","a"),new d.a(2,s+"Card2.png",s+"Back1.png","","a"),new d.a(3,s+"Card3.png",s+"Back1.png","","a"),new d.a(4,s+"Card4.png",s+"Back1.png","","a"),new d.a(5,s+"Card5.png",s+"Back1.png","","a"),new d.a(6,s+"Card6.png",s+"Back1.png","","b"),new d.a(7,s+"Card7.png",s+"Back1.png","","b"),new d.a(8,s+"Card8.png",s+"Back1.png","","b")]};const c=new(a(3).a);var l=a(1);const o=new(a(4).a),u=new class{constructor(e){!function(e,t,a){t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a}(this,"buildDeck",()=>{const e=this.cardViewModel.cards.filter(e=>"a"===e.group),t=this.cardViewModel.cards.filter(e=>"b"===e.group);this.cardViewModel.drawnCards=t,this.cardViewModel.cards=e,l.a.shuffle(this.cardViewModel.cards),l.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.showDiscardPile=!0,this.cardViewModel.hideDrawnCards=!0,this.cardViewModel.topDiscard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1]}),this.cardViewModel=e}}(o),h=new class{set(e){c.save("clank",e)}clear(){c.clear("clank")}getSavedState(){return c.load("clank")}showLoadGameModal(){$("#loadModal").modal("show")}},w=new i.a;new r.a(n.cards,w,h,u.buildDeck,o)}]);