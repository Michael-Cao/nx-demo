export declare class SpiBeanProperty {
    name?: string;
    index: number;
    kind?: string;
    displayName?: string;
    required: boolean;
    type?: string;
    javaType?: string;
    deprecated: boolean;
    autowired: boolean;
    secret: boolean;
    defaultValue?: string;
    description?: string;
    constructor(init?: Partial<SpiBeanProperty>);
}
export declare class SpiBean {
    kind?: string;
    name?: string;
    javaType?: string;
    interfaceType?: string;
    title?: string;
    description?: string;
    deprecated?: string;
    groupId?: string;
    artifactId?: string;
    version?: string;
    properties: any;
    constructor(init?: Partial<SpiBean>);
}
