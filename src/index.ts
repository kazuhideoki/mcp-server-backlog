import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "path";
import { getSpaceActivities } from "./backlog-api/space-activities";
import { getActivity } from "./backlog-api/activities";
import { getSpaceLogo } from "./backlog-api/space-logo";
import { getSpaceNotification } from "./backlog-api/space-notification";
import { updateSpaceNotification } from "./backlog-api/update-space-notification";
import { loadApiKey } from "./api-key-loader";
import { z } from "zod";

const apikey = loadApiKey(path.join(__dirname, "../apikey"));

// Create an MCP server
const server = new McpServer({
  name: "Backlog",
  version: "1.0.0",
});

server.tool("space-activities", async () => {
  const result = await getSpaceActivities(apikey, "yourstand.backlog.com", {});

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

server.tool(
  "activity",
  { activityId: z.number() },
  async (params: { activityId: number }) => {
    if (!params.activityId) {
      throw new Error("Activity ID is required");
    }

    const result = await getActivity(
      apikey,
      "yourstand.backlog.com",
      params.activityId,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Space Logo Tool
server.tool("space-logo", async () => {
  const result = await getSpaceLogo(
    apikey,
    "yourstand.backlog.com"
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Space Notification Tool
server.tool("space-notification", async () => {
  const result = await getSpaceNotification(
    apikey,
    "yourstand.backlog.com"
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Update Space Notification Tool
server.tool(
  "update-space-notification",
  { content: z.string() },
  async (params: { content: string }) => {
    if (!params.content) {
      throw new Error("Notification content is required");
    }

    const result = await updateSpaceNotification(
      apikey,
      "yourstand.backlog.com",
      params.content
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);

console.log("Server started");
