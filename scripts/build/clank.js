!function(e){var t={};function a(r){if(t[r])return t[r].exports;var d=t[r]={i:r,l:!1,exports:{}};return e[r].call(d.exports,d,d.exports,a),d.l=!0,d.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var d in e)a.d(r,d,function(t){return e[t]}.bind(null,d));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=7)}([function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{constructor(e,t,a,r,d){this.id=e,this.frontImage=t,this.rearImage=a,this.instructions=r,this.group=d}}},function(e,t,a){"use strict";t.a={shuffle:function(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},findBootstrapEnvironment:function(){let e=["xs","sm","md","lg","xl"],t=document.createElement("div");document.body.appendChild(t);let a=e.shift();for(let r of e.reverse())if(t.classList.add(`d-${r}-none`),"none"===window.getComputedStyle(t).display){a=r;break}return document.body.removeChild(t),a}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{save(e,t){window.localStorage.setItem(e,JSON.stringify(t))}load(e){return JSON.parse(window.localStorage.getItem(e))}clear(e){window.localStorage.removeItem(e)}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));class r{constructor(){this.cards=[],this.drawnCards=[],this.currentCard=null,this.nextCard=null,this.deckEmpty=!1,this.reshuffling=!1,this.hideDrawnCards=!1}}},function(e,t,a){"use strict";var r=a(1);a.d(t,"a",(function(){return n}));const d=new class{preloadCardImages(e){for(let t=0;t<e.length;t++){const a=e[t];(new Image).src=a.frontImage,(new Image).src=a.rearImage}}};class n{constructor(e,t,a,r,n){this.cardViewModel=n,this.gameState=a,this.deckBuilderCallback=r;d.preloadCardImages(e);const i=setInterval(a=>{"complete"===document.readyState&&(clearInterval(i),this.cardViewModel.cards=e,this.buildDeck(),this.cardView=t,this.bindEventHandlers(),this.cardView.toggleLoadingVisibility(),this.cardView.toggleAppVisibility(),this.updateCards(),this.updateView(),this.gameState.getSavedState()&&this.cardView.showLoadGameModal())},1e3)}drawNextCard(){this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length-1]),this.updateCards(),this.cardViewModel.deckEmpty&&(this.cardViewModel.nextCard=null),this.cardViewModel.hideDrawnCards=!1}resetCards(){r.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.cards=this.cardViewModel.cards.concat(r.a.deepCopy(this.cardViewModel.drawnCards)),this.cardViewModel.drawnCards=[]}updateCards(){this.cardViewModel.currentCard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1],this.cardViewModel.nextCard=this.cardViewModel.cards[this.cardViewModel.cards.length-1],this.cardViewModel.currentCard&&(this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=this.cardViewModel.currentCard.id)),this.cardViewModel.deckEmpty=0===this.cardViewModel.cards.length}updateView(){this.cardView.updateCardDisplay(this.cardViewModel)}buildDeck(){this.deckBuilderCallback()}bindEventHandlers(){document.addEventListener("click",e=>{if(e.target&&e.target.dataset&&e.target.dataset.action){const t=e.target.dataset.action;"draw"===t?(this.drawNextCard(),this.updateView(this.cardViewModel),this.gameState.set(this.cardViewModel)):"railEra"===t?(this.resetCards(),this.buildDeck(),this.updateCards(),this.cardViewModel.era="rail",this.updateView(),this.gameState.set(this.cardViewModel)):"load"===t?(this.cardViewModel=this.gameState.getSavedState(),this.updateView()):"newGame"===t?(this.gameState.clear(),window.location.reload()):"reshuffle"===t&&(this.resetCards(),this.updateCards(),this.updateView(),this.gameState.set(this.cardViewModel))}})}}},function(e,t,a){"use strict";var r=a(1);a.d(t,"a",(function(){return n}));const d=new class{constructor(){this.currentEnvironment=r.a.findBootstrapEnvironment()}createCurrentCardTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}createNextCardTemplate(e){if(!e)return'<div id="nextCardImageContainer"></div>';return`<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.rearImage}"/></div>`}get slideClass(){return"md"===this.currentEnvironment||"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?"slide":"slide-mobile"}get imageHeight(){return"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?50:30}};class n{get currentCardContainer(){return document.getElementById("currentCard")}get nextCardContainer(){return document.getElementById("nextCard")}updateCardDisplay(e){if(this.toggleDrawButton(e),this.hideRailEraButton(e),e.deckEmpty&&e.era&&"rail"===e.era){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}else if(e.deckEmpty){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}e.hideDrawnCards||(this.currentCardContainer.innerHTML=d.createCurrentCardTemplate(e.currentCard)),this.nextCardContainer.innerHTML=d.createNextCardTemplate(e.nextCard)}hideRailEraButton(e){"rail"===e.era&&document.querySelectorAll("[data-canal]").forEach(e=>e.classList.add("d-none"))}toggleDrawButton(e){const t=document.querySelector("[data-action=draw]"),a=document.querySelector("[data-action=reshuffle]");e.deckEmpty?(t.classList.add("disabled"),t.disabled=!0,a.classList.remove("d-none")):(t.classList.remove("disabled"),t.disabled=!1)}showLoadGameModal(){$("#loadModal").modal("show")}toggleLoadingVisibility(){const e=document.getElementById("loading");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}toggleAppVisibility(){const e=document.getElementById("app");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}}},,function(e,t,a){"use strict";a.r(t);var r=a(4),d=a(5),n=a(0);const i="/cards/clank/images/";var s={cards:[new n.a(1,i+"Card1.png",i+"Back1.png","","a"),new n.a(2,i+"Card2.png",i+"Back1.png","","a"),new n.a(3,i+"Card3.png",i+"Back1.png","","a"),new n.a(4,i+"Card4.png",i+"Back1.png","","a"),new n.a(5,i+"Card5.png",i+"Back1.png","","a"),new n.a(6,i+"Card6.png",i+"Back1.png","","b"),new n.a(7,i+"Card7.png",i+"Back1.png","","b"),new n.a(8,i+"Card8.png",i+"Back1.png","","b")]};const o=new(a(2).a);var c=a(1);const l=new(a(3).a),u=new class{constructor(e){!function(e,t,a){t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a}(this,"buildDeck",()=>{const e=this.cardViewModel.cards.filter(e=>"a"===e.group),t=this.cardViewModel.cards.filter(e=>"b"===e.group);this.cardViewModel.drawnCards=t,this.cardViewModel.cards=e,c.a.shuffle(this.cardViewModel.cards),this.cardViewModel.hideDrawnCards=!0}),this.cardViewModel=e}}(l),h=new class{set(e){o.save("clank",e)}clear(){o.clear("clank")}getSavedState(){return o.load("clank")}showLoadGameModal(){$("#loadModal").modal("show")}},g=new d.a;new r.a(s.cards,g,h,u.buildDeck,l)}]);