import events from "../../scripts/events/cardEvents.js";

const map = {
  A02: "B01",
  A04: "D01",
  A06: "F01",
  A08: "H01",
  A10: "J01",
  A12: "L01",
  A14: "N01",
  A16: "P01",
  A18: "R01",
  B01: "A01",
  B03: "C01",
  B05: "E01",
  B07: "G01",
  B09: "I01",
  B11: "K01",
  B13: "M01",
  B15: "O01",
  B17: "Q01",
  B19: "S01",
  B02: "B02",
  B04: "D02",
  B06: "F02",
  B08: "H02",
  B10: "J02",
  B12: "L02",
  B14: "N02",
  B16: "P02",
  B18: "R02",
  C01: "A02",
  C03: "C02",
  C05: "E02",
  C07: "G02",
  C09: "I02",
  C11: "K02",
  C13: "M02",
  C15: "O06",
  C17: "Q02",
  C19: "S02",
  C02: "B03",
  C04: "D03",
  C06: "F03",
  C08: "H03",
  C10: "J03",
  C12: "L03",
  C14: "N03",
  C16: "P03",
  C18: "R03",
  D01: "A03",
  D03: "C03",
  D05: "E03",
  D07: "G03",
  D09: "I03",
  D11: "K03",
  D13: "M03",
  D15: "O03",
  D17: "Q03",
  D19: "S03",
  D02: "B04",
  D04: "D04",
  D06: "F04",
  D08: "H04",
  D10: "J04",
  D12: "L04",
  D14: "N04",
  D16: "P04",
  D18: "R04",
  E01: "A04",
  E03: "C04",
  E05: "E04",
  E07: "G04",
  E09: "I04",
  E11: "K04",
  E13: "M04",
  E15: "O04",
  E17: "Q04",
  E19: "S04",
  E02: "B05",
  E04: "D05",
  E06: "F05",
  E08: "H05",
  E10: "J05",
  E12: "L05",
  E14: "N05",
  E16: "P05",
  E18: "R05",
  F01: "A05",
  F03: "C05",
  F05: "E05",
  F07: "G05",
  F09: "I05",
  F11: "K05",
  F13: "M05",
  F15: "O05",
  F17: "Q05",
  F19: "S05",
  F02: "B06",
  F04: "D06",
  F06: "F06",
  F08: "H06",
  F10: "J06",
  F12: "L06",
  F14: "N06",
  F16: "P06",
  F18: "R06",
  G01: "A06",
  G03: "C06",
  G05: "E06",
  G07: "G06",
  G09: "I06",
  G11: "K06",
  G13: "M06",
  G15: "O06",
  G17: "Q06",
  G19: "S06",
  G02: "B07",
  G04: "D07",
  G06: "F07",
  G08: "H07",
  G10: "J07",
  G12: "L07",
  G14: "N07",
  G16: "P07",
  G18: "R07",
  H01: "A07",
  H03: "C07",
  H05: "E07",
  H07: "G07",
  H09: "I07",
  H11: "K07",
  H13: "M07",
  H15: "O07",
  H17: "Q07",
  H19: "S07",
  H02: "B08",
  H04: "D08",
  H06: "F08",
  H08: "H08",
  H10: "J08",
  H12: "L08",
  H14: "N08",
  H16: "P08",
  H18: "R08",
  I01: "A08",
  I03: "C08",
  I05: "E08",
  I07: "G08",
  I09: "I08",
  I11: "K08",
  I13: "M08",
  I15: "O08",
  I17: "Q08",
  I19: "S08",
  I02: "B09",
  I04: "D09",
  I06: "F09",
  I08: "H09",
  I10: "J09",
  I12: "L09",
  I14: "N09",
  I16: "P09",
  I18: "R09",
  J01: "A09",
  J03: "C09",
  J05: "E09",
  J07: "G09",
  J09: "I09",
  J11: "K09",
  J13: "M09",
  J15: "O09",
  J17: "Q09",
  J19: "S09",
  J02: "B10",
  J04: "D10",
  J06: "F10",
  J08: "H10",
  J10: "J10",
  J12: "L10",
  J14: "N10",
  J16: "P10",
  J18: "R10",
  K01: "A10",
  K03: "C10",
  K05: "E10",
  K07: "G10",
  K09: "I10",
  K11: "K10",
  K13: "M10",
  K15: "O10",
  K17: "Q10",
  K19: "S10",
  K02: "B11",
  K04: "D11",
  K06: "F11",
  K08: "H11",
  K10: "J11",
  K12: "L11",
  K14: "N11",
  K16: "P11",
  K18: "R11",
  L01: "A11",
  L03: "C11",
  L05: "E11",
  L07: "G11",
  L09: "I11",
  L11: "K11",
  L13: "M11",
  L15: "011",
  L17: "Q11",
  L19: "S11",
  L02: "B12",
  L04: "D12",
  L06: "F12",
  L08: "H12",
  L10: "J12",
  L12: "L12",
  L14: "N12",
  L16: "P12",
  L18: "R12",
  M01: "A12",
  M03: "C12",
  M05: "E12",
  M07: "G12",
  M09: "I12",
  M11: "K12",
  M13: "M12",
  M15: "012",
  M17: "Q12",
  M19: "S12",
};

export default class HexMap {
  constructor(eventBus) {
    eventBus.subscribe(events.CARD_DRAWN, (card) => {
      const currentCardContainer = document.getElementById("currentCard");
      currentCardContainer.insertAdjacentHTML(
        "beforeend",
        `<p class="badge-dark col-6 col-sm-3 mx-auto mt-2 rounded text-center">3rd Edition Hex: ${
          map[card.group]
        }</p>`
      );
    });
  }
}
