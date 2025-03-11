import axios from "axios";

/**
 * Counts comments in an issue
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @returns Comment count
 * @see https://developer.nulab.com/docs/backlog/api/2/count-comment
 */
export async function countComment(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments/count`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to count comments: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}