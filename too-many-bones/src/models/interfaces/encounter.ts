import { Choice } from "./choice";

export interface Encounter {
  id: symbol;
  title: String;
  type: String;
  text: Array<Choice>;
  skillPoints: Number;
  isSpecialEncounter: Boolean;
  linkedEncounters: Array<Encounter>;
}
