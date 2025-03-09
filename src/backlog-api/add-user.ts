import axios from "axios";
import _ from "lodash";

/**
 * Adds a new user to the space.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId User ID (email address)
 * @param password User password
 * @param name User's display name
 * @param options Additional optional parameters
 *   - `mailAddress`: User's email address (if different from userId)
 *   - `roleType`: Role type ID (1: Admin, 2: General, 3: Reporter, 4: Viewer, 5: Guest Reporter, 6: Guest Viewer)
 * @returns Information about the newly created user
 */
export async function addUser(
  apiKey: string,
  baseUrl: string,
  userId: string,
  password: string,
  name: string,
  options: {
    mailAddress?: string;
    roleType?: number;
  } = {},
) {
  const { mailAddress, roleType } = options;

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        userId,
        password,
        name,
        mailAddress,
        roleType,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/users`,
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
    throw new Error(`Failed to add user: ${error.message}`);
  }
}