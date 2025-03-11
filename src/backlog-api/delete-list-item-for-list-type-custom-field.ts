import axios from "axios";

/**
 * Deletes a list item from a list type custom field.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param id ID of the custom field
 * @param itemId ID of the list item to delete
 * @returns Information about the deleted list item
 */
export async function deleteListItemForListTypeCustomField(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  id: number,
  itemId: number,
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

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/customFields/${id}/items/${itemId}`,
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
    throw new Error(`Failed to delete list item for list type custom field: ${error.message}`);
  }
}