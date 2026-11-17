# Excel Engineering Website

A responsive, static industrial equipment dealer website, built with HTML, CSS, and JavaScript. Works locally and on GitHub Pages. No framework or build step required.

## Getting started
1. Extract the ZIP.
2. Open the `excel-engineering-website` folder in VS Code.
3. Open `index.html` using the Live Server extension, or double-click `index.html` to view in your browser.
4. Edit `index.html` for text and contact details, `css/styles.css` for appearance, and `js/main.js` for behavior.

## Important changes before publishing
- Replace the demo location, phone, and email text in the Contact section of `index.html` with verified company details.
- Set `BUSINESS_EMAIL` near the top of `js/main.js` to the actual company email. The form then opens the visitor's email application with a prepared message. It does **not** send submissions to a server or store them. For automatic submissions, integrate a form service or backend.
- Replace the illustrative, cropped product and plant imagery in `assets/images` with real product photographs and your own company imagery. The current images are design mockup placeholders, not verified product photos.
- Review About Us, product descriptions, and industries served for accuracy. Avoid claiming authorizations, certifications, delivery commitments, or business locations that have not been confirmed.
- The logo is a sample graphic, not an official company trademark.

## Files
- `index.html` homepage and all sections
- `css/styles.css` responsive layout and visual theme
- `js/main.js` mobile navigation, product inquiry selection, email handoff
- `assets/images/` sample imagery and SVG logo

## Publish to GitHub Pages
Upload the contents of this folder to the root of your repository. In repository Settings → Pages, select **Deploy from a branch**, `main`, and `/(root)` if available. The site uses relative asset paths, so it also works in a project repository such as `username.github.io/excelengineering/`.

No paid fonts, third-party libraries, or external image URLs are required.


## New: Single-page Careers form
The Careers link in `index.html` scrolls to `#careers` next to Product Inquiry. No second page is needed.

The job application has a resume upload (PDF/DOCX, maximum 5 MB). **It will NOT send applications until configured.** Static GitHub Pages does not process form submissions or attachments.

To activate job applications:
1. Create an account and form with a form service that supports **file uploads** and check its pricing, size limits, and privacy handling.
2. Copy your form's submission URL into `CAREERS_FORM_ENDPOINT` at the bottom of `js/main.js`.
3. Run a real test application and confirm the attached resume arrives. Do not use a personal email endpoint in source code unless intended as public information.
4. Add an accurate privacy notice and retention process for applicant resumes.

The Product Inquiry form remains separate and uses `BUSINESS_EMAIL` in `js/main.js` to prepare an email in the visitor's mail app. It does NOT send automatically.
