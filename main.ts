import * as core from '@actions/core'
import * as github from "@actions/github";
import { PullRequest } from "@octokit/webhooks-types";


export async function run() {
    try {
        if (github.context.eventName === "pull_request") {
            core.debug(`CONTEXT IS: ${github.context}`);
            core.debug(`PAYLOAD IS: ${github.context.payload}`);
            
            const pullPayload = github.context.payload as PullRequest;
            const body: string | null = pullPayload.body;

            core.info(`BODY IS: ${body}`);

            if (!body) {
                core.setFailed("No PR body provided. Please ensure you include the PR template.");
                return 1;
            }

            const lower: string = body.toLowerCase();
            const content: string = core.getInput("content").toLowerCase();

            if (!lower.includes(content)) {
                core.setFailed(`Content check for "${content}" was not successful.`);
                return 1;
            }

            core.setOutput("passed", "All content checks were successful!");
        }
    } catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error) core.setFailed(error.message)
    }
}