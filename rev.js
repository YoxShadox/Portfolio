document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const adminPanel = document.getElementById('adminPanel');
    const adminReviewsList = document.getElementById('adminReviewsList');
    const addReviewSection = document.getElementById('addReview');
    const addReviewLink = document.getElementById('addReviewLink');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const reviewsSection = document.getElementById('reviews');
    const loginSection = document.getElementById('login');
    const reviewsLink = document.getElementById('reviewsLink');
    let isAdmin = false;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === 'yoxshadox@gmail.com' && password === 'yoxshadox') {
            isAdmin = true;
            alert('Admin logged in');
            localStorage.setItem('isLoggedIn', 'admin');
        } else {
            isAdmin = false;
            alert('Client logged in');
            localStorage.setItem('isLoggedIn', 'client');
        }
        updateUI();
    });

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const photoInput = document.getElementById('photo').files[0];
        const reviewText = document.getElementById('review').value;

        const reader = new FileReader();
        reader.onload = function () {
            const photoURL = reader.result;

            const review = {
                name: name,
                email: email,
                photoURL: photoURL,
                reviewText: reviewText
            };

            let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews.push(review);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            displayReviews();

            // Show the reviews section after submitting a review
            addReviewSection.style.display = 'none';
            reviewsSection.style.display = 'block';
        };

        if (photoInput) {
            reader.readAsDataURL(photoInput);
        }

        reviewForm.reset();
    });

    addReviewLink.addEventListener('click', (e) => {
        e.preventDefault();
        addReviewSection.style.display = 'block';
        reviewsSection.style.display = 'none';
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'block';
        reviewsSection.style.display = 'none';
        adminPanel.style.display = 'none';
        addReviewSection.style.display = 'none';
    });

    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        isAdmin = false;
        localStorage.removeItem('isLoggedIn');
        updateUI();
    });

    reviewsLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        reviewsSection.style.display = 'block';
        adminPanel.style.display = 'none';
        addReviewSection.style.display = 'none';
    });

    function updateUI() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'admin') {
            isAdmin = true;
            adminPanel.style.display = 'block';
            addReviewLink.style.display = 'none';
            loginSection.style.display = 'none';
            reviewsSection.style.display = 'block';
            logoutLink.style.display = 'block';
            loginLink.style.display = 'none';
        } else if (isLoggedIn === 'client') {
            isAdmin = false;
            addReviewLink.style.display = 'block';
            loginSection.style.display = 'none';
            reviewsSection.style.display = 'block';
            logoutLink.style.display = 'block';
            loginLink.style.display = 'none';
        } else {
            loginSection.style.display = 'block';
            reviewsSection.style.display = 'none';
            adminPanel.style.display = 'none';
            addReviewSection.style.display = 'none';
            logoutLink.style.display = 'none';
            loginLink.style.display = 'block';
        }
        displayReviews();
    }

    function displayReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewsList.innerHTML = '';
        adminReviewsList.innerHTML = '';

        reviews.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <img src="${review.photoURL}" alt="Client Photo">
                <div class="content">
                    <div class="name">${review.name}</div>
                    <div class="email">${review.email}</div>
                    <div class="text">${review.reviewText}</div>
                </div>
            `;

            reviewsList.appendChild(reviewCard);

            if (isAdmin) {
                const adminReviewCard = reviewCard.cloneNode(true);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteReview(index));
                adminReviewCard.appendChild(deleteButton);
                adminReviewsList.appendChild(adminReviewCard);
            }
        });
    }

    function deleteReview(index) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.splice(index, 1);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        displayReviews();
    }

    updateUI();
});