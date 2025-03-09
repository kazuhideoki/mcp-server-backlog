import axios from "axios";
import _ from "lodash";

/**
 * Gets list of issues.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param options Additional options including filters and pagination
 *   - `projectId`: Array of project IDs to get issues from
 *   - `statusId`: Array of status IDs to filter by
 *   - `assigneeId`: Array of assignee user IDs to filter by
 *   - `count`: Maximum number of issues to retrieve (1-100). Default is 20 if not specified
 *   - `offset`: Offset for pagination
 * @returns Information about issues
 */
export async function getIssues(
  apiKey: string,
  baseUrl: string,
  options: {
    projectId?: number[];
    statusId?: number[];
    assigneeId?: number[];
    count?: number;
    offset?: number;
  } = {},
) {
  const { projectId, statusId, assigneeId, count, offset } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        projectId: 
          projectId && projectId.length > 0
            ? projectId
            : undefined,
        statusId: 
          statusId && statusId.length > 0
            ? statusId
            : undefined,
        assigneeId: 
          assigneeId && assigneeId.length > 0
            ? assigneeId
            : undefined,
        count,
        offset,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues`,
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
    throw new Error(`Failed to fetch issues: ${error.message}`);
  }
}