import { Encounter } from './interfaces/encounter';

export class GeneralEncounter implements Encounter {
  private _id: symbol;
  private _title: String;
  private _skillPoints: Number;
  private _isSpecialEncounter: Boolean;

  constructor(
    id: symbol,
    title: String,
    skillPoints: Number
  ) {
    this._id = id;
    this._title = title;
    this._skillPoints = skillPoints;
    this._isSpecialEncounter = false;
  }

  public get id(): symbol {
    return this._id;
  }
  public get title(): String {
    return this._title;
  }
  public get skillPoints(): Number {
    return this._skillPoints;
  }
  public get isSpecialEncounter(): Boolean {
    return this._isSpecialEncounter;
  }
}