import { getLangResponseFromActiveTab } from "./language-fetcher.js";

document.addEventListener("DOMContentLoaded", () => {
  asyncWrapperForPopupEvent();
});

async function asyncWrapperForPopupEvent() {
  const statusDiv = document.getElementById("siteStatus");
  const domainButton = document.getElementById("domainButton");
  const urlButton = document.getElementById("urlButton");
  const textSpanElement = document.createElement("span");
  statusDiv.appendChild(textSpanElement);
  const response = await getLangResponseFromActiveTab();
  if (response === "fail" || !response) {
    textSpanElement.textContent =
      "The extension cannot fetch the language of this page";
  } else {
    textSpanElement.textContent = `This page is written in '${response.lang}'`;
  }
}
