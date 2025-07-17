export declare class ApplicationProperty {
    name: string;
    value?: string;
    defaultValue?: string;
    description?: string;
    type?: string;
    constructor(init?: Partial<ApplicationProperty>);
}
export declare class ApplicationPropertyGroup {
    name: string;
    description?: string;
    constructor(init?: Partial<ApplicationPropertyGroup>);
}
