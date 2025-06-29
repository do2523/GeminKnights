document.addEventListener('DOMContentLoaded', () => {
  const textareas = document.querySelectorAll(".reflect-answer");
  const submitButton = document.getElementById("submit-button");
  const improvementsButton = document.getElementById("get-improvements");
  const improvementsContainer = document.getElementById("improvements-container");
  const improvementsText = document.getElementById("improvements-text");
  
  let sessionReflections = [];

  // Fetch session reflections for context
  chrome.runtime.sendMessage({ type: 'getTimerStatus' }, (response) => {
    if (response && response.reflections && response.reflections.length > 0) {
      sessionReflections = response.reflections;
      console.log("Retrieved reflections:", sessionReflections);
    }
  });
  
  // Get improvements button functionality
  improvementsButton.addEventListener("click", async () => {
    // Show the improvements container and set loading status
    improvementsContainer.classList.remove("hidden");
    improvementsText.textContent = "Generating suggestions...";
    
    // Get values from textareas
    const answers = Array.from(textareas).map(t => t.value.trim());
    
    // Check if the answers have content
    if (answers.some(answer => answer.length === 0)) {
      improvementsText.textContent = "Please answer all questions before getting improvements.";
      return;
    }
    
    try {
      // Generate improvements using Gemini API
      await getImprovements(answers, sessionReflections);
    } catch (error) {
      console.error("Error getting improvements:", error);
      improvementsText.textContent = `Error: ${error.message}`;
    }
  });

  // Submit button functionality
  submitButton.addEventListener("click", () => {
    console.log("Submit button clicked");
    
    // Get values from textareas
    const answers = Array.from(textareas).map(t => t.value.trim());
    
    // Save answers to local storage
    chrome.storage.local.set({ deepReflect: answers, ts: Date.now() }, () => {
      console.log("Answers saved to storage");
      
      // End the session
      chrome.runtime.sendMessage({ type: 'stopSession' }, (response) => {
        console.log("Stop session response:", response);
        
        if (response && response.status) {
          // Set a flag in storage to indicate we're returning to Start.html
          chrome.storage.local.set({ returningToStart: true }, () => {
            console.log("Session stopped, closing window");
            
            // Close the window and go back to Start.html
            window.close();
            
            // Try to update the main extension popup to Start.html
            chrome.action.setPopup({ popup: 'pages/start/Start.html' });
          });
        } else {
          console.error('Failed to stop session.');
          alert("Failed to end session. Please try again.");
        }
      });
    });
  });
  
  // Function to get improvements from Gemini API
  async function getImprovements(answers, reflections) {
    const API_KEY = "AIzaSyDBKD3yhcLCnDbw6G749OF06Y25-bA9w7M"; // Using the API key from your example
    
    // Create a prompt for Gemini that includes answers and asks for improvements
    const prompt = `
I've reflected on a study/work session with these answers:

1. What went well: ${answers[0]}
2. What could've gone better: ${answers[1]}
3. Why did challenges happen: ${answers[2]}

For context, these were my reflections during the session:
${reflections.map((r, i) => `Reflection ${i+1}: ${r}`).join('\n')}

Please provide targeted, actionable improvements for each of my answers. 
Focus on concrete next steps I can take to improve. 
Keep your response concise but meaningful.
DO NOT ADD any markings like # * + or special characters that cant be displayed by just normal text
JUST WRITE DOWN IN PLAIN TEXT AS WHAT COULD BE IMPROVED AND WHAT YOU DID GOOD AND BE MOTIVATIONAL
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(`Gemini Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                    "No suggestions available at this time.";
                    
      // Display the improvements
      improvementsText.textContent = reply;
      
    } catch (err) {
      console.error("Error with Gemini API:", err);
      throw err;
    }
  }
});