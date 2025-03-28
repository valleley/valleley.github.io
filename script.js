Recent
Edit button implementation assistance
Token Economy Data for Children
Moody, atmospheric, photorealistic image capturing an MQ-9 Reaper drone gliding over Philadelphia during twilight. The iconic city skyline is silhouetted or subtly lit below. The drone itself is sharply detailed, featuring the letters "PA" distinctly marked on its tail fin. Artistic composition, dramatic cloudscape, high resolution. --ar 3:2 --style raw --v 6.0
MQ-9 Reaper Coloring Page
Coloring Book Image Prompt

More
Gems

Coding partner


Writing editor


Chess champ


More

Gem manager

Help

Activity

Settings
Pennsylvania, USA
Based on your places (Home) • Update location 
Conversation with Gemini
I want to make an edit button that pops up a form to edit whichever item i select.


script
JS

style
CSS

index.html
HTML

Coding partner

Analysis
I can certainly help you with that! Here's a breakdown of how we can create an edit button for your items, along with the code and explanations:

Explanation

The approach involves adding an edit button to each item's display. When clicked, this button will:

Display a form populated with the item's current data.
Allow the user to modify the data.
Save the updated data.
Here's how we'll implement this for the "Behaviors" section. The "Rewards" section would follow a very similar pattern.

Implementation for Behaviors

1.  Modify renderBehaviors() to include the Edit Button

```javascript
function renderBehaviors() {
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type);
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class="behavior-value">{behavior.value} tokens</span>
<button class="edit-behavior-btn" data-id="${behavior.id}">Edit</button>  `;

        // Add event listener for behavior click (existing functionality)
        card.addEventListener('click', (event) => {
            if (!event.target.classList.contains('edit-behavior-btn')) { // Check if the click was NOT on the edit button
                const tokens = parseInt(behavior.value);
                const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;
                tokenCount = Math.max(0, tokenCount + tokens);
                updateTokenDisplay();
                updateTokenJar();
                logActivity(message, behavior.type);
                updateRewardDisabledStates();
                saveData(currentChild);
            }
        });

        container.appendChild(card);
    });
    attachEditBehaviorListeners(); // Call the function to attach event listeners to the new edit buttons
}
```

* We've added a button element with the class `edit-behavior-btn` to each behavior card.
* The `data-id` attribute is crucial; it stores the unique ID of the behavior, allowing us to identify which behavior to edit later.
* We’ve modified the existing click event listener to check if the target of the click was the edit button. If it wasn’t, we proceed with the existing functionality.
* We call a new function `attachEditBehaviorListeners()` after rendering the behaviors. This function will attach the event listeners to the edit buttons.
2.  Create the attachEditBehaviorListeners() Function

```javascript
function attachEditBehaviorListeners() {
    const editButtons = document.querySelectorAll('.edit-behavior-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const behaviorId = event.target.dataset.id;
            const behaviorToEdit = behaviors.find(behavior => behavior.id.toString() === behaviorId);
            if (behaviorToEdit) {
                showEditBehaviorForm(behaviorToEdit);
            }
        });
    });
}
```

* This function selects all elements with the class `edit-behavior-btn`.
* It then iterates through each button and adds a click event listener.
* Inside the event listener:
    * We extract the `behaviorId` from the `data-id` attribute of the clicked button.
    * We use the `find` method to locate the behavior in the `behaviors` array that matches the `behaviorId`.
    * If a matching behavior is found, we call `showEditBehaviorForm()` to display the edit form.
3.  Create the showEditBehaviorForm() Function

```javascript
function showEditBehaviorForm(behavior) {
    const formContainer = document.getElementById('new-behavior-form'); // Assuming you'll reuse this form
    formContainer.style.display = 'block'; // Show the form

    // Populate the form fields with the behavior's data
    document.getElementById('new-behavior-name').value = behavior.name;
    document.getElementById('new-behavior-value').value = behavior.value;
    document.getElementById('new-behavior-type').value = behavior.type;

    // Change the Save button's functionality
    const saveButton = document.getElementById('save-behavior-btn');
    saveButton.onclick = () => {
        // Update the behavior in the behaviors array
        behavior.name = document.getElementById('new-behavior-name').value;
        behavior.value = parseInt(document.getElementById('new-behavior-value').value);
        behavior.type = document.getElementById('new-behavior-type').value;

        renderBehaviors(); // Re-render the list to show the updated behavior
        formContainer.style.display = 'none'; // Hide the form
        saveData(currentChild); // Save the updated data

        // Reset the Save button's onclick
        saveButton.onclick = () => {
            // Original save functionality here, if needed
        };
    };

    // Change the Cancel button's functionality
    const cancelButton = document.getElementById('cancel-behavior-btn');
    cancelButton.onclick = () => {
        formContainer.style.display = 'none'; // Hide the form

        // Reset the Cancel button's onclick
        cancelButton.onclick = () => {
            // Original cancel functionality here
        };
    };
}
```

* This function takes the `behavior` object as an argument.
* It shows the behavior form (`new-behavior-form`).
* It populates the form's input fields with the current data of the behavior.
* It modifies the `onclick` event handler of the "Save" button to:
    * Update the corresponding behavior in the `behaviors` array with the new values from the form.
    * Re-render the behavior list to reflect the changes.
    * Hide the form.
    * Save the updated data.
* It modifies the `onclick` event handler of the "Cancel" button to hide the form.
4.  (Optional) Visual Updates

* You might want to visually distinguish the edit button. Add some CSS:

    ```css
    .edit-behavior-btn {
        background-color: #ffc107; /* A yellow color */
        color: #212529; /* Dark text */
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.8em;
    }

    .edit-behavior-btn:hover {
        background-color: #ffca2b;
    }
    ```
Important Considerations

Reusing the Form: This code reuses your existing new-behavior-form. If you need a separate form for editing, you'll need to create a new HTML element for it.
Error Handling: You might want to add error handling (e.g., validating user input in the edit form).
Rewards Section: Apply the same pattern to the "Rewards" section. You'll need to adjust the function names and the IDs of the elements accordingly.
Let me know if you'd like me to help you adapt this code for the Rewards section or if you have any other questions!


Sources and related content
script

JS
style

CSS
index.html

HTML




   renderBehaviors() {

    const container = document.getElementById('behavior-cards-container');

    container.innerHTML = ''; // Clear existing cards



    behaviors.forEach(behavior => {

        const card = document.createElement('div');

        card.classList.add('behavior-card', behavior.type);

        card.innerHTML = `

            <h3><span class="math-inline">\{behavior\.name\}</h3\>

