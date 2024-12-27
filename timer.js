document.addEventListener('DOMContentLoaded', function() {
    let timerInterval;
    let stopwatchInterval;
    let timerSeconds = 0;
    let stopwatchSeconds = 0;

    // Function to update the timer display
    function updateTimerDisplay() {
        const hours = Math.floor(timerSeconds / 3600);
        const minutes = Math.floor((timerSeconds % 3600) / 60);
        const seconds = timerSeconds % 60;
        document.getElementById('timerDisplay').textContent = 
            String(hours).padStart(2, '0') + ':' + 
            String(minutes).padStart(2, '0') + ':' + 
            String(seconds).padStart(2, '0');
    }

    // Function to update the stopwatch display
    function updateStopwatchDisplay() {
        const hours = Math.floor(stopwatchSeconds / 3600);
        const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
        const seconds = stopwatchSeconds % 60;
        document.getElementById('stopwatchDisplay').textContent = 
            String(hours).padStart(2, '0') + ':' + 
            String(minutes).padStart(2, '0') + ':' + 
            String(seconds).padStart(2, '0');
    }

    // Event listener for mode selection
    document.querySelectorAll('input[name="mode"]').forEach((input) => {
        input.addEventListener('change', function() {
            if (this.value === 'timer') {
                document.getElementById('timerContainer').classList.remove('hidden');
                document.getElementById('stopwatchContainer').classList.add('hidden');
                resetTimer(); // Reset timer when switching to timer mode
            } else {
                document.getElementById('timerContainer').classList.add('hidden');
                document.getElementById('stopwatchContainer').classList.remove('hidden');
                resetStopwatch(); // Reset stopwatch when switching to stopwatch mode
            }
        });
    });

    // Timer functionality
    document.getElementById('startButton').addEventListener('click', function() {
        const inputSeconds = parseInt(document.getElementById('timerInput').value);
        if (!isNaN(inputSeconds) && inputSeconds > 0) {
            timerSeconds = inputSeconds;
            updateTimerDisplay();
            clearInterval(timerInterval); // Clear any existing interval
            timerInterval = setInterval(() => {
                if (timerSeconds > 0) {
                    timerSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    alert("Time's up!");
                }
            }, 1000);
        } else {
            alert("Please enter a valid number of seconds.");
        }
    });

    // Stop timer functionality
    document.getElementById('stopButton').addEventListener('click', function() {
        clearInterval(timerInterval); // Stop the timer
    });

    // Stopwatch functionality
    document.getElementById('stopwatchStartButton').addEventListener('click', function() {
        clearInterval(stopwatchInterval); // Clear any existing interval
        stopwatchInterval = setInterval(() => {
            stopwatchSeconds++;
            updateStopwatchDisplay();
        }, 1000);
    });

    document.getElementById('stopwatchStopButton').addEventListener('click', function() {
        clearInterval(stopwatchInterval); // Stop the stopwatch
    });

    document.getElementById('stopwatchResetButton').addEventListener('click', function() {
        resetStopwatch(); // Reset stopwatch
    });

    // Reset functions
    function resetTimer() {
        clearInterval(timerInterval); // Stop the timer if running
        timerSeconds = 0; // Reset the time
        updateTimerDisplay(); // Update the display
        document.getElementById('timerInput').value = ''; // Clear the input field
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval); // Stop the stopwatch if running
        stopwatchSeconds = 0; // Reset the stopwatch time
        updateStopwatchDisplay(); // Update the display
    }

    // Handle the Add Timer Modal form submission
    document.getElementById('timerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get the timer duration from the input
        const timerDuration = parseInt(document.getElementById('timerDuration').value);

        // Ensure the input is a valid number
        if (timerDuration && timerDuration > 0) {
            // Set the timer input value
            document.getElementById('timerInput').value = timerDuration;

            // Close the modal after adding the timer
            const modal = bootstrap.Modal.getInstance(document.getElementById('addTimerModal'));
            modal.hide();
        } else {
            alert('Please enter a valid time in seconds.');
        }
    });
});
