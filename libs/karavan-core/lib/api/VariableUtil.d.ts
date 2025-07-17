import { CamelElement, Integration, IntegrationFile } from '../model/IntegrationDefinition';
export declare const GLOBAL = "global:";
export declare const ROUTE = "route:";
export declare class VariableUtil {
    private constructor();
    static findVariables: (files: IntegrationFile[]) => string[];
    static findVariablesInIntegrations: (integrations: Integration[]) => string[];
    static sortVariables: (variables: string[]) => string[];
    static findVariablesInStep: (step: CamelElement, result: string[]) => void;
    static findVariablesInSteps: (steps: CamelElement[], result: string[]) => void;
    static findVariablesInProps: (step: CamelElement, propertyName: string, result: string[]) => void;
}