<span class="behavior-value">{behavior.value} tokens</span>

<button class="edit-behavior-btn" data-id="${behavior.id}">Edit</button>  `;



        // Add event listener for behavior click (existing functionality)

        card.addEventListener('click', (event) => {

            if (!event.target.classList.contains('edit-behavior-btn')) { // Check if the click was NOT on the edit button

                const tokens = parseInt(behavior.value);

                const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;

                tokenCount = Math.max(0, tokenCount + tokens);

                updateTokenDisplay();

                updateTokenJar();

                logActivity(message, behavior.type);

                updateRewardDisabledStates();

                saveData(currentChild);

            }

        });



        container.appendChild(card);

    });

    attachEditBehaviorListeners(); // Call the function to attach event listeners to the new edit buttons

}



is there a bracket error here



Coding partner
Yes, there is a bracket error in the code you provided.

Specifically, this line:

JavaScript

const message = `${behavior.name}: <span class="math-inline">\{tokens > 0 ? '+' : ''\}</span>{tokens} tokens`;
has an extra set of curly braces inside the <span> tag.

Here's the corrected line:

JavaScript

const message = `${behavior.name}: ${tokens > 0 ? '+' : ''}${tokens} tokens`;
Explanation of the Error and Correction

Template Literals: The backticks (`) are used for template literals in JavaScript, which allow you to embed expressions directly within strings using ${expression}.
Unnecessary Curly Braces: The original code had \{tokens > 0 ? '+' : ''\} within the <span> tag. The curly braces around the ternary operator (tokens > 0 ? '+' : '') are only needed inside the template literal (i.e., within the ${...}). The <span> tag itself doesn't interpret JavaScript expressions.
Corrected Code: The corrected code removes the extra curly braces, leaving only ${tokens > 0 ? '+' : ''} inside the template literal. This correctly embeds the result of the ternary operator (either "+" or "") into the string.
With this correction, the code should function as intended.


Sources and related content
script

JS
style

CSS
index.html

HTML




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

   renderBehaviors() {

    const container = document.getElementById('behavior-cards-container');

    container.innerHTML = ''; // Clear existing cards



    behaviors.forEach(behavior => {

        const card = document.createElement('div');

        card.classList.add('behavior-card', behavior.type);

        card.innerHTML = `

            <h3><span class="math-inline">\{behavior\.name\}</h3\>

<span class="behavior-value">{behavior.value} tokens</span>

<button class="edit-behavior-btn" data-id="${behavior.id}">Edit</button>  `;



        // Add event listener for behavior click (existing functionality)

        card.addEventListener('click', (event) => {

            if (!event.target.classList.contains('edit-behavior-btn')) { // Check if the click was NOT on the edit button

                const tokens = parseInt(behavior.value);

                const message = `${behavior.name}: ${tokens > 0 ? '+' : ''}${tokens} tokens`;

                tokenCount = Math.max(0, tokenCount + tokens);

                updateTokenDisplay();

                updateTokenJar();

                logActivity(message, behavior.type);

                updateRewardDisabledStates();

                saveData(currentChild);

            }

        });



        container.appendChild(card);

    });

    attachEditBehaviorListeners(); // Call the function to attach event listeners to the new edit buttons

}



   function renderRewards() {

    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards

    container.innerHTML = '';

  

    rewards.forEach(reward => {

      const card = document.createElement('div');

      card.classList.add('reward-card'); // Add reward-card class for consistent styling

      const disabled = tokenCount < reward.cost;

  

      card.innerHTML = `

        <h3>🎁 ${reward.name}</h3>

        <span class="reward-cost">${reward.cost} tokens</span>

      `;

  

      card.dataset.cost = reward.cost;

      card.dataset.reward = reward.name;

  

      if (disabled) {

        card.classList.add('disabled');

      } else {

        card.classList.remove('disabled');

        card.addEventListener('click', () => {

          const cost = parseInt(reward.cost);

          if (tokenCount >= cost) {

            tokenCount -= cost;

            updateTokenDisplay();

            updateTokenJar();

            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');

            updateRewardDisabledStates();

            saveData(currentChild);

            // Optionally, handle the reward redemption logic here

          }

        });

      }

  

      container.appendChild(card);

    });

    updateRewardDisabledStates();

    attachRewardCardListeners(); // Attach event listeners after rendering

  }





