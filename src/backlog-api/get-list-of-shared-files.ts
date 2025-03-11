import axios from "axios";
import _ from "lodash";

/**
 * Gets list of shared files in a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param path Path to the directory (default: null)
 * @returns Information about shared files
 */
export async function getListOfSharedFiles(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  path?: string,
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    const params = _.omitBy(
      {
        apiKey,
        path,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/files/metadata`,
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
    throw new Error(`Failed to get list of shared files: ${error.message}`);
  }
}