import { ICommandHandler } from "./iCommandHandler";
import { UpdateEncounterCommand } from "../updateEncounterCommand";
import { ILocalStorageService } from "@/services/interfaces/ILocalStorageService";
import { IEncounter } from "@/models/interfaces/IEncounter";
import { editorMutationDefinitions } from "@/store/modules/editorMutationDefinitions";
import { IEditorModule } from "@/store/modules/editor/editorModule";

export class UpdateEncounterCommandHandler
  implements ICommandHandler<UpdateEncounterCommand> {
  private _updateEncounterCommand: UpdateEncounterCommand;
  private _localStorageService: ILocalStorageService<IEncounter>;
  private _editorModule: IEditorModule;

  constructor(
    updateEncounterCommand: UpdateEncounterCommand,
    localStorageService: ILocalStorageService<IEncounter>,
    editorModule: IEditorModule
  ) {
    this._updateEncounterCommand = updateEncounterCommand;
    this._localStorageService = localStorageService;
    this._editorModule = editorModule;
  }

  handle(): void {
    this._editorModule.commit(
      editorMutationDefinitions.UPDATE_ENCOUNTER,
      this._updateEncounterCommand.encounter
    );
    this._localStorageService.set(
      this._updateEncounterCommand.encounter.id,
      this._updateEncounterCommand.encounter
    );
  }
}
