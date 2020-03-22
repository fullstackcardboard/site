import { IEncounter } from './interfaces/IEncounter';

export class Encounter implements IEncounter {
  private _id: Symbol;
  private _title: String;
  private _skillPoints: Number;
  private _isSpecialEncounter: Boolean;

  constructor(
    id: Symbol,
    title: String,
    skillPoints: Number,
    isSpecialEncounter: Boolean
  ) {
    this._id = id;
    this._title = title;
    this._skillPoints = skillPoints;
    this._isSpecialEncounter = isSpecialEncounter;
  }

  public get id(): Symbol {
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