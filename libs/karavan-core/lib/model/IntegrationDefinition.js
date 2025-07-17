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
import { v4 as uuidv4 } from 'uuid';
export class IntegrationFile {
    name = '';
    code = '';
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}
export class DefinitionProperty {
    title = '';
    description = '';
    type = 'string';
    default;
    example;
    format;
    "x-descriptors";
    enum;
    constructor(init) {
        Object.assign(this, init);
    }
}
export class MediaType {
    mediaType = '';
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Types {
    in = new MediaType();
    out = new MediaType();
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Definition {
    title = '';
    description = '';
    required = [];
    type = 'object';
    properties = {};
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Spec {
    definition;
    types;
    flows = [];
    template;
    dependencies;
    constructor(init) {
        Object.assign(this, init);
    }
}
export class MetadataLabels {
    "camel.apache.org/kamelet.type" = 'source';
    constructor(init) {
        Object.assign(this, init);
    }
}
export class MetadataAnnotations {
    "camel.apache.org/kamelet.support.level" = 'Preview';
    "camel.apache.org/catalog.version" = '';
    "camel.apache.org/kamelet.icon" = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000000' viewBox='0 0 32 32' id='icon'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3Eapplication%3C/title%3E%3Cpath d='M16,18H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4H16a2,2,0,0,1,2,2V16A2,2,0,0,1,16,18ZM6,6V16H16V6Z' transform='translate(0 0)'/%3E%3Cpath d='M26,12v4H22V12h4m0-2H22a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V12a2,2,0,0,0-2-2Z' transform='translate(0 0)'/%3E%3Cpath d='M26,22v4H22V22h4m0-2H22a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V22a2,2,0,0,0-2-2Z' transform='translate(0 0)'/%3E%3Cpath d='M16,22v4H12V22h4m0-2H12a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V22a2,2,0,0,0-2-2Z' transform='translate(0 0)'/%3E%3Cg id='_Transparent_Rectangle_' data-name='&lt;Transparent Rectangle&gt;'%3E%3Crect class='cls-1' width='32' height='32'/%3E%3C/g%3E%3C/svg%3E";
    "camel.apache.org/provider" = 'Custom';
    "camel.apache.org/kamelet.group" = '';
    "camel.apache.org/kamelet.namespace" = '';
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Metadata {
    name = '';
    annotations;
    labels;
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Integration {
    apiVersion = 'camel.apache.org/v1';
    kind = 'Integration';
    metadata = new Metadata();
    spec = new Spec();
    type = 'plain';
    constructor(init) {
        Object.assign(this, init);
    }
    static createNew(name, type = 'plain') {
        const i = new Integration({ type: type,
            metadata: new Metadata({ name: name }),
            kind: type === 'kamelet' ? 'Kamelet' : 'Integration',
            spec: new Spec({ flows: [] }) });
        if (type === 'kamelet') {
            i.metadata.annotations = new MetadataAnnotations({});
            i.spec.definition = new Definition({});
            i.spec.types = new Types();
        }
        return i;
    }
}
export class CamelElement {
    uuid = '';
    dslName = '';
    showChildren = true;
    constructor(dslName) {
        this.uuid = uuidv4();
        this.dslName = dslName;
    }
    hasId() {
        return this.hasOwnProperty('id');
    }
    hasSteps() {
        return this.hasOwnProperty('steps');
    }
    hasStepName() {
        return this.hasOwnProperty('stepName');
    }
}
export class Beans extends CamelElement {
    beans = [];
    constructor(init) {
        super('Beans');
        Object.assign(this, init);
    }
}
export class CamelElementMeta {
    step;
    parentUuid;
    position = 0;
    constructor(step, parentUuid, position = 0) {
        this.step = step;
        this.parentUuid = parentUuid;
        this.position = position;
    }
}
