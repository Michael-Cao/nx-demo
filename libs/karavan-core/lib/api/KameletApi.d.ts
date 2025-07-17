import { KameletModel, Property } from '../model/KameletModels';
export declare class KameletApi {
    private constructor();
    static getCustomKameletNames: () => string[];
    static saveCustomKameletNames: (names: string[]) => void;
    static saveCustomKameletName: (name: string) => void;
    static removeCustomKameletName: (name: string) => void;
    static getKameletProperties: (kameletName: string) => Property[];
    static getKamelets: () => KameletModel[];
    static jsonToKamelet: (json: string) => KameletModel;
    static findKameletByName: (name: string) => KameletModel | undefined;
    static findKameletByUri: (uri: string) => KameletModel | undefined;
    static yamlToKamelet: (text: string) => KameletModel;
    static saveKamelets: (kameletYamls: string[], clean?: boolean) => void;
    static saveKamelet: (yaml: string) => void;
    static removeKamelet: (yaml: string) => void;
    static saveBlockedKameletNames: (names: string[]) => void;
    static saveBlockedKameletName: (name: string, checked: boolean) => string[];
    static getBlockedKameletNames: () => string[];
}
