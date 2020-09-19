/* eslint-disable */
import { Element } from 'xml-js';

export default interface IMessageProcessor {
    getName(): string;
    process(data: Element);
}
