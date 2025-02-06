function extractTimestamp() {
    let url = document.getElementById("linkedinUrl").value;
    let match = url.match(/activity:(\d+)/);

    if (!match) {
        document.getElementById("result").innerText = "Invalid LinkedIn URL.";
        document.getElementById("preview").style.display = "none";
        return;
    }

    let postId = match[1];
    
    // Convert LinkedIn Snowflake ID to timestamp
    let first41Bits = parseInt(postId).toString(2).slice(0, 41);
    let timestampMs = parseInt(first41Bits, 2);
    let date = new Date(timestampMs);

    // Display timestamp result
    document.getElementById("result").innerText = `Posted on: ${date.toUTCString()}`;

    // Construct possible image preview URL (LinkedIn may require API access)
    let imageUrl = `https://media.licdn.com/dms/image/${postId}/feedshare-image`;

    // Test loading image to check if it exists
    let img = document.getElementById("preview");
    img.src = imageUrl;
    img.style.display = "block";

    img.onerror = function() {
        img.style.display = "none";  // Hide image if URL is invalid
    };
}
