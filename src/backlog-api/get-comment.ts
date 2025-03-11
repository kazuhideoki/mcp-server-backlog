import axios from "axios";

/**
 * Gets information about a specific comment
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param commentId Comment ID
 * @returns Comment information
 * @see https://developer.nulab.com/docs/backlog/api/2/get-comment
 */
export async function getComment(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  commentId: number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments/${commentId}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get comment: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}