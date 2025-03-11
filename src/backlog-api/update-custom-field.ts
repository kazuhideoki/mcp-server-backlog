import axios from "axios";
import _ from "lodash";

/**
 * Updates a custom field in a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param id ID of the custom field to update
 * @param params Parameters to update (name, description, required, etc.)
 * @returns Information about the updated custom field
 */
export async function updateCustomField(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  id: number,
  params: {
    name?: string;
    description?: string;
    required?: boolean;
    applicableIssueTypes?: number[];
    items?: string[];
    allowInput?: boolean;
    allowAddItem?: boolean;
    min?: number;
    max?: number;
    initial?: string;
    unit?: string;
  } = {},
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    if (!id) {
      throw new Error("Custom field ID is required");
    }

    if (Object.keys(params).length === 0) {
      throw new Error("At least one parameter is required for update");
    }

    const requestParams = _.omitBy(
      {
        apiKey,
        ...params,
        applicableIssueTypes: 
          params.applicableIssueTypes && params.applicableIssueTypes.length > 0
            ? params.applicableIssueTypes
            : undefined,
        items: 
          params.items && params.items.length > 0 
            ? params.items 
            : undefined,
      },
      _.isNil,
    );

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/customFields/${id}`,
      null,
      {
        params: requestParams,
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to update custom field: ${error.message}`);
  }
}