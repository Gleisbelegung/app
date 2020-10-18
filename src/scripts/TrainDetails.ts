import Platform from './Platform';

export default class TrainDetails {
	public readonly delay: Number;
	public readonly platform: Platform;
	public readonly plannedPlatform: Platform;
	public readonly from: string;
	public readonly to: string;
	public readonly isVisible: boolean;
	public readonly isAtPlatform: boolean;

	constructor(
		delay: Number,
		platform: Platform,
		plannedPlatform: Platform,
		from: string,
		to: string,
		isVisible: boolean,
		isAtPlatform: boolean,
	) {
		this.delay = delay;
		this.platform = platform;
		this.plannedPlatform = plannedPlatform;
		this.from = from;
		this.to = to;
		this.isVisible = isVisible;
		this.isAtPlatform = isAtPlatform;
	}
}
