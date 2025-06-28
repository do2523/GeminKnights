function showPage(id) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

const startBtn = document.getElementById("start");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    chrome.storage.local.set({ responses: [] }, () => {
      showPage("timerPage");
    });
  });
}

const completeBtn = document.getElementById("complete");
if (completeBtn) {
  completeBtn.addEventListener("click", () => {
    showPage("questionPage");
  });
}

// NEW: Submit only adds to array
const submitBtn = document.getElementById("submit");
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const response = document.getElementById("userResponse").value.trim();
    if (!response) return;

    chrome.storage.local.get({ responses: [] }, (data) => {
      const updated = [...data.responses, response];
      chrome.storage.local.set({ responses: updated }, () => {
        document.getElementById("userResponse").value = "";
        showPage("timerPage"); 
      });
    });
  });
}

// NEW: End Session shows all responses
const endSessionBtn = document.getElementById("endSession");
const endSessionMainBtn = document.getElementById("endSessionMain");
const endSessionTimerBtn = document.getElementById("endSessionTimer");
function showSummaryPage() {
  chrome.storage.local.get({ responses: [] }, (data) => {
    const summary = data.responses.map((text, i) => `[${i + 1}] ${text}`).join("\n\n");
    document.getElementById("summaryText").innerText = summary;
    showPage("summaryPage");
  });
}
if (endSessionBtn) {
  endSessionBtn.addEventListener("click", showSummaryPage);
}
if (endSessionMainBtn) {
  endSessionMainBtn.addEventListener("click", showSummaryPage);
}
if (endSessionTimerBtn) {
  endSessionTimerBtn.addEventListener("click", showSummaryPage);
}

// if (endSessionBtn) {
//   endSessionBtn.addEventListener("click", () => {
//     chrome.storage.local.get({ responses: [] }, (data) => {
//       const summary = data.responses
//         .map((text, i) => `${text}`)
//         .join("\n\n");
//       document.getElementById("summaryText").innerText = summary;
//       showPage("summaryPage");
//     });
//   });
// }

const resetBtn = document.getElementById("reset");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({ responses: [] }, () => {
      document.getElementById("userResponse").value = "";
      document.getElementById("summaryText").innerText = "";
      showPage("mainPage");
    });
  });
}