any extra brackets?



Coding partner

Analysis
Let's analyze the code you've provided for any extra brackets or other syntax issues.

renderActivityLog()

JavaScript

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
}
This function looks fine. There are no extra brackets or obvious syntax errors.
renderBehaviors()

JavaScript

function renderBehaviors() {
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type);
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</span></h3>
            <span class="behavior-value">{behavior.value} tokens</span>
            <button class="edit-behavior-btn" data-id="${behavior.id}">Edit</button>  
        `;

        // Add event listener for behavior click (existing functionality)
        card.addEventListener('click', (event) => {
            if (!event.target.classList.contains('edit-behavior-btn')) { // Check if the click was NOT on the edit button
                const tokens = parseInt(behavior.value);
                const message = `${behavior.name}: ${tokens > 0 ? '+' : ''}${tokens} tokens`;
                tokenCount = Math.max(0, tokenCount + tokens);
                updateTokenDisplay();
                updateTokenJar();
                logActivity(message, behavior.type);
                updateRewardDisabledStates();
                saveData(currentChild);
            }
        });

        container.appendChild(card);
    });
    attachEditBehaviorListeners(); // Call the function to attach event listeners to the new edit buttons
}
As we identified before, there are misplaced curly braces within the template literal in this line:

JavaScript

card.innerHTML = `
    <h3><span class="math-inline">\{behavior\.name\}</span></h3>
    <span class="behavior-value">{behavior.value} tokens</span>
    <button class="edit-behavior-btn" data-id="${behavior.id}">Edit</button>
`;
It should be corrected to:

JavaScript

card.innerHTML = `
    <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class="behavior-value">{behavior.value} tokens</span>
<button class="edit-behavior-btn" data-id="${behavior.id}">Edit</button>
`;
```

renderRewards()

JavaScript

function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';

    rewards.forEach(reward => {
        const card = document.createElement('div');
        card.classList.add('reward-card'); // Add reward-card class for consistent styling
        const disabled = tokenCount < reward.cost;

        card.innerHTML = `
            <h3>🎁 ${reward.name}</h3>
            <span class="reward-cost">${reward.cost} tokens</span>
        `;

        card.dataset.cost = reward.cost;
        card.dataset.reward = reward.name;

        if (disabled) {
            card.classList.add('disabled');
        } else {
            card.classList.remove('disabled');
            card.addEventListener('click', () => {
                const cost = parseInt(reward.cost);
                if (tokenCount >= cost) {
                    tokenCount -= cost;
                    updateTokenDisplay();
                    updateTokenJar();
                    logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
                    updateRewardDisabledStates();
                    saveData(currentChild);
                    // Optionally, handle the reward redemption logic here
                }
            });
        }

        container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
}
This function also looks correct, with no extra brackets or syntax errors.
Summary of Bracket Errors

The only bracket error is in the renderBehaviors() function, specifically in the card.innerHTML template literal.


Sources and related content
script

JS




give me the full JS file.


Coding partner

Analysis
JavaScript

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
    const cancelRewardBtn = document.getElementById('cancelReward-btn');
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
	addFilteringControls();
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
        // Save current child's data before switching
        saveData(currentChild);
        currentChild = child;
        loadData(currentChild);
        updateHeading();
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

// Add debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of saveData
const debouncedSaveData = debounce((child) => {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) {
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing.");
        }
    });
}, 2000); // 2 second delay

