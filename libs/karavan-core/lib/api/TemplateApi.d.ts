export declare class TemplateApi {
    private constructor();
    static saveTemplates: (templates: Map<string, string>, clean?: boolean) => void;
    static saveTemplate: (name: string, code: string) => void;
    static getTemplate: (name: string) => string | undefined;
    static generateCode: (name: string, beanName: string) => string | undefined;
    static saveJavaCodes: (javaCode: Map<string, string>, clean?: boolean) => void;
    static saveJavaCode: (name: string, code: string) => void;
    static getJavaCode: (name: string) => string | undefined;
}
