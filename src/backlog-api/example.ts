import { BacklogSpaceActivities } from "./space-activities";
import path from "path";

async function main() {
  try {
    // Create a new BacklogRecentUpdates instance
    // Replace 'your-space-id' with your actual Backlog space ID
    // The second parameter is the path to your API key file
    // The third parameter is the domain (jp for Japan, com for USA, etc.)
    const backlog = new BacklogSpaceActivities(
      "yourstand",
      path.join(__dirname, "../../apikey"),
      "com", // または 'com' などのドメイン
    );

    // Get recent updates with default parameters
    const recentUpdates = await backlog.getRecentUpdates();

    console.log("Recent updates:");
    console.log(JSON.stringify(recentUpdates, null, 2));
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}
