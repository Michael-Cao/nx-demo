import { SpiBean, SpiBeanProperty } from '../model/SpiBeanModels';
import { CamelElement } from '../model/IntegrationDefinition';
export declare class SpiBeanApi {
    private constructor();
    static jsonToSpiBean: (json: string) => SpiBean;
    static saveSpiBeans: (jsons: string[], clean?: boolean) => void;
    static saveSpiBean: (json: string) => void;
    static getSpiBeans: () => SpiBean[];
    static findByName: (name: string) => SpiBean | undefined;
    static findByInterfaceType: (interfaceType: string) => SpiBean[];
    static findByInterfaceTypeSimple: (interfaceType: string) => SpiBean[];
    static findStepSpiBean: (step?: CamelElement) => SpiBean | undefined;
    static getSpiBeanProperties: (spiBeanName: string) => SpiBeanProperty[];
}
