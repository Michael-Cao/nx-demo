import { ApplicationProperty } from '../model/MainConfigurationModel';
export declare class MainConfigurationApi {
    private constructor();
    static saveApplicationProperties: (objects: [], clean?: boolean) => void;
    static getApplicationProperties: () => ApplicationProperty[];
    static findByName: (name: string) => ApplicationProperty | undefined;
    static saveApplicationPropertyGroups: (objects: []) => void;
}
