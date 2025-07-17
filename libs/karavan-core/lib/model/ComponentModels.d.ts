export declare class ComponentTitle {
    kind: string;
    name: string;
    title: string;
    description: string;
    deprecated: boolean;
    firstVersion: string;
    label: string;
    javaType: string;
    supportLevel: string;
    supportType: string;
    groupId: string;
    artifactId: string;
    version: string;
    scheme: string;
    extendsScheme: string;
    syntax: string;
    async: boolean;
    api: boolean;
    consumerOnly: boolean;
    producerOnly: boolean;
    lenientProperties: boolean;
    componentProperties: any;
    remote: boolean;
    constructor(init?: Partial<ComponentTitle>);
}
export declare class ComponentHeader {
    name: string;
    index: number;
    kind: string;
    displayName: string;
    group: string;
    label: boolean;
    javaType: string;
    deprecated: boolean;
    deprecationNote: string;
    defaultValue: string;
    secret: boolean;
    autowired: boolean;
    description: string;
    constantName: string;
    constructor(init?: Partial<ComponentHeader>);
}
export declare class Component {
    component: ComponentTitle;
    properties: any;
    headers: any;
    constructor(init?: Partial<Component>);
}
export declare class ComponentProperty {
    name: string;
    deprecated: boolean;
    description: string;
    displayName: string;
    group: string;
    kind: string;
    label: string;
    type: string;
    secret: boolean;
    enum: string[];
    required: boolean;
    defaultValue: string | number | boolean | any;
    value: string | any;
    constructor(init?: Partial<ComponentProperty>);
}
export declare class SupportedComponent {
    name: string;
    level: string;
    native: boolean;
    constructor(init?: Partial<SupportedComponent>);
}
