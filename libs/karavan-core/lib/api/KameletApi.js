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
import { KameletModel, Property } from '../model/KameletModels';
import * as yaml from 'js-yaml';
const Kamelets = [];
const CustomNames = [];
const BlockedKamelets = [];
export class KameletApi {
    constructor() { }
    static getCustomKameletNames = () => {
        return CustomNames;
    };
    static saveCustomKameletNames = (names) => {
        CustomNames.length = 0;
        CustomNames.push(...names);
    };
    static saveCustomKameletName = (name) => {
        CustomNames.push(name);
    };
    static removeCustomKameletName = (name) => {
        const index = CustomNames.indexOf(name);
        if (index > -1) {
            CustomNames.splice(index, 1);
        }
    };
    static getKameletProperties = (kameletName) => {
        const kamelet = KameletApi.findKameletByName(kameletName);
        const properties = [];
        try {
            if (kamelet !== undefined) {
                const map = kamelet.spec.definition.properties
                    ? new Map(Object.entries(kamelet.spec.definition.properties))
                    : new Map();
                map.forEach((value, key) => {
                    const prop = new Property();
                    prop.id = key;
                    prop.title = value.title;
                    prop.default = value.default;
                    prop.description = value.description;
                    prop.format = value.format;
                    prop.example = value.example;
                    prop.type = value.type;
                    prop.enum = value.enum;
                    if (value.default)
                        prop.value = value.default;
                    prop['x-descriptors'] = value['x-descriptors'];
                    properties.push(prop);
                });
            }
        }
        finally {
            return properties;
        }
    };
    static getKamelets = () => {
        return Kamelets.sort((a, b) => a.title().localeCompare(b.title(), undefined, { sensitivity: 'base' }));
    };
    static jsonToKamelet = (json) => {
        const fromJson = JSON.parse(json);
        const k = new KameletModel(fromJson);
        return k;
    };
    static findKameletByName = (name) => {
        return Kamelets.find((k) => k.metadata.name === name);
    };
    static findKameletByUri = (uri) => {
        return KameletApi.findKameletByName(uri.split(':')[1]);
    };
    static yamlToKamelet = (text) => {
        const fromYaml = yaml.load(text);
        return KameletApi.jsonToKamelet(JSON.stringify(fromYaml));
    };
    static saveKamelets = (kameletYamls, clean = false) => {
        const kamelets = kameletYamls.map(text => KameletApi.yamlToKamelet(text));
        if (clean)
            Kamelets.length = 0;
        Kamelets.push(...kamelets.sort((a, b) => a.spec.definition.title.localeCompare(b.spec.definition.title, undefined, { sensitivity: 'base' })));
    };
    static saveKamelet = (yaml) => {
        const kamelet = KameletApi.yamlToKamelet(yaml);
        const kameletIndex = Kamelets.findIndex((k) => k.metadata.name === kamelet.metadata.name);
        if (kameletIndex === -1) {
            Kamelets.push(kamelet);
            KameletApi.saveCustomKameletName(kamelet.metadata.name);
        }
        else {
            Kamelets.splice(kameletIndex, 1, kamelet);
        }
    };
    static removeKamelet = (yaml) => {
        const kamelet = KameletApi.yamlToKamelet(yaml);
        const kameletIndex = Kamelets.findIndex((k) => k.metadata.name === kamelet.metadata.name);
        if (kameletIndex > -1) {
            Kamelets.splice(kameletIndex, 1);
            KameletApi.removeCustomKameletName(kamelet.metadata.name);
        }
    };
    static saveBlockedKameletNames = (names) => {
        BlockedKamelets.length = 0;
        BlockedKamelets.push(...names);
    };
    static saveBlockedKameletName = (name, checked) => {
        const index = BlockedKamelets.indexOf(name);
        if (!checked && index === -1) {
            BlockedKamelets.push(name);
        }
        else if (checked && index > -1) {
            BlockedKamelets.splice(index, 1);
        }
        return BlockedKamelets;
    };
    static getBlockedKameletNames = () => {
        return BlockedKamelets;
    };
}
