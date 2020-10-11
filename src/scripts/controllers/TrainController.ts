import { DateTime } from 'luxon';
import PubSub from '../pub_sub/PubSub';
import OnNewTrain from '../pub_sub/subscriber/train/OnNewTrain';
import Train from '../Train';
import OnTrainDetailsChanged from '../pub_sub/subscriber/train/details/OnTrainDetailsChanged';
import OnTrainScheduleChanged from '../pub_sub/subscriber/train/details/OnTrainScheduleChanged';
import TrainDetails from '../TrainDetails';
import TrainStop from '../TrainStop';
import AddTrainToGridElementEvent from '../pub_sub/events/grid/AddTrainToGridElementEvent';

export default class TrainController {
	constructor() {
		PubSub.subscribe(new OnNewTrain(TrainController.onNewTrain));
	}

	private static onNewTrain(train: Train) {
		PubSub.subscribe(new OnTrainDetailsChanged(train, TrainController.onTrainDetailsChanged));
		PubSub.subscribe(new OnTrainScheduleChanged(train, TrainController.onTrainScheduleChanged));
	}

	public static onTrainDetailsChanged(train: Train, details: TrainDetails) {
		// console.log('asdfa', details, train);
	}

	public static onTrainScheduleChanged(train: Train, stops: TrainStop[]) {
		stops.forEach((stop) => {
			let current = stop.arrival;
			const end = stop.departure;

			do {
				PubSub.publish(new AddTrainToGridElementEvent(stop.platform, current, train));
				current = current.plus({ minute: 1 });
			} while (current.toMillis() <= end.toMillis());
		});
	}
}
