import axios from "axios";
import _ from "lodash";

/**
 * Adds a star to issue, comment, wiki, pull request, or pull request comment.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param options Options including one of the following IDs
 *   - `issueId`: ID of the issue to add a star to
 *   - `commentId`: ID of the comment to add a star to
 *   - `wikiId`: ID of the wiki to add a star to
 *   - `pullRequestId`: ID of the pull request to add a star to
 *   - `pullRequestCommentId`: ID of the pull request comment to add a star to
 * @returns Result of the operation
 */
export async function addStar(
  apiKey: string,
  baseUrl: string,
  options: {
    issueId?: number;
    commentId?: number;
    wikiId?: number;
    pullRequestId?: number;
    pullRequestCommentId?: number;
  },
) {
  // Ensure at least one ID is provided
  const { issueId, commentId, wikiId, pullRequestId, pullRequestCommentId } = options;
  
  if (!issueId && !commentId && !wikiId && !pullRequestId && !pullRequestCommentId) {
    throw new Error("At least one of issueId, commentId, wikiId, pullRequestId, or pullRequestCommentId is required");
  }

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        issueId,
        commentId,
        wikiId,
        pullRequestId,
        pullRequestCommentId,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/stars`,
      data,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to add star: ${error.message}`);
  }
}