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

import { AnyPush, SoftwareDeliveryMachineConfiguration, SoftwareDeliveryMachine, or, IsPushToBranchWithPullRequest, and } from "@atomist/sdm";
import { configure } from "@atomist/sdm-core";
import { HelloWorldGoalConfigurer, AllDefinedGoalConfigurers } from "./lib/goals/goalConfigurer";
import { HelloWorldGoalCreator, AllDefinedGoalsCreator } from "./lib/goals/goalCreator";
import { HelloWorldGoals, AllDefinedGoals } from "./lib/goals/goals";
import { HasDockerfile } from "@atomist/sdm-pack-docker";

/**
 * The main entry point into the SDM
 */
export const configuration = configure<AllDefinedGoals>(async (sdm) => {

    // Use the sdm instance to configure commands etc
    sdm.addCommand({
        name: "HelloWorld",
        description: "Command that responds with a 'hello world'",
        listener: async ci => {
            await ci.addressChannels("Hello World");
        },
    });

    // Create goals and configure them
    const goals = await sdm.createGoals(AllDefinedGoalsCreator, [AllDefinedGoalConfigurers]);

    // Return all push rules
    return {
        hello: {
            test: AnyPush,
            goals: [],
        },
        dockerBuild: {
            test: HasDockerfile,
            goals: [
                [goals.dockerVersioning],
                [goals.dockerBuild],
            ]
        },
        dockerDeploy: {
            dependsOn: ["dockerBuild"],
            goals: [
                [goals.dockerDeploy],
            ],
        }
    };
});
