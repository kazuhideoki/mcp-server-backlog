import axios from "axios";

/**
 * Gets custom field list of a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @returns Information about custom fields
 */
export async function getCustomFieldList(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/customFields`,
      {
        params: {
          apiKey,
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
    throw new Error(`Failed to get custom field list: ${error.message}`);
  }
}