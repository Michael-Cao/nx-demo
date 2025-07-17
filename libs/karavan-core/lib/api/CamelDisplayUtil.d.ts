import { Integration, CamelElement } from '../model/IntegrationDefinition';
export declare class CamelDisplayUtil {
    private constructor();
    static getTitle: (element: CamelElement) => string;
    static getDescription: (element: CamelElement) => string;
    static getStepDescription: (element: CamelElement) => string;
    static isStepDefinitionExpanded: (integration: Integration, stepUuid: string, selectedUuid: string | undefined) => boolean;
    static getParentStepDefinitions: (integration: Integration, uuid: string) => string[];
    static setIntegrationVisibility: (integration: Integration, selectedUuid: string | undefined) => Integration;
    static setElementVisibility: (step: CamelElement, showChildren: boolean, expandedUuids: string[]) => CamelElement;
    static setElementsVisibility: (steps: CamelElement[] | undefined, showChildren: boolean, expandedUuids: string[]) => CamelElement[];
}
