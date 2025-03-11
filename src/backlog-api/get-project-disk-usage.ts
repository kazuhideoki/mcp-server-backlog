import axios from "axios";

/**
 * Gets the disk usage of a project
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param projectIdOrKey Project ID or key
 * @returns Object containing disk usage information
 * @see https://developer.nulab.com/docs/backlog/api/2/get-project-disk-usage
 */
export async function getProjectDiskUsage(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/diskUsage`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get project disk usage: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}