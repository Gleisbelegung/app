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

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this._stops = [];

		this.uid = uid();
		this.color = stc(this.uid);
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
}
