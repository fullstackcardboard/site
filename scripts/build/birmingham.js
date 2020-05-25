!function(e){var t={};function a(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(r,i,function(t){return e[t]}.bind(null,i));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=11)}([function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{constructor(e,t,a,r,i){this.id=e,this.frontImage=t,this.rearImage=a,this.instructions=r,this.group=i}}},function(e,t,a){"use strict";t.a={shuffle:function(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},findBootstrapEnvironment:function(){let e=["xs","sm","md","lg","xl"],t=document.createElement("div");document.body.appendChild(t);let a=e.shift();for(let r of e.reverse())if(t.classList.add(`d-${r}-none`),"none"===window.getComputedStyle(t).display){a=r;break}return document.body.removeChild(t),a},hide:function(e){(e||e.classList)&&e.classList.add("d-none")},show:function(e){(e||e.classList)&&e.classList.remove("d-none")}}},function(e,t,a){"use strict";t.a={CARD_DRAWN:"cardDrawn",RESHUFFLED:"reshuffled",RESHUFFLE:"reshuffle",GAME_LOADED:"loaded"}},function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{save(e,t){window.localStorage.setItem(e,JSON.stringify(t))}load(e){return JSON.parse(window.localStorage.getItem(e))}clear(e){window.localStorage.removeItem(e)}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{constructor(){this.cards=[],this.drawnCards=[],this.currentCard=null,this.nextCard=null,this.deckEmpty=!1,this.reshuffling=!1,this.hideDrawnCards=!1,this.showDiscardPile=!1,this.topDiscard=null,this.setTopDiscard=!1}}},function(e,t,a){"use strict";var r=a(1);var i=a(2);a.d(t,"a",(function(){return d}));const s=new class{preloadCardImages(e){for(let t=0;t<e.length;t++){const a=e[t];(new Image).src=a.frontImage,(new Image).src=a.rearImage}}};class d{constructor(e,t,a,r,d,n,c,o){this.cardViewModel=d,this.gameState=a,this.deckBuilderCallback=r,this.reshuffleCallback=n,this.updateCallback=c,this.eventBus=o;s.preloadCardImages(e);const l=setInterval(a=>{"complete"===document.readyState&&(clearInterval(l),this.cardViewModel.cards=e,this.buildDeck(),this.cardView=t,this.bindEventHandlers(),this.cardView.toggleLoadingVisibility(),this.cardView.toggleAppVisibility(),this.updateCards(),this.updateView(),this.gameState.getSavedState()&&this.cardView.showLoadGameModal(),this.eventBus&&this.eventBus.subscribe(i.a.RESHUFFLE,()=>{this.reshuffle()}))},1e3)}drawNextCard(){this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length-1]),this.updateCards(),this.cardViewModel.deckEmpty&&(this.cardViewModel.nextCard=null),this.cardViewModel.hideDrawnCards=!1,this.cardViewModel.setTopDiscard=!0}resetCards(){r.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.cards=this.cardViewModel.cards.concat(r.a.deepCopy(this.cardViewModel.drawnCards)),r.a.shuffle(this.cardViewModel.cards),this.cardViewModel.drawnCards=[]}updateCards(){this.cardViewModel.currentCard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1],this.cardViewModel.nextCard=this.cardViewModel.cards[this.cardViewModel.cards.length-1],this.cardViewModel.currentCard&&(this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=this.cardViewModel.currentCard.id)),this.cardViewModel.drawnCards.length>1&&this.cardViewModel.setTopDiscard&&(this.cardViewModel.topDiscard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-2]),this.cardViewModel.deckEmpty=0===this.cardViewModel.cards.length}updateView(){this.cardView.updateCardDisplay(this.cardViewModel)}buildDeck(){this.deckBuilderCallback()}bindEventHandlers(){document.addEventListener("click",e=>{if(e.target&&e.target.dataset&&e.target.dataset.action){const t=e.target.dataset.action;"draw"===t?(this.drawNextCard(),this.updateView(this.cardViewModel),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(i.a.CARD_DRAWN,this.cardViewModel.currentCard)):"railEra"===t?(this.resetCards(),this.buildDeck(),this.updateCards(),this.cardViewModel.era="rail",this.updateView(),this.gameState.set(this.cardViewModel)):"load"===t?(this.cardViewModel=this.gameState.getSavedState(),this.updateView(),this.eventBus&&this.eventBus.publish(i.a.GAME_LOADED),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(i.a.CARD_DRAWN,this.cardViewModel.currentCard)):"newGame"===t?(this.gameState.clear(),window.location.reload()):"reshuffle"===t&&this.reshuffle()}})}reshuffle(){this.reshuffleCallback?this.reshuffleCallback():this.resetCards(),this.updateCards(),this.updateView(),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(i.a.RESHUFFLED)}}},function(e,t,a){"use strict";var r=a(1);a.d(t,"a",(function(){return s}));const i=new class{constructor(){this.currentEnvironment=r.a.findBootstrapEnvironment()}createCurrentCardTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}createNextCardTemplate(e){if(!e)return'<div id="nextCardImageContainer"></div>';return`<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.rearImage}"/></div>`}createDiscardPileTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}get slideClass(){return"md"===this.currentEnvironment||"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?"slide":"slide-mobile"}get imageHeight(){return"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?50:30}};class s{get currentCardContainer(){return document.getElementById("currentCard")}get nextCardContainer(){return document.getElementById("nextCard")}get discardPileContainer(){return document.getElementById("discardPile")}updateCardDisplay(e){if(this.toggleDrawButton(e),this.hideRailEraButton(e),e.deckEmpty&&e.era&&"rail"===e.era){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}else if(e.deckEmpty){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}e.hideDrawnCards||(this.currentCardContainer.innerHTML=i.createCurrentCardTemplate(e.currentCard)),e.showDiscardPile&&e.topDiscard&&(this.discardPileContainer.innerHTML=i.createDiscardPileTemplate(e.topDiscard)),this.nextCardContainer.innerHTML=i.createNextCardTemplate(e.nextCard)}hideRailEraButton(e){"rail"===e.era&&document.querySelectorAll("[data-canal]").forEach(e=>e.classList.add("d-none"))}toggleDrawButton(e){const t=document.querySelector("[data-action=draw]"),a=document.querySelector("[data-action=reshuffle]");e.deckEmpty?(t.classList.add("disabled"),t.disabled=!0,a&&!e.showReshuffle&&a.classList.remove("d-none")):(t.classList.remove("disabled"),a&&!e.showReshuffle&&a.classList.add("d-none"),t.disabled=!1)}showLoadGameModal(){$("#loadModal").modal("show")}toggleLoadingVisibility(){const e=document.getElementById("loading");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}toggleAppVisibility(){const e=document.getElementById("app");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}}},,,,,function(e,t,a){"use strict";a.r(t);var r=a(5),i=a(6),s=a(0);const d="/cards/birmingham/content/images/cards/";var n={cards:[new s.a(1,d+"FRONT_R1.jpg",d+"BACK_R1.jpg","","a"),new s.a(2,d+"FRONT_R2.jpg",d+"BACK_R2.jpg","","a"),new s.a(3,d+"FRONT_R3.jpg",d+"BACK_R3.jpg","","b"),new s.a(4,d+"FRONT_R4.jpg",d+"BACK_R4.jpg","","b"),new s.a(5,d+"FRONT_R5.jpg",d+"BACK_R5.jpg","","c"),new s.a(6,d+"FRONT_R6.jpg",d+"BACK_R6.jpg","","b"),new s.a(7,d+"FRONT_R7.jpg",d+"BACK_R7.jpg","","a"),new s.a(8,d+"FRONT_R8.jpg",d+"BACK_R8.jpg","","a"),new s.a(9,d+"FRONT_R9.jpg",d+"BACK_R9.jpg","","c"),new s.a(10,d+"FRONT_R10.jpg",d+"BACK_R10.jpg","","a"),new s.a(11,d+"FRONT_R11.jpg",d+"BACK_R11.jpg","","a"),new s.a(12,d+"FRONT_R12.jpg",d+"BACK_R12.jpg","","b"),new s.a(13,d+"FRONT_R13.jpg",d+"BACK_R13.jpg","","a"),new s.a(14,d+"FRONT_R14.jpg",d+"BACK_R14.jpg","","c"),new s.a(15,d+"FRONT_R15.jpg",d+"BACK_R15.jpg","","c"),new s.a(16,d+"FRONT_R16.jpg",d+"BACK_R16.jpg","","a"),new s.a(17,d+"FRONT_R17.jpg",d+"BACK_R17.jpg","","a"),new s.a(18,d+"FRONT_R1.jpg",d+"BACK_R1.jpg","","a"),new s.a(19,d+"FRONT_R19.jpg",d+"BACK_R10.jpg","","c"),new s.a(20,d+"FRONT_R20.jpg",d+"BACK_R20.jpg","","a"),new s.a(21,d+"FRONT_R21.jpg",d+"BACK_R21.jpg","","c"),new s.a(22,d+"FRONT_R22.jpg",d+"BACK_R22.jpg","","a")]};const c=new(a(3).a),o="birmingham";var l=a(1);function h(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const u=new(a(4).a),g=new class{constructor(e){h(this,"getGroupCards",(e,t)=>{const a=this.cardViewModel.cards.filter(t=>t.group===e),r=[];l.a.shuffle(a);for(let e=0;e<t;e++){const t=a[e];r.push(t)}return r}),h(this,"removeSelectedCards",e=>{for(let t=0;t<e.length;t++){const a=e[t];this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=a.id)}}),h(this,"buildDeck",()=>{const e=this.getFirstTenCards(),t=this.getNextThreeCards(),a=this.getFinalNineCards();let r=this.cardViewModel.cards;r=r.concat(a),r=r.concat(t),r=r.concat(e),this.cardViewModel.cards=r}),h(this,"getFirstTenCards",()=>{let e=[];return e=this.getGroupCards("a",4),e=e.concat(this.getGroupCards("b",3)),e=e.concat(this.getGroupCards("c",3)),this.removeSelectedCards(e),l.a.shuffle(e),e}),h(this,"getNextThreeCards",()=>{let e=[];return e=this.getGroupCards("a",1),e=e.concat(this.getGroupCards("b",1)),e=e.concat(this.getGroupCards("c",1)),this.removeSelectedCards(e),l.a.shuffle(e),e}),h(this,"getFinalNineCards",()=>{const e=[].concat(this.cardViewModel.cards);return this.removeSelectedCards(e),l.a.shuffle(e),e}),this.cardViewModel=e}}(u),p=new class{set(e){c.save(o,e)}clear(){c.clear(o)}getSavedState(){return c.load(o)}showLoadGameModal(){$("#loadModal").modal("show")}},w=new i.a;new r.a(n.cards,w,p,g.buildDeck,u)}]);