// Replace the original saveData function with the debounced version
function saveData(child) {
    debouncedSaveData(child);
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
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type); // Add type as a class for styling
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class\="behavior\-value"\></span>{behavior.value} tokens</span>
        `;

        // Add event listener for behavior click
        card.addEventListener('click', () => {
            const tokens = parseInt(behavior.value);
            const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;
            tokenCount = Math.max(0, tokenCount + tokens);
            updateTokenDisplay();
            updateTokenJar();
            logActivity(message, behavior.type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

        container.appendChild(card);
    });
   }

   function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';
  
    rewards.forEach(reward => {
      const card = document.createElement('div');
      card.classList.add('reward-card'); // Add reward-card class for consistent styling
      const disabled = tokenCount < reward.cost;
  
      card.innerHTML = `
        <h3>🎁 <span class="math-inline">\{reward\.name\}</h3\>
<span class\="reward\-cost"\></span>{reward.cost} tokens</span>
      `;
  
      card.dataset.cost = reward.cost;
      card.dataset.reward = reward.name;
  
      if (disabled) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
        card.addEventListener('click', () => {
          const cost = parseInt(reward.cost);
          if (tokenCount >= cost) {
            tokenCount -= cost;
            updateTokenDisplay();
            updateTokenJar();
            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
            updateRewardDisabledStates();
            saveData(currentChild);
            // Optionally, handle the reward redemption logic here
          }
        });
      }
  
      container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
  }


function addFilteringControls() {
    // Example: Add a dropdown to filter by behavior type
    const filterDropdown = document.createElement('select');
    filterDropdown.innerHTML = `
        <option value="">All</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option value="coindump">Coindump</option>
    `;

    filterDropdown.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        filterBehaviors(selectedType);
    });

    // Add the dropdown to your container (e.g., before the cards)
    document.getElementById('behaviors-section').prepend(filterDropdown);
}

function filterBehaviors(type) {
    const cards = document.querySelectorAll('.behavior-card');
    cards.forEach(card => {
        if (type === '' || card.classList.contains(type)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

	
function handleRewardClick(event) {
    const card = event.target.closest('.reward-card');
    if (!card || card.classList.contains('disabled')) return;

    const cost = parseInt(card.dataset.cost);
    const reward = card.dataset.reward;

    tokenCount = Math.max(0, tokenCount - cost);
    updateTokenDisplay();
    updateTokenJar();
    logActivity(`Redeemed ${reward} for ${cost} tokens`, 'redemption');
    updateRewardDisabledStates();
    saveData(currentChild);
}

function updateRewardDisabledStates() {
    const

Sources and related content
script

JS
index.html

HTML
style

CSS




update


Coding partner

Analysis
OK, here's the updated version of the JavaScript file. I've included all of the code from the file you provided, so you should be able to copy and paste it directly into your project.

JavaScript

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
    const saveBehaviorBtn = document.getElementById('saveBehaviorBtn');
    const cancelBehaviorBtn = document.getElementById('cancelBehaviorBtn');
    const newBehaviorName = document.getElementById('new-behavior-name');
    const newBehaviorValue = document.getElementById('new-behavior-value');
    const newBehaviorType = document.getElementById('new-behavior-type');
    const addRewardBtn = document.getElementById('add-reward-btn');
    const newRewardForm = document.getElementById('new-reward-form');
    const saveRewardBtn = document.getElementById('saveRewardBtn');
    const cancelRewardBtn = document.getElementById('cancelRewardBtn');
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
	addFilteringControls();
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
        // Save current child's data before switching
        saveData(currentChild);
        currentChild = child;
        loadData(currentChild);
        updateHeading();
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

// Add debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of saveData
const debouncedSaveData = debounce((child) => {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) {
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing.");
        }
    });
}, 2000); // 2 second delay

// Replace the original saveData function with the debounced version
function saveData(child) {
    debouncedSaveData(child);
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
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type); // Add type as a class for styling
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class\="behavior\-value"\></span>{behavior.value} tokens</span>
        `;

        // Add event listener for behavior click
        card.addEventListener('click', () => {
            const tokens = parseInt(behavior.value);
            const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;
            tokenCount = Math.max(0, tokenCount + tokens);
            updateTokenDisplay();
            updateTokenJar();
            logActivity(message, behavior.type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

        container.appendChild(card);
    });
   }

   function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';
  
    rewards.forEach(reward => {
      const card = document.createElement('div');
      card.classList.add('reward-card'); // Add reward-card class for consistent styling
      const disabled = tokenCount < reward.cost;
  
      card.innerHTML = `
        <h3>🎁 <span class="math-inline">\{reward\.name\}</h3\>
<span class\="reward\-cost"\></span>{reward.cost} tokens</span>
      `;
  
      card.dataset.cost = reward.cost;
      card.dataset.reward = reward.name;
  
      if (disabled) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
        card.addEventListener('click', () => {
          const cost = parseInt(reward.cost);
          if (tokenCount >= cost) {
            tokenCount -= cost;
            updateTokenDisplay();
            updateTokenJar();
            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
            updateRewardDisabledStates();
            saveData(currentChild);
            // Optionally, handle the reward redemption logic here
          }
        });
      }
  
      container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
  }


