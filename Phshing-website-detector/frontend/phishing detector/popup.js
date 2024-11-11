document.getElementById('checkButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;
        console.error("not in",currentUrl)
        checkPhishing(currentUrl);
    });
});

function checkPhishing(url) {
    // Replace this URL with your server endpoint that runs the ML model
    const apiUrl = 'https://your-server.com/api/check_phishing';
    console.error("in",url)
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.isPhishing) {
            resultDiv.innerHTML = `<p style="color: red;">Warning: This site is a phishing site!</p>`;
        } else {
            resultDiv.innerHTML = `<p style="color: green;">Safe: This site is not a phishing site.</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}