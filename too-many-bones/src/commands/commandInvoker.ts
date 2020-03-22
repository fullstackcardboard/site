import { ICommandHandler } from './handlers/ICommandHandler';

export class CommandInvoker {
    private static handlers: object;

    add<T>(commandType: T, handler: ICommandHandler<T>){
    }
}