document.getElementById("start").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "startSession" });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stopSession" });

  // fetch and display stored log data
  chrome.storage.local.get(["activityLog"], (result) => {
    const log = result.activityLog || [];
    const logContainer = document.getElementById("log");
    logContainer.innerHTML = "<h3>Session Summary:</h3>";
    log.forEach((entry, i) => {
      logContainer.innerHTML += `<p><strong>[${i + 1}]</strong> ${
        entry.time
      } - ${entry.text}</p>`;
    });
  });
});
