import IMessageProcessor from './IMessageProcessor'
import { MessageConstants } from '../MessageConstants'
import { Element } from 'xml-js';
import { get } from 'svelte/store';
import  { trains, trainsById } from '../../../stores/trains'
import Train from '../../Train';
import TrainStop from '../../TrainStop'
import { platformsByName } from "../../../stores/platforms";
import Platform from '../../Platform';

export default class TrainScheduleProcessor implements IMessageProcessor {

    getName(): string {
        return MessageConstants.TRAIN_SCHEDULE;
    }

    process(data: Element) {
        var trainsLocal: Map<number, Train> = get(trainsById);
        var train: Train = trainsLocal.get(<number>data.attributes.zid);

        var platforms: Map<string, Platform> = get(platformsByName);

        var stops: TrainStop[] = [];
        data.elements.forEach(s => {
            stops.push(new TrainStop(
                <string>s.attributes.an,
                <string>s.attributes.ab,
                platforms.get(<string>s.attributes.name),
                platforms.get(<string>s.attributes.plan),
                <string>s.attributes.flags
            ))
        });

        train.stops = stops;
        
        trains.set(get(trains));
    }
}