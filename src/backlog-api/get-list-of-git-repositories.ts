import axios from "axios";

/**
 * Gets list of git repositories in a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @returns List of git repositories
 */
export async function getListOfGitRepositories(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories`,
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
    throw new Error(`Failed to get list of git repositories: ${error.message}`);
  }
}