import axios from "axios";

/**
 * Gets list of comments in an issue
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param options Optional parameters
 * @returns Comment list
 * @see https://developer.nulab.com/docs/backlog/api/2/get-comment-list
 */
export async function getCommentList(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  options: {
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  } = {}
) {
  try {
    const params = {
      apiKey,
      ...options,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/comments`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get comment list: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}