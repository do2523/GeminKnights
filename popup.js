function showPage(id) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

const startBtn = document.getElementById("start");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    showPage("timerPage");
  });
}

const completeBtn = document.getElementById("complete");
if (completeBtn) {
  completeBtn.addEventListener("click", () => {
    showPage("questionPage");
  });
}

const doneBtn = document.getElementById("done");
if (doneBtn) {
  doneBtn.addEventListener("click", () => {
    const response = document.getElementById("userResponse").value;
    document.getElementById("summaryText").innerText = `You said: "${response}"`;
    showPage("summaryPage");
  });
}

const resetBtn = document.getElementById("reset");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    document.getElementById("userResponse").value = "";
    document.getElementById("summaryText").innerText = "";
    showPage("mainPage");
  });
}
