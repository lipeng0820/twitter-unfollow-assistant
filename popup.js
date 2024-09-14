  document.getElementById('toggleButton').addEventListener('change', (event) => {
    chrome.storage.sync.set({ autoUnfollow: event.target.checked }, () => {
      console.log('Auto Unfollow toggled to', event.target.checked);
      // Send message to content script to update immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
      });
    });
  });
  
  document.getElementById('frenzyModeCheckbox').addEventListener('change', (event) => {
    chrome.storage.sync.set({ frenzyMode: event.target.checked }, () => {
      console.log('Frenzy Mode toggled to', event.target.checked);
      // Send message to content script to update immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
      });
    });
  });
  
  document.getElementById('protectFollowersCheckbox').addEventListener('change', (event) => {
    chrome.storage.sync.set({ protectFollowers: event.target.checked }, () => {
      console.log('Protect Followers toggled to', event.target.checked);
      // Send message to content script to update immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
      });
    });
  });
  
  document.getElementById('protectLockedAccountsCheckbox').addEventListener('change', (event) => {
    chrome.storage.sync.set({ protectLockedAccounts: event.target.checked }, () => {
      console.log('Protect Locked Accounts toggled to', event.target.checked);
      // Send message to content script to update immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
      });
    });
  });
  
  chrome.storage.sync.get(['autoUnfollow', 'frenzyMode', 'protectFollowers', 'protectLockedAccounts'], (data) => {
    document.getElementById('toggleButton').checked = data.autoUnfollow;
    document.getElementById('frenzyModeCheckbox').checked = data.frenzyMode;
    document.getElementById('protectFollowersCheckbox').checked = data.protectFollowers;
    document.getElementById('protectLockedAccountsCheckbox').checked = data.protectLockedAccounts;
    console.log('Initial Auto Unfollow state is', data.autoUnfollow);
    console.log('Initial Frenzy Mode state is', data.frenzyMode);
    console.log('Initial Protect Followers state is', data.protectFollowers);
    console.log('Initial Protect Locked Accounts state is', data.protectLockedAccounts);
  });