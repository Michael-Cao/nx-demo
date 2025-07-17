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
export class Property {
    id = '';
    title = '';
    description = '';
    type = '';
    default = '';
    format = '';
    example = '';
    'x-descriptors' = '';
    value = '';
    enum;
}
export class Definition {
    title = '';
    description = '';
    required = [];
    properties = {};
    constructor(init) {
        Object.assign(this, init);
    }
}
export class KameletSpec {
    definition = new Definition();
    types = {};
    flow = {};
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Labels {
    'camel.apache.org/kamelet.type' = 'source';
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Annotations {
    'camel.apache.org/kamelet.icon' = '';
    'camel.apache.org/catalog.version' = '';
    'camel.apache.org/kamelet.support.level' = '';
    constructor(init) {
        Object.assign(this, init);
    }
}
export class KameletMetadata {
    name = '';
    labels = new Labels();
    annotations = new Annotations();
    constructor(init) {
        Object.assign(this, init);
    }
}
export class KameletModel {
    apiVersion = 'camel.apache.org/v1alpha1';
    kind = 'Kamelet';
    metadata = new KameletMetadata();
    spec = new KameletSpec();
    constructor(init) {
        Object.assign(this, init);
    }
    type() {
        return this.metadata.labels['camel.apache.org/kamelet.type'] || '';
    }
    icon() {
        return this.metadata.annotations['camel.apache.org/kamelet.icon'] || '';
    }
    version() {
        return this.metadata.annotations['camel.apache.org/catalog.version'] || '';
    }
    title() {
        return this.spec.definition.title;
    }
    description() {
        return this.spec.definition.description;
    }
    properties() {
        return this.spec.definition.properties;
    }
    static default = () => defaultKamelets;
}
const defaultKamelets = [
    new KameletModel({
        kind: 'uri',
        apiVersion: '',
        metadata: new KameletMetadata({
            name: 'uri-source',
            labels: new Labels({ 'camel.apache.org/kamelet.type': 'source' }),
            annotations: new Annotations({
                'camel.apache.org/kamelet.icon': "data:image/svg+xml,%3Csvg viewBox='0 0 130.21 130.01' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='333.48' x2='477' y1='702.6' y2='563.73' gradientTransform='translate(94.038 276.06) scale(.99206)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F69923' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.11'/%3E%3Cstop stop-color='%23E97826' offset='.945'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='333.48' x2='477' y1='702.6' y2='563.73' gradientTransform='translate(94.038 276.06) scale(.99206)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F69923' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.08'/%3E%3Cstop stop-color='%23E97826' offset='.419'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='633.55' x2='566.47' y1='814.6' y2='909.12' gradientTransform='translate(-85.421 56.236)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23f6e423' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.412'/%3E%3Cstop stop-color='%23E97826' offset='.733'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(-437.89 -835.29)'%3E%3Ccircle cx='503.1' cy='900.29' r='62.52' fill='url(%23a)' stroke='url(%23b)' stroke-linejoin='round' stroke-width='4.96'/%3E%3Cpath d='M487.89 873.64a89.53 89.53 0 0 0-2.688.031c-1.043.031-2.445.362-4.062.906 27.309 20.737 37.127 58.146 20.25 90.656.573.015 1.142.063 1.719.063 30.844 0 56.62-21.493 63.28-50.312-19.572-22.943-46.117-41.294-78.5-41.344z' fill='url(%23c)' opacity='.75'/%3E%3Cpath d='M481.14 874.58c-9.068 3.052-26.368 13.802-43 28.156 1.263 34.195 28.961 61.607 63.25 62.5 16.877-32.51 7.06-69.919-20.25-90.656z' fill='%2328170b' opacity='.75'/%3E%3Cpath d='M504.889 862.546c-.472-.032-.932.028-1.375.25-5.6 2.801 0 14 0 14-16.807 14.009-13.236 37.938-32.844 37.938-10.689 0-21.322-12.293-32.531-19.812-.144 1.773-.25 3.564-.25 5.375 0 24.515 13.51 45.863 33.469 57.063 5.583-.703 11.158-2.114 15.344-4.906 21.992-14.662 27.452-42.557 36.438-56.031 5.596-8.407 31.824-7.677 33.594-11.22 2.804-5.601-5.602-14-8.406-14h-22.406c-1.566 0-4.025-2.78-5.594-2.78h-8.406s-3.725-5.65-7.031-5.875z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E",
            }),
        }),
        spec: new KameletSpec({ definition: new Definition({ title: 'URI source' }) }),
    }),
    new KameletModel({
        kind: 'uri',
        apiVersion: '',
        metadata: new KameletMetadata({
            name: 'uri-sink',
            labels: new Labels({ 'camel.apache.org/kamelet.type': 'sink' }),
            annotations: new Annotations({
                'camel.apache.org/kamelet.icon': "data:image/svg+xml,%3Csvg viewBox='0 0 130.21 130.01' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='333.48' x2='477' y1='702.6' y2='563.73' gradientTransform='translate(94.038 276.06) scale(.99206)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F69923' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.11'/%3E%3Cstop stop-color='%23E97826' offset='.945'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='333.48' x2='477' y1='702.6' y2='563.73' gradientTransform='translate(94.038 276.06) scale(.99206)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F69923' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.08'/%3E%3Cstop stop-color='%23E97826' offset='.419'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='633.55' x2='566.47' y1='814.6' y2='909.12' gradientTransform='translate(-85.421 56.236)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23f6e423' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.412'/%3E%3Cstop stop-color='%23E97826' offset='.733'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(-437.89 -835.29)'%3E%3Ccircle cx='503.1' cy='900.29' r='62.52' fill='url(%23a)' stroke='url(%23b)' stroke-linejoin='round' stroke-width='4.96'/%3E%3Cpath d='M487.89 873.64a89.53 89.53 0 0 0-2.688.031c-1.043.031-2.445.362-4.062.906 27.309 20.737 37.127 58.146 20.25 90.656.573.015 1.142.063 1.719.063 30.844 0 56.62-21.493 63.28-50.312-19.572-22.943-46.117-41.294-78.5-41.344z' fill='url(%23c)' opacity='.75'/%3E%3Cpath d='M481.14 874.58c-9.068 3.052-26.368 13.802-43 28.156 1.263 34.195 28.961 61.607 63.25 62.5 16.877-32.51 7.06-69.919-20.25-90.656z' fill='%2328170b' opacity='.75'/%3E%3Cpath d='M504.889 862.546c-.472-.032-.932.028-1.375.25-5.6 2.801 0 14 0 14-16.807 14.009-13.236 37.938-32.844 37.938-10.689 0-21.322-12.293-32.531-19.812-.144 1.773-.25 3.564-.25 5.375 0 24.515 13.51 45.863 33.469 57.063 5.583-.703 11.158-2.114 15.344-4.906 21.992-14.662 27.452-42.557 36.438-56.031 5.596-8.407 31.824-7.677 33.594-11.22 2.804-5.601-5.602-14-8.406-14h-22.406c-1.566 0-4.025-2.78-5.594-2.78h-8.406s-3.725-5.65-7.031-5.875z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E",
            }),
        }),
        spec: new KameletSpec({ definition: new Definition({ title: 'URI sink' }) }),
    }),
];
// KameletBinding data model
export class Ref {
    apiVersion = 'camel.apache.org/v1alpha1';
    kind = 'Kamelet';
    name = '';
}
export class Source {
    uri;
    ref = new Ref();
    properties;
    static createUri(uri) {
        const source = new Source();
        source.uri = uri;
        delete source.ref;
        delete source.properties;
        return source;
    }
    static createRef(refName) {
        const source = new Source();
        source.ref.name = refName;
        delete source.uri;
        return source;
    }
}
export class Sink {
    uri;
    ref = new Ref();
    properties;
    static createUri(uri) {
        const source = new Sink();
        source.uri = uri;
        delete source.ref;
        delete source.properties;
        return source;
    }
    static createRef(refName) {
        const source = new Sink();
        source.ref.name = refName;
        delete source.uri;
        return source;
    }
}
export class Step {
    ref = new Ref();
    properties;
}
export class KameletBindingSpec {
    source = new Source();
    steps = [];
    sink = new Sink();
}
export class KameletBindingAnnotations {
    'camel.apache.org/karavan.title' = '';
}
export class KameletBindingMetadata {
    name = '';
    annotations = new KameletBindingAnnotations();
}
export class KameletBinding {
    apiVersion = 'camel.apache.org/v1alpha1';
    kind = 'KameletBinding';
    metadata = new KameletBindingMetadata();
    spec = new KameletBindingSpec();
    constructor(init) {
        Object.assign(this, init);
    }
}
