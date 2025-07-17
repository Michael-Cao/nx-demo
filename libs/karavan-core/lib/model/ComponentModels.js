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
export class ComponentTitle {
    kind = '';
    name = '';
    title = '';
    description = '';
    deprecated = false;
    firstVersion = '';
    label = '';
    javaType = '';
    supportLevel = '';
    supportType = '';
    groupId = '';
    artifactId = '';
    version = '';
    scheme = '';
    extendsScheme = '';
    syntax = '';
    async = false;
    api = false;
    consumerOnly = false;
    producerOnly = false;
    lenientProperties = false;
    componentProperties;
    remote = false;
    constructor(init) {
        Object.assign(this, init);
    }
}
export class ComponentHeader {
    name = '';
    index = 0;
    kind = '';
    displayName = '';
    group = '';
    label = false;
    javaType = '';
    deprecated = false;
    deprecationNote = '';
    defaultValue = '';
    secret = false;
    autowired = false;
    description = '';
    constantName = '';
    constructor(init) {
        Object.assign(this, init);
    }
}
export class Component {
    component = new ComponentTitle();
    properties;
    headers;
    constructor(init) {
        Object.assign(this, init);
    }
}
export class ComponentProperty {
    name = '';
    deprecated = false;
    description = '';
    displayName = '';
    group = '';
    kind = '';
    label = '';
    type = '';
    secret = false;
    enum = [];
    required = false;
    defaultValue;
    value;
    constructor(init) {
        Object.assign(this, init);
    }
}
export class SupportedComponent {
    name = '';
    level = '';
    native = false;
    constructor(init) {
        Object.assign(this, init);
    }
}
