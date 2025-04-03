<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Path to the file where the API keys are stored
$databaseFile = "apikeys.json"; 

// Load existing API keys from JSON file, or initialize empty array if file doesn't exist
$apiKeys = file_exists($databaseFile) ? json_decode(file_get_contents($databaseFile), true) : [];

if ($_GET["action"] == "generate") {
    // Generate a random key (e.g., API-XXXXXX)
    $newKey = "API-" . strtoupper(bin2hex(random_bytes(5))); 

    // Save the new key to the JSON file
    if (file_put_contents($databaseFile, json_encode($apiKeys, JSON_PRETTY_PRINT))) {
        $apiKeys[$newKey] = true;
        file_put_contents($databaseFile, json_encode($apiKeys, JSON_PRETTY_PRINT));
        echo json_encode(["key" => $newKey]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to write to file."]);
    }
    exit;
}

echo json_encode(["success" => false, "message" => "Invalid request."]);
