import axios from "axios";

/**
 * Updates a list item in a list type custom field.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param id ID of the custom field
 * @param itemId ID of the list item to update
 * @param name New name for the list item
 * @returns Information about the updated list item
 */
export async function updateListItemForListTypeCustomField(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  id: number,
  itemId: number,
  name: string,
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    if (!id) {
      throw new Error("Custom field ID is required");
    }

    if (!itemId) {
      throw new Error("Item ID is required");
    }

    if (!name) {
      throw new Error("Item name is required");
    }

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/customFields/${id}/items/${itemId}`,
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
    throw new Error(`Failed to update list item for list type custom field: ${error.message}`);
  }
}