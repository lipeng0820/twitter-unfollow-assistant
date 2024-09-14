let isFrenzyActive = false;
let protectFollowers = false; // New variable to store the protection setting
let protectLockedAccounts = false; // New variable to store the protection setting for locked accounts

function updateSettings() {
  chrome.storage.sync.get(['autoUnfollow', 'frenzyMode', 'protectFollowers', 'protectLockedAccounts'], (data) => {
    if (data.autoUnfollow) {
      console.log('Auto Unfollow is enabled');
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            console.log('Mutation detected');
            const confirmButton = document.querySelector('button[data-testid="confirmationSheetConfirm"]');
            if (confirmButton) {
              console.log('Confirm button found, clicking it');
              confirmButton.click();
            }
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      console.log('Auto Unfollow is disabled');
    }

    if (data.frenzyMode) {
      console.log('Frenzy Mode is enabled');
      protectFollowers = data.protectFollowers;
      protectLockedAccounts = data.protectLockedAccounts; // Update the protection setting for locked accounts

      document.addEventListener('keydown', (event) => {
        if (event.key === '`') {
          isFrenzyActive = true;
          console.log('Frenzy Mode activated');
        }
      });

      document.addEventListener('keyup', (event) => {
        if (event.key === '`') {
          isFrenzyActive = false;
          console.log('Frenzy Mode deactivated');
        }
      });

      document.addEventListener('mouseover', (event) => {
        if (isFrenzyActive) {
          const cellInnerDiv = event.target.closest('div[data-testid="cellInnerDiv"]');
          if (cellInnerDiv) {
            const userFollowIndicator = cellInnerDiv.querySelector('[data-testid="userFollowIndicator"]');
            const isFollowingYou = userFollowIndicator && userFollowIndicator.textContent.includes('关注了你');

            const lockedAccountIcon = cellInnerDiv.querySelector('svg[aria-label="受保护账号"]');
            const isLockedAccount = lockedAccountIcon !== null;

            if ((protectFollowers && isFollowingYou) || (protectLockedAccounts && isLockedAccount)) {
              console.log('Skipping unfollow for protected user');
              return;
            }

            const unfollowButton = cellInnerDiv.querySelector('button[data-testid$="-unfollow"]');
            if (unfollowButton) {
              console.log('Unfollow button found, clicking it');
              unfollowButton.click();
            }
          }

          const unfollowText = event.target.closest('div[id^="id__"][style*="display: none;"]');
          if (unfollowText && unfollowText.textContent.includes('点击 取消关注')) {
            const unfollowButton = unfollowText.closest('div').querySelector('button[data-testid$="-unfollow"]');
            if (unfollowButton) {
              console.log('Unfollow button found via hidden text, clicking it');
              unfollowButton.click();
            }
          }
        }
      });
    } else {
      console.log('Frenzy Mode is disabled');
    }
  });
}

// Initial settings load
updateSettings();

// Listen for messages to update settings
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateSettings') {
    updateSettings();
  }
});