export interface ISubscriber<T> {
    getName(): string;
    trigger(data: T): void;
}
