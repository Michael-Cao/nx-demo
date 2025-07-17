import { CamelDefinitionYaml } from './CamelDefinitionYaml';
import { CamelDefinitionApiExt } from './CamelDefinitionApiExt';
const sendReceiveDSL = ['ToDefinition', 'FromDefinition', 'ToDynamicDefinition', 'PollEnrichDefinition',
    'EnrichDefinition', 'WireTapDefinition', 'UnmarshalDefinition', 'MarshalDefinition'];
export const GLOBAL = 'global:';
export const ROUTE = 'route:';
export class VariableUtil {
    constructor() {
    }
    static findVariables = (files) => {
        const integrations = files.filter(file => file.name?.endsWith(".camel.yaml"))
            .map(file => CamelDefinitionYaml.yamlToIntegration(file.name, file.code));
        return VariableUtil.findVariablesInIntegrations(integrations);
    };
    static findVariablesInIntegrations = (integrations) => {
        const result = [];
        integrations.forEach(i => {
            const filename = i.metadata.name;
            const routes = i.spec.flows?.filter(flow => flow.dslName === 'RouteDefinition');
            routes?.forEach(route => {
                const from = route.from;
                VariableUtil.findVariablesInStep(from, result);
            });
        });
        return VariableUtil.sortVariables(result);
    };
    static sortVariables = (variables) => {
        const global = [...new Set(variables.filter(v => v && v.startsWith(GLOBAL)))].sort();
        const route = [...new Set(variables.filter(v => v && v.startsWith(ROUTE)))].sort();
        const exchange = [...new Set(variables.filter(v => v && !v.startsWith(ROUTE) && !v.startsWith(GLOBAL)))].sort();
        return global.concat(route, exchange);
    };
    static findVariablesInStep = (step, result) => {
        if (step !== undefined) {
            const el = step;
            if (sendReceiveDSL.includes(el.dslName)) {
                VariableUtil.findVariablesInProps(el, 'variableSend', result);
                VariableUtil.findVariablesInProps(el, 'variableReceive', result);
            }
            else if (el.dslName === 'ConvertVariableDefinition') {
                VariableUtil.findVariablesInProps(el, 'name', result);
                VariableUtil.findVariablesInProps(el, 'toName', result);
            }
            else if (el.dslName === 'SetVariableDefinition') {
                VariableUtil.findVariablesInProps(el, 'name', result);
            }
            else if (el.dslName === 'RemoveVariableDefinition') {
                VariableUtil.findVariablesInProps(el, 'name', result);
            }
            // check children elements
            const childElements = CamelDefinitionApiExt.getElementChildrenDefinition(el.dslName);
            childElements.forEach(child => {
                if (child.multiple) {
                    const sub = el[child.name];
                    VariableUtil.findVariablesInSteps(sub, result);
                }
                else {
                    const sub = el[child.name];
                    VariableUtil.findVariablesInStep(sub, result);
                }
            });
        }
    };
    static findVariablesInSteps = (steps, result) => {
        if (steps !== undefined && steps.length > 0) {
            steps.forEach(step => VariableUtil.findVariablesInStep(step, result));
        }
    };
    static findVariablesInProps = (step, propertyName, result) => {
        const el = step;
        if (el.hasOwnProperty(propertyName)) {
            result.push(el[propertyName]);
        }
    };
}
