import { DateTime } from 'luxon';
import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import { startTime } from '../../../stores/time';
import UpdateTimeTask from '../../tasks/UpdateTimeTask';

export default class TimeProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TIME;
	}

	process(data: any) {
		const timeBefore = <number>data.sender;
		const oldTime = parseInt(<string>data.zeit, 10);

		const difference = Date.now() - timeBefore;

		const timestamp = oldTime + difference / 2;

		const d = DateTime.fromMillis(timestamp, { zone: 'UTC' });
		startTime.set(d);

		new UpdateTimeTask();
	}
}
