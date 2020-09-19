import { Element } from 'xml-js';
import { DateTime } from 'luxon';
import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import { startTime } from '../../../stores/time';
import UpdateTimeTask from '../../tasks/UpdateTimeTask';

export default class TimeProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TIME;
	}

	process(data: Element) {
		const timeBefore = <number>data.attributes.sender;
		const oldTime = parseInt(<string>data.attributes.zeit, 10);

		const difference = Date.now() - timeBefore;

		const timestamp = oldTime + difference / 2;

		const d = DateTime.fromMillis(timestamp);
		startTime.set(d);

		new UpdateTimeTask();
	}
}
