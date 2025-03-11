import axios from "axios";

/**
 * Deletes a webhook
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param projectIdOrKey Project ID or key
 * @param webhookId Webhook ID
 * @returns Deleted webhook
 * @see https://developer.nulab.com/docs/backlog/api/2/delete-webhook
 */
export async function deleteWebhook(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  webhookId: number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/webhooks/${webhookId}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete webhook: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}