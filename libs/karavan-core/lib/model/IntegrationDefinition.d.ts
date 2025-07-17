import { BeanFactoryDefinition } from './CamelDefinition';
export declare class IntegrationFile {
    name: string;
    code: string;
    constructor(name: string, code: string);
}
export declare class DefinitionProperty {
    title: string;
    description: string;
    type: 'string' | 'integer' | 'boolean';
    default?: any;
    example?: any;
    format?: string;
    "x-descriptors"?: string[];
    enum?: string[];
    constructor(init?: Partial<DefinitionProperty>);
}
export declare class MediaType {
    mediaType: string;
    constructor(init?: Partial<MediaType>);
}
export declare class Types {
    in?: MediaType;
    out?: MediaType;
    constructor(init?: Partial<Types>);
}
export declare class Definition {
    title: string;
    description: string;
    required: string[];
    type: string;
    properties: any;
    constructor(init?: Partial<Definition>);
}
export declare class Spec {
    definition?: Definition;
    types?: Types;
    flows?: any[];
    template?: any;
    dependencies?: string[];
    constructor(init?: Partial<Spec>);
}
export type KameletTypes = "sink" | "source" | "action";
export declare class MetadataLabels {
    "camel.apache.org/kamelet.type": KameletTypes;
    constructor(init?: Partial<MetadataLabels>);
}
export declare class MetadataAnnotations {
    "camel.apache.org/kamelet.support.level": string;
    "camel.apache.org/catalog.version": string;
    "camel.apache.org/kamelet.icon": string;
    "camel.apache.org/provider": string;
    "camel.apache.org/kamelet.group": string;
    "camel.apache.org/kamelet.namespace": string;
    constructor(init?: Partial<MetadataAnnotations>);
}
export declare class Metadata {
    name: string;
    annotations?: MetadataAnnotations;
    labels?: MetadataLabels;
    constructor(init?: Partial<Metadata>);
}
export declare class Integration {
    apiVersion: string;
    kind: 'Integration' | 'Kamelet';
    metadata: Metadata;
    spec: Spec;
    type: 'crd' | 'plain' | 'kamelet';
    constructor(init?: Partial<Integration>);
    static createNew(name?: string, type?: 'crd' | 'plain' | 'kamelet'): Integration;
}
export declare class CamelElement {
    uuid: string;
    dslName: string;
    showChildren: boolean;
    constructor(dslName: string);
    hasId(): boolean;
    hasSteps(): boolean;
    hasStepName(): boolean;
}
export declare class Beans extends CamelElement {
    beans: BeanFactoryDefinition[];
    constructor(init?: Partial<Beans>);
}
export declare class CamelElementMeta {
    step?: CamelElement;
    parentUuid?: string;
    position: number;
    constructor(step?: CamelElement, parentUuid?: string, position?: number);
}
