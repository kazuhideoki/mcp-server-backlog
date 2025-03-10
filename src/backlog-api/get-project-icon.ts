import axios from "axios";

/**
 * Gets the icon of a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @returns Project icon (binary data)
 */
export async function getProjectIcon(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  try {
    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/image`,
      {
        params: {
          apiKey,
        },
        responseType: "arraybuffer",
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.message}`,
      );
    }
    throw new Error(`Failed to fetch project icon: ${error.message}`);
  }
}