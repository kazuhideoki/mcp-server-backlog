import axios from "axios";

/**
 * Updates the order of statuses in a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param statusIds Array of status IDs in the new order
 * @returns Updated status information
 */
export async function updateOrderOfStatus(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  statusIds: number[]
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!statusIds || statusIds.length === 0) {
    throw new Error("Status IDs are required");
  }

  try {
    // Construct the FormData for multiple statusId[] parameters
    const formData = new URLSearchParams();
    statusIds.forEach(id => {
      formData.append('statusId[]', id.toString());
    });

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/statuses/order`,
      formData.toString(),
      {
        params: {
          apiKey,
        },
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
    throw new Error(`Failed to update order of status: ${error.message}`);
  }
}