import { Signer } from "ethers";
import { Provider } from "ethers/providers";
import { ERC20 } from "./ERC20";
export declare class ERC20Factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20;
}
export declare const abi: ({
    constant: boolean;
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    constant?: undefined;
    outputs?: undefined;
    payable?: undefined;
    stateMutability?: undefined;
})[];
