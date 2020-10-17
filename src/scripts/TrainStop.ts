import { DateTime } from 'luxon';
import Platform from './Platform';

export default class TrainStop {
	public readonly arrival: DateTime;
	public readonly departure: DateTime;
	public readonly platform: Platform;
	public readonly plannedPlatform: Platform;
	public readonly rawFlags: string;
	private successorId: number;
	private _isPassing: boolean;

	constructor(
		arrival: DateTime,
		departure: DateTime,
		platform: Platform,
		plannedPlatform: Platform,
		rawFlags: string,
	) {
		this.arrival = arrival;
		this.departure = departure;
		this.platform = platform;
		this.plannedPlatform = plannedPlatform;
		this.rawFlags = rawFlags;
	}

	public setSuccessorId(v : number) {
		this.successorId = v;
	}

	public getSuccessorId(): number {
		return this.successorId;
	}

	public set isPassing(v : boolean) {
		this._isPassing = v;
	}

	public get isPassing(): boolean {
		return this._isPassing;
	}

	public hasSuccessor(): boolean {
		return this.successorId !== undefined;
	}
}
