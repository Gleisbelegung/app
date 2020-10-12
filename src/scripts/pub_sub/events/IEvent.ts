export interface IEvent<T> {
    getName(): string;
    getData(): T;
}
