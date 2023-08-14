const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

toggleSwitch.addEventListener('change', function() {
  const isEnabled = this.checked;

  chrome.storage.sync.set({ isEnabled }, function() {
    console.log('Extension is ' + (isEnabled ? 'enabled' : 'disabled'));
    statusText.textContent = isEnabled ? 'ON' : 'OFF';

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const message = { isEnabled };
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  });
});

chrome.storage.sync.get('isEnabled', function(data) {
  toggleSwitch.checked = data.isEnabled || false;
  statusText.textContent = toggleSwitch.checked ? 'ON' : 'OFF';
});