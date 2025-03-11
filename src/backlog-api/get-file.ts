import axios from "axios";

/**
 * Gets a file from the project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param path Path to the file
 * @returns Binary data of the file
 */
export async function getFile(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  path: string,
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    if (!path) {
      throw new Error("File path is required");
    }

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/files/${path}`,
      {
        params: {
          apiKey,
        },
        responseType: 'arraybuffer',
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to get file: ${error.message}`);
  }
}