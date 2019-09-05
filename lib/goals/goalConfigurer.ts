/*
 * Copyright © 2019 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GoalConfigurer, Version, goalScheduling } from "@atomist/sdm-core";
import { HelloWorldGoals, DockerBuildGoals, AllDefinedGoals, DockerDeployGoals, K8sDeployGoals } from "./goals";

/**
 * Configure the SDM and add fulfillments or listeners to the created goals
 */
export const HelloWorldGoalConfigurer: GoalConfigurer<HelloWorldGoals> = async (sdm, goals) => {

    // This is a good place to configure your SDM instance and goals with additional listeners or
    // fulfillments

    goals.helloWorld.with({
        name: "hello-world",
        goalExecutor: async gi => {
            const { progressLog, addressChannels } = gi;

            progressLog.write("Sending 'hello world' to all linked channels");
            await addressChannels("Hello world");
        },
    });

};

export const DockerBuildGoalConfigurer: GoalConfigurer<DockerBuildGoals> = async (sdm, goals) => {
    goals.dockerVersioning.with({versioner: async (v) => { return v.sha }});
    goals.dockerBuild.with({ 
        push: false, 
        dockerImageNameCreator: async (gitProject, event, dockerOptions) => {
            const shortSha = event.sha.slice(0,16);
            return [{
                registry: "",
                name: `${event.repo.owner.toLowerCase()}-${event.repo.name.toLowerCase()}`,
                tags: [shortSha, `${Date.now()}`, 'latest'],
            }]
        } 
    });
}

export const DockerDeployGoalConfigurer: GoalConfigurer<DockerDeployGoals> = async (sdm, goals) => {
    // sourcePort is the port is the "exposed port in the Dockerfile to be mapped externally"
    goals.dockerDeploy.with({ name: 'docker-deploy-t soemthing', successPatterns: [/starting server/], sourcePort: 2866 })
}

export const K8sDeployGoalConfigurer: GoalConfigurer<K8sDeployGoals> = async (sdm, goals) => {
    goals.k8sDeploy.with({
        applicationData: async (ka, gp, kd, sge, ctx) => {
            const annotations = {
                "kubernetes.io/ingress.class": "nginx",
                "nginx.ingress.kubernetes.io/rewrite-target": "/",
                "nginx.ingress.kubernetes.io/ssl-redirect": "false",
            }
            // ka.ingressSpec = {
            //     metadata:
            //     {
            //         annotations: {
            //             "kubernetes.io / ingress.class": "nginx",
            //             "nginx.ingress.kubernetes.io / rewrite - target": "/",
            //             "nginx.ingress.kubernetes.io / ssl - redirect": "false",
            //         }
            //     }
            // }

            ka.ingressSpec = {}
            ka.ingressSpec.metadata = {annotations}
            return {
                ...ka,
                workspaceId: ka.workspaceId, // "test-workspace",
                image: `${sge.repo.owner.toLowerCase()}-${sge.repo.name.toLowerCase()}`,
                ns: "ns2",
                name: gp.name,
                port: 2866,
                path: `/${gp.name}`,
                deploymentSpec: {
                    spec: {
                        template: {
                            spec: {
                                containers:
                                    [{ imagePullPolicy: "Never" }],
                                
                            }
                        }
                    }
                },
            }
        } 
    })
}


export const AllDefinedGoalConfigurers: GoalConfigurer<AllDefinedGoals> = async (sdm, goals) => {
    const configurers = 
        [ DockerBuildGoalConfigurer
        , DockerDeployGoalConfigurer
        , K8sDeployGoalConfigurer
        ];
    await Promise.all(configurers.map(c => c(sdm, goals)))
}
