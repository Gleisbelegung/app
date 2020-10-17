import TrainStop from '../../../TrainStop';
import { FlagConstants } from '../FlagConstants';
import IFlagParser from '../IFlagParser';

export default class SuccessorFlagParser implements IFlagParser {
	getFlagLetter(): FlagConstants {
		return FlagConstants.HAS_SUCCESSOR;
	}

	process(stop: TrainStop, data: string[], index: number): number {
		let localIndex = index;

		if (data[index + 1] === '(') {
			localIndex = index + 2;
		} else if (data[index + 2] === '(') {
			localIndex = index + 3;
		}

		if (localIndex > index) {
			let succedssorId = '';
			for (let i = localIndex; i < data.length; i += 1) {
				const character = data[i];

				if (character === ')') {
					localIndex = i;
					break;
				}

				succedssorId += character;
			}

			stop.setSuccessorId(parseInt(succedssorId, 10));
		}

		return localIndex + 1;
	}
}
