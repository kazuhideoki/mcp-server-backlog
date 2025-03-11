import axios from "axios";

/**
 * Adds a comment to an issue
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param content Comment content
 * @param options Optional parameters
 * @returns Comment information
 * @see https://developer.nulab.com/docs/backlog/api/2/add-comment
 */
export async function addComment(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  content: string,
  options: {
    notifiedUserId?: number[];
    attachmentId?: number[];
  } = {}
) {
  try {
    const params = {
      apiKey,
    };

    const data = {
      content,
      ...options,
    };

    const response = await axios.post(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments`,
      data,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to add comment: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}