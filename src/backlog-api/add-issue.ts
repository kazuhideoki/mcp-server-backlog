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
 *   - `parentIssueId`: Parent Issue ID
 *   - `description`: Description of the issue
 *   - `startDate`: Start date (format: "YYYY-MM-DD")
 *   - `dueDate`: Due date (format: "YYYY-MM-DD")
 *   - `estimatedHours`: Estimated Hours
 *   - `actualHours`: Actual Hours
 *   - `categoryId`: Category ID(s) (array)
 *   - `versionId`: Version ID(s) (array)
 *   - `milestoneId`: Milestone ID(s) (array)
 *   - `assigneeId`: ID of the user to assign the issue to
 *   - `notifiedUserId`: Notified User ID(s) (array)
 *   - `attachmentId`: Attachment file ID(s) (array)
 *   - `customFields`: Custom Fields (object of { customField_id: value, customField_id_otherValue: value })
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
    parentIssueId?: number;
    description?: string;
    startDate?: string;
    dueDate?: string;
    estimatedHours?: number;
    actualHours?: number;
    categoryId?: number[];
    versionId?: number[];
    milestoneId?: number[];
    assigneeId?: number;
    notifiedUserId?: number[];
    attachmentId?: number[];
    customFields?: Record<string, any>;
  } = {},
) {
  const { 
    parentIssueId,
    description, 
    startDate, 
    dueDate, 
    estimatedHours,
    actualHours,
    categoryId,
    versionId,
    milestoneId,
    assigneeId,
    notifiedUserId,
    attachmentId,
    customFields = {}
  } = options;

  try {
    const params = { apiKey };
    
    let formData: Record<string, any> = {
      projectId,
      summary,
      issueTypeId,
      priorityId,
      parentIssueId,
      description,
      startDate,
      dueDate,
      estimatedHours,
      actualHours,
      assigneeId,
    };
    
    // Add array fields if they exist
    if (categoryId?.length) {
      categoryId.forEach((id, i) => {
        formData[`categoryId[${i}]`] = id;
      });
    }
    
    if (versionId?.length) {
      versionId.forEach((id, i) => {
        formData[`versionId[${i}]`] = id;
      });
    }
    
    if (milestoneId?.length) {
      milestoneId.forEach((id, i) => {
        formData[`milestoneId[${i}]`] = id;
      });
    }
    
    if (notifiedUserId?.length) {
      notifiedUserId.forEach((id, i) => {
        formData[`notifiedUserId[${i}]`] = id;
      });
    }
    
    if (attachmentId?.length) {
      attachmentId.forEach((id, i) => {
        formData[`attachmentId[${i}]`] = id;
      });
    }
    
    // Add custom fields
    Object.entries(customFields).forEach(([key, value]) => {
      formData[key] = value;
    });

    // Remove null/undefined values
    formData = _.omitBy(formData, _.isNil);

    const response = await axios.post(
      `https://${baseUrl}/api/v2/issues`,
      formData,
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
    throw new Error(`Failed to create issue: ${error.message}`);
  }
}