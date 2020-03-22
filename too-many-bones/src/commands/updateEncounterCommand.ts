import { Encounter } from '@/models/Encounter';

export class UpdateEncounterCommand{
    private _encounter: Encounter;

    constructor(encounter: Encounter) {
        this._encounter = encounter;
    }

    public get encounter(): Encounter{
        return this._encounter;
    }
}