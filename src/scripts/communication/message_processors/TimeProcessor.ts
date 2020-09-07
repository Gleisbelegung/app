import IMessageProcessor from './IMessageProcessor'
import { MessageConstants } from '../MessageConstants'
import { Element } from 'xml-js'
import { DateTime } from 'luxon'
import { startTime } from '../../../stores/time'
import UpdateTimeTask from '../../tasks/UpdateTimeTask';

export default class TimeProcessor implements IMessageProcessor {
    
    getName(): string {
        return MessageConstants.TIME;
    }

    process(data: Element) {
        var timeBefore = <number>data.attributes.sender;
        var oldTime = parseInt(<string>data.attributes.zeit);
        
        var difference = Date.now() - timeBefore;

        var timestamp = oldTime + difference / 2;

        var d = DateTime.fromMillis(timestamp);
        startTime.set(d);

        new UpdateTimeTask()
    }

}