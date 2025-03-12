import axios from 'axios';

/**
 * Gets the list of teams in a project
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param projectIdOrKey ID or key of the project
 * @returns List of teams in the project
 * @see https://developer.nulab.com/docs/backlog/api/2/get-project-team-list
 */
export async function getProjectTeamList(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!projectIdOrKey) throw new Error('projectIdOrKey is required');

  try {
    const response = await axios.get(`https://${baseUrl}/api/v2/projects/${projectIdOrKey}/teams`, {
      params: {
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to get project team list: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to get project team list: ${error instanceof Error ? error.message : String(error)}`);
  }
}