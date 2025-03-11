import axios from "axios";

/**
 * Deletes an issue
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @returns Deleted issue
 * @see https://developer.nulab.com/docs/backlog/api/2/delete-issue
 */
export async function deleteIssue(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete issue: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}