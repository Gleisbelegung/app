import { PubSubConstants } from '../PubSubConstants';

export interface IEvent<T> {
    getName(): string;
    getData(): T;
}
