import { Client } from '../client';
import { Contract } from '../contract';
import { Address } from '../address';
export declare class SampleGoContract extends Contract {
    static createAsync(client: Client, callerAddr: Address): Promise<SampleGoContract>;
    constructor(params: {
        contractAddr: Address;
        callerAddr: Address;
        client: Client;
    });
    testNestedEvmCallsAsync(innerEmitter: Address, outerEmitter: Address, innerEmitterValue: number, outerEmitterValue: number): Promise<Uint8Array | void>;
}
