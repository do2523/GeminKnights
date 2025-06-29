const textareas = document.querySelectorAll(".reflect-answer");
const counter   = document.getElementById("counter");
const submitBtn = document.getElementById("submit");
const skipBtn   = document.getElementById("skip");
const MAX       = 420;

/* live character count across all textareas */
function updateCount(){
  const total = Array.from(textareas)
                      .reduce((sum, ta) => sum + ta.value.length, 0);
  counter.textContent = `${total} / ${MAX}`;
  counter.style.color = total > MAX ? "var(--end-button-color)" :
                       total > MAX - 40 ? "var(--accent-orange)" :
                                          "var(--text-light)";
}
textareas.forEach(ta => ta.addEventListener("input", updateCount));
updateCount();

/* persist answers (example) ------------------------------------------ */
submitBtn.addEventListener("click", () => {
  const answers = Array.from(textareas).map(t => t.value.trim());
  chrome.storage?.local.set({ deepReflect: answers, ts: Date.now() });
  window.close?.();
});
skipBtn.addEventListener("click", () => window.close?.());