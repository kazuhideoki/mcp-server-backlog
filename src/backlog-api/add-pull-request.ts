import axios from "axios";
import _ from "lodash";

/**
 * Adds a pull request to a repository.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param summary Summary/title of the pull request
 * @param description Description of the pull request
 * @param base Base branch
 * @param branch Feature branch
 * @param options Additional options
 *   - `issueId`: ID of the issue related to this pull request
 *   - `assigneeId`: ID of the user to assign the pull request to
 *   - `notifiedUserId`: Array of user IDs to notify
 *   - `attachmentId`: Array of attachment IDs
 * @returns The created pull request
 */
export async function addPullRequest(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  summary: string,
  description: string,
  base: string,
  branch: string,
  options: {
    issueId?: number;
    assigneeId?: number;
    notifiedUserId?: number[];
    attachmentId?: number[];
  } = {},
) {
  const { issueId, assigneeId, notifiedUserId, attachmentId } = options;

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        summary,
        description,
        base,
        branch,
        issueId,
        assigneeId,
        notifiedUserId: 
          notifiedUserId && notifiedUserId.length > 0
            ? notifiedUserId
            : undefined,
        attachmentId: 
          attachmentId && attachmentId.length > 0
            ? attachmentId
            : undefined,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests`,
      data,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to add pull request: ${error.message}`);
  }
}