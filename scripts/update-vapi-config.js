#!/usr/bin/env node

/**
 * This script updates the Vapi configuration with your API key and assistant ID
 * Usage: node scripts/update-vapi-config.js <api_key> <assistant_id>
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const apiKey = process.argv[2];
const assistantId = process.argv[3];

if (!apiKey || !assistantId) {
  console.error('Error: Missing required arguments.');
  console.log('Usage: node scripts/update-vapi-config.js <api_key> <assistant_id>');
  process.exit(1);
}

// Path to the configuration file
const configPath = path.join(__dirname, '..', 'src', 'config', 'vapi.ts');

// Check if the file exists
if (!fs.existsSync(configPath)) {
  console.error(`Error: Configuration file not found at ${configPath}`);
  process.exit(1);
}

// Update the configuration file
try {
  const configContent = `// Vapi configuration
// Updated on ${new Date().toISOString()}

export const VAPI_CONFIG = {
  API_KEY: "${apiKey}",
  ASSISTANT_ID: "${assistantId}"
}`;

  fs.writeFileSync(configPath, configContent);
  console.log('✅ Vapi configuration updated successfully!');
  console.log(`API Key: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`);
  console.log(`Assistant ID: ${assistantId}`);
} catch (error) {
  console.error('Error updating configuration file:', error);
  process.exit(1);
} 