function addFilteringControls() {
    // Example: Add a dropdown to filter by behavior type
    const filterDropdown = document.createElement('select');
    filterDropdown.innerHTML = `
        <option value="">All</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option value="coindump">Coindump</option>
    `;

    filterDropdown.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        filterBehaviors(selectedType);
    });

    // Add the dropdown to your container (e.g., before the cards)
    document.getElementById('behaviors-section').prepend(filterDropdown);
}

function filterBehaviors(type) {
    const cards = document.querySelectorAll('.behavior-card');
    cards.forEach(card => {
        if (type === '' || card.classList.contains(type)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

	
function handleRewardClick(event) {
    const card = event.target.closest('.reward-card');
    if (!card || card.classList.contains('disabled')) return;

    const cost = parseInt(card.dataset.cost);
    const reward = card.dataset.reward;

    tokenCount = Math.max(0, tokenCount - cost);
    updateTokenDisplay();
    updateTokenJar();
    logActivity(`Redeemed ${reward} for ${

Sources and related content
script

JS
index.html

HTML
style

CSS




add all relevant code for the edit buttons as well


Coding partner

Analysis
OK, I've added the code for the edit buttons. This will allow you to modify existing behaviors and rewards.

JavaScript

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
    const saveBehaviorBtn = document.getElementById('saveBehaviorBtn');
    const cancelBehaviorBtn = document.getElementById('cancel-behavior-btn');
    const newBehaviorName = document.getElementById('new-behavior-name');
    const newBehaviorValue = document.getElementById('new-behavior-value');
    const newBehaviorType = document.getElementById('new-behavior-type');
    const addRewardBtn = document.getElementById('add-reward-btn');
    const newRewardForm = document.getElementById('new-reward-form');
    const saveRewardBtn = document.getElementById('saveRewardBtn');
    const cancelRewardBtn = document.getElementById('cancelRewardBtn');
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
	addFilteringControls();
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
        // Save current child's data before switching
        saveData(currentChild);
        currentChild = child;
        loadData(currentChild);
        updateHeading();
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

// Add debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of saveData
const debouncedSaveData = debounce((child) => {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) {
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing.");
        }
    });
}, 2000); // 2 second delay

// Replace the original saveData function with the debounced version
function saveData(child) {
    debouncedSaveData(child);
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
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type); // Add type as a class for styling
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class\="behavior\-value"\></span>{behavior.value} tokens</span>
        `;

        // Add event listener for behavior click
        card.addEventListener('click', () => {
            const tokens = parseInt(behavior.value);
            const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;
            tokenCount = Math.max(0, tokenCount + tokens);
            updateTokenDisplay();
            updateTokenJar();
            logActivity(message, behavior.type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

		// Create edit button
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditBehaviorModal(behavior);
		});
		card.appendChild(editButton);

        container.appendChild(card);
    });
   }

   function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';
  
    rewards.forEach(reward => {
      const card = document.createElement('div');
      card.classList.add('reward-card'); // Add reward-card class for consistent styling
      const disabled = tokenCount < reward.cost;
  
      card.innerHTML = `
        <h3>🎁 <span class="math-inline">\{reward\.name\}</h3\>
<span class\="reward\-cost"\></span>{reward.cost} tokens</span>
      `;
  
      card.dataset.cost = reward.cost;
      card.dataset.reward = reward.name;
  
      if (disabled) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
        card.addEventListener('click', () => {
          const cost = parseInt(reward.cost);
          if (tokenCount >= cost) {
            tokenCount -= cost;
            updateTokenDisplay();
            updateTokenJar();
            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
            updateRewardDisabledStates();
            saveData(currentChild);
            // Optionally, handle the reward redemption logic here
          }
        });
      }
		// Create edit button for rewards
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditRewardModal(reward);
		});
		card.appendChild(editButton);
  
      container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
  }


function addFilteringControls() {
    // Example: Add a dropdown to filter by behavior type
    const filterDropdown = document.createElement('select');
    filterDropdown.innerHTML = `
        <option value="">All</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option value="coindump">Coindump</option>
    `;

    filterDropdown.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        filterBehaviors(selectedType);
    });

    // Add the dropdown to your container (e.g., before the cards)
    document.getElementById('behaviors-section').prepend(filterDropdown);
}

