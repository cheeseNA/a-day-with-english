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
    domainButton.disabled = true;
    urlButton.disabled = true;
  } else {
    textSpanElement.textContent = `This page is written in '${response.lang}'`;
    if (response.lang === "en") {
      domainButton.value = "Mark this domain as non English site";
      urlButton.value = "Mark this url as non English site";
    } else {
      domainButton.value = "Mark this domain as English site";
      urlButton.value = "Mark this url as English site";
    }

    domainButton.addEventListener("click", async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const url = new URL(tab.url);
      const domain = url.hostname;
      registerToRuleList(domain, response.lang !== "en", false);
    });
    urlButton.addEventListener("click", async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const url = tab.url;
      registerToRuleList(url, response.lang !== "en", true);
    });
  }
}

async function registerToRuleList(string, asEnglish, isUrl) {
  const result = await chrome.storage.sync.get(["rules"]);
  const targetList =
    result.rules[asEnglish ? "en" : "noen"][isUrl ? "url" : "domain"];
  targetList.push(string);
  console.log(result);
  await chrome.storage.sync.set({ rules: result.rules });
}
