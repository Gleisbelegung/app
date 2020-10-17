import Train from '../../Train';
import TrainStop from '../../TrainStop';
import IFlagParser from './IFlagParser';
import IsPassingFlagParser from './parsers/IsPassingFlagParser';
import SuccessorFlagParser from './parsers/SuccessorFlagParser';

export default class FlagParser {
	private static instance: FlagParser;
	private parsers: IFlagParser[]

	constructor() {
		this.parsers = [];

		this.parsers.push(new SuccessorFlagParser());
		this.parsers.push(new IsPassingFlagParser());
	}

	public static parse(train: Train, stop: TrainStop) {
		if (this.instance === undefined) {
			this.instance = new FlagParser();
		}

		this.instance.parse(train, stop);
	}

	public parse(train: Train, stop: TrainStop) {
		const splitted = Array.from(stop.rawFlags);

		for (let i = 0; i < splitted.length; i += 1) {
			const character = splitted[i];

			for (let p = 0; p < this.parsers.length; p += 1) {
				const parser = this.parsers[p];
				if (character === parser.getFlagLetter()) {
					i = parser.process(stop, splitted, i);
					break;
				}
			}
		}
	}
}
