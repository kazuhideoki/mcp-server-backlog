import axios from "axios";
import _ from "lodash";

/**
 * Gets comments of a pull request.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param number Pull request number
 * @param options Additional options for filtering and pagination
 *   - `minId`: Minimum ID of comments to get
 *   - `maxId`: Maximum ID of comments to get
 *   - `count`: Maximum number of comments to retrieve
 *   - `order`: Order of comments ("asc" or "desc")
 * @returns Comments of the pull request
 */
export async function getPullRequestComment(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  number: number,
  options: {
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "asc" | "desc";
  } = {},
) {
  const { minId, maxId, count, order } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        minId,
        maxId,
        count,
        order,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/comments`,
      {
        params,
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to get pull request comments: ${error.message}`);
  }
}