import axios from "axios";
import _ from "lodash";

/**
 * Updates an existing issue.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param issueId ID of the issue to update
 * @param options Update parameters
 *   - `summary`: Updated summary/title of the issue
 *   - `parentIssueId`: Parent Issue ID
 *   - `description`: Updated description of the issue
 *   - `statusId`: Updated status ID of the issue
 *   - `resolutionId`: Resolution ID
 *   - `startDate`: Updated start date (format: "YYYY-MM-DD")
 *   - `dueDate`: Updated due date (format: "YYYY-MM-DD")
 *   - `estimatedHours`: Estimated Hours
 *   - `actualHours`: Actual Hours
 *   - `issueTypeId`: Issue Type ID
 *   - `categoryId`: Category ID (can be single or multiple)
 *   - `versionId`: Version ID (can be single or multiple)
 *   - `milestoneId`: Milestone ID (can be single or multiple)
 *   - `priorityId`: Updated priority ID of the issue
 *   - `assigneeId`: Updated assignee user ID
 *   - `notifiedUserId`: Notified User ID (can be single or multiple)
 *   - `attachmentId`: Attachment file ID (can be single or multiple)
 *   - `comment`: Comment
 *   - Custom fields can be specified using the format `customField_{id}`
 * @returns The updated issue information
 */
export async function updateIssue(
  apiKey: string,
  baseUrl: string,
  issueId: string | number,
  options: {
    summary?: string;
    parentIssueId?: number;
    description?: string;
    statusId?: number;
    resolutionId?: number;
    startDate?: string;
    dueDate?: string;
    estimatedHours?: number;
    actualHours?: number;
    issueTypeId?: number;
    categoryId?: number | number[];
    versionId?: number | number[];
    milestoneId?: number | number[];
    priorityId?: number;
    assigneeId?: number;
    notifiedUserId?: number | number[];
    attachmentId?: number | number[];
    comment?: string;
    [key: string]: any; // For custom fields (customField_{id})
  } = {},
) {
  try {
    const params = { apiKey };
    
    // Clean up options to prepare for Backlog API
    let data: Record<string, any> = {};
    
    // Handle array parameters (categoryId[], versionId[], milestoneId[], etc.)
    Object.entries(options).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }
      
      // Handle array parameters with proper naming for Backlog API
      if (['categoryId', 'versionId', 'milestoneId', 'notifiedUserId', 'attachmentId'].includes(key) && Array.isArray(value)) {
        value.forEach((item) => {
          const paramKey = `${key}[]`;
          if (!data[paramKey]) {
            data[paramKey] = [];
          }
          data[paramKey].push(item);
        });
      } 
      // Handle single values that should be passed as arrays
      else if (['categoryId', 'versionId', 'milestoneId', 'notifiedUserId', 'attachmentId'].includes(key) && !Array.isArray(value)) {
        data[`${key}[]`] = [value];
      }
      // Handle custom fields and other parameters
      else {
        data[key] = value;
      }
    });
    
    // Filter out any null or undefined values
    data = _.omitBy(data, _.isNil);
    
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
          'Content-Type': 'application/x-www-form-urlencoded',
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