function filterBehaviors(type) {
    const cards = document.querySelectorAll('.behavior-card');
    cards.forEach(card => {

Sources and related content
github.com
github.com
github.com
github.com
script

JS
index.html

HTML
style

CSS




continue


Coding partner

Analysis
OK, I've added the code for the edit buttons. This will allow you to modify existing behaviors and rewards.

JavaScript

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
    const saveBehaviorBtn = document.getElementById('saveBehaviorBtn');
    const cancelBehaviorBtn = document.getElementById('cancelBehaviorBtn');
    const newBehaviorName = document.getElementById('new-behavior-name');
    const newBehaviorValue = document.getElementById('new-behavior-value');
    const newBehaviorType = document.getElementById('new-behavior-type');
    const addRewardBtn = document.getElementById('add-reward-btn');
    const newRewardForm = document.getElementById('new-reward-form');
    const saveRewardBtn = document.getElementById('saveRewardBtn');
    const cancelRewardBtn = document.getElementById('cancelRewardBtn');
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
	addFilteringControls();
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
        // Save current child's data before switching
        saveData(currentChild);
        currentChild = child;
        loadData(currentChild);
        updateHeading();
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

// Add debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of saveData
const debouncedSaveData = debounce((child) => {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) {
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing.");
        }
    });
}, 2000); // 2 second delay

// Replace the original saveData function with the debounced version
function saveData(child) {
    debouncedSaveData(child);
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
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type); // Add type as a class for styling
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class\="behavior\-value"\></span>{behavior.value} tokens</span>
        `;

        // Add event listener for behavior click
        card.addEventListener('click', () => {
            const tokens = parseInt(behavior.value);
            const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;
            tokenCount = Math.max(0, tokenCount + tokens);
            updateTokenDisplay();
            updateTokenJar();
            logActivity(message, behavior.type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

		// Create edit button
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditBehaviorModal(behavior);
		});
		card.appendChild(editButton);

        container.appendChild(card);
    });
   }

   function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';
  
    rewards.forEach(reward => {
      const card = document.createElement('div');
      card.classList.add('reward-card'); // Add reward-card class for consistent styling
      const disabled = tokenCount < reward.cost;
  
      card.innerHTML = `
        <h3>🎁 <span class="math-inline">\{reward\.name\}</h3\>
<span class\="reward\-cost"\></span>{reward.cost} tokens</span>
      `;
  
      card.dataset.cost = reward.cost;
      card.dataset.reward = reward.name;
  
      if (disabled) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
        card.addEventListener('click', () => {
          const cost = parseInt(reward.cost);
          if (tokenCount >= cost) {
            tokenCount -= cost;
            updateTokenDisplay();
            updateTokenJar();
            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
            updateRewardDisabledStates();
            saveData(currentChild);
            // Optionally, handle the reward redemption logic here
          }
        });
      }
		// Create edit button for rewards
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditRewardModal(reward);
		});
		card.appendChild(editButton);
  
      container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
  }


function addFilteringControls() {
    // Example: Add a dropdown to filter by behavior type
    const filterDropdown = document.createElement('select');
    filterDropdown.innerHTML = `
        <option value="">All</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option value="coindump">Coindump</option>
    `;

    filterDropdown.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        filterBehaviors(selectedType);
    });

    // Add the dropdown to your container (e.g., before the cards)
    document.getElementById('behaviors-section').prepend(filterDropdown);
}

function filterBehaviors(type) {
    const cards = document.querySelectorAll('.behavior-card');
    cards.forEach(card => {

Sources and related content
github.com
github.com
github.com
github.com
script

JS
index.html

HTML
style

CSS




Uncaught ReferenceError: Cannot access 'debouncedSaveData' before initialization

    at saveData (script.js:340:5)

    at changeChild (script.js:230:9)

    at HTMLButtonElement.<anonymous> (script.js:96:3)



Coding partner

Analysis
OK, I see the error. It looks like the changeChild function is being called before debouncedSaveData is initialized. This is happening because the event listeners for the child selection buttons are being attached before the debouncedSaveData function is fully defined.

To fix this, I'll move the definition of debouncedSaveData earlier in the code, before it's used in the changeChild function.

Here's the corrected code:

JavaScript

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
    const cancelRewardBtn = document.getElementById('cancelRewardBtn');
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
	addFilteringControls();
    // --------------------------------------------------
    //  Event Listeners
    // --------------------------------------------------

    // Add debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of saveData
const debouncedSaveData = debounce((child) => {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) {
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing.");
        }
    });
}, 2000); // 2 second delay

// Replace the original saveData function with the debounced version
function saveData(child) {
    debouncedSaveData(child);
}

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
        // Save current child's data before switching
        saveData(currentChild);
        currentChild = child;
        loadData(currentChild);
        updateHeading();
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
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type); // Add type as a class for styling
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class\="behavior\-value"\></span>{behavior.value} tokens</span>
        `;

        // Add event listener for behavior click
        card.addEventListener('click', () => {
            const tokens = parseInt(behavior.value);
            const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;
            tokenCount = Math.max(0, tokenCount + tokens);
            updateTokenDisplay();
            updateTokenJar();
            logActivity(message, behavior.type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

		// Create edit button
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditBehaviorModal(behavior);
		});
		card.appendChild(editButton);

        container.appendChild(card);
    });
   }

   function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';
  
    rewards.forEach(reward => {
      const card = document.createElement('div');
      card.classList.add('reward-card'); // Add reward-card class for consistent styling
      const disabled = tokenCount < reward.cost;
  
      card.innerHTML = `
        <h3>🎁 <span class="math-inline">\{reward\.name\}</h3\>
<span class\="reward\-cost"\></span>{reward.cost} tokens</span>
      `;
  
      card.dataset.cost = reward.cost;
      card.dataset.reward = reward.name;
  
      if (disabled) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
        card.addEventListener('click', () => {
          const cost = parseInt(reward.cost);
          if (tokenCount >= cost) {
            tokenCount -= cost;
            updateTokenDisplay();
            updateTokenJar();
            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
            updateRewardDisabledStates();
            saveData(currentChild);
            // Optionally, handle the reward redemption logic here
          }
        });
      }
		// Create edit button for rewards
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditRewardModal(reward);
		});
		card.appendChild(editButton);
  
      container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
  }


