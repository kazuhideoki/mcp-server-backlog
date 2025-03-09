import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "path";
import { BacklogSpaceActivities } from "./backlog-api/space-activities";

// Create an MCP server
const server = new McpServer({
  name: "Backlog",
  version: "1.0.0",
});

server.tool("space-activities", async () => {
  const backlog = new BacklogSpaceActivities(
    "yourstand",
    path.join(__dirname, "../apikey"),
    "com", // または 'com' などのドメイン
  );

  // Get recent updates with default parameters
  const result = await backlog.getRecentUpdates();

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);

console.log("Server started");
