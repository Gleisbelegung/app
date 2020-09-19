import TrainDetails from './TrainDetails';
import TrainStop from './TrainStop';

export default class Train {
	public readonly name: string;

	public readonly id: number;
	private _details: TrainDetails;
	private _stops: TrainStop[];

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this._stops = [];
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
