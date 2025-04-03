<?php

// Path to the file where the API keys are stored
$databaseFile = "apikeys.json"; // Ensure this is not publicly accessible

// Load existing API keys from JSON file, or initialize empty array if file doesn't exist
$apiKeys = file_exists($databaseFile) ? json_decode(file_get_contents($databaseFile), true) : [];

// Handle generating a new API key
if ($_GET["action"] == "generate") {
    // Generate a random key (e.g., API-XXXXXX)
    $newKey = "API-" . strtoupper(bin2hex(random_bytes(5))); 

    // Save the new key to the JSON file
    $apiKeys[$newKey] = true;
    file_put_contents($databaseFile, json_encode($apiKeys, JSON_PRETTY_PRINT));

    // Return the newly generated key as JSON
    echo json_encode(["key" => $newKey]);
    exit;
}

// Handle validating an API key
if ($_GET["action"] == "validate" && isset($_GET["key"])) {
    $key = $_GET["key"];

    // Check if the key exists in the stored API keys
    if (isset($apiKeys[$key])) {
        echo json_encode(["success" => true, "message" => "Successfully Requested."]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid API key."]);
    }
    exit;
}

// Return an error if the action is not valid
echo json_encode(["success" => false, "message" => "Invalid request."]);
