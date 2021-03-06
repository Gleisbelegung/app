import { DateTime } from 'luxon';
import FunctionCallSubscriber from '../FunctionCallSubscriber';
import { PubSubConstants } from '../../PubSubConstants';

export default class OnTimeChanged extends FunctionCallSubscriber<DateTime> {
	getName(): PubSubConstants {
		return PubSubConstants.TIME_CHANGED;
	}
}
