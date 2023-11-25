import * as core from '@actions/core'
import * as github from "@actions/github";
import { PullRequest } from "@octokit/webhooks-types";


/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
    try {
        if (github.context.eventName === "pull_request") {
            const pullPayload = github.context.payload.pull_request as PullRequest;
            const body: string | null = pullPayload.body;

            if (!body) {
                core.setFailed("No PR body provided. Please ensure you include the PR template.");
                return;
            }

            const lower: string = body.toLowerCase();
            const content: string = core.getInput("content").toLowerCase();

            if (!lower.includes(content)) {
                core.setFailed(`Content check for "${content}" was not successful.`);
                return;
            }

            core.setOutput("passed", "All content checks were successful!");
        }
    } catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error) core.setFailed(error.message)
    }
}