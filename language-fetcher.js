export async function getLangResponseFromActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs.length !== 1) {
    console.log("tab.length is not one");
    return;
  }
  const targetTabId = tabs[0].id;

  try {
    const response = await chrome.tabs.sendMessage(targetTabId, {
      type: "requestLang",
    });
    return response;
  } catch (error) {
    console.log("failed to receive response");
    return "fail";
  }
}