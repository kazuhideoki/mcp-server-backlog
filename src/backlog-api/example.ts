import { BacklogRecentUpdates } from "./recent-updates";
import path from "path";

async function main() {
  try {
    // Create a new BacklogRecentUpdates instance
    // Replace 'your-space-id' with your actual Backlog space ID
    // The second parameter is the path to your API key file
    // The third parameter is the domain (jp for Japan, com for USA, etc.)
    const backlog = new BacklogRecentUpdates(
      "yourstand",
      path.join(__dirname, "../../apikey"),
      "com", // または 'com' などのドメイン
    );

    // Get recent updates with default parameters
    const recentUpdates = await backlog.getRecentUpdates();

    console.log("Recent updates:");
    console.log(JSON.stringify(recentUpdates, null, 2));

    // Example with filters
    const filteredUpdates = await backlog.getRecentUpdates({
      // Activity type IDs - See Backlog API documentation for available types
      activityTypeIds: [1, 2], // 1: Git push, 2: Issue created
      count: 5,
      order: "desc",
    });

    console.log("Filtered updates:");
    console.log(JSON.stringify(filteredUpdates, null, 2));
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}
