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

import { goal } from "@atomist/sdm";
import { GoalCreator, Version } from "@atomist/sdm-core";
import { HelloWorldGoals, DockerBuildGoals, AllDefinedGoals, DockerDeployGoals, K8sDeployGoals } from "./goals";
import { DockerBuild, DockerDeploy, DockerPerBranchDeployer } from "@atomist/sdm-pack-docker";
import { KubernetesDeploy } from "@atomist/sdm-pack-k8s";

/**
 * Create all goal instances and return an instance of HelloWorldGoals
 */
export const HelloWorldGoalCreator: GoalCreator<HelloWorldGoals> = async sdm => {

    // This is the place to create the goal instances and return them
    // as part of the goal interface

    return {
        helloWorld: goal({ displayName: "hello world" }),
    };
};


export const DockerBuildGoalCreator: GoalCreator<DockerBuildGoals> = async sdm => {
    return {
        dockerVersioning: new Version({ displayName: "docker version", uniqueName: "docker-version" }),
        dockerBuild: new DockerBuild({ displayName: "docker build t", uniqueName: "docker-build-t" }),
    }
}

export const DockerDeployGoalCreator: GoalCreator<DockerDeployGoals> = async sdm => {
    return {
        dockerDeploy: new DockerDeploy({ displayName: "docker deploy t", uniqueName: "docker-deploy-t" }),
    }
}

export const K8sDeployGoalCreator: GoalCreator<K8sDeployGoals> = async sdm => {
    return {
        k8sDeploy: new KubernetesDeploy({ displayName: "k8s deploy", uniqueName: "k8s-deploy", environment: "tmp-env" })
    }
}


export const AllDefinedGoalsCreator: GoalCreator<AllDefinedGoals> = async sdm => {
    return {
        // ...(await HelloWorldGoalCreator(sdm)),
        ...(await DockerBuildGoalCreator(sdm)),
        ...(await DockerDeployGoalCreator(sdm)),
        ...(await K8sDeployGoalCreator(sdm)),
    }
}