<?php

$databaseFile = "apikeys.json"; // Ensure this is not publicly accessible

// Load existing keys
$apiKeys = file_exists($databaseFile) ? json_decode(file_get_contents($databaseFile), true) : [];

// Generate API key
if ($_GET["action"] == "generate") {
    $newKey = "API-" . strtoupper(bin2hex(random_bytes(5)));
    $apiKeys[$newKey] = true;
    file_put_contents($databaseFile, json_encode($apiKeys, JSON_PRETTY_PRINT));
    echo json_encode(["key" => $newKey]);
    exit;
}

// Validate API key
if ($_GET["action"] == "validate" && isset($_GET["key"])) {
    $key = $_GET["key"];
    if (isset($apiKeys[$key])) {
        echo json_encode(["success" => true, "message" => "Successfully Requested."]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid API key."]);
    }
    exit;
}

// Invalid request
echo json_encode(["success" => false, "message" => "Invalid request."]);
?>
