import TrainStop from '../../../TrainStop';
import { FlagConstants } from '../FlagConstants';
import IFlagParser from '../IFlagParser';

export default class IsPassingFlagParser implements IFlagParser {
	getFlagLetter(): FlagConstants {
		return FlagConstants.IS_PASSING;
	}

	process(stop: TrainStop, data: string[], index: number): number {
		stop.isPassing = true;

		return index + 1;
	}
}
