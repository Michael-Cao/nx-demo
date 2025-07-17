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
import { Integration, Beans, MetadataLabels } from '../model/IntegrationDefinition';
import { CamelDefinitionApi } from './CamelDefinitionApi';
import { BeanFactoryDefinition, RouteConfigurationDefinition, RouteTemplateDefinition, } from '../model/CamelDefinition';
import { KameletApi } from './KameletApi';
import { ComponentApi } from './ComponentApi';
import { CamelMetadataApi, SensitiveKeys } from '../model/CamelMetadata';
import { CamelDefinitionApiExt } from './CamelDefinitionApiExt';
import { v4 as uuidv4 } from 'uuid';
import { CamelDefinitionYaml } from './CamelDefinitionYaml';
export class CamelUtil {
    constructor() {
    }
    static cloneIntegration = (integration) => {
        const clone = JSON.parse(JSON.stringify(integration));
        const int = new Integration({ ...clone });
        const flows = [];
        for (const flow of int.spec.flows || []) {
            if (flow.dslName !== 'Beans') {
                flows.push(CamelDefinitionApi.createStep(flow.dslName, flow));
            }
            else {
                const newBeans = new Beans();
                newBeans.beans.push(...flow.beans.map(bean => CamelUtil.cloneBean(bean)));
                flows.push(newBeans);
            }
        }
        for (const routeConfiguration of int.spec.flows?.filter(flow => flow.dslName === 'RouteConfiguration') || []) {
            const newRouteConfiguration = CamelUtil.cloneRouteConfiguration(routeConfiguration);
            flows.push(newRouteConfiguration);
        }
        for (const routeTemplate of int.spec.flows?.filter(flow => flow.dslName === 'RouteTemplateConfiguration') || []) {
            const newRouteTemplate = CamelUtil.cloneRouteTemplate(routeTemplate);
            flows.push(newRouteTemplate);
        }
        int.spec.flows = flows;
        return int;
    };
    static cloneStep = (step, generateUuids = false) => {
        const clone = JSON.parse(JSON.stringify(step, (key, value) => {
            if (generateUuids && key === 'uuid') {
                return uuidv4();
            }
            else {
                return value;
            }
        }));
        return CamelDefinitionApi.createStep(step.dslName, clone, true);
    };
    static cloneBean = (bean) => {
        const clone = JSON.parse(JSON.stringify(bean));
        const newBean = new BeanFactoryDefinition(clone);
        newBean.uuid = bean.uuid;
        return newBean;
    };
    static cloneRouteConfiguration = (routeConfiguration) => {
        const clone = JSON.parse(JSON.stringify(routeConfiguration));
        const RouteConfiguration = new RouteConfigurationDefinition(clone);
        RouteConfiguration.uuid = routeConfiguration.uuid;
        return RouteConfiguration;
    };
    static cloneRouteTemplate = (routeTemplate) => {
        const clone = JSON.parse(JSON.stringify(routeTemplate));
        const RouteConfiguration = new RouteTemplateDefinition(clone);
        RouteConfiguration.uuid = routeTemplate.uuid;
        return RouteConfiguration;
    };
    static capitalizeName = (name) => {
        if (name.length === 0) {
            return name;
        }
        return name[0].toUpperCase() + name.substring(1);
    };
    static camelizeName = (name, separator, firstSmall) => {
        if (name.length === 0)
            return name;
        const res = name
            .split(separator)
            .map(value => CamelUtil.capitalizeName(value))
            .join('');
        return firstSmall ? res[0].toLowerCase() + res.substring(1) : res;
    };
    static camelizeBody = (name, body, clone) => {
        if (body && Object.keys(body).length > 0) {
            const oldKey = Object.keys(body)[0];
            const key = CamelUtil.camelizeName(oldKey, '-', true);
            return !clone && key === name ? { [key]: body[oldKey] } : body;
        }
        else {
            return {};
        }
    };
    static camelizeObject = (body) => {
        if (Array.isArray(body)) {
            return body.map(value => (typeof value === 'object' ? CamelUtil.camelizeObject(value) : value));
        }
        else if (typeof body === 'object') {
            const result = {};
            for (const key in body) {
                if (body?.hasOwnProperty(key)) {
                    const newKey = CamelUtil.camelizeName(key, '-', true);
                    const value = body[key];
                    if (typeof value === 'object' || Array.isArray(value)) {
                        result[newKey] = CamelUtil.camelizeObject(value);
                    }
                    else {
                        result[newKey] = value;
                    }
                }
            }
            return result;
        }
        else {
            return body;
        }
    };
    static isKameletComponent = (element) => {
        if (element?.dslName === 'KameletDefinition') {
            return true;
        }
        else if (element?.dslName === 'FromDefinition' || element?.dslName === 'ToDefinition' || element?.dslName === 'ToDynamicDefinition') {
            const uri = element.uri;
            return uri !== undefined && uri.startsWith('kamelet:');
        }
        else {
            return false;
        }
    };
    static getKamelet = (element) => {
        if (element.dslName === 'KameletDefinition') {
            return KameletApi.findKameletByName(element.name || '');
        }
        else if (element.dslName === 'ToDefinition' && element.uri?.startsWith('kamelet:')) {
            const kameletName = element.uri?.replace('kamelet:', '');
            return KameletApi.findKameletByName(kameletName);
        }
        else if (['FromDefinition', 'ToDynamicDefinition', 'ToDefinition'].includes(element.dslName)) {
            const uri = element.uri;
            return uri !== undefined ? KameletApi.findKameletByUri(uri) : undefined;
        }
        else {
            return undefined;
        }
    };
    static getKameletProperties = (element, requiredOnly = false) => {
        const kamelet = CamelUtil.getKamelet(element);
        const props = kamelet ? KameletApi.getKameletProperties(kamelet?.metadata.name) : [];
        if (requiredOnly) {
            const required = kamelet?.spec.definition.required;
            return props.filter(value => required?.includes(value.id));
        }
        else {
            return props;
        }
    };
    static getKameletRequiredParameters = (element) => {
        const kamelet = CamelUtil.getKamelet(element);
        return kamelet ? kamelet.spec.definition.required : [];
    };
    static getComponentProperties = (element) => {
        const dslName = element.dslName;
        const uri = element.uri;
        const name = ComponentApi.getComponentNameFromUri(uri);
        if (name) {
            const component = ComponentApi.findByName(name);
            const type = ['FromDefinition', 'PollDefinition'].includes(element.dslName) ? 'consumer' : 'producer';
            return component ? ComponentApi.getComponentProperties(component?.component.name, type) : [];
        }
        else {
            return [];
        }
    };
    static checkRequired = (element) => {
        const result = [true, []];
        const className = element.dslName;
        const elementAsAny = element;
        let elementMeta = CamelMetadataApi.getCamelModelMetadataByClassName(className);
        if (elementMeta === undefined && className.endsWith('Expression')) {
            elementMeta = CamelMetadataApi.getCamelLanguageMetadataByClassName(className);
        }
        if (className === 'SetVariablesDefinition') {
            if (elementAsAny.variables === undefined || elementAsAny.variables?.length === 0) {
                result[0] = false;
                result[1].push(`Variables not set`);
            }
            else {
                elementAsAny.variables.forEach((v) => {
                    const r = CamelUtil.checkRequired(v);
                    if (!r[0]) {
                        result[1].push(...r[1]);
                    }
                });
            }
        }
        else if (className.includes('SetHeadersDefinition')) {
            if (elementAsAny.headers === undefined || elementAsAny.headers?.length === 0) {
                result[0] = false;
                result[1].push(`Headers not set`);
            }
            else {
                elementAsAny.headers.forEach((v) => {
                    const r = CamelUtil.checkRequired(v);
                    if (!r[0]) {
                        result[1].push(...r[1]);
                    }
                });
            }
        }
        if (elementMeta) {
            for (const property of elementMeta.properties.filter(p => p.required)) {
                const value = elementAsAny[property.name];
                if (property.type === 'string' && !property.isArray && (value === undefined || !value.toString().trim())) {
                    result[0] = false;
                    result[1].push(`${property.displayName} is required`);
                }
                else if (['ExpressionSubElementDefinition', 'ExpressionDefinition'].includes(property.type)) {
                    const expressionMeta = CamelMetadataApi.getCamelModelMetadataByClassName('ExpressionDefinition');
                    const expressionCheck = expressionMeta && value !== undefined && expressionMeta?.properties.some(ep => {
                        const expValue = value[ep.name];
                        if (expValue) {
                            const checkedExpression = CamelUtil.checkRequired(expValue);
                            return checkedExpression[0];
                        }
                        return false;
                    });
                    result[0] = !!expressionCheck;
                    if (!expressionCheck) {
                        result[1].push('Expression is not defined');
                    }
                }
            }
        }
        if (className === 'FromDefinition' || className === 'ToDefinition') {
            if (!CamelUtil.isKameletComponent(element)) {
                const requiredProperties = CamelUtil.getComponentProperties(element).filter(p => p.required);
                for (const property of requiredProperties) {
                    const value = CamelDefinitionApiExt.getParametersValue(element, property.name, property.kind === 'path');
                    if (value === undefined || (property.type === 'string' && value.toString().trim().length === 0)) {
                        result[0] = false;
                        result[1].push(`${property.displayName} is required`);
                    }
                }
                const secretProperties = CamelUtil.getComponentProperties(element).filter(p => p.secret);
                for (const property of secretProperties) {
                    const value = CamelDefinitionApiExt.getParametersValue(element, property.name, property.kind === 'path');
                    if (value !== undefined && property.type === 'string'
                        && (!value?.toString().trim()?.startsWith("{{") || !value?.toString().trim()?.endsWith('}}'))) {
                        result[0] = false;
                        result[1].push(`${property.displayName} is set in plain text`);
                    }
                }
            }
            else {
                const kamelet = CamelUtil.getKamelet(element);
                let allSet = true;
                const filledParameters = elementAsAny ? Object.keys(elementAsAny.parameters) : [];
                const missingParameters = kamelet?.spec.definition.required?.filter(name => !filledParameters.includes(name)) || [];
                if (missingParameters.length > 0) {
                    allSet = false;
                    result[1].push(...missingParameters.map(name => `${name} is required`));
                }
                const sensitiveParameters = filledParameters.filter(p => CamelUtil.checkIfKameletParameterSensitive(p, kamelet));
                sensitiveParameters.forEach(p => {
                    const value = elementAsAny?.parameters[p];
                    if (value !== undefined && (!value?.toString()?.trim()?.startsWith("{{") || !value?.toString()?.trim()?.endsWith('}}'))) {
                        result[0] = false;
                        result[1].push(`${p} is set in plain text`);
                    }
                });
                result[0] = allSet;
            }
        }
        if (result[1] && result[1].length > 0) {
            result[0] = false;
        }
        return result;
    };
    static checkIfKameletParameterSensitive(parameter, kamelet) {
        if (SensitiveKeys.includes(parameter)) {
            return true;
        }
        else {
            return kamelet?.spec.definition.properties?.[parameter]?.type === 'password';
        }
    }
    static findPlaceholdersInObject = (item, result = new Set()) => {
        if (typeof item === 'object') {
            for (const value of Object.values(item)) {
                if (value == undefined) {
                    continue;
                }
                else if (Array.isArray(value)) {
                    CamelUtil.findPlaceholdersInArray(value, result);
                }
                else if (typeof value === 'object') {
                    CamelUtil.findPlaceholdersInObject(value, result);
                }
                else {
                    const placeholder = CamelUtil.findPlaceholder(value.toString());
                    if (placeholder[0] && placeholder[1]) {
                        result.add(placeholder[1]);
                    }
                }
            }
        }
        else {
            const placeholder = CamelUtil.findPlaceholder(item.toString());
            if (placeholder[0] && placeholder[1]) {
                result.add(placeholder[1]);
            }
        }
        return result;
    };
    static findPlaceholdersInArray = (items, result = new Set()) => {
        if (items) {
            for (const item of items) {
                if (typeof item === 'object') {
                    CamelUtil.findPlaceholdersInObject(item, result);
                }
                else {
                    const placeholder = CamelUtil.findPlaceholder(item.toString());
                    if (placeholder[0] && placeholder[1]) {
                        result.add(placeholder[1]);
                    }
                }
            }
        }
        return result;
    };
    static findPlaceholder = (value) => {
        const val = value?.trim();
        const result = val?.includes('{{') && val?.includes('}}');
        const start = val?.search('{{') + 2;
        const end = val?.search('}}');
        const placeholder = val?.substring(start, end)?.trim();
        return [result, placeholder];
    };
    static createNewKameletCode = (kameletName, kameletType, copyFromKameletName) => {
        const integration = Integration.createNew(kameletName, 'kamelet');
        const meta = new MetadataLabels({ 'camel.apache.org/kamelet.type': kameletType });
        integration.metadata.labels = meta;
        if (copyFromKameletName !== undefined && copyFromKameletName !== '') {
            const kamelet = KameletApi.getKamelets().filter(k => k.metadata.name === copyFromKameletName).at(0);
            if (kamelet) {
                integration.spec = kamelet.spec;
                integration.metadata.labels = kamelet.metadata.labels;
                integration.metadata.annotations = kamelet.metadata.annotations;
                const i = CamelUtil.cloneIntegration(integration);
                return CamelDefinitionYaml.integrationToYaml(i);
            }
        }
        return CamelDefinitionYaml.integrationToYaml(integration);
    };
}
