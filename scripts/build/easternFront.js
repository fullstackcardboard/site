!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=9)}([function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));class n{constructor(e,t,a,n,r){this.id=e,this.frontImage=t,this.rearImage=a,this.instructions=n,this.group=r}}},function(e,t,a){"use strict";t.a={shuffle:function(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},findBootstrapEnvironment:function(){let e=["xs","sm","md","lg","xl"],t=document.createElement("div");document.body.appendChild(t);let a=e.shift();for(let n of e.reverse())if(t.classList.add(`d-${n}-none`),"none"===window.getComputedStyle(t).display){a=n;break}return document.body.removeChild(t),a},hide:function(e){(e||e.classList)&&e.classList.add("d-none")},show:function(e){(e||e.classList)&&e.classList.remove("d-none")}}},function(e,t,a){"use strict";t.a={CARD_DRAWN:"cardDrawn",RESHUFFLED:"reshuffled",RESHUFFLE:"reshuffle",GAME_LOADED:"loaded"}},function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));class n{save(e,t){window.localStorage.setItem(e,JSON.stringify(t))}load(e){return JSON.parse(window.localStorage.getItem(e))}clear(e){window.localStorage.removeItem(e)}}},function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));class n{constructor(){this.cards=[],this.drawnCards=[],this.currentCard=null,this.nextCard=null,this.deckEmpty=!1,this.reshuffling=!1,this.hideDrawnCards=!1,this.showDiscardPile=!1,this.topDiscard=null,this.setTopDiscard=!1}}},function(e,t,a){"use strict";var n=a(1);var r=a(2);a.d(t,"a",(function(){return i}));const s=new class{preloadCardImages(e){for(let t=0;t<e.length;t++){const a=e[t];(new Image).src=a.frontImage,(new Image).src=a.rearImage}}};class i{constructor(e,t,a,n,i,d,c,o){this.cardViewModel=i,this.gameState=a,this.deckBuilderCallback=n,this.reshuffleCallback=d,this.updateCallback=c,this.eventBus=o;s.preloadCardImages(e);const l=setInterval(a=>{"complete"===document.readyState&&(clearInterval(l),this.cardViewModel.cards=e,this.buildDeck(),this.cardView=t,this.bindEventHandlers(),this.cardView.toggleLoadingVisibility(),this.cardView.toggleAppVisibility(),this.updateCards(),this.updateView(),this.gameState.getSavedState()&&this.cardView.showLoadGameModal(),this.eventBus&&this.eventBus.subscribe(r.a.RESHUFFLE,()=>{this.reshuffle()}))},1e3)}drawNextCard(){this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length-1]),this.updateCards(),this.cardViewModel.deckEmpty&&(this.cardViewModel.nextCard=null),this.cardViewModel.hideDrawnCards=!1,this.cardViewModel.setTopDiscard=!0}resetCards(){n.a.shuffle(this.cardViewModel.drawnCards),this.cardViewModel.cards=this.cardViewModel.cards.concat(n.a.deepCopy(this.cardViewModel.drawnCards)),n.a.shuffle(this.cardViewModel.cards),this.cardViewModel.drawnCards=[]}updateCards(){this.cardViewModel.currentCard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-1],this.cardViewModel.nextCard=this.cardViewModel.cards[this.cardViewModel.cards.length-1],this.cardViewModel.currentCard&&(this.cardViewModel.cards=this.cardViewModel.cards.filter(e=>e.id!=this.cardViewModel.currentCard.id)),this.cardViewModel.drawnCards.length>1&&this.cardViewModel.setTopDiscard&&(this.cardViewModel.topDiscard=this.cardViewModel.drawnCards[this.cardViewModel.drawnCards.length-2]),this.cardViewModel.deckEmpty=0===this.cardViewModel.cards.length}updateView(){this.cardView.updateCardDisplay(this.cardViewModel)}buildDeck(){this.deckBuilderCallback()}bindEventHandlers(){document.addEventListener("click",e=>{if(e.target&&e.target.dataset&&e.target.dataset.action){const t=e.target.dataset.action;"draw"===t?(this.drawNextCard(),this.updateView(this.cardViewModel),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(r.a.CARD_DRAWN,this.cardViewModel.currentCard)):"railEra"===t?(this.resetCards(),this.buildDeck(),this.updateCards(),this.cardViewModel.era="rail",this.updateView(),this.gameState.set(this.cardViewModel)):"load"===t?(this.cardViewModel=this.gameState.getSavedState(),this.updateView(),this.eventBus&&this.eventBus.publish(r.a.GAME_LOADED,this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(r.a.CARD_DRAWN,this.cardViewModel.currentCard)):"newGame"===t?(this.gameState.clear(),window.location.reload()):"reshuffle"===t&&this.reshuffle()}})}reshuffle(){this.reshuffleCallback?this.reshuffleCallback():this.resetCards(),this.updateCards(),this.updateView(),this.gameState.set(this.cardViewModel),this.updateCallback&&this.updateCallback(this.cardViewModel),this.eventBus&&this.eventBus.publish(r.a.RESHUFFLED)}}},function(e,t,a){"use strict";var n=a(1);a.d(t,"a",(function(){return s}));const r=new class{constructor(){this.currentEnvironment=n.a.findBootstrapEnvironment()}createCurrentCardTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}createNextCardTemplate(e){if(!e)return'<div id="nextCardImageContainer"></div>';return`<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.rearImage}"/></div>`}createDiscardPileTemplate(e){if(!e)return'<div id="currentCardImageContainer"></div>';return`<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${e.frontImage}"/></div>`}get slideClass(){return"md"===this.currentEnvironment||"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?"slide":"slide-mobile"}get imageHeight(){return"lg"===this.currentEnvironment||"xl"===this.currentEnvironment?50:30}};class s{get currentCardContainer(){return document.getElementById("currentCard")}get nextCardContainer(){return document.getElementById("nextCard")}get discardPileContainer(){return document.getElementById("discardPile")}updateCardDisplay(e){if(this.toggleDrawButton(e),this.hideRailEraButton(e),e.deckEmpty&&e.era&&"rail"===e.era){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}else if(e.deckEmpty){const e=document.querySelector("[data-action='newGame']");e&&e.classList.remove("d-none")}e.hideDrawnCards||(this.currentCardContainer.innerHTML=r.createCurrentCardTemplate(e.currentCard)),e.showDiscardPile&&e.topDiscard&&(this.discardPileContainer.innerHTML=r.createDiscardPileTemplate(e.topDiscard)),this.nextCardContainer.innerHTML=r.createNextCardTemplate(e.nextCard)}hideRailEraButton(e){"rail"===e.era&&document.querySelectorAll("[data-canal]").forEach(e=>e.classList.add("d-none"))}toggleDrawButton(e){const t=document.querySelector("[data-action=draw]"),a=document.querySelector("[data-action=reshuffle]");e.deckEmpty?(t.classList.add("disabled"),t.disabled=!0,a&&!e.showReshuffle&&a.classList.remove("d-none")):(t.classList.remove("disabled"),a&&!e.showReshuffle&&a.classList.add("d-none"),t.disabled=!1)}showLoadGameModal(){$("#loadModal").modal("show")}toggleLoadingVisibility(){const e=document.getElementById("loading");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}toggleAppVisibility(){const e=document.getElementById("app");e.classList.contains("d-none")?e.classList.remove("d-none"):e.classList.add("d-none")}}},function(e,t,a){"use strict";const n={},r=function(){let e=0;return function(){return e+=1,e}}();const s={publish:function(e,t){n[e]&&Object.keys(n[e]).forEach(a=>n[e][a](t))},subscribe:function(e,t){const a=r();return n[e]||(n[e]={}),n[e][a]=t,{unsubscribe:()=>{delete n[e][a],0===Object.keys(n[e]).length&&delete n[e]}}}};t.a=s},,function(e,t,a){"use strict";a.r(t);var n=a(5),r=a(6),s=a(0);const i="/cards/eastern-front/images/",d=i+"back.png";var c={cards:[new s.a(1,i+"1.png",d,"command","G11"),new s.a(2,i+"2.png",d,"command","B03"),new s.a(3,i+"3.png",d,"command","J17"),new s.a(4,i+"4.png",d,"command","B08"),new s.a(5,i+"5.png",d,"command","I06"),new s.a(6,i+"6.png",d,"command","G15"),new s.a(7,i+"7.png",d,"command","K12"),new s.a(8,i+"8.png",d,"command","H03"),new s.a(9,i+"9.png",d,"command","B15"),new s.a(10,i+"10.png",d,"command","G10"),new s.a(11,i+"11.png",d,"","C04"),new s.a(12,i+"12.png",d,"","I14"),new s.a(13,i+"13.png",d,"","D10"),new s.a(14,i+"14.png",d,"","J03"),new s.a(15,i+"15.png",d,"","H17"),new s.a(16,i+"16.png",d,"reshuffle","I08"),new s.a(17,i+"17.png",d,"","F05"),new s.a(18,i+"18.png",d,"","D14"),new s.a(19,i+"19.png",d,"","E08"),new s.a(20,i+"20.png",d,"reshuffle","B05"),new s.a(21,i+"21.png",d,"","L15"),new s.a(22,i+"22.png",d,"","B10"),new s.a(23,i+"23.png",d,"","L03"),new s.a(24,i+"24.png",d,"","F17"),new s.a(25,i+"25.png",d,"","I10"),new s.a(26,i+"26.png",d,"","H05"),new s.a(27,i+"27.png",d,"","D17"),new s.a(28,i+"28.png",d,"","E12"),new s.a(29,i+"29.png",d,"","D03"),new s.a(30,i+"30.png",d,"","J15"),new s.a(31,i+"31.png",d,"","D08"),new s.a(32,i+"32.png",d,"","L05"),new s.a(33,i+"33.png",d,"","F15"),new s.a(34,i+"34.png",d,"","I12"),new s.a(35,i+"35.png",d,"","G07"),new s.a(36,i+"36.png",d,"","D15"),new s.a(37,i+"37.png",d,"","G08"),new s.a(38,i+"38.png",d,"","D05"),new s.a(39,i+"39.png",d,"","L17"),new s.a(40,i+"40.png",d,"","G12"),new s.a(41,i+"41.png",d,"","J05"),new s.a(42,i+"42.png",d,"reshuffle","H15"),new s.a(43,i+"43.png",d,"","C12"),new s.a(44,i+"44.png",d,"","F03"),new s.a(45,i+"45.png",d,"","B17"),new s.a(46,i+"46.png",d,"command","K08"),new s.a(47,i+"47.png",d,"command","C07"),new s.a(48,i+"48.png",d,"command","K13"),new s.a(49,i+"49.png",d,"command","F10"),new s.a(50,i+"50.png",d,"command","K07"),new s.a(51,i+"51.png",d,"command","E13"),new s.a(52,i+"52.png",d,"command","K10"),new s.a(53,i+"53.png",d,"command","G05"),new s.a(54,i+"54.png",d,"command","G17"),new s.a(55,i+"55.png",d,"command","B12")]};const o=new(a(3).a);var l=a(4),u=a(1);const h=[new class{constructor(e,t,a){this.id=e,this.startCard=t,this.endCard=a,this.missionInstructionsUrl="/cards/eastern-front/pdfs/"+this.id+".pdf"}}("search-and-destroy",15,55)];var m=function(){const e=new URLSearchParams(window.location.search).get("mission");return h.filter(t=>t.id===e)[0]},w=a(2);function g(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var p=a(7);const f={A02:"B01",A04:"D01",A06:"F01",A08:"H01",A10:"J01",A12:"L01",A14:"N01",A16:"P01",A18:"R01",B01:"A01",B03:"C01",B05:"E01",B07:"G01",B09:"I01",B11:"K01",B13:"M01",B15:"O01",B17:"Q01",B19:"S01",B02:"B02",B04:"D02",B06:"F02",B08:"H02",B10:"J02",B12:"L02",B14:"N02",B16:"P02",B18:"R02",C01:"A02",C03:"C02",C05:"E02",C07:"G02",C09:"I02",C11:"K02",C13:"M02",C15:"O06",C17:"Q02",C19:"S02",C02:"B03",C04:"D03",C06:"F03",C08:"H03",C10:"J03",C12:"L03",C14:"N03",C16:"P03",C18:"R03",D01:"A03",D03:"C03",D05:"E03",D07:"G03",D09:"I03",D11:"K03",D13:"M03",D15:"O03",D17:"Q03",D19:"S03",D02:"B04",D04:"D04",D06:"F04",D08:"H04",D10:"J04",D12:"L04",D14:"N04",D16:"P04",D18:"R04",E01:"A04",E03:"C04",E05:"E04",E07:"G04",E09:"I04",E11:"K04",E13:"M04",E15:"O04",E17:"Q04",E19:"S04",E02:"B05",E04:"D05",E06:"F05",E08:"H05",E10:"J05",E12:"L05",E14:"N05",E16:"P05",E18:"R05",F01:"A05",F03:"C05",F05:"E05",F07:"G05",F09:"I05",F11:"K05",F13:"M05",F15:"O05",F17:"Q05",F19:"S05",F02:"B06",F04:"D06",F06:"F06",F08:"H06",F10:"J06",F12:"L06",F14:"N06",F16:"P06",F18:"R06",G01:"A06",G03:"C06",G05:"E06",G07:"G06",G09:"I06",G11:"K06",G13:"M06",G15:"O06",G17:"Q06",G19:"S06",G02:"B07",G04:"D07",G06:"F07",G08:"H07",G10:"J07",G12:"L07",G14:"N07",G16:"P07",G18:"R07",H01:"A07",H03:"C07",H05:"E07",H07:"G07",H09:"I07",H11:"K07",H13:"M07",H15:"O07",H17:"Q07",H19:"S07",H02:"B08",H04:"D08",H06:"F08",H08:"H08",H10:"J08",H12:"L08",H14:"N08",H16:"P08",H18:"R08",I01:"A08",I03:"C08",I05:"E08",I07:"G08",I09:"I08",I11:"K08",I13:"M08",I15:"O08",I17:"Q08",I19:"S08",I02:"B09",I04:"D09",I06:"F09",I08:"H09",I10:"J09",I12:"L09",I14:"N09",I16:"P09",I18:"R09",J01:"A09",J03:"C09",J05:"E09",J07:"G09",J09:"I09",J11:"K09",J13:"M09",J15:"O09",J17:"Q09",J19:"S09",J02:"B10",J04:"D10",J06:"F10",J08:"H10",J10:"J10",J12:"L10",J14:"N10",J16:"P10",J18:"R10",K01:"A10",K03:"C10",K05:"E10",K07:"G10",K09:"I10",K11:"K10",K13:"M10",K15:"O10",K17:"Q10",K19:"S10",K02:"B11",K04:"D11",K06:"F11",K08:"H11",K10:"J11",K12:"L11",K14:"N11",K16:"P11",K18:"R11",L01:"A11",L03:"C11",L05:"E11",L07:"G11",L09:"I11",L11:"K11",L13:"M11",L15:"011",L17:"Q11",L19:"S11",L02:"B12",L04:"D12",L06:"F12",L08:"H12",L10:"J12",L12:"L12",L14:"N12",L16:"P12",L18:"R12",M01:"A12",M03:"C12",M05:"E12",M07:"G12",M09:"I12",M11:"K12",M13:"M12",M15:"012",M17:"Q12",M19:"S12"};new class{constructor(e){e.subscribe(w.a.CARD_DRAWN,e=>{document.getElementById("currentCard").insertAdjacentHTML("beforeend",`<p class="badge-dark col-6 col-sm-3 mx-auto mt-2 rounded text-center">3rd Edition Hex: ${f[e.group]}</p>`)})}}(p.a);const C=new l.a,M=m();document.getElementById("body").style.cssText=`         \n        background: url(./images/${M.id}.png) no-repeat center\n          center fixed;\n        -webkit-background-size: cover;\n        -moz-background-size: cover;\n        -o-background-size: cover;\n        background-size: cover;`;const E=new class{constructor(e){this.key=`easternfront:${e}`}set(e){o.save(this.key,e)}clear(){o.clear(this.key)}getSavedState(){return o.load(this.key)}showLoadGameModal(){$("#loadModal").modal("show")}}(M),v=new class{constructor(e,t){g(this,"removeSelectedCards",(e,t)=>{for(let a=0;a<e.length;a++){let n=e[a];t=t.filter(e=>e.id!=n.id)}return t}),g(this,"buildDeck",()=>{const e=m(),t=this.deepCopy(this.cardViewModel.cards.slice(e.startCard-1,e.endCard));this.cardViewModel.cards=t,u.a.shuffle(this.cardViewModel.cards)}),this.cardViewModel=e,this.cardViewModel.round=1,this.utilities=u.a,this.cardViewModel.showReshuffle=!0,t.subscribe(w.a.RESHUFFLED,()=>{document.getElementById("draw").classList.remove("d-none")}),document.addEventListener("click",e=>{const a=e.target;if(a&&a.dataset.action&&"destroy"==a.dataset.action){const e=document.getElementById("message"),a=this.cardViewModel.cards.filter(e=>"command"==e.instructions);if(a.length<=1)return void(e.innerHTML='<p class="badge-dark text-center col col-sm-6 mx-auto">No command cards removed from game.</p>');{const n=[a[0]];this.cardViewModel.cards=this.removeSelectedCards(n,this.cardViewModel.cards),t.publish(w.a.RESHUFFLE),e.innerHTML=`<p class="badge-dark text-center col col-sm-6 mx-auto">Command card: ${a[0].id} removed from game.</p>`}const n=setTimeout(()=>{e.innerHTML="",clearTimeout(n)},3e3)}})}deepCopy(e){return JSON.parse(JSON.stringify(e))}}(C,p.a),b=new r.a;new n.a(c.cards,b,E,v.buildDeck,C,null,null,p.a)}]);