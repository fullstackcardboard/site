import { LocalStorageService } from "@/services/interfaces/localStorageService";
import { Encounter } from "@/models/interfaces/encounter";
import { editorMutationDefinitions } from "@/store/modules/editorMutationDefinitions";
import { Store } from 'vuex';

export class UpdateEncounterCommand {
  private _encounter: Encounter;
  private _localStorageService: LocalStorageService<Encounter>;
  private _store: Store<any>;

  constructor(
    encounter: Encounter,
    localStorageService: LocalStorageService<Encounter>,
    store: Store<any>
  ) {
    this._encounter = encounter;
    this._localStorageService = localStorageService;
    this._store = store;
  }

  execute(): void {
    this._store.commit(
      editorMutationDefinitions.UPDATE_ENCOUNTER,
      this._encounter
    );
    this._localStorageService.set(this._encounter.id, this._encounter);
  }
}
