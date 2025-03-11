import axios from "axios";
import _ from "lodash";

type CustomFieldType = "Text" | "TextArea" | "Numeric" | "Date" | "SingleList" | "MultipleList" | "CheckBox" | "Radio";

/**
 * Adds a custom field to a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param typeId Type ID of the custom field (1:Text, 2:TextArea, 3:Numeric, 4:Date, 5:SingleList, 6:MultipleList, 7:CheckBox, 8:Radio)
 * @param name Name of the custom field
 * @param options Additional optional parameters for the custom field
 * @returns Information about the created custom field
 */
export async function addCustomField(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  typeId: number,
  name: string,
  options: {
    description?: string;
    required?: boolean;
    applicableIssueTypes?: number[];
    items?: string[];
    allowInput?: boolean;
    allowAddItem?: boolean;
    min?: number;
    max?: number;
    initial?: string;
    unit?: string;
  } = {},
) {
  try {
    if (!projectIdOrKey) {
      throw new Error("Project ID or Key is required");
    }

    if (!typeId) {
      throw new Error("Type ID is required");
    }

    if (!name) {
      throw new Error("Name is required");
    }

    const { 
      description, 
      required, 
      applicableIssueTypes, 
      items, 
      allowInput, 
      allowAddItem, 
      min, 
      max, 
      initial, 
      unit 
    } = options;

    const params = _.omitBy(
      {
        apiKey,
        typeId,
        name,
        description,
        required,
        applicableIssueTypes: 
          applicableIssueTypes && applicableIssueTypes.length > 0
            ? applicableIssueTypes
            : undefined,
        items: 
          items && items.length > 0 
            ? items 
            : undefined,
        allowInput,
        allowAddItem,
        min,
        max,
        initial,
        unit,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/customFields`,
      null,
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
    throw new Error(`Failed to add custom field: ${error.message}`);
  }
}