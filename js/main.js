/* Excel Engineering website interactions */
'use strict';
// IMPORTANT: Replace with the company's real email before publishing.
// Leave empty to keep the inquiry form in demonstration mode.
const BUSINESS_EMAIL = '';

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu(); menuButton.focus();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
const productSelect = document.querySelector('#product-interest');
document.querySelectorAll('[data-product]').forEach(link => {
  link.addEventListener('click', () => { productSelect.value = link.dataset.product; });
});

const form = document.querySelector('#inquiry-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!BUSINESS_EMAIL.trim()) {
    status.textContent = 'Demo mode: add the real company email to BUSINESS_EMAIL in js/main.js to enable email inquiries.';
    return;
  }
  const fields = new FormData(form);
  const subject = 'Excel Engineering Inquiry: ' + (fields.get('product') || 'General');
  const body = [
    'Name: ' + fields.get('name'),
    'Email: ' + fields.get('email'),
    'Phone: ' + (fields.get('phone') || 'Not provided'),
    'Product: ' + (fields.get('product') || 'General'),
    '', 'Requirement:', fields.get('message')
  ].join('\n');
  const href = 'mailto:' + encodeURIComponent(BUSINESS_EMAIL.trim()) + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  status.textContent = 'Your email app should open with the inquiry. Please send it from there.';
  window.location.href = href;
});


/* ===== CAREERS FORM =====
 * To receive resume uploads, create a form with a service that supports file
 * uploads and enter its endpoint below (for example, Formspree). The site is
 * static, so GitHub Pages alone cannot accept attachments.
 * Do not configure an endpoint you do not own or control.
 */
const CAREERS_FORM_ENDPOINT = ''; // Example: https://formspree.io/f/YOUR_FORM_ID
const careerForm = document.querySelector('#career-form');
const careerStatus = document.querySelector('#career-status');
const careerResume = document.querySelector('#career-resume');
const careerSubmit = document.querySelector('#career-submit');
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_EXTENSIONS = /\.(pdf|docx)$/i;

careerResume.addEventListener('change', () => {
  const file = careerResume.files[0];
  careerStatus.classList.remove('error', 'success');
  if (!file) { careerStatus.textContent = 'Select a PDF or DOCX resume, up to 5 MB.'; return; }
  if (!ALLOWED_RESUME_EXTENSIONS.test(file.name)) {
    careerStatus.textContent = 'Choose a PDF or DOCX document.';
    careerStatus.classList.add('error');
    careerResume.value = '';
  } else if (file.size > MAX_RESUME_BYTES) {
    careerStatus.textContent = 'Your resume must be 5 MB or smaller.';
    careerStatus.classList.add('error');
    careerResume.value = '';
  } else {
    careerStatus.textContent = 'Selected: ' + file.name;
  }
});

careerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  careerStatus.classList.remove('error', 'success');
  if (!careerForm.reportValidity()) return;
  const file = careerResume.files[0];
  if (!file || !ALLOWED_RESUME_EXTENSIONS.test(file.name) || file.size > MAX_RESUME_BYTES) {
    careerStatus.textContent = 'Attach a PDF or DOCX resume, up to 5 MB.';
    careerStatus.classList.add('error');
    return;
  }
  if (!CAREERS_FORM_ENDPOINT.trim()) {
    careerStatus.textContent = 'Application form not connected yet. The site owner must add a resume-upload form service endpoint in js/main.js.';
    careerStatus.classList.add('error');
    return;
  }
  careerSubmit.disabled = true;
  careerSubmit.textContent = 'Submitting…';
  careerStatus.textContent = 'Sending your application…';
  try {
    const response = await fetch(CAREERS_FORM_ENDPOINT, {
      method: 'POST',
      body: new FormData(careerForm),
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Submission service returned an error');
    careerStatus.textContent = 'Your application was submitted successfully.';
    careerStatus.classList.add('success');
    careerForm.reset();
  } catch (error) {
    careerStatus.textContent = 'Your application could not be sent. Please try again later or contact Excel Engineering.';
    careerStatus.classList.add('error');
  } finally {
    careerSubmit.disabled = false;
    careerSubmit.textContent = 'Submit Application →';
  }
});
