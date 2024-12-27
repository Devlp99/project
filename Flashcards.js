document.addEventListener('DOMContentLoaded', function () {
    const flashcardsContainer = document.getElementById('flashcardList');
    const addFlashcardButton = document.getElementById('saveFlashcardBtn');
    const flashcardTitleInput = document.getElementById('flashcardTitle');
    const flashcardDescriptionInput = document.getElementById('flashcardDescription');

    // Function to create a flashcard
    function createFlashcard(title, description) {
        const flashcardDiv = document.createElement('div');
        flashcardDiv.classList.add('col-md-4', 'mb-4');
        
        flashcardDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        `;
        
        flashcardsContainer.appendChild(flashcardDiv);
    }

    // Handle the form submission to save a new flashcard
    addFlashcardButton.addEventListener('click', function (event) {
        event.preventDefault();

        const title = flashcardTitleInput.value.trim();
        const description = flashcardDescriptionInput.value.trim();

        if (title === '' || description === '') {
            alert('Please fill in both the title and description');
            return;
        }

        // Create the flashcard dynamically
        createFlashcard(title, description);

        // Clear the form inputs
        flashcardTitleInput.value = '';
        flashcardDescriptionInput.value = '';

        // Close the modal after saving the flashcard
        const flashcardModal = new bootstrap.Modal(document.getElementById('addFlashcardsModal'));
        flashcardModal.hide();
    });
});
