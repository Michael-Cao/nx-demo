import { TopologyBeanNode, TopologyIncomingNode, TopologyOutgoingNode, TopologyRestNode, TopologyRouteConfigurationNode, TopologyRouteNode, } from '../model/TopologyDefinition';
import { ComponentApi, INTERNAL_COMPONENTS } from './ComponentApi';
import { CamelDefinitionApiExt } from './CamelDefinitionApiExt';
import { CamelDisplayUtil } from './CamelDisplayUtil';
import { CamelUtil } from './CamelUtil';
const outgoingDefinitions = ['ToDefinition', 'KameletDefinition', 'ToDynamicDefinition', 'PollEnrichDefinition', 'EnrichDefinition', 'WireTapDefinition', 'SagaDefinition', 'PollDefinition'];
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
export class TopologyUtils {
    constructor() {
    }
    static getOutgoingDefinitions = () => {
        return outgoingDefinitions;
    };
    static isElementInternalComponent = (element) => {
        const uri = element.uri;
        const component = ComponentApi.findByName(uri);
        if (INTERNAL_COMPONENTS.includes(uri?.split(':')?.[0]))
            return true;
        return component !== undefined && component.component.remote !== true;
    };
    static getConnectorType = (element) => {
        return CamelUtil.isKameletComponent(element) ? 'kamelet' : 'component';
    };
    static cutKameletUriSuffix = (uri) => {
        if (uri.endsWith('-sink')) {
            return uri.substring(0, uri.length - 5);
        }
        else if (uri.endsWith('-source')) {
            return uri.substring(0, uri.length - 7);
        }
        else if (uri.endsWith('-action')) {
            return uri.substring(0, uri.length - 7);
        }
        else {
            return uri;
        }
    };
    static getUniqueUri = (element) => {
        const uri = element.uri || '';
        let result = uri.startsWith('kamelet') ? TopologyUtils.cutKameletUriSuffix(uri).concat(':') : uri.concat(':');
        const className = element.dslName;
        if (className === 'FromDefinition' || className === 'ToDefinition') {
            if (!CamelUtil.isKameletComponent(element)) {
                const requiredProperties = CamelUtil.getComponentProperties(element).filter(p => p.required);
                for (const property of requiredProperties) {
                    const value = CamelDefinitionApiExt.getParametersValue(element, property.name, property.kind === 'path');
                    if (value !== undefined && property.type === 'string' && value.trim().length > 0) {
                        result = result + property.name + '=' + value + '&';
                    }
                }
            }
            else {
                const requiredProperties = CamelUtil.getKameletProperties(element, true);
                for (const property of requiredProperties) {
                    const value = CamelDefinitionApiExt.getParametersValue(element, property.id);
                    if (value !== undefined && property.type === 'string' && value.toString().trim().length > 0) {
                        result = result + property.id + '=' + value + '&';
                    }
                }
            }
        }
        return result.endsWith('&') ? result.substring(0, result.length - 1) : result;
    };
    static hasDirectUri = (element) => {
        return this.hasUriStartWith(element, 'direct');
    };
    static hasSedaUri = (element) => {
        return this.hasUriStartWith(element, 'seda');
    };
    static hasUriStartWith = (element, text) => {
        if (element.uri && typeof element.uri === 'string') {
            return element.uri.startsWith(text);
        }
        else if (element.dslName === 'SagaDefinition') {
            const completion = element.completion || '';
            const compensation = element.compensation || '';
            return completion.startsWith(text) || compensation.startsWith(text);
        }
        else {
            return false;
        }
    };
    static findTopologyRestNodes = (integration) => {
        const result = [];
        integration.forEach(i => {
            try {
                const filename = i.metadata.name;
                const routes = i.spec.flows?.filter(flow => flow.dslName === 'RestDefinition');
                routes?.forEach((rest) => {
                    const uris = [];
                    rest?.get?.forEach((d) => {
                        if (d.to)
                            uris.push(d.to);
                    });
                    rest?.post?.forEach((d) => {
                        if (d.to)
                            uris.push(d.to);
                    });
                    rest?.put?.forEach((d) => {
                        if (d.to)
                            uris.push(d.to);
                    });
                    rest?.delete?.forEach((d) => {
                        if (d.to)
                            uris.push(d.to);
                    });
                    rest?.patch?.forEach((d) => {
                        if (d.to)
                            uris.push(d.to);
                    });
                    rest?.head?.forEach((d) => {
                        if (d.to)
                            uris.push(d.to);
                    });
                    const title = '' + (rest.description ? rest.description : rest.id);
                    result.push(new TopologyRestNode(rest.path || '', '' + rest.id, uris, title, filename, rest));
                });
            }
            catch (e) {
                console.error(e);
            }
        });
        return result;
    };
    static findTopologyIncomingNodes = (integration) => {
        const result = [];
        integration.forEach(i => {
            try {
                const filename = i.metadata.name;
                const routes = i.spec.flows?.filter(flow => flow.dslName === 'RouteDefinition');
                const routeElements = routes?.map(r => {
                    const id = 'incoming-' + r.id;
                    const title = CamelDisplayUtil.getStepDescription(r.from);
                    const type = TopologyUtils.isElementInternalComponent(r.from) ? 'internal' : 'external';
                    const connectorType = TopologyUtils.getConnectorType(r.from);
                    const uniqueUri = TopologyUtils.getUniqueUri(r.from);
                    return new TopologyIncomingNode(id, type, connectorType, r.id, title, filename, r.from, uniqueUri);
                }) || [];
                result.push(...routeElements);
                const templates = i.spec.flows?.filter(flow => flow.dslName === 'RouteTemplateDefinition');
                const templateElements = templates?.map(t => {
                    const r = t.route;
                    const id = 'incoming-' + r.id;
                    const title = CamelDisplayUtil.getStepDescription(r.from);
                    const type = TopologyUtils.isElementInternalComponent(r.from) ? 'internal' : 'external';
                    const connectorType = TopologyUtils.getConnectorType(r.from);
                    const uniqueUri = TopologyUtils.getUniqueUri(r.from);
                    return new TopologyIncomingNode(id, type, connectorType, r.id, title, filename, r.from, uniqueUri);
                }) || [];
                result.push(...templateElements);
            }
            catch (e) {
                console.error(e);
            }
        });
        return result;
    };
    static findTopologyRouteNodes = (integration) => {
        const result = [];
        integration.forEach(i => {
            try {
                const filename = i.metadata.name;
                const routes = i.spec.flows?.filter(flow => flow.dslName === 'RouteDefinition');
                const routeElements = routes?.map(r => {
                    const id = 'route-' + r.id;
                    const title = '' + (r.description ? r.description : r.id);
                    return new TopologyRouteNode(id, r.id, title, filename, r.from, r);
                }) || [];
                result.push(...routeElements);
                const templates = i.spec.flows?.filter(flow => flow.dslName === 'RouteTemplateDefinition');
                const templateElements = templates?.map(t => {
                    const r = t.route;
                    const id = 'route-' + r.id;
                    const title = '' + (r.description ? r.description : r.id);
                    return new TopologyRouteNode(id, r.id, title, filename, r.from, r, t.id, t.description);
                }) || [];
                result.push(...templateElements);
            }
            catch (e) {
                console.error(e);
            }
        });
        return result;
    };
    static findTopologyRouteConfigurationNodes = (integration) => {
        const result = [];
        integration.forEach(i => {
            try {
                const filename = i.metadata.name;
                const routes = i.spec.flows?.filter(flow => flow.dslName === 'RouteConfigurationDefinition');
                const routeElements = routes?.map(r => {
                    const id = 'route-' + r.id;
                    const title = '' + (r.description ? r.description : (r.id || 'default'));
                    return new TopologyRouteConfigurationNode(id, r.id, title, filename, r);
                }) || [];
                result.push(...routeElements);
            }
            catch (e) {
                console.error(e);
            }
        });
        return result;
    };
    static findTopologyRouteOutgoingNodes = (integrations) => {
        const result = [];
        integrations.forEach(i => {
            try {
                const filename = i.metadata.name;
                const routes = i.spec.flows?.filter(flow => flow.dslName === 'RouteDefinition') || [];
                const routeFromTemplates = i.spec.flows?.filter(flow => flow.dslName === 'RouteTemplateDefinition').map(rt => rt.route) || [];
                routes.concat(routeFromTemplates).forEach(route => {
                    const from = route.from;
                    const elements = TopologyUtils.findOutgoingInStep(from, []);
                    elements.forEach((e) => {
                        const id = 'outgoing-' + route.id + '-' + e.id;
                        const title = CamelDisplayUtil.getStepDescription(e);
                        const type = TopologyUtils.isElementInternalComponent(e) ? 'internal' : 'external';
                        const connectorType = TopologyUtils.getConnectorType(e);
                        const uniqueUri = TopologyUtils.getUniqueUri(e);
                        if (connectorType !== 'kamelet' ||
                            CamelUtil.getKamelet(e)?.metadata.labels['camel.apache.org/kamelet.type'] !== 'action') {
                            result.push(new TopologyOutgoingNode(id, type, connectorType, route.id, title, filename, e, uniqueUri));
                        }
                    });
                    result.push(...TopologyUtils.findDeadLetterChannelNodes(route, filename));
                });
            }
            catch (e) {
                console.error(e);
            }
        });
        return result;
    };
    static findDeadLetterChannelNodes(route, filename) {
        const result = [];
        try {
            const deadLetterChannel = route.errorHandler?.deadLetterChannel;
            const deadLetterUri = deadLetterChannel?.deadLetterUri;
            if (deadLetterChannel !== undefined && deadLetterUri !== undefined) {
                const parts = deadLetterUri.split(':');
                if (parts.length > 1 && INTERNAL_COMPONENTS.includes(parts[0])) {
                    const id = 'outgoing-' + route.id + '-' + deadLetterChannel?.id;
                    const title = CamelDisplayUtil.getStepDescription(deadLetterChannel);
                    const type = 'internal';
                    const connectorType = 'component';
                    result.push(new TopologyOutgoingNode(id, type, connectorType, route.id || '', title, filename, deadLetterChannel, deadLetterUri));
                }
            }
        }
        catch (e) {
            console.error(e);
        }
        return result;
    }
    static findTopologyRouteConfigurationOutgoingNodes = (integrations) => {
        const result = [];
        integrations.forEach(i => {
            try {
                const filename = i.metadata.name;
                const rcs = i.spec.flows?.filter(flow => flow.dslName === 'RouteConfigurationDefinition');
                rcs?.forEach((rc) => {
                    const children = [];
                    children.push(...rc.intercept || []);
                    children.push(...rc.interceptFrom || []);
                    children.push(...rc.interceptSendToEndpoint || []);
                    children.push(...rc.onCompletion || []);
                    children.push(...rc.onException || []);
                    children.forEach(child => {
                        const elements = TopologyUtils.findOutgoingInStep(child, []);
                        elements.forEach((e) => {
                            const id = 'outgoing-' + rc.id + '-' + e.id;
                            const title = CamelDisplayUtil.getStepDescription(e);
                            const type = TopologyUtils.isElementInternalComponent(e) ? 'internal' : 'external';
                            const connectorType = TopologyUtils.getConnectorType(e);
                            const uniqueUri = TopologyUtils.getUniqueUri(e);
                            result.push(new TopologyOutgoingNode(id, type, connectorType, rc.id || 'undefined', title, filename, e, uniqueUri));
                        });
                    });
                    if (rc.errorHandler?.deadLetterChannel) {
                        const e = rc.errorHandler?.deadLetterChannel;
                        const id = 'outgoing-' + rc.id + '-' + e.id;
                        const title = CamelDisplayUtil.getStepDescription(e);
                        const comp = e?.deadLetterUri?.split(':')?.[0];
                        const type = INTERNAL_COMPONENTS.includes(comp) ? 'internal' : 'external';
                        const connectorType = 'component';
                        const uniqueUri = e?.deadLetterUri;
                        result.push(new TopologyOutgoingNode(id, type, connectorType, rc.id || 'undefined', title, filename, e, uniqueUri));
                    }
                });
            }
            catch (e) {
                console.error(e);
            }
        });
        return result;
    };
    static findTopologyBeanNodes = (integrations) => {
        const result = [];
        integrations.forEach(integration => {
            const beans = TopologyUtils.getBeans(integration);
            const topologyBeans = beans.map((bean) => new TopologyBeanNode(bean.name, bean.name, integration.metadata.name));
            result.push(...topologyBeans);
        });
        return result;
    };
    static getBeans = (integration) => {
        const result = [];
        const beans = integration.spec.flows?.filter((e) => e.dslName === 'Beans');
        if (beans && beans.length > 0 && beans[0].beans) {
            result.push(...beans[0].beans);
        }
        return result;
    };
    static findOutgoingInStep = (step, result) => {
        if (step !== undefined) {
            const el = step;
            try {
                if (outgoingDefinitions.includes(el.dslName)) {
                    result.push(step);
                }
                else {
                    const childElements = CamelDefinitionApiExt.getElementChildrenDefinition(el.dslName);
                    childElements.forEach(child => {
                        if (child.multiple) {
                            const sub = el[child.name];
                            TopologyUtils.findOutgoingInSteps(sub, result);
                        }
                        else {
                            const sub = el[child.name];
                            TopologyUtils.findOutgoingInStep(sub, result);
                        }
                    });
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        return result;
    };
    static findOutgoingInSteps = (steps, result) => {
        if (steps !== undefined && steps.length > 0) {
            steps.forEach(step => TopologyUtils.findOutgoingInStep(step, result));
        }
        return result;
    };
    static getNodeIdByUriAndName(tins, uri, name) {
        if (uri && name) {
            const node = tins
                .filter(r => r.from.uri === uri
                && (r?.from?.parameters?.name === name || r?.from?.parameters?.address === name)).at(0);
            if (node) {
                return node.id;
            }
        }
    }
    static getNodeIdByUri(tins, uri) {
        const parts = uri.split(':');
        if (parts.length > 1) {
            return TopologyUtils.getNodeIdByUriAndName(tins, parts[0], parts[1]);
        }
    }
    static getRouteIdByUriAndName(tins, uri, name) {
        if (uri && name) {
            const node = tins
                .filter(r => r.from.uri === uri
                && (r?.from?.parameters?.name === name || r?.from?.parameters?.address === name)).at(0);
            if (node) {
                return 'route-' + node.routeId;
            }
        }
    }
    static getNodeIdByUniqueUri(tins, uniqueUri) {
        const result = [];
        tins.filter(r => r.uniqueUri === uniqueUri)
            ?.forEach(node => result.push(node));
        return result;
    }
    static getRouteIdByUri(tins, uri) {
        const parts = uri.split(':');
        if (parts.length > 1) {
            return TopologyUtils.getRouteIdByUriAndName(tins, parts[0], parts[1]);
        }
    }
}
