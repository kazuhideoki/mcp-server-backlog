import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

/**
 * Posts an attachment file to Backlog.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param filePath Path to the file to be uploaded
 * @returns Information about the uploaded file
 */
export async function postAttachmentFile(
  apiKey: string,
  baseUrl: string,
  filePath: string,
) {
  try {
    const params = { apiKey };
    const form = new FormData();
    const fileName = path.basename(filePath);
    
    // Read file and add to form data
    const fileStream = fs.createReadStream(filePath);
    form.append("file", fileStream, { filename: fileName });

    const response = await axios.post(
      `https://${baseUrl}/api/v2/space/attachment`,
      form,
      {
        params,
        headers: {
          ...form.getHeaders(),
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
    throw new Error(`Failed to upload attachment: ${error.message}`);
  }
}