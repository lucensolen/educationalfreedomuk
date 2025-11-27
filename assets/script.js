
// Statement builder
function buildStatement() {
  const name = document.getElementById("childName")?.value.trim() || "";
  const approach = document.getElementById("approach")?.value.trim() || "";
  const areas = document.getElementById("areas")?.value.trim() || "";
  const progress = document.getElementById("progress")?.value.trim() || "";
  const needs = document.getElementById("needs")?.value.trim() || "";

  let text = "";
  if (name) text += name + " is currently educated at home in a calm, supportive environment tailored to their needs.\n\n";
  if (approach) text += "Our educational approach is " + approach + ". It is flexible, responsive, and centred around meaningful engagement rather than rigid schedules.\n\n";
  if (areas) text += "Learning takes place across several areas: " + areas + ". These are explored through real-life activities, conversations, reading, hands-on tasks and child-led curiosity.\n\n";
  if (progress) text += "Recent progress includes: " + progress + ". These developments reflect natural growth and steady engagement.\n\n";
  if (needs) text += "Any additional needs or preferences are supported by: " + needs + ". Adaptations are integrated naturally into daily learning.\n\n";
  text += "This statement reflects the home education provision and demonstrates that a suitable education is being provided.";

  const preview = document.getElementById("preview");
  if (preview) preview.innerText = text;
}

// Evidence vault
function saveEntry() {
  const box = document.getElementById("entry");
  if (!box) return;
  const text = box.value.trim();
  if (!text) return;
  const timestamp = new Date().toLocaleString();
  const vault = JSON.parse(localStorage.getItem("vaultEntries") || "[]");
  vault.unshift({ text, timestamp });
  localStorage.setItem("vaultEntries", JSON.stringify(vault));
  box.value = "";
  renderEntries();
}

function clearVault() {
  if (!confirm("Clear all saved entries? This cannot be undone.")) return;
  localStorage.removeItem("vaultEntries");
  renderEntries();
}

function renderEntries() {
  const container = document.getElementById("vaultList");
  if (!container) return;
  const vault = JSON.parse(localStorage.getItem("vaultEntries") || "[]");
  container.innerHTML = "";
  if (!vault.length) {
    container.innerHTML = "<p class='small-text'>No saved entries yet.</p>";
    return;
  }
  vault.forEach(e => {
    const div = document.createElement("div");
    div.className = "pullout";
    div.innerText = "[" + e.timestamp + "]\n\n" + e.text;
    container.appendChild(div);
  });
}

// Share link
function copyShareLink() {
  const link = "https://educationalfreedom.uk/homeeducation/onboarding.html";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied. You can paste it anywhere.");
    });
  } else {
    alert("Copy this link:\n" + link);
  }
}

window.addEventListener("load", renderEntries);
