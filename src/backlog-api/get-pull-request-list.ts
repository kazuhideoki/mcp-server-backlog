import axios from "axios";
import _ from "lodash";

/**
 * Gets list of pull requests in a repository.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param options Additional options for filtering and pagination
 *   - `statusId`: Array of status IDs to filter pull requests by
 *   - `assigneeId`: Array of assignee IDs to filter pull requests by
 *   - `issueId`: Array of issue IDs to filter pull requests by
 *   - `createdUserId`: Array of creator user IDs to filter pull requests by
 *   - `offset`: Offset for pagination
 *   - `count`: Maximum number of pull requests to retrieve
 * @returns List of pull requests
 */
export async function getPullRequestList(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  options: {
    statusId?: number[];
    assigneeId?: number[];
    issueId?: number[];
    createdUserId?: number[];
    offset?: number;
    count?: number;
  } = {},
) {
  const { statusId, assigneeId, issueId, createdUserId, offset, count } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        statusId: 
          statusId && statusId.length > 0
            ? statusId
            : undefined,
        assigneeId: 
          assigneeId && assigneeId.length > 0
            ? assigneeId
            : undefined,
        issueId: 
          issueId && issueId.length > 0
            ? issueId
            : undefined,
        createdUserId: 
          createdUserId && createdUserId.length > 0
            ? createdUserId
            : undefined,
        offset,
        count,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests`,
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
    throw new Error(`Failed to get pull request list: ${error.message}`);
  }
}