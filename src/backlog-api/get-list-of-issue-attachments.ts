import axios from "axios";

/**
 * Gets list of issue attachments
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @returns List of issue attachments
 * @see https://developer.nulab.com/docs/backlog/api/2/get-list-of-issue-attachments
 */
export async function getListOfIssueAttachments(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/attachments`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get list of issue attachments: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}