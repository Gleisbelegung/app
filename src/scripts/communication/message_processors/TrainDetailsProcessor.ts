import IMessageProcessor from './IMessageProcessor'
import { Element } from 'xml-js';
import { MessageConstants } from '../MessageConstants';
import { get } from 'svelte/store';
import  { trainsById } from '../../../stores/trains'
import Train from '../../Train';
import TrainDetails from '../../TrainDetails';
import { isBoolean } from 'util';
import { platformsByName } from "../../../stores/platforms";

export default class TrainDetailsProcessor implements IMessageProcessor {

    getName(): string {
        return MessageConstants.TRAIN_DETAILS;
    }

    process(data: Element) {
        var trains: Map<number, Train> = get(trainsById);
        var train: Train = trains.get(<number>data.attributes.zid);

        var isVisible: boolean = data.attributes.sichtbar === 'true'
        var isAtPlatform: boolean = data.attributes.amgleis === 'true'

        var platforms = get(platformsByName);

        var details: TrainDetails = new TrainDetails(
            <number>data.attributes.verspaetung,
            platforms.get(data.attributes.gleis),
            platforms.get(data.attributes.plangleis),
            <string>data.attributes.von,
            <string>data.attributes.nach,
            isVisible,
            isAtPlatform
        );

        train.details = details;
    }

}