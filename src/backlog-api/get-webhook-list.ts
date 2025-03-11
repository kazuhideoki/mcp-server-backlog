import axios from "axios";

/**
 * Gets list of webhooks in a project
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param projectIdOrKey Project ID or key
 * @returns Array of webhook objects
 * @see https://developer.nulab.com/docs/backlog/api/2/get-webhook-list
 */
export async function getWebhookList(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/webhooks`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get webhook list: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}