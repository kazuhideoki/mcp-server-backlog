import axios from 'axios';

/**
 * Adds a team to a project
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param projectIdOrKey ID or key of the project
 * @param teamId ID of the team to add
 * @returns Information about the added project team
 * @see https://developer.nulab.com/docs/backlog/api/2/add-project-team
 */
export async function addProjectTeam(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  teamId: number
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!projectIdOrKey) throw new Error('projectIdOrKey is required');
  if (!teamId) throw new Error('teamId is required');

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/teams`,
      {
        teamId,
      },
      {
        params: {
          apiKey,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to add project team: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to add project team: ${error instanceof Error ? error.message : String(error)}`);
  }
}