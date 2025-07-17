/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CamelMetadataApi, Languages } from '../model/CamelMetadata';
import { CamelUtil } from './CamelUtil';
import { Beans, CamelElement, CamelElementMeta } from '../model/IntegrationDefinition';
import { CamelDefinitionApi } from './CamelDefinitionApi';
const coreRoutishElements = ['RouteConfigurationDefinition', 'RouteTemplateDefinition', 'RouteDefinition'];
export class ChildElement {
    name;
    className;
    multiple;
    constructor(name = '', className = '', multiple = false) {
        this.name = name;
        this.className = className;
        this.multiple = multiple;
    }
}
export class CamelDefinitionApiExt {
    constructor() { }
    // additional helper functions for more readability
    static getFlowsOfType(integration, type) {
        return integration.spec.flows?.filter(flow => flow.dslName === type) ?? [];
    }
    static getFlowsOfTypes(integration, types) {
        return integration.spec.flows?.filter(flow => types.includes(flow.dslName)) ?? [];
    }
    static getFlowsNotOfTypes(integration, types) {
        return integration.spec.flows?.filter(flow => !types.includes(flow.dslName)) ?? [];
    }
    static replaceFromInIntegration = (integration, fromId, newFrom) => {
        const flows = [];
        CamelDefinitionApiExt.getFlowsNotOfTypes(integration, ['RouteDefinition', 'RouteTemplateDefinition']).forEach(notRoutes => flows.push(notRoutes));
        CamelDefinitionApiExt.getFlowsOfTypes(integration, ['RouteDefinition', 'RouteTemplateDefinition']).map(r => {
            if (r.dslName === 'RouteDefinition') {
                const route = r;
                if (route.from.id === fromId) {
                    newFrom.steps = [...route.from.steps];
                    route.from = newFrom;
                    flows.push(route);
                }
                else {
                    flows.push(route);
                }
            }
            else if (r.dslName === 'RouteTemplateDefinition') {
                const routeTemplate = r;
                if (routeTemplate.route?.from.id === fromId) {
                    newFrom.steps = [...routeTemplate.route?.from.steps];
                    routeTemplate.route.from = newFrom;
                    flows.push(routeTemplate);
                }
                else {
                    flows.push(routeTemplate);
                }
            }
        });
        integration.spec.flows = flows;
        return integration;
    };
    static addStepToIntegration = (integration, step, parentId, position) => {
        if (step.dslName === 'RouteDefinition') {
            integration.spec.flows?.push(step);
        }
        else {
            const flows = [];
            CamelDefinitionApiExt.getFlowsNotOfTypes(integration, coreRoutishElements).forEach(bean => flows.push(bean));
            const routes = CamelDefinitionApiExt.addStepToSteps(CamelDefinitionApiExt.getFlowsOfType(integration, 'RouteDefinition'), step, parentId, position);
            flows.push(...routes);
            const routeConfigurations = CamelDefinitionApiExt.addStepToSteps(CamelDefinitionApiExt.getFlowsOfType(integration, 'RouteConfigurationDefinition'), step, parentId, position);
            flows.push(...routeConfigurations);
            const routeTemplates = CamelDefinitionApiExt.addStepToSteps(CamelDefinitionApiExt.getFlowsOfType(integration, 'RouteTemplateDefinition'), step, parentId, position);
            flows.push(...routeTemplates);
            integration.spec.flows = flows;
        }
        return integration;
    };
    static addStepToStep = (step, stepAdded, parentId, position = -1) => {
        const result = CamelUtil.cloneStep(step);
        const children = CamelDefinitionApiExt.getElementChildrenDefinition(result.dslName);
        let added = false;
        // Check all fields except steps
        for (const child of children.filter(child => child.name !== 'steps') ?? []) {
            if (result.uuid === parentId) {
                if (child.className === stepAdded.dslName) {
                    added = true;
                    if (child.multiple) {
                        result[child.name].push(stepAdded);
                    }
                    else {
                        result[child.name] = stepAdded;
                    }
                }
            }
            else {
                const fieldValue = result[child.name];
                if (child.multiple) {
                    result[child.name] = CamelDefinitionApiExt.addStepToSteps(result[child.name], stepAdded, parentId, position);
                }
                else if (fieldValue) {
                    result[child.name] = CamelDefinitionApiExt.addStepToStep(fieldValue, stepAdded, parentId, position);
                }
            }
        }
        // Then steps
        const steps = children.filter(child => child.name === 'steps');
        if (!added && steps && result.uuid === parentId) {
            if (position > -1) {
                result.steps.splice(position, 0, stepAdded);
            }
            else {
                result.steps.push(stepAdded);
            }
        }
        else if (!added && steps && result.steps) {
            result.steps = CamelDefinitionApiExt.addStepToSteps(result.steps, stepAdded, parentId, position);
        }
        return result;
    };
    static addStepToSteps = (steps, step, parentId, position) => {
        const result = [];
        for (const element of steps) {
            const newStep = CamelDefinitionApiExt.addStepToStep(element, step, parentId, position);
            result.push(newStep);
        }
        return result;
    };
    static findElementInIntegration = (integration, uuid) => {
        return CamelDefinitionApiExt.findElementMetaInIntegration(integration, uuid)?.step;
    };
    static findElementMetaInIntegration = (integration, uuid) => {
        const i = CamelUtil.cloneIntegration(integration);
        const routes = i.spec.flows?.filter(flow => coreRoutishElements.includes(flow.dslName));
        return CamelDefinitionApiExt.findElementInElements(routes, uuid);
    };
    static findElementPathUuids = (integration, uuid) => {
        const result = [];
        let meta = CamelDefinitionApiExt.findElementMetaInIntegration(integration, uuid);
        if (meta && meta.parentUuid) {
            while (meta.step?.dslName !== 'FromDefinition') {
                if (meta.parentUuid) {
                    result.push(meta.parentUuid);
                    meta = CamelDefinitionApiExt.findElementMetaInIntegration(integration, meta.parentUuid);
                }
                else {
                    break;
                }
            }
        }
        return result;
    };
    static findTopRouteElement = (integration, uuid) => {
        const result = [];
        let meta = CamelDefinitionApiExt.findElementMetaInIntegration(integration, uuid);
        if (meta) {
            while (meta.parentUuid !== undefined) {
                if (meta.parentUuid) {
                    result.push(meta.parentUuid);
                    meta = CamelDefinitionApiExt.findElementMetaInIntegration(integration, meta.parentUuid);
                }
                else {
                    break;
                }
            }
        }
        const last = result.at(-1);
        return last ? CamelDefinitionApiExt.findElementInIntegration(integration, last) : undefined;
    };
    static findElementInElements = (steps, uuid, result = new CamelElementMeta(undefined, undefined, undefined), parentUuid) => {
        if (result?.step !== undefined) {
            return result;
        }
        if (steps !== undefined) {
            for (let index = 0, step; (step = steps[index]); index++) {
                if (step.uuid === uuid) {
                    result = new CamelElementMeta(step, parentUuid, index);
                    break;
                }
                else {
                    const ce = CamelDefinitionApiExt.getElementChildrenDefinition(step.dslName);
                    for (const e of ce) {
                        const cel = CamelDefinitionApiExt.getElementChildren(step, e);
                        if (e.multiple) {
                            result = CamelDefinitionApiExt.findElementInElements(cel, uuid, result, step.uuid);
                        }
                        else {
                            const prop = step[e.name];
                            if (prop && prop.hasOwnProperty('uuid')) {
                                result = CamelDefinitionApiExt.findElementInElements([prop], uuid, result, step.uuid);
                            }
                        }
                    }
                }
            }
        }
        return new CamelElementMeta(result?.step, result?.parentUuid, result?.position);
    };
    static hasElementWithId = (integration, id) => {
        return CamelDefinitionApiExt.checkIfHasId(integration, id, 0);
    };
    static checkIfHasId = (obj, id, counter) => {
        for (const propName in obj) {
            let prop = obj[propName];
            if (propName === 'id' && id === prop) {
                counter++;
                counter = CamelDefinitionApiExt.checkIfHasId(prop, id, counter);
            }
            else if (typeof prop === 'object' && prop !== null) {
                counter = CamelDefinitionApiExt.checkIfHasId(prop, id, counter);
            }
            else if (Array.isArray(prop)) {
                for (const element of prop) {
                    CamelDefinitionApiExt.checkIfHasId(element, id, counter);
                }
            }
        }
        return counter;
    };
    static findElementById = (integration, id) => {
        return CamelDefinitionApiExt.findElementsById(integration, id, [])?.at(0);
    };
    static findElementsById = (obj, id, elements) => {
        for (const propName in obj) {
            let prop = obj[propName];
            if (propName === 'id' && id === prop) {
                elements.push(obj);
                elements = CamelDefinitionApiExt.findElementsById(prop, id, elements);
            }
            else if (typeof prop === 'object' && prop !== null) {
                elements = CamelDefinitionApiExt.findElementsById(prop, id, elements);
            }
            else if (Array.isArray(prop)) {
                for (const element of prop) {
                    elements = CamelDefinitionApiExt.findElementsById(element, id, elements);
                }
            }
        }
        return elements;
    };
    static moveRouteElement = (integration, source, target, asChild) => {
        const sourceFindStep = CamelDefinitionApiExt.findElementMetaInIntegration(integration, source);
        const sourceStep = sourceFindStep.step;
        const sourceUuid = sourceStep?.uuid;
        const targetFindStep = CamelDefinitionApiExt.findElementMetaInIntegration(integration, target);
        const parentUuid = targetFindStep.parentUuid;
        if (sourceUuid && parentUuid && sourceStep && !CamelDefinitionApiExt.findElementPathUuids(integration, target).includes(source)) {
            CamelDefinitionApiExt.deleteStepFromIntegration(integration, sourceUuid);
            if (asChild) {
                return CamelDefinitionApiExt.addStepToIntegration(integration, sourceStep, target, targetFindStep?.step?.steps?.length);
            }
            else {
                switch (targetFindStep.step?.dslName) {
                    case 'when':
                        return CamelDefinitionApiExt.addStepToIntegration(integration, sourceStep, targetFindStep.step?.uuid, undefined);
                    case 'otherwise':
                        return CamelDefinitionApiExt.addStepToIntegration(integration, sourceStep, targetFindStep.step?.uuid, undefined);
                    default:
                        return CamelDefinitionApiExt.addStepToIntegration(integration, sourceStep, parentUuid, targetFindStep.position);
                }
            }
        }
        return integration;
    };
    static deleteStepFromIntegration = (integration, uuidToDelete) => {
        const flows = integration.spec.flows?.filter(flow => !coreRoutishElements.includes(flow.dslName)) ?? [];
        const routes = CamelDefinitionApiExt.deleteStepFromSteps(integration.spec.flows?.filter(flow => coreRoutishElements.includes(flow.dslName)), uuidToDelete);
        flows.push(...routes);
        integration.spec.flows = flows;
        return integration;
    };
    static deleteStepFromStep = (step, uuidToDelete) => {
        const result = CamelDefinitionApi.createStep(step.dslName, step);
        const ce = CamelDefinitionApiExt.getElementChildrenDefinition(step.dslName);
        for (const e of ce) {
            const cel = CamelDefinitionApiExt.getElementChildren(step, e);
            if (e.multiple) {
                result[e.name] = CamelDefinitionApiExt.deleteStepFromSteps(result[e.name], uuidToDelete);
            }
            else {
                const prop = result[e.name];
                if (prop?.hasOwnProperty('uuid')) {
                    if (prop.uuid === uuidToDelete) {
                        delete result[e.name];
                    }
                    else {
                        result[e.name] = CamelDefinitionApiExt.deleteStepFromStep(cel[0], uuidToDelete);
                    }
                }
            }
        }
        return result;
    };
    static deleteStepFromSteps = (steps, uuidToDelete) => {
        const result = [];
        if (steps !== undefined) {
            for (const step of steps) {
                if (step.uuid !== uuidToDelete) {
                    const newStep = CamelDefinitionApiExt.deleteStepFromStep(step, uuidToDelete);
                    result.push(newStep);
                }
            }
        }
        return result;
    };
    static addBeanToIntegration = (integration, bean) => {
        const flows = [];
        const beans = integration.spec.flows?.filter(flow => flow.dslName === 'Beans') ?? [];
        if (integration.spec.flows && beans.length === 0) {
            flows.push(...integration.spec.flows);
            flows.push(new Beans({ beans: [bean] }));
        }
        else {
            flows.push(...integration.spec.flows?.filter(flow => flow.dslName !== 'Beans') ?? []);
            for (const flow of beans) {
                const beans = [];
                if (flow.beans.filter(b => b.uuid === bean.uuid).length === 0) {
                    beans.push(...flow.beans.filter(b => b.uuid !== bean.uuid));
                    beans.push(bean);
                }
                else {
                    for (const b of flow.beans) {
                        if (b.uuid === bean.uuid)
                            beans.push(bean);
                        else
                            beans.push(b);
                    }
                }
                const newBeans = new Beans({ beans: beans });
                flows.push(newBeans);
            }
        }
        integration.spec.flows = flows;
        return integration;
    };
    static deleteBeanFromIntegration = (integration, bean) => {
        const flows = [];
        for (const flow of integration.spec.flows ?? []) {
            if (flow.dslName === 'Beans') {
                const beans = flow.beans.filter(b => !(b.uuid === bean?.uuid && b.type === bean?.type));
                if (beans.length > 0) {
                    const newBeans = new Beans({ beans: beans });
                    flows.push(newBeans);
                }
            }
            else {
                flows.push(flow);
            }
        }
        integration.spec.flows = flows;
        return integration;
    };
    static addRouteConfigurationToIntegration = (integration, routeConfiguration) => {
        integration.spec.flows?.push(routeConfiguration);
        return integration;
    };
    static deleteRouteConfigurationFromIntegration = (integration, routeConfiguration) => {
        const newFlows = [];
        const flows = integration.spec.flows ?? [];
        newFlows.push(...flows.filter(flow => flow.dslName !== 'RouteConfigurationDefinition'));
        newFlows.push(...flows.filter(flow => flow.dslName === 'RouteConfigurationDefinition' && flow.uuid !== routeConfiguration.uuid));
        integration.spec.flows = newFlows;
        return integration;
    };
    static updateRouteConfigurationToIntegration = (integration, e) => {
        const elementClone = CamelUtil.cloneStep(e);
        const integrationClone = CamelUtil.cloneIntegration(integration);
        integrationClone.spec.flows = integration.spec.flows?.map(flow => {
            if (flow.dslName === 'RouteConfigurationDefinition') {
                const route = CamelDefinitionApiExt.updateElement(flow, elementClone);
                return CamelDefinitionApi.createRouteConfigurationDefinition(route);
            }
            return flow;
        });
        return integrationClone;
    };
    static addRouteTemplateToIntegration = (integration, routeTemplate) => {
        integration.spec.flows?.push(routeTemplate);
        return integration;
    };
    static deleteRouteTemplateFromIntegration = (integration, routeTemplate) => {
        const newFlows = [];
        const flows = integration.spec.flows ?? [];
        newFlows.push(...flows.filter(flow => flow.dslName !== 'RouteTemplateDefinition'));
        newFlows.push(...flows.filter(flow => flow.dslName === 'RouteTemplateDefinition' && flow.uuid !== routeTemplate.uuid));
        integration.spec.flows = newFlows;
        return integration;
    };
    static updateRouteTemplateToIntegration = (integration, e) => {
        const elementClone = CamelUtil.cloneStep(e);
        const integrationClone = CamelUtil.cloneIntegration(integration);
        integrationClone.spec.flows = integration.spec.flows?.map(flow => {
            if (flow.dslName === 'RouteTemplateDefinition') {
                const route = CamelDefinitionApiExt.updateElement(flow, elementClone);
                return CamelDefinitionApi.createRouteTemplateDefinition(route);
            }
            return flow;
        });
        return integrationClone;
    };
    static addRestToIntegration = (integration, rest) => {
        integration.spec.flows?.push(rest);
        return integration;
    };
    static addRestMethodToIntegration = (integration, method, restUuid) => {
        const flows = [];
        const methodFunctions = {
            GetDefinition: (rest, method) => {
                rest.get = CamelDefinitionApiExt.addRestMethodToRestMethods(rest.get, method);
            },
            PostDefinition: (rest, method) => {
                rest.post = CamelDefinitionApiExt.addRestMethodToRestMethods(rest.post, method);
            },
            PutDefinition: (rest, method) => {
                rest.put = CamelDefinitionApiExt.addRestMethodToRestMethods(rest.put, method);
            },
            PatchDefinition: (rest, method) => {
                rest.patch = CamelDefinitionApiExt.addRestMethodToRestMethods(rest.patch, method);
            },
            DeleteDefinition: (rest, method) => {
                rest.delete = CamelDefinitionApiExt.addRestMethodToRestMethods(rest.delete, method);
            },
            HeadDefinition: (rest, method) => {
                rest.head = CamelDefinitionApiExt.addRestMethodToRestMethods(rest.head, method);
            },
        };
        for (let flow of integration.spec.flows ?? []) {
            if (flow.dslName === 'RestDefinition') {
                if (flow.uuid !== restUuid) {
                    flows.push(flow);
                }
                else {
                    if (method.dslName in methodFunctions) {
                        methodFunctions[method.dslName](flow, method);
                    }
                    flows.push(flow);
                }
            }
            else {
                flows.push(flow);
            }
        }
        integration.spec.flows = flows;
        return integration;
    };
    static addRestMethodToRestMethods = (methods = [], method) => {
        const elements = [];
        for (const e of methods) {
            if (e.uuid === method.uuid) {
                elements.push(method);
            }
            else {
                elements.push(e);
            }
        }
        if (elements.filter(e => e.uuid === method.uuid).length === 0) {
            elements.push(method);
        }
        return elements;
    };
    static findRestMethodParent = (integration, method) => {
        const rests = integration.spec.flows?.filter(flow => flow.dslName === 'RestDefinition') ?? [];
        const methodTypes = ['get', 'post', 'put', 'patch', 'delete', 'head'];
        for (const rest of rests) {
            for (const type of methodTypes) {
                if (method.dslName.toLowerCase() === `${type}definition` &&
                    rest[type]?.find((m) => m.uuid === method.uuid)) {
                    return rest.uuid;
                }
            }
        }
    };
    static deleteRestConfigurationFromIntegration = (integration) => {
        const flows = [];
        for (const flow of integration.spec.flows ?? []) {
            if (flow.dslName !== 'RestConfigurationDefinition') {
                flows.push(flow);
            }
        }
        integration.spec.flows = flows;
        return integration;
    };
    static deleteRestFromIntegration = (integration, restUuid) => {
        const flows = [];
        for (const flow of integration.spec.flows ?? []) {
            if (flow.dslName !== 'RestDefinition' || flow.uuid !== restUuid) {
                flows.push(flow);
            }
        }
        integration.spec.flows = flows;
        return integration;
    };
    static deleteRestMethodFromIntegration = (integration, methodUuid) => {
        const flows = [];
        const methods = ['get', 'post', 'put', 'patch', 'delete', 'head'];
        for (const flow of integration.spec.flows ?? []) {
            if (flow.dslName === 'RestDefinition') {
                for (const method of methods) {
                    if (flow[method]) {
                        flow[method] = flow[method].filter((item) => item.uuid !== methodUuid);
                    }
                }
            }
            flows.push(flow);
        }
        integration.spec.flows = flows;
        return integration;
    };
    static getExpressionLanguageName = (expression) => {
        let result = undefined;
        if (expression) {
            for (const fieldName in expression) {
                if (expression[fieldName] === undefined) {
                    continue;
                }
                const lang = Languages.find((value) => value[0] === fieldName);
                if (lang) {
                    const camelLangMetadata = CamelMetadataApi.getCamelLanguageMetadataByName(lang[0]);
                    if (camelLangMetadata?.name) {
                        result = camelLangMetadata.name;
                        break;
                    }
                }
            }
        }
        return result;
    };
    static getExpressionLanguageClassName = (expression) => {
        let result = undefined;
        if (expression) {
            for (const fieldName in expression) {
                if (expression[fieldName] === undefined) {
                    continue;
                }
                const lang = Languages.find((value) => value[0] === fieldName);
                if (lang) {
                    const camelLangMetadata = CamelMetadataApi.getCamelLanguageMetadataByName(lang[0]);
                    if (camelLangMetadata?.className) {
                        result = camelLangMetadata.className;
                        break;
                    }
                }
            }
        }
        return result;
    };
    static getDataFormat = (element) => {
        let result = undefined;
        if (element) {
            Object.keys(element).forEach(fieldName => {
                const df = CamelMetadataApi.getCamelDataFormatMetadataByName(fieldName);
                result = element[fieldName] ? df : result;
            });
        }
        return result;
    };
    static getExpressionValue = (expression) => {
        const language = CamelDefinitionApiExt.getExpressionLanguageName(expression);
        if (language) {
            return expression[language];
        }
        else {
            return undefined;
        }
    };
    static updateIntegrationRestElement = (integration, e) => {
        const int = CamelUtil.cloneIntegration(integration);
        const flows = [];
        const methods = ['get', 'post', 'put', 'patch', 'delete', 'head'];
        const isRest = (flow) => flow.dslName === 'RestDefinition' && flow.uuid === e.uuid;
        const isRestConfig = (flow) => flow.dslName === 'RestConfigurationDefinition' && flow.uuid === e.uuid;
        const isSingleRest = integration.spec.flows?.filter(isRest).length === 1;
        const isSingleRestConfig = integration.spec.flows?.filter(isRestConfig).length === 1;
        for (const flow of integration.spec.flows ?? []) {
            if ((isSingleRest && isRest(flow)) || (isSingleRestConfig && isRestConfig(flow))) {
                flows.push(CamelUtil.cloneStep(e));
            }
            else if (flow.dslName === 'RestDefinition') {
                for (const method of methods) {
                    if (flow[method]) {
                        for (let i = 0; i < flow[method].length; i++) {
                            if (flow[method][i].uuid === e.uuid) {
                                flow[method][i] = e;
                            }
                        }
                    }
                }
                flows.push(flow);
            }
            else {
                flows.push(flow);
            }
        }
        int.spec.flows = flows;
        return int;
    };
    static updateIntegrationRouteElement = (integration, e) => {
        const elementClone = CamelUtil.cloneStep(e);
        const int = CamelUtil.cloneIntegration(integration);
        const flows = [];
        for (const flow of integration.spec.flows ?? []) {
            if (flow.dslName === 'RouteDefinition') {
                const route = CamelDefinitionApiExt.updateElement(flow, elementClone);
                flows.push(CamelDefinitionApi.createRouteDefinition(route));
            }
            else if (flow.dslName === 'RouteConfigurationDefinition') {
                const routeConfiguration = CamelDefinitionApiExt.updateElement(flow, elementClone);
                flows.push(CamelDefinitionApi.createRouteConfigurationDefinition(routeConfiguration));
            }
            else if (flow.dslName === 'RouteTemplateDefinition') {
                const routeTemplate = CamelDefinitionApiExt.updateElement(flow, elementClone);
                flows.push(CamelDefinitionApi.createRouteTemplateDefinition(routeTemplate));
            }
            else {
                flows.push(flow);
            }
        }
        int.spec.flows = flows;
        return int;
    };
    static updateIntegrationBeanElement = (integration, e) => {
        const elementClone = CamelUtil.cloneStep(e);
        const int = CamelUtil.cloneIntegration(integration);
        const flows = [];
        for (const flow of integration.spec.flows ?? []) {
            if (flow.dslName === 'Beans') {
                const route = CamelDefinitionApiExt.updateElement(flow, elementClone);
                flows.push(CamelDefinitionApi.createBeanFactoryDefinition(route));
            }
            else {
                flows.push(flow);
            }
        }
        int.spec.flows = flows;
        return int;
    };
    static updateElement = (element, e) => {
        if (element.uuid === e.uuid) {
            return e;
        }
        const result = { ...element };
        for (const key in result) {
            if (result[key] instanceof CamelElement) {
                result[key] = CamelDefinitionApiExt.updateElement(result[key], e);
            }
            else if (Array.isArray(result[key])) {
                result[key] = CamelDefinitionApiExt.updateElements(result[key], e);
            }
        }
        return result;
    };
    static updateElements = (elements, e) => {
        const result = [];
        for (const element of elements) {
            if (typeof element === 'object') {
                const newElement = CamelDefinitionApiExt.updateElement(element, e);
                result.push(newElement);
            }
            else {
                result.push(element);
            }
        }
        return result;
    };
    static getElementProperties = (className) => {
        const result = [];
        let uri = undefined;
        let expression = undefined;
        let parameters = undefined;
        if (className) {
            const properties = className.endsWith('Definition') || className.endsWith('BuilderRef') || className.endsWith('Config')
                ? CamelMetadataApi.getCamelModelMetadataByClassName(className)?.properties
                : className.endsWith('DataFormat')
                    ? CamelMetadataApi.getCamelDataFormatMetadataByClassName(className)?.properties
                    : CamelMetadataApi.getCamelLanguageMetadataByClassName(className)?.properties;
            if (properties) {
                for (const p of properties.filter(p => p.name !== 'steps' && p.name !== 'configurationRef')) {
                    switch (p.name) {
                        case 'uri':
                            uri = p;
                            break;
                        case 'expression':
                            expression = p;
                            break;
                        case 'parameters':
                            parameters = p;
                            break;
                        default:
                            result.push(p);
                    }
                }
            }
        }
        if (uri) {
            result.unshift(uri);
        }
        if (expression) {
            result.unshift(expression);
        }
        if (parameters) {
            result.push(parameters);
        }
        return result;
    };
    static getElementPropertiesByName = (name) => {
        const model = CamelMetadataApi.getCamelModelMetadataByName(name);
        if (model) {
            return CamelDefinitionApiExt.getElementProperties(model.className);
        }
        const language = CamelMetadataApi.getCamelLanguageMetadataByName(name);
        if (language) {
            return CamelDefinitionApiExt.getElementProperties(language.className);
        }
        const dataFormat = CamelMetadataApi.getCamelDataFormatMetadataByName(name);
        if (dataFormat) {
            return CamelDefinitionApiExt.getElementProperties(dataFormat.className);
        }
        return [];
    };
    static getParametersValue = (element, propertyName, pathParameter) => {
        if (element && element.parameters) {
            return element.parameters[propertyName];
        }
    };
    static getElementChildrenDefinition = (dslName) => {
        const result = [];
        const meta = CamelMetadataApi.getCamelModelMetadataByClassName(dslName);
        if (meta) {
            for (const property of meta.properties) {
                if (property.isObject && CamelMetadataApi.getCamelModelMetadataByClassName(property.type)) {
                    result.push(new ChildElement(property.name, property.type, property.isArray));
                }
            }
        }
        if (CamelDefinitionApi.createStep(dslName, {}).hasSteps())
            result.push(new ChildElement('steps', 'CamelElement', true));
        return result;
    };
    static getElementChildren = (element, child) => {
        let children = element[child.name];
        if (!Array.isArray(children)) {
            children = children ? [children] : [];
        }
        return children;
    };
}
