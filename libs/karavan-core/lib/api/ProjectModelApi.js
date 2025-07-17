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
import { ProjectModel, ProjectProperty } from '../model/ProjectModel';
export class ProjectModelApi {
    constructor() { }
    static propertiesToProject = (properties) => {
        const lines = properties.split(/\r?\n/).filter(text => text.trim().length > 0 && !text.trim().startsWith('#'));
        const project = new ProjectModel();
        project.properties = lines.map(value => ProjectModelApi.stringToProperty(value));
        return project;
    };
    static stringToProperty = (line) => {
        const pair = line.split('=');
        const value = pair[1];
        return ProjectProperty.createNew(pair[0], value);
    };
    static propertiesToString = (properties) => {
        return properties
            .map(({ key, value }) => {
            if (key !== undefined && value !== undefined)
                return `${key}=${value}`;
            return '';
        })
            .join('\n');
    };
    static getProfiles = (properties) => {
        const result = [];
        properties.forEach(({ key }) => {
            if (key.startsWith('%')) {
                const profile = key.substring(1, key.indexOf('.'));
                if (!result.includes(profile))
                    result.push(profile);
            }
        });
        return result;
    };
    static updateProperties = (properties, project) => {
        const mapFromProject = ProjectModelApi.projectToMap(project);
        const result = [];
        for (const [key, value] of mapFromProject) {
            if (value !== undefined)
                result.push(`${key}=${value}`);
        }
        return result.join('\n');
    };
    static projectToMap = (project) => {
        const map = new Map();
        if (project.properties && project.properties.length > 0) {
            project.properties.forEach(({ key, value }) => map.set(key, value));
        }
        return map;
    };
}
