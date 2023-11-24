import core from "@actions/core";
import github from "@actions/github";
import { PullRequest } from "@octokit/webhooks-types";


function doChecks() {
  if (github.context.eventName === "pull_request") {
    const pullPayload = github.context.payload as PullRequest;
    const body: string | null = pullPayload.body;
  
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
}

try {
  doChecks();
} catch (error: any) {
  core.setFailed(error.message);
}