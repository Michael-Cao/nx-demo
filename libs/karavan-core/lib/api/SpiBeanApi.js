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
import { SpiBean, SpiBeanProperty } from '../model/SpiBeanModels';
const SpiBeans = [];
export class SpiBeanApi {
    constructor() { }
    static jsonToSpiBean = (json) => {
        const fromJson = JSON.parse(json).bean;
        return new SpiBean(fromJson);
    };
    static saveSpiBeans = (jsons, clean = false) => {
        if (clean)
            SpiBeans.length = 0;
        const spiBeans = jsons.map(json => SpiBeanApi.jsonToSpiBean(json));
        SpiBeans.push(...spiBeans);
    };
    static saveSpiBean = (json) => {
        const spiBean = SpiBeanApi.jsonToSpiBean(json);
        if (SpiBeans.findIndex((c) => c.name === spiBean.name) === -1) {
            SpiBeans.push(spiBean);
        }
    };
    static getSpiBeans = () => {
        const comps = [];
        comps.push(...SpiBeans);
        return comps;
    };
    static findByName = (name) => {
        return SpiBeanApi.getSpiBeans().find((c) => c.name === name);
    };
    static findByInterfaceType = (interfaceType) => {
        return SpiBeanApi.getSpiBeans().filter((c) => c.interfaceType === interfaceType);
    };
    // Beans without properties or without required properties
    static findByInterfaceTypeSimple = (interfaceType) => {
        return SpiBeanApi.getSpiBeans().filter((c) => {
            if (c.interfaceType === interfaceType) {
                const props = c.properties;
                if (props === undefined) {
                    return true;
                }
                else {
                    return Object.getOwnPropertyNames(props).filter((name) => props[name].required).length == 0;
                }
            }
            return false;
        });
    };
    static findStepSpiBean = (step) => {
        return SpiBeanApi.findByName(step?.uri);
    };
    static getSpiBeanProperties = (spiBeanName) => {
        const spiBean = SpiBeanApi.findByName(spiBeanName);
        const properties = [];
        if (spiBean !== undefined && spiBean.properties) {
            for (const [key, value] of Object.entries(spiBean.properties)) {
                const prop = new SpiBeanProperty();
                prop.name = key;
                prop.index = value.index;
                prop.description = value.description;
                prop.type = value.type;
                prop.displayName = value.displayName;
                prop.javaType = value.javaType;
                prop.type = value.type;
                prop.deprecated = value.deprecated;
                prop.secret = value.secret;
                prop.autowired = value.autowired;
                prop.kind = value.kind;
                prop.required = value.required;
                if (value.defaultValue) {
                    prop.defaultValue = value.defaultValue;
                }
                if (!value.deprecated) {
                    properties.push(prop);
                }
            }
        }
        return Array.from(new Map(properties.map(item => [item.name, item])).values());
    };
}
