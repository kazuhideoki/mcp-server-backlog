import axios from "axios";

/**
 * Gets number of comments in a pull request.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param number Pull request number
 * @returns Count of comments
 */
export async function getNumberOfPullRequestComments(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  number: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/comments/count`,
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
    throw new Error(`Failed to get number of pull request comments: ${error.message}`);
  }
}