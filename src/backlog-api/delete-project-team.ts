import axios from 'axios';

/**
 * Removes a team from a project
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param projectIdOrKey ID or key of the project
 * @param teamId ID of the team to remove
 * @returns Information about the removed project team
 * @see https://developer.nulab.com/docs/backlog/api/2/delete-project-team
 */
export async function deleteProjectTeam(
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
    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/teams/${teamId}`,
      {
        params: {
          apiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to delete project team: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to delete project team: ${error instanceof Error ? error.message : String(error)}`);
  }
}