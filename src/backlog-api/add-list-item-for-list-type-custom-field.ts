import axios from "axios";

/**
 * Adds a list item to a list type custom field.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param id ID of the custom field
 * @param name Name of the item to add
 * @returns Information about the added list item
 */
export async function addListItemForListTypeCustomField(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  id: number,
  name: string,
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    if (!id) {
      throw new Error("Custom field ID is required");
    }

    if (!name) {
      throw new Error("Item name is required");
    }

    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/customFields/${id}/items`,
      null,
      {
        params: {
          apiKey,
          name,
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
    throw new Error(`Failed to add list item for list type custom field: ${error.message}`);
  }
}