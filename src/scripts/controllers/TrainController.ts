import { DateTime } from 'luxon';
import { get } from 'svelte/store'
import PubSub from '../pub_sub/PubSub';
import OnNewTrain from '../pub_sub/subscriber/train/OnNewTrain';
import Train from '../Train';
import OnTrainDetailsChanged from '../pub_sub/subscriber/train/details/OnTrainDetailsChanged';
import OnTrainScheduleChanged from '../pub_sub/subscriber/train/details/OnTrainScheduleChanged';
import TrainDetails from '../TrainDetails';
import TrainStop from '../TrainStop';
import AddTrainToGridElementEvent from '../pub_sub/events/grid/AddTrainToGridElementEvent';
import OnNewTrainFullyLoaded from '../pub_sub/subscriber/train/OnNewTrainFullyLoaded';
import { trainsById } from '../../stores/trains';

export default class TrainController {
	constructor() {
		PubSub.subscribe(new OnNewTrain(TrainController.onNewTrain));
	}

	private static onNewTrain(train: Train) {
		PubSub.subscribe(new OnTrainDetailsChanged(train, TrainController.onTrainDetailsChanged));
		PubSub.subscribe(new OnTrainScheduleChanged(train, TrainController.onTrainScheduleChanged));
	}

	public static onTrainDetailsChanged(train: Train, details: TrainDetails) {
	}

	public static onTrainScheduleChanged(train: Train, stops: TrainStop[]) {
		stops.forEach((stop) => {
			const current = stop.arrival;
			const end = stop.departure;

			if (!stop.hasSuccessor()) {
				TrainController.addTrain(train, stop, current, end);
			} else {
				const successorId = stop.getSuccessorId();
				const trainMap: Map<Number, Train> = get(trainsById);
				const successor = trainMap.get(successorId);

				if (successor !== undefined && successor.isFullyLoaded) {
					/* eslint-disable-next-line */
					stop.successor = successor;
					successor.stops[0].predecessor = train;

					TrainController.addTrain(train, stop, current, successor.stops[0].departure);
				} else {
					const unsubscribe = PubSub.subscribe(
						new OnNewTrainFullyLoaded(successorId, (s: Train) => {
							/* eslint-disable-next-line */
							stop.successor = s;
							/* eslint-disable-next-line */
							s.stops[0].predecessor = train;

							unsubscribe();
							TrainController.addTrain(train, stop, current, s.stops[0].departure);
						}),
					);
				}
			}
		});
	}

	public static addTrain(train: Train, stop: TrainStop, arrival: DateTime, departure: DateTime) {
		let current = arrival;
		do {
			PubSub.publish(new AddTrainToGridElementEvent(stop.platform, current, train));
			current = current.plus({ minute: 1 });
		} while (current.toMillis() <= departure.toMillis());
	}
}
