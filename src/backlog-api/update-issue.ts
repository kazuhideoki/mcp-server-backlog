import axios from "axios";
import _ from "lodash";

/**
 * Updates an existing issue.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param issueId ID of the issue to update
 * @param options Update parameters
 *   - `summary`: Updated summary/title of the issue
 *   - `description`: Updated description of the issue
 *   - `statusId`: Updated status ID of the issue
 *   - `priorityId`: Updated priority ID of the issue
 *   - `assigneeId`: Updated assignee user ID
 *   - `startDate`: Updated start date (format: "YYYY-MM-DD")
 *   - `dueDate`: Updated due date (format: "YYYY-MM-DD")
 * @returns The updated issue information
 */
export async function updateIssue(
  apiKey: string,
  baseUrl: string,
  issueId: string | number,
  options: {
    summary?: string;
    description?: string;
    statusId?: number;
    priorityId?: number;
    assigneeId?: number;
    startDate?: string;
    dueDate?: string;
  } = {},
) {
  try {
    const params = { apiKey };
    
    const data = _.omitBy(options, _.isNil);
    
    // Return early if no update parameters provided
    if (Object.keys(data).length === 0) {
      throw new Error("At least one update parameter must be provided");
    }

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/issues/${issueId}`,
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
    throw new Error(`Failed to update issue: ${error.message}`);
  }
}