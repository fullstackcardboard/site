import { ILocalStorageService } from "@/services/interfaces/ILocalStorageService";
import { IEncounter } from "@/models/interfaces/IEncounter";
import { editorMutationDefinitions } from "@/store/modules/editorMutationDefinitions";
import { IEditorModule } from "@/store/modules/editor/editorModule";

export class UpdateEncounterCommand {
  private _encounter: IEncounter;
  private _localStorageService: ILocalStorageService<IEncounter>;
  private _editorModule: IEditorModule;

  constructor(
    encounter: IEncounter,
    localStorageService: ILocalStorageService<IEncounter>,
    editorModule: IEditorModule
  ) {
    this._encounter = encounter;
    this._localStorageService = localStorageService;
    this._editorModule = editorModule;
  }

  handle(): void {
    this._editorModule.commit(
      editorMutationDefinitions.UPDATE_ENCOUNTER,
      this._encounter
    );
    this._localStorageService.set(
      this._encounter.id,
      this._encounter
    );
  }
}
