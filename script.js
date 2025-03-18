function showTab(tab) {
    const allTabs = document.querySelectorAll('.tab-content');
    const allTabButtons = document.querySelectorAll('.tab');

    allTabs.forEach(tabContent => {
        tabContent.style.display = 'none';
        tabContent.classList.remove('active');
		});
    allTabButtons.forEach(tabButton => tabButton.classList.remove('active'));

    const selectedTabContent = document.getElementById(`${tab}-section`);
    const selectedTabButton = document.querySelector(`.tab[onclick="showTab('${tab}')"]`);
    if (selectedTabContent) {
        selectedTabContent.style.display = 'block';
        selectedTabContent.classList.add('active');
    }
    if (selectedTabButton) {
        selectedTabButton.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // --------------------------------------------------
    //  Element References
    // --------------------------------------------------

    const tokenDisplay = document.getElementById('token-count');
   let activityLog = []; // Array for log data
    let activityLogElement = document.getElementById('activity-log'); // DOM element
    const positiveBehaviorList = document.getElementById('positive-behavior-list');
    const negativeBehaviorList = document.getElementById('negative-behavior-list');
    const coindumpBehaviorList = document.getElementById('coindump-behavior-list');
    const rewardList = document.getElementById('reward-list');
    const addBehaviorBtn = document.getElementById('add-behavior-btn');
    const newBehaviorForm = document.getElementById('new-behavior-form');
    const saveBehaviorBtn = document.getElementById('save-behavior-btn');
    const cancelBehaviorBtn = document.getElementById('cancel-behavior-btn');
    const newBehaviorName = document.getElementById('new-behavior-name');
    const newBehaviorValue = document.getElementById('new-behavior-value');
    const newBehaviorType = document.getElementById('new-behavior-type');
    const addRewardBtn = document.getElementById('add-reward-btn');
    const newRewardForm = document.getElementById('new-reward-form');
    const saveRewardBtn = document.getElementById('save-reward-btn');
    const cancelRewardBtn = document.getElementById('cancel-reward-btn');
    const newRewardName = document.getElementById('new-reward-name');
    const newRewardCost = document.getElementById('new-reward-cost');
//    const dashboardTabButton = document.querySelector('.tab[onclick="showTab(\'dashboard\')"]');
    const toggleJarBtn = document.getElementById('toggle-jar-btn');
    const clearLogBtn = document.getElementById('clear-log-btn');
    const manualCoinInput = document.getElementById('manual-coin-input');
    const setCoinBtn = document.getElementById('set-coin-btn'); 
    const userSelectButtons = document.querySelectorAll('#user-select .btn');
 
   	const binId = '67d980a18a456b7966786fd4'; // Replace with your bin ID
	const apiKey = '$2a$10$X5Qc9AS17LVgJPMzQWkaTeAGpfrUD7gzUBoVHRY2z6HiaZd1o7.t6'; // Replace with your API key
	const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;
   


  
   // --------------------------------------------------
   //  Data and State  
   // --------------------------------------------------

let currentChild = 'margaret';
let tokenCount = 0;
let behaviors = [];
let rewards = [];
let children = [];
let tokenCounterClicks = 0;
let selectedChild = localStorage.getItem('selectedChild') || 'Margaret';
    // --------------------------------------------------
    //  Initialization
    // --------------------------------------------------
	
    // Load initial data
    loadData(currentChild);
//    createDashboardContent();
    updateHeading(); 
    renderBehaviors();
    updateTokenJar();
	updateRewardDisabledStates()
    // --------------------------------------------------
    //  Event Listeners
    // --------------------------------------------------

    // Child selection event listeners
    document.getElementById('child-margaret').addEventListener('click', () => {
        selectedChild = 'Margaret';
		changeChild('margaret');
		updateHeading();
    });

    document.getElementById('child-ethan').addEventListener('click', () => {
        selectedChild = 'Ethan';
		changeChild('ethan');
		updateHeading();
    });

    document.getElementById('child-connor').addEventListener('click', () => {
        selectedChild = 'Connor';
		changeChild('connor');
		updateHeading();
    });
updateHeading();
    addBehaviorBtn.addEventListener('click', () => {
        newBehaviorForm.style.display = 'block';
    });
	
	userSelectButtons.forEach(button => {
        button.addEventListener('click', function () {
            userSelectButtons.forEach(btn => btn.classList.remove('active')); // Remove active from all
            this.classList.add('active'); // Add active to clicked button


        });
    });

   
saveBehaviorBtn.addEventListener('click', () => {
        const name = newBehaviorName.value;
        const value = parseInt(newBehaviorValue.value);
        const type = newBehaviorType.value;

        if (name && !isNaN(value)) {
            behaviors.push({
                id: generateUniqueId(), // Generate unique ID here
                name,
                value,
                type
            });
            renderBehaviors();
            newBehaviorName.value = '';
            newBehaviorValue.value = '';
            newBehaviorType.selectedIndex = 0;
            newBehaviorForm.style.display = 'none';
            saveData(currentChild);
        }
    });

    saveRewardBtn.addEventListener('click', () => {
        const name = newRewardName.value;
        const cost = parseInt(newRewardCost.value);

        if (name && !isNaN(cost)) {
            rewards.push({
                id: generateUniqueId(), // Generate unique ID here
                name,
                cost
            });
            renderRewards();
            newRewardName.value = '';
            newRewardCost.value = '';
            newRewardForm.style.display = 'none';
            saveData(currentChild);
        }
    });

    // Function to generate unique IDs
    function generateUniqueId() {
        return Date.now() + Math.random(); // Simple ID generation
    }
    cancelBehaviorBtn.addEventListener('click', () => {
        newBehaviorForm.style.display = 'none';
    });

    addRewardBtn.addEventListener('click', () => {
        newRewardForm.style.display = 'block';
    });

    toggleJarBtn.addEventListener('click', () => {
        const tokenJarContainer = document.getElementById('token-jar-container');
        // Toggle the 'hidden' class to show/hide the jar
        tokenJarContainer.classList.toggle('hidden');
    });

 

    cancelRewardBtn.addEventListener('click', () => {
        newRewardForm.style.display = 'none';
    });

//    if (dashboardTabButton) {
//        dashboardTabButton.addEventListener('click', createDashboardContent);
//    } else {
//        console.error("Dashboard tab button not found. Check your HTML.");
//    }

    // Attach event listener using event delegation for rewards
    rewardList.addEventListener('click', handleRewardClick);
    document.getElementById('clear-data-btn').addEventListener('click', clearData);

    tokenDisplay.addEventListener('click', () => {
        tokenCounterClicks++;
        if (tokenCounterClicks >= 10) {
            document.getElementById('clear-data-btn').style.display = 'inline-block';
        }
    });



   clearLogBtn.addEventListener('click', () => {
    // Remove localStorage usage:
    activityLog = []; // Clear the in-memory array.
    document.getElementById('activity-log').innerHTML = ''; //clear the html display.
    saveData(currentChild); // Save the empty array to the API.
    $(settingsModal).modal('hide');
});

 document.getElementById('set-coin-btn').addEventListener('click', function () {
        const manualCoinInput = document.getElementById('manual-coin-input');
        const newCoinAmount = parseInt(manualCoinInput.value);

        console.log('New coin amount:', newCoinAmount); // Log the new coin amount

        if (!isNaN(newCoinAmount)) {
            setTokenCount(newCoinAmount);
            manualCoinInput.value = ''; // Clear input field
        } else {
            alert('Please enter a valid number.');
        }
    });

    // --------------------------------------------------
    //  Functions
    // --------------------------------------------------

    function changeChild(child) {
        saveData(currentChild).then(() => {
            currentChild = child;
            loadData(currentChild);
   //         createDashboardContent();
	    updateHeading();
        });
    }
	    function updateHeading() {
        document.querySelector('.header h1').textContent = `${selectedChild}'s Token Rewards`;
    }

function loadData(child) {
    console.log('apiUrl:', apiUrl);
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('API data:', data);
            if (data && data.record && data.record[child]) { // Corrected check
                console.log('Child variable:', child);
                console.log('Data record:', data.record[child]); // Corrected access

                behaviors = data.record[child].behaviors || []; // Corrected access
                rewards = data.record[child].rewards || []; // Corrected access
                tokenCount = data.record[child].tokenCount || 0; // Corrected access

                if (Array.isArray(data.record[child].activityLog)) { // Corrected access
                    activityLog = data.record[child].activityLog; // Corrected access
                } else {
                    activityLog = [];
                }
		console.log('Token:', tokenCount); // Debugging
                console.log('Behaviors:', behaviors); // Debugging
                console.log('Rewards:', rewards); // Debugging
                console.log('Activity Log:', activityLog); // Debugging

                renderBehaviors();
                renderRewards();
                renderActivityLog();
                updateTokenDisplay();
                updateTokenJar();
                updateRewardDisabledStates();

            } else {
                behaviors = [];
                rewards = [];
                tokenCount = 0;
                activityLog = [];
                //no need to change children array within the load data function.
                renderBehaviors();
                renderRewards();
                renderActivityLog();
                updateTokenDisplay();
                updateTokenJar();
                updateRewardDisabledStates();
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
            console.log('Error object:', error);
        });
}

function saveData(child) {
    return fetch(apiUrl, { // Return the fetch promise
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) { // Check if data and data.record exist
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, { // Return the fetch promise
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            // Handle the case where data or data.record is missing
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing."); // Return a rejected promise
        }
    });
}
function renderActivityLog() {
        if (Array.isArray(activityLog)) {
            activityLogElement.innerHTML = ''; // Clear the list before rendering
            activityLog.forEach(log => {
                const listItem = document.createElement('li');
                listItem.textContent = log.message;

                switch (log.type) {
                    case 'positive':
                        listItem.style.color = 'green';
                        break;
                    case 'negative':
                        listItem.style.color = 'red';
                        break;
                    case 'redemption':
                        listItem.style.color = 'blue';
                        break;
                    default:
                        listItem.style.color = 'black';
                }

                activityLogElement.prepend(listItem); // Use the DOM element
            });
        }
    }
    function renderBehaviors() {
		   console.log('Rendering behaviors:', behaviors); //
        positiveBehaviorList.innerHTML = '';
        negativeBehaviorList.innerHTML = '';
        coindumpBehaviorList.innerHTML = '';

        behaviors.forEach(behavior => {
            const emoji = behavior.type === 'positive' ? '🌟' : behavior.type === 'negative' ? '⚠️' : '❗';
            const li = document.createElement('li');

            li.innerHTML = `<span>${emoji} ${behavior.name} (${behavior.value})</span>`;
            li.dataset.tokens = behavior.value;
            li.dataset.behavior = behavior.name;
            li.classList.add('clickable-line');

             li.addEventListener('click', function () {
            const tokens = parseInt(this.dataset.tokens);
            const behavior = this.dataset.behavior;
            const message = `${behavior}: ${tokens > 0 ? '+' : ''}${tokens} tokens`;

            tokenCount = Math.max(0, tokenCount + tokens); // Prevent negative here
            updateTokenDisplay();
            updateTokenJar();
            const type = tokens > 0 ? 'positive' : 'negative';
            logActivity(message, type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

            if (behavior.type === 'positive') positiveBehaviorList.appendChild(li);
            else if (behavior.type === 'negative') negativeBehaviorList.appendChild(li);
            else coindumpBehaviorList.appendChild(li);
        });
    }

 function renderRewards() {
    rewardList.innerHTML = '';
    rewards.forEach(reward => {
        const li = document.createElement('li');
        const disabled = tokenCount < reward.cost;
        li.innerHTML = `<span>🎁 ${reward.name} (${reward.cost} tokens)</span>`;
        li.dataset.cost = reward.cost;
        li.dataset.reward = reward.name;
        li.classList.add('clickable-line');
        if (disabled) {
            li.classList.add('disabled');
        } else {
            li.classList.remove('disabled');
        }
        rewardList.appendChild(li);
    });
    updateRewardDisabledStates();
}
 function handleRewardClick(event) {
        const li = event.target.closest('li');
        if (!li || li.classList.contains('disabled')) return;

        const cost = parseInt(li.dataset.cost); 
        const reward = li.dataset.reward;

        tokenCount = Math.max(0, tokenCount - cost); // Prevent negative here
        updateTokenDisplay();
        logActivity(`Redeemed ${reward} for ${cost} tokens`, 'redemption');
updateRewardDisabledStates();
	saveData(currentChild);
    }

  function updateRewardDisabledStates() {
    const rewardItems = rewardList.querySelectorAll('li[data-cost]'); // Select list items with data-cost
    rewardItems.forEach(item => {
        const rewardCost = parseInt(item.dataset.cost);
        console.log('Token Count:', tokenCount, 'Reward Cost:', rewardCost); // Debugging

        if (tokenCount >= rewardCost) {
            item.classList.remove('disabled');
        } else {
            item.classList.add('disabled');
        }
    });
}
	
    function updateTokenDisplay() {
        tokenDisplay.textContent = tokenCount;
    }

    function toggleActivityLog() {
        const logContainer = document.getElementById("activity-log-container");
        logContainer.classList.toggle("active");
    }

 function addBehavior(behaviorName, behaviorValue, behaviorType) {
    tokenCount += behaviorValue;
    updateTokenDisplay();
    updateTokenJar();
    updateRewardDisabledStates();

    let message = `${behaviorName}: ${behaviorValue > 0 ? '+' : ''}${behaviorValue} tokens`;
    console.log('Adding behavior:', message, behaviorType); // Debugging

    logActivity(message, behaviorType, behaviorValue);
    saveData(currentChild);
}

    function logActivity(message, type, tokens) {
        const listItem = document.createElement('li');
        const now = new Date();
        const timestamp = now.toLocaleString();
        const logMessage = `${timestamp}: ${message.replace('{tokens > 0 ? \'+\' : \'\'}{tokens}', tokens > 0 ? '+' + tokens : tokens)}`;
        listItem.textContent = logMessage;

        switch (type) {
            case 'positive':
                listItem.style.color = 'green';
                break;
            case 'negative':
                listItem.style.color = 'red';
                break;
            case 'redemption':
                listItem.style.color = 'blue';
                break;
            default:
                listItem.style.color = 'black';
        }

        activityLogElement.prepend(listItem); // Use the DOM element

        activityLog.push({ timestamp, message: logMessage, type });

   //     createDashboardContent();
        saveData(currentChild)
            .then(() => {
                console.log("Save successful after log activity");
            })
            .catch((error) => {
                console.error("Save failed after log activity", error);
            });
    }


function clearData() {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record && data.record.children) {
            const childIndex = data.record.children.findIndex(c => c.name === currentChild);
            if (childIndex !== -1) {
                data.record.children.splice(childIndex, 1);
                fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': apiKey
                    },
                    body: JSON.stringify(data.record)
                }).then(() => {
                    tokenCount = 0;
                    updateTokenDisplay();
                    renderBehaviors();
                    renderRewards();
                    alert('All data for ' + currentChild + ' has been cleared.');
                });
            }
        }
    });
}
    function generateDashboardData() {
        const dashboardData = {};
       const child = currentChild;

      const logs = JSON.parse(localStorage.getItem(`${child}-activityLog`)) || [];
       const behaviorCounts = { positive: 0, negative: 0, coindump: 0, rewards: 0 };

       logs.forEach(log => {
           switch (log.type) {
                case 'positive':
                    behaviorCounts.positive++;
                    break;
                case 'negative':
                    behaviorCounts.negative++;
                    break;
                case 'redemption':
                    behaviorCounts.rewards++;
                    break;
            }
        });
        dashboardData[child] = behaviorCounts;
        return dashboardData;
    }

    function createDashboardContent() {
        const dashboardData = generateDashboardData();
        const dashboardContent = document.getElementById('dashboard-content');
        dashboardContent.innerHTML = '';

        const tokenJarContainer = document.getElementById('token-jar-container');
        tokenJarContainer.innerHTML = '';

        const tokenJar = document.createElement('div');
        tokenJar.id = 'token-jar';
        tokenJarContainer.appendChild(tokenJar);

        for (const child in dashboardData) {
            const counts = dashboardData[child];

            const childCard = document.createElement('div');
            childCard.classList.add('child-card');

            const positiveCard = document.createElement('div');
            positiveCard.classList.add('attribute-card');
            positiveCard.innerHTML = `<div class="data-point">Positive: <span>${counts.positive}</span></div>`;
            childCard.appendChild(positiveCard);

            const negativeCard = document.createElement('div');
            negativeCard.classList.add('attribute-card');
            negativeCard.innerHTML = `<div class="data-point">Negative: <span>${counts.negative}</span></div>`;
            childCard.appendChild(negativeCard);

            const coindumpCard = document.createElement('div');
            coindumpCard.classList.add('attribute-card');
            coindumpCard.innerHTML = `<div class="data-point">Coindump: <span>${counts.coindump}</span></div>`;
            childCard.appendChild(coindumpCard);

            const rewardsCard = document.createElement('div');
            rewardsCard.classList.add('attribute-card');
            rewardsCard.innerHTML = `<div class="data-point">Rewards: <span>${counts.rewards}</span></div>`;
            childCard.appendChild(rewardsCard);

            dashboardContent.appendChild(childCard);
        }

        updateTokenJar();
    }

    function addTokens(amount) {
        tokenCount = Math.max(0, tokenCount + amount); // Prevent negative here
        updateTokenJar();
    }

    function removeTokens(amount) {
        tokenCount = Math.max(0, tokenCount - amount); // Prevent negative here
        updateTokenJar();
    }
	
 function setTokenCount(count) {
        tokenCount = count;
        console.log('Token count set to:', count); // Log the updated token count
        updateTokenJar(count);
	updateRewardDisabledStates()
    }

    function updateTokenJar() {
        const jar =document.getElementById('token-jar');
        let countDisplay = document.getElementById('token-count');

        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.id = 'token-count';
            jar.appendChild(countDisplay);
        }
		countDisplay.textContent = tokenCount;
	

        jar.innerHTML = '<div id="token-count">' + tokenCount + '</div>';

        for (let i = 0; i < tokenCount; i++) {
            const token = document.createElement('div');
            token.classList.add('token-icon');

            const x = Math.random() * (jar.offsetWidth - 20);
            const y = Math.random() * (jar.offsetHeight - 20);
            token.style.left = x + 'px';
            token.style.top = y + 'px';

            jar.appendChild(token);
        }
    }
});
