import { uid } from 'uid'
import { ISubscriber } from './ISubscriber';

export default abstract class Subscriber<T> implements ISubscriber<T> {
	public readonly uid: string;

	constructor() {
		this.uid = uid(16);
	}

	abstract getName(): string;
	abstract trigger(data: T): void;
}
