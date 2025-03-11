import axios from "axios";

/**
 * Gets information about a specific issue
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @returns Issue information
 * @see https://developer.nulab.com/docs/backlog/api/2/get-issue
 */
export async function getIssue(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get issue: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}