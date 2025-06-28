function showPage(id) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

function startCountdown(durationMs) {
  const endTime = Date.now() + durationMs;
  const timerEl = document.getElementById("timer");

  const update = () => {
    const remaining = endTime - Date.now();
    if (remaining > 0) {
      timerEl.textContent = formatTime(remaining);
      requestAnimationFrame(update);
    } else {
      timerEl.textContent = "00:00";
      chrome.storage.local.set({ sessionActive: false });
      // Optionally auto show reflection/question page here
    }
  };
  update();
}

// ✅ On popup open: resume session if active
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["sessionActive", "sessionStart"], (data) => {
    // const sessionDuration = 15 * 60 * 1000; // 15 min in ms
    const sessionDuration = 10 * 1000; // 5 seconds for testing

    if (data.sessionActive && data.sessionStart) {
      const elapsed = Date.now() - data.sessionStart;
      const remaining = sessionDuration - elapsed;

      if (remaining > 0) {
        showPage("timerPage");
        startCountdown(remaining);
      } else {
        chrome.storage.local.set({ sessionActive: false });
        showPage("mainPage");
      }
    }
  });
});

// START SESSION (with session name)
const startBtn = document.getElementById("start-session-button");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    const sessionName = document
      .getElementById("session-name")
      .value.trim();
    if (!sessionName) {
      return alert("Please enter a session name.");
    }

    const now = Date.now();
    chrome.storage.local.set(
      {
        sessionActive: true,
        sessionStart: now,
        responses: [],
        sessionName, // Store session name
      },
      () => {
        showPage("timerPage");
        // for testing 5s; switch back to 15*60*1000 when ready
        startCountdown(10 * 1000);
      }
    );
  });
}

// ✅ Timer Done → Ask Question
const completeBtn = document.getElementById("complete");
if (completeBtn) {
  completeBtn.addEventListener("click", () => {
    showPage("questionPage");
  });
}

// ✅ Submit answer → return to timer
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

// ✅ End Session → Show Summary
const endSessionBtn = document.getElementById("endSession");
const endSessionMainBtn = document.getElementById("endSessionMain");
const endSessionTimerBtn = document.getElementById("endSessionTimer");

function showSummaryPage() {
  chrome.storage.local.get({ responses: [] }, (data) => {
    const summary = data.responses.map((text, i) => `[${i + 1}] ${text}`).join("\n\n");
    document.getElementById("summaryText").innerText = summary;
    chrome.storage.local.set({ sessionActive: false }); // clear session
    showPage("summaryPage");
  });
}

if (endSessionBtn) endSessionBtn.addEventListener("click", showSummaryPage);
if (endSessionMainBtn) endSessionMainBtn.addEventListener("click", showSummaryPage);
if (endSessionTimerBtn) endSessionTimerBtn.addEventListener("click", showSummaryPage);

// ✅ Reset for new session
const resetBtn = document.getElementById("reset");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({ responses: [], sessionActive: false }, () => {
      document.getElementById("userResponse").value = "";
      document.getElementById("summaryText").innerText = "";
      showPage("mainPage");
    });
  });
}
