// Function to get the TV schedule for a specific date using XMLHttpRequest
function getUkTvSchedule(date) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.tvmaze.com/schedule?country=GB&date=' + date, true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            populateChannels(data);
            displaySchedule(data);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error('Failed to fetch data. Status code:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send();
}

// Function to populate the channel list
function populateChannels(data) {
    var channelList = document.getElementById('channel-list');
    channelList.innerHTML = ''; // Clear previous channels

    var channels = {}; // Track unique channels
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.show.network && !channels[item.show.network.name]) {
            channels[item.show.network.name] = true;

            var li = document.createElement('li');
            li.textContent = item.show.network.name;
            li.onclick = (function(channelName) {
                return function() {
                    filterByChannel(channelName, data);
                };
            })(item.show.network.name);

            channelList.appendChild(li);
        }
    }
}

// Function to filter shows by channel
function filterByChannel(channelName, data) {
    var filteredData = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].show.network && data[i].show.network.name === channelName) {
            filteredData.push(data[i]);
        }
    }
    displaySchedule(filteredData);
}

// Function to display the schedule
function displaySchedule(data) {
    var scheduleContainer = document.getElementById('schedule-container');
    scheduleContainer.innerHTML = ''; // Clear previous schedule

    for (var i = 0; i < data.length; i++) {
        var item = data[i];

        var scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');
        
        // Set the show title, time, and channel information
        var showTitle = document.createElement('div');
        showTitle.className = 'show-title';
        showTitle.textContent = item.show.name;

        var time = document.createElement('div');
        time.className = 'time';
        time.textContent = 'Time: ' + item.airtime;

        var channel = document.createElement('div');
        channel.className = 'channel';
        channel.textContent = 'Channel: ' + (item.show.network ? item.show.network.name : 'Unknown');

        // Append everything to the schedule item
        scheduleItem.appendChild(showTitle);
        scheduleItem.appendChild(time);
        scheduleItem.appendChild(channel);

        // Append the schedule item to the schedule container
        scheduleContainer.appendChild(scheduleItem);
    }
}

// Get today's date
var today = new Date().toISOString().split('T')[0];

// Fetch the UK TV schedule for today when the page loads
getUkTvSchedule(today);