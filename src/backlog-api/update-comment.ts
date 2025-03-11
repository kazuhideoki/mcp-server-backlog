import axios from "axios";

/**
 * Updates a comment
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param commentId Comment ID
 * @param content Updated comment content
 * @returns Updated comment information
 * @see https://developer.nulab.com/docs/backlog/api/2/update-comment
 */
export async function updateComment(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  commentId: number,
  content: string
) {
  try {
    const params = {
      apiKey,
    };

    const data = {
      content,
    };

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments/${commentId}`,
      data,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to update comment: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}