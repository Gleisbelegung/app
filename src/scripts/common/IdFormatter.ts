import { DateTime } from 'luxon';
import Platform from '../Platform';

export default class IdFormatter {
	public static timeId(time: DateTime): string {
		return `time_${time.toMillis()}`;
	}

	public static timePlatformId(time: DateTime, platform: Platform): string {
		return `${this.timeId(time)}_platform_${platform.name}`;
	}
}
