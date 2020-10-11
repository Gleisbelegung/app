import { DateTime } from 'luxon';
import Platform from './Platform';

export default class TrainStop {
	public readonly arrival: DateTime;
	public readonly departure: DateTime;
	public readonly platform: Platform;
	public readonly plannedPlatform: Platform;
	public readonly rawFlags: string;

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
}
