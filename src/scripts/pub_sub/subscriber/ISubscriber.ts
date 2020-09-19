import { PubSubConstants } from '../PubSubConstants';

export interface ISubscriber<T> {
    getName(): PubSubConstants;
    trigger(data: T): void;
}
