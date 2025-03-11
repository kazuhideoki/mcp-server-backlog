import axios from "axios";
import { omitBy, isUndefined } from "lodash";

/**
 * Adds a webhook to a project
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param projectIdOrKey Project ID or key
 * @param name Webhook name
 * @param hookUrl Webhook URL
 * @param options Optional parameters
 * @returns Added webhook
 * @see https://developer.nulab.com/docs/backlog/api/2/add-webhook
 */
export async function addWebhook(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  name: string,
  hookUrl: string,
  options?: {
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
        name: name,
        hookUrl: hookUrl,
        description: options?.description,
        allEvent: options?.allEvent,
        activityTypeIds: options?.activityTypeIds?.join(","),
      },
      isUndefined
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/webhooks`,
      data,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to add webhook: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}