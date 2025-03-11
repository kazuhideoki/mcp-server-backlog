import axios from "axios";

/**
 * Gets list of comment notifications
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param commentId Comment ID
 * @returns List of comment notifications
 * @see https://developer.nulab.com/docs/backlog/api/2/get-list-of-comment-notifications
 */
export async function getListOfCommentNotifications(
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
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments/${commentId}/notifications`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get list of comment notifications: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}