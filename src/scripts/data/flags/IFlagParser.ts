import TrainStop from '../../TrainStop';
import { FlagConstants } from './FlagConstants';

export default interface IFlagParser {
	getFlagLetter(): FlagConstants;
	process(stop: TrainStop, data: string[], index: number): number;
}
