chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ 
      autoUnfollow: false, 
      frenzyMode: false, 
      protectFollowers: true,
      protectLockedAccounts: true
    });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('autoUnfollow', (data) => {
      chrome.storage.sync.set({ autoUnfollow: !data.autoUnfollow }, () => {
        chrome.action.setBadgeText({ text: !data.autoUnfollow ? 'ON' : 'OFF' });
        // Send message to content script to update immediately
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
        });
      });
    });
  });