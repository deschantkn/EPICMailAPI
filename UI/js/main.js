/**
 * Handles toggling login and signup forms
 */
const toggleForms = ($formId) => {
  // Get sign and sign up forms
  const $signin = document.getElementById('signin');
  const $signup = document.getElementById('signup');

  switch ($formId) {
    case 'signin':
      // Toggle signup form
      $signin.style.display = 'none';
      $signup.style.display = 'flex';
      isSignupForm();
      break;

    case 'signup':
      // Toggle signin form
      $signup.style.display = 'none';
      $signin.style.display = 'flex';
      break;

    default:
      // Display sigin form by default
      $signup.style.display = 'none';
      $signin.style.display = 'flex';
  }
};

/**
 * Handles password and password confirmation checking
 */
const isSignupForm = () => {
  const $signupBtn = document.getElementById('signup-btn');
  const $password = document.getElementById('password');
  const $confirmPassword = document.getElementById('confirm-password');
  const $firstName = document.getElementById('fN');
  const $lastName = document.getElementById('lN');
  const $email = document.getElementById('email-input');

  const validatePassword = () => {
    if ($password.value !== $confirmPassword.value) {
      $confirmPassword.setCustomValidity('Passwords do not match');
    } else {
      $confirmPassword.setCustomValidity('');
    }
  };
  $signupBtn.onclick = validatePassword;

  // Autofill email field with concatenated firstName and lastName
  $email.onclick = () => {
    // @TODO check that this combination of firstName and lastName is unique in the backend before suggesting. if it is not then append random strings to make it so.
    $email.value = $firstName.value + $lastName.value;
  }
};

// Handle sidebar toggling
const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarBtn = document.getElementById('sidebar-toggle');

  if (sidebar.classList.contains('is-collapsed')) {
    sidebar.classList.replace('is-collapsed', 'is-full-width')
    sidebarBtn.innerHTML = '<i class="fas fa-angle-double-left"></i>';
  } else if (sidebar.classList.contains('is-full-width')) {
    sidebar.classList.replace('is-full-width', 'is-collapsed')
    sidebarBtn.innerHTML = '<i class="fas fa-angle-double-right"></i>';
  } else {
    sidebar.classList.add('is-collapsed');
    sidebarBtn.innerHTML = '<i class="fas fa-angle-double-right"></i>';
  }
};

// Closing modal
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const closeButton = document.querySelector("#close-button");
closeButton.addEventListener("click", () => {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

const showGroupMembersModal = (groupId) => {
  // Modal
  const modal = document.querySelector("#modal");
  const modalOverlay = document.querySelector("#modal-overlay");

  //@TODO Fecth group name, members from api

  // Insert content inside modal
  document.getElementById('gN').innerHTML = "Avengers";
  // For each group member:
  document.getElementById('gMbrs').innerHTML += "<li>Peter Parker</li>"
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
};