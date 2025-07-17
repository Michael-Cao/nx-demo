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
import { ApplicationProperty, ApplicationPropertyGroup } from '../model/MainConfigurationModel';
const MainApplicationProperties = [];
const MainApplicationGroups = [];
export class MainConfigurationApi {
    constructor() { }
    static saveApplicationProperties = (objects, clean = false) => {
        if (clean)
            MainApplicationProperties.length = 0;
        const properties = objects.map(object => new ApplicationProperty(object));
        MainApplicationProperties.push(...properties);
    };
    static getApplicationProperties = () => {
        const comps = [];
        comps.push(...MainApplicationProperties);
        return comps;
    };
    static findByName = (name) => {
        return MainConfigurationApi.getApplicationProperties().find((c) => c.name === name);
    };
    static saveApplicationPropertyGroups = (objects) => {
        MainApplicationGroups.length = 0;
        const properties = objects.map(object => new ApplicationPropertyGroup(object));
        MainApplicationProperties.push(...properties);
    };
}
