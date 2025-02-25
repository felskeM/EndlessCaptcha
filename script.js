document.addEventListener('DOMContentLoaded', () => {
  const homeScreen = document.getElementById('home-screen');
  const captchaScreen = document.getElementById('captcha-screen');
  const transferButton = document.getElementById('transfer-button');
  const submitCaptcha = document.getElementById('submit-captcha');
  const captchaInput = document.getElementById('captcha-input');
  const captchaMessage = document.getElementById('captcha-message');
  const secretRoomButton = document.getElementById('secret-room-button');

  let currentCaptcha = '';

  // Generates a random 6-character captcha string
  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  // Updates the captcha image and resets input and message
  function updateCaptcha() {
    currentCaptcha = generateCaptcha();
    const captchaImg = document.querySelector('#captcha-container img');
    // Using a placeholder service to simulate a captcha image with text
    captchaImg.src = `https://via.placeholder.com/150x50?text=${currentCaptcha}`;
    captchaInput.value = '';
    captchaMessage.textContent = '';
  }

  // Show the captcha screen when transfer is initiated
  transferButton.addEventListener('click', () => {
    homeScreen.classList.remove('active');
    captchaScreen.classList.add('active');
    updateCaptcha();
  });

  // Handle captcha submission
  submitCaptcha.addEventListener('click', () => {
    const userInput = captchaInput.value.trim();
    // Easter egg: if user types "open sesame", unlock the secret room regardless of captcha
    if (userInput.toLowerCase() === 'open sesame') {
      captchaMessage.textContent = 'Secret code accepted! Enjoy your easter egg...';
      secretRoomButton.style.display = 'inline-block';
      // Still generate a new captcha challenge after a brief pause
      setTimeout(() => {
        updateCaptcha();
      }, 1500);
    }
    // Normal captcha check
    else if (userInput === currentCaptcha) {
      captchaMessage.textContent = 'Captcha solved! But wait... another challenge awaits!';
      // Simulate endless captcha by generating a new challenge after a short delay
      setTimeout(() => {
        updateCaptcha();
      }, 1500);
    } else {
      captchaMessage.textContent = 'Incorrect captcha. Try again!';
      setTimeout(() => {
        updateCaptcha();
      }, 1500);
    }
  });

  // Secret room easter egg action
  secretRoomButton.addEventListener('click', () => {
    alert("Welcome to the secret room! You've unlocked a hidden easter egg.");
  });
});
