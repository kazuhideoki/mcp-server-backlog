import axios from "axios";
import _ from "lodash";

/**
 * Adds a comment to a pull request.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param number Pull request number
 * @param content Content of the comment
 * @param options Additional options
 *   - `notifiedUserId`: Array of user IDs to notify
 *   - `attachmentId`: Array of attachment IDs
 * @returns The created comment
 */
export async function addPullRequestComment(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  number: number,
  content: string,
  options: {
    notifiedUserId?: number[];
    attachmentId?: number[];
  } = {},
) {
  const { notifiedUserId, attachmentId } = options;

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        content,
        notifiedUserId: 
          notifiedUserId && notifiedUserId.length > 0
            ? notifiedUserId
            : undefined,
        attachmentId: 
          attachmentId && attachmentId.length > 0
            ? attachmentId
            : undefined,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/comments`,
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
    throw new Error(`Failed to add pull request comment: ${error.message}`);
  }
}