import { Duration, DateTime } from 'luxon';
// eslint-disable-next-line
import { get } from 'svelte/store';
import { startTime, currentTime } from '../../stores/time';
import PubSub from '../pub_sub/PubSub';
import TimeChangeEvent from '../pub_sub/events/time/TimeChangeEvent';
import MinuteChangeEvent from '../pub_sub/events/time/MinuteChangeEvent';

export default class UpdateTimeTask {
	private lastSecond: number = 0;

	constructor() {
		startTime.subscribe((time) => {
			this.lastSecond = time.second;
			currentTime.set(time);
			setInterval(this.work, 1000);
		});
	}

	private work() {
		currentTime.update((time) => time.plus(Duration.fromMillis(1000)));

		const time: DateTime = get(currentTime);
		PubSub.publish(new TimeChangeEvent(time));

		if (this.lastSecond > time.second) {
			PubSub.publish(new MinuteChangeEvent(time));
		}
		this.lastSecond = time.second;
	}
}
