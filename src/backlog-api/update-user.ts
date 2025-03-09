import axios from "axios";
import _ from "lodash";

/**
 * Updates an existing user in the space.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId ID of the user to update
 * @param options Update parameters
 *   - `password`: New password
 *   - `name`: New display name
 *   - `mailAddress`: New email address
 *   - `roleType`: New role type ID (1: Admin, 2: General, 3: Reporter, 4: Viewer, 5: Guest Reporter, 6: Guest Viewer)
 * @returns Information about the updated user
 */
export async function updateUser(
  apiKey: string,
  baseUrl: string,
  userId: number,
  options: {
    password?: string;
    name?: string;
    mailAddress?: string;
    roleType?: number;
  } = {},
) {
  try {
    const params = { apiKey };
    
    const data = _.omitBy(options, _.isNil);
    
    // Return early if no update parameters provided
    if (Object.keys(data).length === 0) {
      throw new Error("At least one update parameter must be provided");
    }

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/users/${userId}`,
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
    throw new Error(`Failed to update user: ${error.message}`);
  }
}