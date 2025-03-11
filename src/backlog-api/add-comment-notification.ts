import axios from "axios";

/**
 * Adds notifications to a comment
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param commentId Comment ID
 * @param notifiedUserIds Array of user IDs to notify
 * @returns Added notification information
 * @see https://developer.nulab.com/docs/backlog/api/2/add-comment-notification
 */
export async function addCommentNotification(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  commentId: number,
  notifiedUserIds: number[]
) {
  try {
    const params = {
      apiKey,
    };

    const data = {
      notifiedUserId: notifiedUserIds,
    };

    const response = await axios.post(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments/${commentId}/notifications`,
      data,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to add comment notification: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}