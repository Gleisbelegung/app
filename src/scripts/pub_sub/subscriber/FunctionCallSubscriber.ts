import { ISubscriber } from './ISubscriber';
import { PubSubConstants } from '../PubSubConstants';

export default abstract class FunctionCallSubscriber<T> implements ISubscriber<T> {
	private callback: (data: T) => void;

	protected constructor(callback: (data: T) => void) {
		this.callback = callback;
	}

	abstract getName(): PubSubConstants;

	trigger(data: T): void {
		this.callback(data);
	}
}
