import axios from "axios";
import _ from "lodash";

/**
 * Creates a new issue.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectId ID of the project to create the issue in
 * @param summary Summary/title of the issue
 * @param issueTypeId ID of the issue type
 * @param priorityId ID of the priority
 * @param options Additional optional parameters
 *   - `description`: Description of the issue
 *   - `startDate`: Start date (format: "YYYY-MM-DD")
 *   - `dueDate`: Due date (format: "YYYY-MM-DD")
 *   - `assigneeId`: ID of the user to assign the issue to
 * @returns The created issue information
 */
export async function createIssue(
  apiKey: string,
  baseUrl: string,
  projectId: number,
  summary: string,
  issueTypeId: number,
  priorityId: number,
  options: {
    description?: string;
    startDate?: string;
    dueDate?: string;
    assigneeId?: number;
  } = {},
) {
  const { description, startDate, dueDate, assigneeId } = options;

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        projectId,
        summary,
        issueTypeId,
        priorityId,
        description,
        startDate,
        dueDate,
        assigneeId,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/issues`,
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
    throw new Error(`Failed to create issue: ${error.message}`);
  }
}