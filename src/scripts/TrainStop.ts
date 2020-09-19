import Platform from './Platform';

export default class TrainStop {
	public readonly arrival: string;
	public readonly departure: string;
	public readonly platform: Platform;
	public readonly plannedPlatform: Platform;
	public readonly flags: string;

	constructor(
		arrival: string,
		departure: string,
		platform: Platform,
		plannedPlatform: Platform,
		flags: string,
	) {
		this.arrival = arrival;
		this.departure = departure;
		this.platform = platform;
		this.plannedPlatform = plannedPlatform;
		this.flags = flags;
	}
}
