import axios from "axios";

/**
 * Gets information about a specific webhook
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param projectIdOrKey Project ID or key
 * @param webhookId Webhook ID
 * @returns Webhook information
 * @see https://developer.nulab.com/docs/backlog/api/2/get-webhook
 */
export async function getWebhook(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  webhookId: number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/webhooks/${webhookId}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get webhook: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}