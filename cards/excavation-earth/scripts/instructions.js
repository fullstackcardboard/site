export default class Instructions {
  constructor() {
    this.bindEvents();
  }

  bindEvents = () => {
    document.addEventListener("click", (e) => {
      if (e.target && e.target.dataset && e.target.dataset.instructions) {
        this[e.target.dataset.instructions].call();
      }
    });
  };

  command = () => {
    this.setModalBody(` <div class="container">
      <h4>Command</h4>
      If Zu has 0 cubes available to place, it takes a Failed Action instead.
      Each of the Command cards specifies a specific Market and matching Command
      Centre Zu is looking to influence. Zu will place:
      <ul>
        <li>1 Trader in the Market specified</li>
        <li>
          If Zu has no Traders there already; 1 Envoy in the matching Command
          Centre
        </li>
      </ul>
      <em
        >Note: If Zu only has 1 cube available to place, it skips placing a
        Trader and just places an Envoy.</em
      >
    </div>
      ${this.failedAction()}`);
    this.showModal();
  };

  excavate = () => {
    this.setModalBody(` 
    <div class="container">
    <h4>Excavate</h4>
    The Excavate cards specify one of two options:
      <ul>
        <li>
          Excavate 1-2 Artefacts from one of the two colours stated (whichever
          is most popular)
        </li>
        <li>
          OR, Excavate 1-2 Artefacts from the most popular Artefact colour.
          <ul>
            <li>
              If the most popular colour has no legal Artefacts available to
              Excavate from any Dig Sites, go to the next most popular colour,
              etc., until a colour is chosen.
            </li>
          </ul>
        </li>
      </ul>
      If Zu needs to choose between multiple colours when determining which is
      most popular, it chooses from the following priority list:
      <ul>
        <li>
          A colour where it can pick up the most Artefacts (i.e. taking 2 is
          preferable to taking 1, if Zu has space in its Cargo Hold, but noting
          the limitations below on which Artefacts it can pick up);
        </li>
        <li>
          A colour for which it does not currently have any Artefacts;
        </li>
        <li>
          A colour for which it does not currently have any Artefacts;
        </li>
        <li>A colour for which you have the fewest Artefacts</li>
        <li>Then, Random choice between the tied colours.</li>
      </ul>
      Zu will excavate 2 Artefacts from dig sites if possible; else if will
      settle for just excavating 1 Artefact. <br />To determine whether Zu can
      excavate a specific Artefact, check the following list of conditions (for
      each Artefact Zu wants to excavate):
      <ul>
        <li>
          If Zu’s Cargo Hold and Hidden Hold are both full when trying to
          excavate the first Artefact, it will Offload to Black Market (see
          Smuggle) instead;
        </li>
        <li>
          If Zu has no space left in its Cargo Hold when trying to excavate the
          first Artefact, but does have space in its Hidden Hold, it will
          Acquire from Black Market (see
          <a data-instructions="smuggle">Smuggle</a>) instead;
        </li>
        <li>
          Zu tries to excavate Artefacts of the chosen colour, ignoring
          Artefacts that it already has samples for in its Gallery or already
          has copies of in its Cargo or Hidden Holds. It chooses the specific
          Artefacts according to this priority:
          <ul>
            <li>
              Artefacts of the chosen colour that you do not have samples of;
            </li>
            <li>
              Artefacts with fewest copies of themselves on the map;
            </li>
            <li>
              Rarest Artefacts (i.e. highest cost);
            </li>
            <li>
              Then, random choice between the tied Artefacts.
            </li>
          </ul>
        </li>
      </ul>
      If Zu is unable to excavate any Artefacts of the desired colours (i.e.
      none left of that colour on the map, or it ignored all available Artefacts
      as it already has samples/copies of all of them), it will Acquire from
      Black Market (see
      <a data-instructions="smuggle">Smuggle</a>) instead.<br/> If Zu excavated
      anything, place the chosen Artefacts in Zu’s Cargo Hold. Then, if Zu has
      cubes available, place 1 cube per Artefact it Excavated into its Gallery
      to mark that it sampled that Artefact. If Zu took 2 Artefacts but has only
      1 cube left to place, randomly decide which Artefact it places the sample
      cube for.
    </div>
      ${this.failedAction()}`);
    this.showModal();
  };

  smuggle = () => {
    this.setModalBody(
      `<div class="container">
        <h4>Smuggle</h4>
        Zu will only take a Smuggle action as a result of being unable to
        excavate an Artefact during an Excavate action. Which Smuggle action Zu
        takes is determined by what Zu failed to do during the Excavate action -
        see the <a data-instructions="excavate">Excavate</a> action for details.
        <h5>Acquire from Black Market</h5>
        When wanting to Acquire from the Black Market, Zu will always acquire
        just 1 Artefact in a turn. The colour of Artefact Zu wants will have
        been determined in the Excavate action. Zu pays for purchases from the
        Black Market in the same way you do (Artefact cost + 1).
        <br />Restrictions on which Artefact Zu will purchase:
        <ul>
          <li>
            It must be one that Zu does not already have a sample of in its
            Gallery, or a copy of in its Cargo/Hidden Hold;
          </li>
          <li>
            Zu must have enough Credits to purchase the Artefact in question; if
            it cannot afford the desired Artefact, it will try to Offload to
            Black Market instead (see below).
          </li>
        </ul>
        If there is not a valid Artefact of the desired colour available to
        acquire in the Black Market:
        <ul>
          <li>
            Zu picks the next available colour to the right within the Black
            Market (continuing left to right, and wrapping around, until an
            available option is found);
          </li>
          <li>
            If there are no valid Artefacts of any colour in the Black Market,
            Zu will Offload to Black Market instead (see below).
          </li>
        </ul>
        If Zu was able to acquire an Artefact from the Black Market, it places
        the Artefact in its Hidden Hold; if the Hidden Hold is full, it instead
        places the Artefact in its Cargo Hold. Then, if Zu has cubes available,
        place a cube for the Artefact it bought in its Gallery to mark that it
        sampled that Artefact.

        <h5>Offload to Black Market</h5>
        If Zu has no Artefacts to offload when trying to Offload to Black
        Market, it takes a Failed Action.
        <br />When Zu offloads to the Black Market, it will offload its 2 most
        expensive Artefacts, of 2 different colours (as per the core rules). If
        Zu only has 1 Artefact to offload, it offloads just that one.
        <br />Break ties for most expensive Artefact in the following priority
        order: •
        <ul>
          <li>Artefacts from the Cargo Hold before the Hidden Hold;</li>
          <li>Artefacts from the least popular colours;</li>
          <li>Then, choose randomly between the tied Artefacts.</li>
        </ul>
      </div>
      ${this.failedAction()}`
    );
    this.showModal();
  };

  market = () => {
    this.setModalBody(` <div class="container">
      <h4>Market</h4>
      If Zu has 0 cubes available to place, or all Markets have at least 1 Zu
      Trader in already, it takes a Failed Action instead.<br />
      Zu places 1-2 Traders (2 if possible, 1 otherwise), each in a different
      Market where Zu has no Traders yet. Place Zu’s cube(s) in the Trader spot
      in the chosen Market.<br />
      If tied between Markets, Zu chooses according to this priority list:
      <ul>
        <li>
          The Market with the most Buyers, including white, matching Zu’s single
          most popular Artefact;
        </li>
        <li>
          The Market that would receive the largest influence swing (assume they
          will get promoted to Envoys at some point);
        </li>
        <li>
          Random choice between the tied Markets.
        </li>
      </ul>
      Zu then adds 1 white Buyer (if available) and 1 coloured Buyer (if
      available) to each of the Markets where the Traders were added. The
      coloured Buyer should be the colour that matches Zu’s most popular
      artefact, then the colour Zu has more of, then random choice.
    </div>
      ${this.failedAction()}`);
    this.showModal();
  };

  sell = () => {
    this.setModalBody(`
    <div class="container">
      <h4>Sell</h4>
      If Zu has no Artefacts to Sell or if there are no matching coloured/white
      Buyers for any of its Artefacts at the Markets where it has Traders (this
      includes when it has no Traders in any Markets), it takes a Failed Action
      instead.<br />
      Zu always wants to sell to the most lucrative Market(s). Zu will always
      sell to as many Markets as it is legally able to (i.e. up to three, with a
      Zu Trader in each Market in question).<br />
      Zu sells its chosen Artefact(s) as per the core Sell action rules. If it
      has a choice of Artefacts in the chosen colour, it favours selling the
      cheapest ones. If tied for cheapest, choose randomly between the tied
      Artefacts.
    </div>
      ${this.failedAction()}`);
    this.showModal();
  };

  snipe = () => {
    this.setModalBody(
      `<div class="container">
      <h4>Snipe</h4>
        If Zu has no Artefacts to Sell, or no Traders and no cubes to place as
        Traders, or there are no Buyers in Markets matching any of its
        Artefacts, it takes a Failed Action instead.<br />
        Zu wants to sell 1 Artefact, possibly adding a Trader to a Market first
        in order to achieve this. To pick the Market to sell at, it picks
        whichever Market has most Buyers matching whichever Artefact colour Zu
        has at least one of, but least of (if tied, it picks the highest
        popularity Artefact; and if still tied, randomly chooses). If tied
        between Markets, it picks the most lucrative Market.<br />
        Then:
        <ul>
          <li>
            If it has no Trader present in the chosen Market, it places 1 Trader
            there;
          </li>
          <li>
            It takes a Sell action, selling a single Artefact matching the Buyer
            colour chosen (cheapest Artefact if tied) at the chosen Market,
            using usual Sell action rules.
          </li>
        </ul>
      </div>
      ${this.failedAction()}`
    );
    this.showModal();
  };

  survey = () => {
    this.setModalBody(
      `<div class="container">
      <h4>Survey</h4>
        Zu discards the left-most card with no cube on it from the Surveyor
        Forecast, then draws a card from the Action deck and places it face-up
        in the space in the Forecast line-up.<br />
        It then places one of its cubes on that card (if it has any, else it
        doesn’t place a cube). It then draws 2 Artefacts from the supply,
        matching the colour of the card it placed, and then:
        <ul>
          <li>
            Buys one of the Artefacts for twice its price, if it doesn’t have
            one or both, and it has room in its Cargo Hold, and it can afford
            it. If it doesn’t have either Artefact drawn, it picks the one it
            can afford, then the rarest of the two, then random choice;
          </li>
          <li>
            Places the remaining Artefact onto the map; if it didn’t buy an
            Artefact, it randomly picks which one to place on the map, and
            discards the other.
          </li>
        </ul>
      </div>
      ${this.failedAction()}`
    );
    this.showModal();
  };

  failedAction = () => {
    return `<div class="container">
        <h4>Failed Action</h4>
        If Zu is ever unable to do anything the drawn card says to do, it gains
        10 Credits instead.
      </div>`;
  };

  showModal = () => {
    const modal = $("#instructionsModal");
    modal.modal("show");
  };

  setModalBody = (html) => {
    const modalBody = document.getElementById("instructionsModalBody");
    modalBody.innerHTML = html;
  };
}
