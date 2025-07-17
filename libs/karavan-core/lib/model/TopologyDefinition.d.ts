import { CamelElement } from './IntegrationDefinition';
import { FromDefinition, RestDefinition, RouteConfigurationDefinition, RouteDefinition } from './CamelDefinition';
export declare class TopologyRestNode {
    path: string;
    id: string;
    uris: string[];
    title: string;
    fileName: string;
    rest: RestDefinition;
    constructor(path: string, id: string, uris: string[], title: string, fileName: string, rest: RestDefinition);
}
export declare class TopologyIncomingNode {
    id: string;
    type: 'internal' | 'external';
    connectorType: 'component' | 'kamelet';
    routeId: string;
    title: string;
    fileName: string;
    from: FromDefinition;
    uniqueUri?: string;
    constructor(id: string, type: "internal" | "external", connectorType: "component" | "kamelet", routeId: string, title: string, fileName: string, from: FromDefinition, uniqueUri: string);
}
export declare class TopologyRouteNode {
    id: string;
    routeId: string;
    title: string;
    fileName: string;
    from: FromDefinition;
    route: RouteDefinition;
    templateId?: string;
    templateTitle?: string;
    constructor(id: string, routeId: string, title: string, fileName: string, from: FromDefinition, route: RouteDefinition, templateId?: string, templateTitle?: string);
}
export declare class TopologyRouteConfigurationNode {
    id: string;
    routeConfigurationId: string;
    title: string;
    fileName: string;
    routeConfiguration: RouteConfigurationDefinition;
    constructor(id: string, routeConfigurationId: string, title: string, fileName: string, routeConfiguration: RouteConfigurationDefinition);
}
export declare class TopologyOutgoingNode {
    id: string;
    type: 'internal' | 'external';
    connectorType: 'component' | 'kamelet';
    routeId: string;
    title: string;
    fileName: string;
    step: CamelElement;
    uniqueUri?: string;
    constructor(id: string, type: "internal" | "external", connectorType: "component" | "kamelet", routeId: string, title: string, fileName: string, step: CamelElement, uniqueUri: string);
}
export declare class TopologyBeanNode {
    id: string;
    name: string;
    fileName: string;
    constructor(id: string, name: string, fileName: string);
}
