import FunctionCallSubscriber from '../FunctionCallSubscriber';
import Train from '../../../Train';
import { PubSubConstants } from '../../PubSubConstants';

export default class OnNewTrain extends FunctionCallSubscriber<Train> {
	getName(): PubSubConstants {
		throw new Error("Method not implemented.");
	}
}
