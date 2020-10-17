import { DateTime } from 'luxon';
import uid from 'uid';
import stc from 'string-to-color';
import TrainDetails from './TrainDetails';
import TrainStop from './TrainStop';

export default class Train {
	public readonly id: number;
	public readonly uid: string;
	public readonly name: string;
	public readonly color: string;
	private _details: TrainDetails;
	private _stops: TrainStop[];
	private _isFullyLoaded: boolean;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this._stops = [];

		this.uid = uid();
		this.color = stc(this.name);
	}

	public get details(): TrainDetails {
		return this._details;
	}

	public set details(v: TrainDetails) {
		this._details = v;
	}

	public get stops(): TrainStop[] {
		return this._stops;
	}

	public set stops(v: TrainStop[]) {
		this._stops = v;
	}

	public get isFullyLoaded(): boolean {
		return this._isFullyLoaded;
	}

	public set isFullyLoaded(v: boolean) {
		this._isFullyLoaded = v;
	}

	public getStopByTime(time: DateTime): TrainStop | null {
		for (let i = 0; i < this._stops.length; i += 1) {
			const stop = this._stops[i];
			if (time >= stop.arrival && time <= stop.departure) {
				return stop;
			}
		}
		return null;
	}
}
