import { DateTime } from 'luxon';
import { PubSubConstants } from './PubSubConstants';
import Train from '../Train';
import Platform from '../Platform';

export default class PubSubNameFormatter {
	public static format(constant: PubSubConstants, train: Train) : string {
		return `${constant}_${train.id}`;
	}

	public static format1(constant: PubSubConstants, platform: Platform, time: DateTime) : string {
		return `${constant}_${platform.name}_${time.toMillis()}`;
	}

	public static format2(constant: PubSubConstants, trainId: number) : string {
		return `${constant}_${trainId}`;
	}
}
