import { Encounter } from "./interfaces/encounter";
import { Choice } from "./interfaces/choice";

export class GeneralEncounter implements Encounter {
  private _id: symbol;
  private _title: String;
  private _type: String;
  private _text: Array<Choice>;
  private _skillPoints: Number;
  private _isSpecialEncounter: Boolean;
  private _linkedEncounters: Array<Encounter>;

  constructor(
    id: symbol,
    title: String,
    type: String,
    text: Array<Choice>,
    skillPoints: Number,
    linkedEncounters: Array<Encounter>
  ) {
    this._id = id;
    this._title = title;
    this._type = type;
    this._text = text;
    this._skillPoints = skillPoints;
    this._isSpecialEncounter = false;
    this._linkedEncounters = linkedEncounters;
  }

  public get id(): symbol {
    return this._id;
  }
  public get title(): String {
    return this._title;
  }
  public get type(): String {
    return this._type;
  }
  public get text(): Array<Choice> {
    return this._text;
  }
  public get skillPoints(): Number {
    return this._skillPoints;
  }
  public get isSpecialEncounter(): Boolean {
    return this._isSpecialEncounter;
  }
  public get linkedEncounters(): Array<Encounter> {
    return this._linkedEncounters;
  }
}
