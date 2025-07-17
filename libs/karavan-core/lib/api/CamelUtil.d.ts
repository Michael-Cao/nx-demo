import { Integration, CamelElement, KameletTypes } from '../model/IntegrationDefinition';
import { BeanFactoryDefinition, RouteConfigurationDefinition, RouteTemplateDefinition } from '../model/CamelDefinition';
import { KameletModel, Property } from '../model/KameletModels';
import { ComponentProperty } from '../model/ComponentModels';
export declare class CamelUtil {
    private constructor();
    static cloneIntegration: (integration: Integration) => Integration;
    static cloneStep: (step: CamelElement, generateUuids?: boolean) => CamelElement;
    static cloneBean: (bean: BeanFactoryDefinition) => BeanFactoryDefinition;
    static cloneRouteConfiguration: (routeConfiguration: RouteConfigurationDefinition) => RouteConfigurationDefinition;
    static cloneRouteTemplate: (routeTemplate: RouteTemplateDefinition) => RouteTemplateDefinition;
    static capitalizeName: (name: string) => string;
    static camelizeName: (name: string, separator: string, firstSmall: boolean) => string;
    static camelizeBody: (name: string, body: any, clone: boolean) => any;
    static camelizeObject: (body: any) => any;
    static isKameletComponent: (element: CamelElement | undefined) => boolean;
    static getKamelet: (element: CamelElement) => KameletModel | undefined;
    static getKameletProperties: (element: any, requiredOnly?: boolean) => Property[];
    static getKameletRequiredParameters: (element: any) => string[];
    static getComponentProperties: (element: any) => ComponentProperty[];
    static checkRequired: (element: CamelElement) => [boolean, string[]];
    static checkIfKameletParameterSensitive(parameter: string, kamelet?: KameletModel): boolean;
    static findPlaceholdersInObject: (item: any, result?: Set<string>) => Set<string>;
    static findPlaceholdersInArray: (items: any[] | undefined, result?: Set<string>) => Set<string>;
    static findPlaceholder: (value: string) => [boolean, string?];
    static createNewKameletCode: (kameletName: string, kameletType: KameletTypes, copyFromKameletName?: string) => string;
}
