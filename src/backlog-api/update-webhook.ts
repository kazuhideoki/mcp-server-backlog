import axios from "axios";
import { omitBy, isUndefined } from "lodash";

/**
 * Updates an existing webhook
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param projectIdOrKey Project ID or key
 * @param webhookId Webhook ID
 * @param updateParams Parameters to update
 * @returns Updated webhook
 * @see https://developer.nulab.com/docs/backlog/api/2/update-webhook
 */
export async function updateWebhook(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  webhookId: number,
  updateParams: {
    name?: string;
    hookUrl?: string;
    description?: string;
    allEvent?: boolean;
    activityTypeIds?: number[];
  }
) {
  try {
    const params = {
      apiKey,
    };

    const data = omitBy(
      {
        name: updateParams.name,
        hookUrl: updateParams.hookUrl,
        description: updateParams.description,
        allEvent: updateParams.allEvent,
        activityTypeIds: updateParams.activityTypeIds?.join(","),
      },
      isUndefined
    );

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/webhooks/${webhookId}`,
      data,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to update webhook: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}