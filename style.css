// Function to get the TV schedule for a specific date using XMLHttpRequest (fetch not supported on Wii U)
function getUkTvSchedule(date) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.tvmaze.com/schedule?country=GB&date=' + date, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            // Populate channels and display the schedule
            populateChannels(data);
            displayUkSchedule(data);
        } else {
            console.error('Error fetching TV schedule');
        }
    };

    request.onerror = function() {
        console.error('Connection error');
    };

    request.send();
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
            li.addEventListener('click', (function(channelName) {
                return function() {
                    filterByChannel(channelName, data);
                };
            })(item.show.network.name));
            channelList.appendChild(li);
        }
    }
}

// Function to filter by channel
function filterByChannel(channelName, data) {
    var filteredData = data.filter(function(item) {
        return item.show.network && item.show.network.name === channelName;
    });
    displayUkSchedule(filteredData);
}

// Function to display the schedule
function displayUkSchedule(data) {
    var scheduleContainer = document.getElementById('schedule-container');
    scheduleContainer.innerHTML = ''; // Clear previous data

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');

        scheduleItem.innerHTML = '<div class="show-title">' + item.show.name + '</div>' +
            '<div class="time">' + new Date('1970-01-01T' + item.airtime + 'Z').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</div>' +
            '<div class="channel">' + (item.show.network ? item.show.network.name : 'Unknown') + '</div>';

        scheduleContainer.appendChild(scheduleItem);
    }
}

// Load today's schedule when the page loads
var today = new Date().toISOString().split('T')[0];
getUkTvSchedule(today);
