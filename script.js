const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (statusEl) {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        if (statusEl) {
          statusEl.textContent = 'Thanks — your enquiry has been sent.';
          statusEl.classList.add('success');
        }
      } else {
        let message = 'Something went wrong. Please try again, or WhatsApp 07912 683377.';
        try {
          const data = await response.json();
          if (data && data.errors && data.errors.length) {
            message = data.errors.map(error => error.message).join(' ');
          }
        } catch (_) {}
        if (statusEl) {
          statusEl.textContent = message;
          statusEl.classList.add('error');
        }
      }
    } catch (_) {
      if (statusEl) {
        statusEl.textContent = 'Something went wrong. Please try again, or WhatsApp 07912 683377.';
        statusEl.classList.add('error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}