function addFilteringControls() {
    // Example: Add a dropdown to filter by behavior type
    const filterDropdown = document.createElement('select');
    filterDropdown.innerHTML = `
        <option value="">All</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option value="coindump">Coindump</option>
    `;

    filterDropdown.addEventListener('change', (e) => {
        const selectedType = e.target.value;

Sources and related content
github.com
github.com
github.com
github.com
script

JS
index.html

HTML
style

CSS





script.js:232 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')

    at HTMLDocument.<anonymous> (script.js:232:16)


Coding partner

Analysis
OK, it looks like there's an error on line 232 of your script.js file. This error means that the code is trying to use the addEventListener method on an element that doesn't exist in the DOM (Document Object Model).

This is likely happening because the script is trying to attach event listeners to the child selection buttons before they have been fully loaded into the page. To fix this, I'll ensure that the event listeners are attached after the DOM content has loaded. I can do this by wrapping the code that attaches the event listeners inside the DOMContentLoaded event listener.

Here's the corrected code:

JavaScript

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
    const cancelBehaviorBtn = document.getElementById('cancelBehaviorBtn');
    const newBehaviorName = document.getElementById('new-behavior-name');
    const newBehaviorValue = document.getElementById('new-behavior-value');
    const newBehaviorType = document.getElementById('new-behavior-type');
    const addRewardBtn = document.getElementById('add-reward-btn');
    const newRewardForm = document.getElementById('new-reward-form');
    const saveRewardBtn = document.getElementById('save-reward-btn');
    const cancelRewardBtn = documentgetElementById('cancelRewardBtn');
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
	addFilteringControls();
    // --------------------------------------------------
    //  Event Listeners
    // --------------------------------------------------

    // Add debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of saveData
const debouncedSaveData = debounce((child) => {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) {
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing.");
        }
    });
}, 2000); // 2 second delay

// Replace the original saveData function with the debounced version
function saveData(child) {
    debouncedSaveData(child);
}

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
        // Save current child's data before switching
        saveData(currentChild);
        currentChild = child;
        loadData(currentChild);
        updateHeading();
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
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type); // Add type as a class for styling
        card.innerHTML = `
            <h3><span class="math-inline">\{behavior\.name\}</h3\>
<span class\="behavior\-value"\></span>{behavior.value} tokens</span>
        `;

        // Add event listener for behavior click
        card.addEventListener('click', () => {
            const tokens = parseInt(behavior.value);
            const message = `${behavior.name}: <span class="math-inline">\{tokens \> 0 ? '\+' \: ''\}</span>{tokens} tokens`;
            tokenCount = Math.max(0, tokenCount + tokens);
            updateTokenDisplay();
            updateTokenJar();
            logActivity(message, behavior.type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

		// Create edit button
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditBehaviorModal(behavior);
		});
		card.appendChild(editButton);

        container.appendChild(card);
    });
   }

   function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';
  
    rewards.forEach(reward => {
      const card = document.createElement('div');
      card.classList.add('reward-card'); // Add reward-card class for consistent styling
      const disabled = tokenCount < reward.cost;
  
      card.innerHTML = `
        <h3>🎁 <span class="math-inline">\{reward\.name\}</h3\>
<span class\="reward\-cost"\></span>{reward.cost} tokens</span>
      `;
  
      card.dataset.cost = reward.cost;
      card.dataset.reward = reward.name;
  
      if (disabled) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
        card.addEventListener('click', () => {
          const cost = parseInt(reward.cost);
          if (tokenCount >= cost) {
            tokenCount -= cost;
            updateTokenDisplay();
            updateTokenJar();
            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
            updateRewardDisabledStates();
            saveData(currentChild);
            // Optionally, handle the reward redemption logic here
          }
        });
      }
		// Create edit button for rewards
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-button');
		editButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent card click
			openEditRewardModal(reward);
		});
		card.appendChild(editButton);
  
      container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
  }


