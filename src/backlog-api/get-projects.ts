import axios from "axios";
import _ from "lodash";

/**
 * Gets list of projects in the space.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param options Additional options
 *   - `archived`: Flag to include archived projects
 *   - `all`: Flag to fetch all projects
 * @returns Information about projects in the space
 */
export async function getProjects(
  apiKey: string,
  baseUrl: string,
  options: {
    archived?: boolean;
    all?: boolean;
  } = {},
) {
  const { archived, all } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        archived,
        all,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects`,
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
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}