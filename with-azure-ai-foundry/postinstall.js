const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const agentDir = path.join(__dirname, "agent");

if (!fs.existsSync(agentDir)) {
  console.log("No agent directory found, skipping Python setup.");
  process.exit(0);
}

try {
  execSync("uv --version", { stdio: "ignore" });
} catch {
  console.log(
    "\n⚠️  'uv' is not installed. Install it to set up the Python agent:\n" +
      "   curl -LsSf https://astral.sh/uv/install.sh | sh\n"
  );
  process.exit(0);
}

console.log("Installing Python agent dependencies with uv...");
try {
  execSync("uv sync", { cwd: agentDir, stdio: "inherit" });
  console.log("Python agent dependencies installed successfully.");
} catch (err) {
  console.error("Failed to install Python agent dependencies:", err.message);
  process.exit(1);
}
