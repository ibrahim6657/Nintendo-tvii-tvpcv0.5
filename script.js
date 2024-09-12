const channels = new Set(); // To store unique channels

async function getUkTvSchedule() {
    const response = await fetch('https://api.tvmaze.com/schedule?country=GB');
    const data = await response.json();

    // Populate channel list and schedule initially
    populateChannels(data);
    displayUkSchedule(data);
}

function populateChannels(data) {
    const channelList = document.getElementById('channel-list');

    // Extract unique channels
    data.forEach(item => {
        if (item.show.network && !channels.has(item.show.network.name)) {
            channels.add(item.show.network.name);
            const li = document.createElement('li');
            li.textContent = item.show.network.name;
            li.addEventListener('click', () => filterByChannel(item.show.network.name, data));
            channelList.appendChild(li);
        }
    });
}

function filterByChannel(channelName, data) {
    const filteredData = data.filter(item => item.show.network && item.show.network.name === channelName);
    displayUkSchedule(filteredData);
}

function displayUkSchedule(data) {
    const scheduleContainer = document.getElementById('schedule-container');
    scheduleContainer.innerHTML = ''; // Clear any previous data

    data.forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');

        scheduleItem.innerHTML = `
            <div class="show-title">${item.show.name}</div>
            <div class="time">${new Date(`1970-01-01T${item.airtime}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="channel">${item.show.network ? item.show.network.name : 'Unknown'}</div>
        `;

        scheduleContainer.appendChild(scheduleItem);
    });
}

// Fetch and display UK TV schedule on load
getUkTvSchedule();
