document.addEventListener("DOMContentLoaded", () => {
  const statusDiv = document.getElementById("siteStatus");
  const domainButton = document.getElementById("domainButton");
  const urlButton = document.getElementById("urlButton");
  const textSpanElement = document.createElement("span");
  textSpanElement.textContent = `This page is written in ???`;
  statusDiv.appendChild(textSpanElement);
});
