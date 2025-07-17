import { BeanFactoryDefinition, RouteDefinition } from '../model/CamelDefinition';
import { CamelElement, Integration } from '../model/IntegrationDefinition';
import { TopologyBeanNode, TopologyIncomingNode, TopologyOutgoingNode, TopologyRestNode, TopologyRouteConfigurationNode, TopologyRouteNode } from '../model/TopologyDefinition';
export declare class ChildElement {
    name: string;
    className: string;
    multiple: boolean;
    constructor(name?: string, className?: string, multiple?: boolean);
}
export declare class TopologyUtils {
    private constructor();
    static getOutgoingDefinitions: () => string[];
    static isElementInternalComponent: (element: CamelElement) => boolean;
    static getConnectorType: (element: CamelElement) => 'component' | 'kamelet';
    static cutKameletUriSuffix: (uri: string) => string;
    static getUniqueUri: (element: CamelElement) => string;
    static hasDirectUri: (element: CamelElement) => boolean;
    static hasSedaUri: (element: CamelElement) => boolean;
    static hasUriStartWith: (element: CamelElement, text: string) => boolean;
    static findTopologyRestNodes: (integration: Integration[]) => TopologyRestNode[];
    static findTopologyIncomingNodes: (integration: Integration[]) => TopologyIncomingNode[];
    static findTopologyRouteNodes: (integration: Integration[]) => TopologyRouteNode[];
    static findTopologyRouteConfigurationNodes: (integration: Integration[]) => TopologyRouteConfigurationNode[];
    static findTopologyRouteOutgoingNodes: (integrations: Integration[]) => TopologyOutgoingNode[];
    static findDeadLetterChannelNodes(route: RouteDefinition, filename: string): TopologyOutgoingNode[];
    static findTopologyRouteConfigurationOutgoingNodes: (integrations: Integration[]) => TopologyOutgoingNode[];
    static findTopologyBeanNodes: (integrations: Integration[]) => TopologyBeanNode[];
    static getBeans: (integration: Integration) => BeanFactoryDefinition[];
    static findOutgoingInStep: (step: CamelElement, result: CamelElement[]) => CamelElement[];
    static findOutgoingInSteps: (steps: CamelElement[], result: CamelElement[]) => CamelElement[];
    static getNodeIdByUriAndName(tins: TopologyIncomingNode[], uri: string, name: string): string | undefined;
    static getNodeIdByUri(tins: TopologyIncomingNode[], uri: string): string | undefined;
    static getRouteIdByUriAndName(tins: TopologyIncomingNode[], uri: string, name: string): string | undefined;
    static getNodeIdByUniqueUri(tins: TopologyIncomingNode[], uniqueUri: string): TopologyIncomingNode[];
    static getRouteIdByUri(tins: TopologyIncomingNode[], uri: string): string | undefined;
}
