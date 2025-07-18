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
const Templates = new Map();
const JavaCode = new Map();
export class TemplateApi {
    constructor() { }
    static saveTemplates = (templates, clean = false) => {
        if (clean)
            Templates.clear();
        templates.forEach((value, key) => Templates.set(key, value));
    };
    static saveTemplate = (name, code) => {
        Templates.set(name, code);
    };
    static getTemplate = (name) => {
        return Templates.get(name);
    };
    static generateCode = (name, beanName) => {
        let template = TemplateApi.getTemplate(name);
        if (template) {
            return template.replaceAll('${NAME}', beanName);
        }
        else {
            throw new Error('Template not found');
        }
    };
    static saveJavaCodes = (javaCode, clean = false) => {
        if (clean)
            JavaCode.clear();
        javaCode.forEach((value, key) => JavaCode.set(key, value));
    };
    static saveJavaCode = (name, code) => {
        JavaCode.set(name, code);
    };
    static getJavaCode = (name) => {
        return JavaCode.get(name);
    };
}
