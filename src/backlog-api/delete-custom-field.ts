import axios from "axios";

/**
 * Deletes a custom field from a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param id ID of the custom field to delete
 * @returns Information about the deleted custom field
 */
export async function deleteCustomField(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  id: number,
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    if (!id) {
      throw new Error("Custom field ID is required");
    }

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/customFields/${id}`,
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
    throw new Error(`Failed to delete custom field: ${error.message}`);
  }
}