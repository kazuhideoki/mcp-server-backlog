import axios from "axios";

/**
 * Adds an issue type to a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param name Issue type name
 * @param color Issue type color (1:Red, 2:Green, 3:Blue, 4:Yellow, 5:Purple, 6:Cyan, 7:Gray, 8:Pink, 9:Orange, 10:Light Green, 11:Light Blue)
 * @returns Added issue type information
 */
export async function addIssueType(
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
    throw new Error("Issue type name is required");
  }

  if (!color) {
    throw new Error("Issue type color is required");
  }

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/issueTypes`,
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
    throw new Error(`Failed to add issue type: ${error.message}`);
  }
}