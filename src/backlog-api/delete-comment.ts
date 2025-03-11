import axios from "axios";

/**
 * Deletes a comment
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param commentId Comment ID
 * @returns Deleted comment information
 * @see https://developer.nulab.com/docs/backlog/api/2/delete-comment
 */
export async function deleteComment(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  commentId: number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments/${commentId}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete comment: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}