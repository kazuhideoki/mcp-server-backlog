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
 *   - `categoryId`: Category ID(s) (array)
 *   - `versionId`: Version ID(s) (array)
 *   - `milestoneId`: Milestone ID(s) (array)
 *   - `priorityId`: Updated priority ID of the issue
 *   - `assigneeId`: Updated assignee user ID
 *   - `notifiedUserId`: Notified User ID(s) (array)
 *   - `attachmentId`: Attachment file ID(s) (array)
 *   - `comment`: Comment
 *   - `customFields`: Custom Fields (object of { customField_id: value, customField_id_otherValue: value })
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
    categoryId?: number[];
    versionId?: number[];
    milestoneId?: number[];
    priorityId?: number;
    assigneeId?: number;
    notifiedUserId?: number[];
    attachmentId?: number[];
    comment?: string;
    customFields?: Record<string, any>;
  } = {},
) {
  try {
    const params = { apiKey };

    const {
      categoryId,
      versionId,
      milestoneId,
      notifiedUserId,
      attachmentId,
      customFields = {},
      ...standardOptions
    } = options;

    // Initialize formData with standard options
    let formData: Record<string, any> = {
      ...standardOptions,
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

    // Return early if no update parameters provided
    if (Object.keys(formData).length === 0) {
      throw new Error("At least one update parameter must be provided");
    }

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/issues/${issueId}`,
      formData,
      {
        params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