function addFilteringControls() {
    // Example: Add a dropdown to filter by behavior type
    const filterDropdown = document.createElement('select');
    filterDropdown.innerHTML = `
        <option value="">All</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option value="coindump">Coindump</

Sources and related content
github.com
github.com
github.com
github.com
script

JS
index.html

HTML
style

CSS










Gemini can make mistakes, so double-check it

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
	addFilteringControls();
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
        // Save current child's data before switching
        saveData(currentChild);
        currentChild = child;
        loadData(currentChild);
        updateHeading();
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

// Add debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of saveData
const debouncedSaveData = debounce((child) => {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.record) {
            data.record[child] = {
                behaviors: behaviors,
                tokenCount: tokenCount,
                activityLog: activityLog,
                rewards: rewards
            };
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(data.record)
            });
        } else {
            console.error("Data or data.record is missing from API response.");
            return Promise.reject("Data or data.record is missing.");
        }
    });
}, 2000); // 2 second delay

// Replace the original saveData function with the debounced version
function saveData(child) {
    debouncedSaveData(child);
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
    const container = document.getElementById('behavior-cards-container');
    container.innerHTML = ''; // Clear existing cards

    behaviors.forEach(behavior => {
        const card = document.createElement('div');
        card.classList.add('behavior-card', behavior.type); // Add type as a class for styling
        card.innerHTML = `
            <h3>${behavior.name}</h3>
            <span class="behavior-value">${behavior.value} tokens</span>
        `;

        // Add event listener for behavior click
        card.addEventListener('click', () => {
            const tokens = parseInt(behavior.value);
            const message = `${behavior.name}: ${tokens > 0 ? '+' : ''}${tokens} tokens`;
            tokenCount = Math.max(0, tokenCount + tokens);
            updateTokenDisplay();
            updateTokenJar();
            logActivity(message, behavior.type);
            updateRewardDisabledStates();
            saveData(currentChild);
        });

        container.appendChild(card);
    });
   }

   function renderRewards() {
    const container = document.getElementById('reward-cards-container'); // Assuming you have a container for rewards
    container.innerHTML = '';
  
    rewards.forEach(reward => {
      const card = document.createElement('div');
      card.classList.add('reward-card'); // Add reward-card class for consistent styling
      const disabled = tokenCount < reward.cost;
  
      card.innerHTML = `
        <h3>🎁 ${reward.name}</h3>
        <span class="reward-cost">${reward.cost} tokens</span>
      `;
  
      card.dataset.cost = reward.cost;
      card.dataset.reward = reward.name;
  
      if (disabled) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
        card.addEventListener('click', () => {
          const cost = parseInt(reward.cost);
          if (tokenCount >= cost) {
            tokenCount -= cost;
            updateTokenDisplay();
            updateTokenJar();
            logActivity(`Redeemed ${reward.name} for ${cost} tokens`, 'reward');
            updateRewardDisabledStates();
            saveData(currentChild);
            // Optionally, handle the reward redemption logic here
          }
        });
      }
  
      container.appendChild(card);
    });
    updateRewardDisabledStates();
    attachRewardCardListeners(); // Attach event listeners after rendering
  }


function addFilteringControls() {
    // Example: Add a dropdown to filter by behavior type
    const filterDropdown = document.createElement('select');
    filterDropdown.innerHTML = `
        <option value="">All</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option value="coindump">Coindump</option>
    `;

    filterDropdown.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        filterBehaviors(selectedType);
    });

    // Add the dropdown to your container (e.g., before the cards)
    document.getElementById('behaviors-section').prepend(filterDropdown);
}

function filterBehaviors(type) {
    const cards = document.querySelectorAll('.behavior-card');
    cards.forEach(card => {
        if (type === '' || card.classList.contains(type)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

	
function handleRewardClick(event) {
    const card = event.target.closest('.reward-card');
    if (!card || card.classList.contains('disabled')) return;

    const cost = parseInt(card.dataset.cost);
    const reward = card.dataset.reward;

    tokenCount = Math.max(0, tokenCount - cost);
    updateTokenDisplay();
    updateTokenJar();
    logActivity(`Redeemed ${reward} for ${cost} tokens`, 'redemption');
    updateRewardDisabledStates();
    saveData(currentChild);
}

function updateRewardDisabledStates() {
    const rewardCards = document.querySelectorAll('.reward-card[data-cost]'); // Select reward cards with data-cost
    rewardCards.forEach(card => {
        const rewardCost = parseInt(card.dataset.cost);

        if (tokenCount >= rewardCost) {
            card.classList.remove('disabled');
        } else {
            card.classList.add('disabled');
        }
    });
}

// Add this function to attach event listeners to reward cards
function attachRewardCardListeners() {
    const rewardCards = document.querySelectorAll('.reward-card:not(.disabled)');
    rewardCards.forEach(card => {
        card.addEventListener('click', handleRewardClick);
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

        activityLogElement.prepend(listItem);
        activityLog.push({ timestamp, message: logMessage, type });
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
script.js
Displaying script.js.
