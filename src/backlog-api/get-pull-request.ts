import axios from "axios";

/**
 * Gets information about a specific pull request.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param number Pull request number
 * @returns Information about the pull request
 */
export async function getPullRequest(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  number: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}`,
      {
        params,
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to get pull request: ${error.message}`);
  }
}