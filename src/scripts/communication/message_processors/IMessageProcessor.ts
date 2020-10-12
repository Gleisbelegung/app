export default interface IMessageProcessor {
    getName(): string;
    process(data: any);
}
