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
export class TopologyRestNode {
    path;
    id;
    uris;
    title;
    fileName;
    rest;
    constructor(path, id, uris, title, fileName, rest) {
        this.path = path;
        this.id = id;
        this.uris = uris;
        this.title = title;
        this.fileName = fileName;
        this.rest = rest;
    }
}
export class TopologyIncomingNode {
    id;
    type;
    connectorType;
    routeId;
    title;
    fileName;
    from;
    uniqueUri;
    constructor(id, type, connectorType, routeId, title, fileName, from, uniqueUri) {
        this.id = id;
        this.type = type;
        this.connectorType = connectorType;
        this.routeId = routeId;
        this.title = title;
        this.fileName = fileName;
        this.from = from;
        this.uniqueUri = uniqueUri;
    }
}
export class TopologyRouteNode {
    id;
    routeId;
    title;
    fileName;
    from;
    route;
    templateId;
    templateTitle;
    constructor(id, routeId, title, fileName, from, route, templateId, templateTitle) {
        this.id = id;
        this.routeId = routeId;
        this.title = title;
        this.fileName = fileName;
        this.from = from;
        this.route = route;
        this.templateId = templateId;
        this.templateTitle = templateTitle;
    }
}
export class TopologyRouteConfigurationNode {
    id;
    routeConfigurationId;
    title;
    fileName;
    routeConfiguration;
    constructor(id, routeConfigurationId, title, fileName, routeConfiguration) {
        this.id = id;
        this.routeConfigurationId = routeConfigurationId;
        this.title = title;
        this.fileName = fileName;
        this.routeConfiguration = routeConfiguration;
    }
}
export class TopologyOutgoingNode {
    id;
    type;
    connectorType;
    routeId;
    title;
    fileName;
    step;
    uniqueUri;
    constructor(id, type, connectorType, routeId, title, fileName, step, uniqueUri) {
        this.id = id;
        this.type = type;
        this.connectorType = connectorType;
        this.routeId = routeId;
        this.title = title;
        this.fileName = fileName;
        this.step = step;
        this.uniqueUri = uniqueUri;
    }
}
export class TopologyBeanNode {
    id;
    name;
    fileName;
    constructor(id, name, fileName) {
        this.id = id;
        this.name = name;
        this.fileName = fileName;
    }
}
