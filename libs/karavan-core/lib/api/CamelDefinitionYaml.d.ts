import { Beans, CamelElement, Integration } from '../model/IntegrationDefinition';
export declare class CamelDefinitionYaml {
    private constructor();
    static integrationToYaml: (integration: Integration) => string;
    static isEmpty: (value?: string) => boolean;
    static isEmptyObject(obj: any): boolean;
    static cleanupElement: (element: CamelElement, inArray?: boolean, inSteps?: boolean) => CamelElement;
    static cleanupElements: (elements: CamelElement[], inSteps?: boolean) => CamelElement[];
    static yamlDump: (integration: any) => string;
    static replacer: (key: string, value: any, isKamelet?: boolean) => any;
    static yamlToIntegration: (filename: string, text: string) => Integration;
    static yamlIsIntegration: (text: string) => 'crd' | 'plain' | 'kamelet' | 'none';
    static flowsToCamelElements: (flows: any[]) => any[];
    static readBeanDefinition: (beans: any) => Beans;
    static flatMapProperty: (key: string, value: any, properties: Map<string, any>) => Map<string, any>;
    static addYamlToIntegrationYaml: (filename: string, camelYaml: string | undefined, restYaml: string, addREST: boolean, addRoutes: boolean) => string;
}
