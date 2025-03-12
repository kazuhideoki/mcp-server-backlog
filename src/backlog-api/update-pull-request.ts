import axios from "axios";
import _ from "lodash";

/**
 * Updates a pull request.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param number Pull request number
 * @param options Update options
 *   - `summary`: New summary/title of the pull request
 *   - `description`: New description of the pull request
 *   - `issueId`: New issue ID related to this pull request
 *   - `assigneeId`: New assignee user ID
 *   - `statusId`: New status ID
 *   - `repositoryId`: New repository ID
 *   - `baseId`: New base branch ID
 *   - `branchId`: New feature branch ID
 *   - `notifiedUserId`: Array of user IDs to notify
 *   - `attachmentId`: Array of attachment IDs
 * @returns The updated pull request
 */
export async function updatePullRequest(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  number: number,
  options: {
    summary?: string;
    description?: string;
    issueId?: number;
    assigneeId?: number;
    statusId?: number;
    repositoryId?: number;
    baseId?: number;
    branchId?: number;
    notifiedUserId?: number[];
    attachmentId?: number[];
  } = {},
) {
  const {
    summary,
    description,
    issueId,
    assigneeId,
    statusId,
    repositoryId,
    baseId,
    branchId,
    notifiedUserId,
    attachmentId,
  } = options;

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        summary,
        description,
        issueId,
        assigneeId,
        statusId,
        repositoryId,
        baseId,
        branchId,
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

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}`,
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
    throw new Error(`Failed to update pull request: ${error.message}`);
  }
}