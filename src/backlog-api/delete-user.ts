import axios from "axios";

/**
 * Deletes a user in the space.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId ID of the user to delete
 * @returns The deleted user information
 */
export async function deleteUser(
  apiKey: string,
  baseUrl: string,
  userId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/users/${userId}`,
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
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}