const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

function handleCredentialResponse(response) {
  // The response object contains the JWT ID token.
  const id_token = response.credential;
  console.log("ID Token: " + id_token);

  // For demonstration, we can decode the JWT to see the user's info.
  const payload = JSON.parse(atob(id_token.split('.')[1]));
  console.log("User Info:", payload);

  // Check if the logged-in user is the designated admin
  if (payload.email === 'mrakaazwar@gmail.com') {
    alert('Welcome, Admin! Redirecting to dashboard.');
    window.location.href = 'admin.html';
  } else {
    // --- Start of localStorage logic for regular users ---
    const newUser = {
      username: payload.name || 'Google User', 
      email: payload.email
    };

    let users = JSON.parse(localStorage.getItem('userManagement.users')) || [];
    const userExists = users.some(user => user.email === newUser.email);

    if (!userExists) {
      users.push(newUser);
      localStorage.setItem('userManagement.users', JSON.stringify(users));
      console.log('New user added to localStorage:', newUser);
    } else {
      console.log('User already exists:', newUser.email);
    }
    // --- End of localStorage logic ---

    alert('Successfully signed in with Google as ' + payload.name);
    window.location.href = 'home.html';
  }
}

showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

loginForm.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (email === 'admin@admin.com' && password === 'admin') {
        window.location.href = 'admin.html';
    } else if (email === 'user@user.com' && password === 'user') {
        window.location.href = 'home.html';
    } else {
        alert('Invalid credentials');
    }
});