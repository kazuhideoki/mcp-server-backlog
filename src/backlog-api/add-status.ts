import axios from "axios";

/**
 * Adds a status to a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param name Status name
 * @param color Status color (1:Red, 2:Green, 3:Blue, 4:Yellow, 5:Purple, 6:Cyan, 7:Gray, 8:Pink, 9:Orange, 10:Light Green, 11:Light Blue)
 * @returns Added status information
 */
export async function addStatus(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  name: string,
  color: number
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!name) {
    throw new Error("Status name is required");
  }

  if (!color) {
    throw new Error("Status color is required");
  }

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/statuses`,
      {
        name,
        color
      },
      {
        params: {
          apiKey,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
    throw new Error(`Failed to add status: ${error.message}`);
  }
}