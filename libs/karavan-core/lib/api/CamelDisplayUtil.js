import { CamelUtil } from './CamelUtil';
import { CamelDefinitionApi } from './CamelDefinitionApi';
import { CamelDefinitionApiExt } from './CamelDefinitionApiExt';
import { ComponentApi } from './ComponentApi';
import { CamelMetadataApi } from '../model/CamelMetadata';
export class CamelDisplayUtil {
    constructor() { }
    static getTitle = (element) => {
        const k = CamelUtil.getKamelet(element);
        if (k) {
            return k.title();
        }
        else if (element.dslName === 'RouteDefinition') {
            const routeId = element.id;
            return routeId ? routeId : CamelUtil.capitalizeName(element.stepName);
        }
        else if (element.uri && (['ToDefinition', 'FromDefinition', 'PollDefinition', 'ToDynamicDefinition'].includes(element.dslName))) {
            const uri = element.uri;
            return ComponentApi.getComponentTitleFromUri(uri) || '';
        }
        else {
            const title = CamelMetadataApi.getCamelModelMetadataByClassName(element.dslName);
            return title ? title.title : CamelUtil.capitalizeName(element.stepName);
        }
    };
    static getDescription = (element) => {
        const kamelet = CamelUtil.getKamelet(element);
        if (kamelet) {
            return kamelet.spec.definition.description;
        }
        else if (element.uri && (['ToDefinition', 'FromDefinition', 'PollDefinition', 'ToDynamicDefinition'].includes(element.dslName))) {
            const uri = element.uri;
            return ComponentApi.getComponentDescriptionFromUri(uri) || '';
        }
        else {
            const description = CamelMetadataApi.getCamelModelMetadataByClassName(element.dslName)?.description;
            return description ? description : CamelDisplayUtil.getTitle(element);
        }
    };
    static getStepDescription = (element) => {
        const description = element.description;
        return description ? description : CamelDisplayUtil.getTitle(element);
    };
    static isStepDefinitionExpanded = (integration, stepUuid, selectedUuid) => {
        const expandedUuids = [];
        if (selectedUuid) {
            expandedUuids.push(...CamelDisplayUtil.getParentStepDefinitions(integration, selectedUuid));
        }
        return expandedUuids.includes(stepUuid);
    };
    static getParentStepDefinitions = (integration, uuid) => {
        const result = [];
        let meta = CamelDefinitionApiExt.findElementMetaInIntegration(integration, uuid);
        let i = 0;
        while (meta && meta.step?.dslName !== 'FromDefinition' && i < 100) {
            i++;
            if (meta.step?.dslName === 'StepDefinition') {
                result.push(meta.step.uuid);
            }
            if (meta.parentUuid) {
                meta = CamelDefinitionApiExt.findElementMetaInIntegration(integration, meta.parentUuid);
            }
            else {
                break;
            }
        }
        return result;
    };
    static setIntegrationVisibility = (integration, selectedUuid) => {
        const clone = CamelUtil.cloneIntegration(integration);
        const expandedUuids = [];
        if (selectedUuid) {
            expandedUuids.push(...CamelDisplayUtil.getParentStepDefinitions(integration, selectedUuid));
        }
        const flows = [];
        for (const flow of clone.spec.flows || []) {
            if (flow.dslName !== 'RouteDefinition') {
                flows.push(flow);
            }
            else {
                const visibleRoute = CamelDisplayUtil.setElementVisibility(flow, true, expandedUuids);
                if (Object.keys(visibleRoute).length !== 0) {
                    flows.push(visibleRoute);
                }
            }
        }
        clone.spec.flows = flows;
        return clone;
    };
    static setElementVisibility = (step, showChildren, expandedUuids) => {
        const result = CamelDefinitionApi.createStep(step.dslName, step);
        result.showChildren = showChildren;
        if (result.dslName === 'StepDefinition') {
            showChildren = expandedUuids.includes(result.uuid);
        }
        const elementChildDefinition = CamelDefinitionApiExt.getElementChildrenDefinition(step.dslName);
        for (const element of elementChildDefinition) {
            const camelElement = CamelDefinitionApiExt.getElementChildren(step, element);
            if (element.multiple) {
                result[element.name] = CamelDisplayUtil.setElementsVisibility(result[element.name], showChildren, expandedUuids);
            }
            else {
                const prop = result[element.name];
                if (prop && prop.hasOwnProperty('uuid')) {
                    result[element.name] = CamelDisplayUtil.setElementVisibility(camelElement[0], showChildren, expandedUuids);
                }
            }
        }
        return result;
    };
    static setElementsVisibility = (steps, showChildren, expandedUuids) => {
        const result = [];
        if (steps) {
            for (const step of steps) {
                result.push(CamelDisplayUtil.setElementVisibility(step, showChildren, expandedUuids));
            }
        }
        return result;
    };
}
