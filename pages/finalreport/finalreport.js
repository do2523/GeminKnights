const arr = [];
document.addEventListener("DOMContentLoaded", () => {
  const reflectionList = document.getElementById("reflection-list");
  const continueButton = document.getElementById("continue-button");

  // Get the current active session reflections
  chrome.runtime.sendMessage({ type: "getTimerStatus" }, (response) => {
    if (response && response.reflections && response.reflections.length > 0) {
      // Dynamically populate reflections
      response.reflections.forEach((reflection, index) => {
        const reflectionItem = document.createElement("div");
        reflectionItem.className = "reflection-item";
        reflectionItem.textContent = `Report ${index + 1}: ${reflection}`;
        reflectionList.appendChild(reflectionItem);
      });
    } else {
      // No reflections found
      const noReflections = document.createElement("div");
      noReflections.className = "reflection-item";
      noReflections.textContent = "No reflections found for this session.";
      reflectionList.appendChild(noReflections);
    }
  });

  // Add functionality to the Continue button
  continueButton.addEventListener("click", () => {
    // Now stop the session after viewing reflections
    chrome.runtime.sendMessage({ type: "stopSession" }, (response) => {
      if (response && response.status) {
        console.log(response.status);
        // Close the window
        window.close();
      } else {
        console.error("Failed to stop session.");
      }
    });
  });
});

// Gemini Code
const API_KEY = "AIzaSyDBKD3yhcLCnDbw6G749OF06Y25-bA9w7M"; // Replace this with your Gemini API key
document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.getElementById("userInput");
  const submitBtn = document.getElementById("submitBtn");
  const responseDiv = document.getElementById("response");

  submitBtn.addEventListener("click", async () => {
    const input = inputEl.value;

    if (!input.trim()) {
      responseDiv.textContent = "Please enter a question.";
      return;
    }

    responseDiv.textContent = "Thinking...";

    // Clear any previous console logs
    console.clear();
    console.log("Starting API request with input:", input);
    console.log("API Key (first 10 chars):", API_KEY.substring(0, 10) + "...");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    console.log("Request URL:", url.replace(API_KEY, "***API_KEY***"));

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
        }),
      });

      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error Response:", errorText);
        responseDiv.textContent = `API Error (${res.status}): ${errorText}`;
        return;
      }

      const data = await res.json();
      console.log("Gemini API response:", data);

      if (data.error) {
        console.error("Gemini API Error:", data.error);
        responseDiv.textContent = `Gemini Error: ${
          data.error.message || JSON.stringify(data.error)
        }`;
        return;
      }

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No valid response received from API.";
      responseDiv.textContent = reply;
    } catch (err) {
      console.error("Network/Parse Error:", err);
      responseDiv.textContent = `Error: ${err.message}`;
    }
  });
});
