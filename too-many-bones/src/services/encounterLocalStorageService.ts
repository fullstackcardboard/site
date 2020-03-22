import { LocalStorageService } from "./interfaces/localStorageService";
import { GeneralEncounter } from "@/models/Encounter";

export class EncounterLocalStorageService
  implements LocalStorageService<GeneralEncounter> {
  get(key: symbol): GeneralEncounter {
    throw new Error("Method not implemented.");
  }
  set(key: symbol, value: GeneralEncounter): void {
    throw new Error("Method not implemented.");
  }
}
