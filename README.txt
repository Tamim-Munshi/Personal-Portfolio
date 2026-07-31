TAMIM MUNSHI — PORTFOLIO
=========================

This portfolio was built by adapting the structure, design and features of
another student's portfolio site, then replacing every piece of content
with Tamim's real information (resume, education, skills, projects,
certificates, achievements).

WHAT'S ALREADY DONE
--------------------
- All personal info (name, email, phone, LinkedIn, GitHub username,
  location) updated throughout every file.
- Old owner's Facebook/Instagram/Telegram links removed (not applicable).
- Profile photo and CV (assets/cv/Tamim_Munshi_CV.pdf) already in place.
- Projects, Skills, Experience, Education, Certificates, Achievements,
  News timeline, and the AI chat assistant's data all rewritten with
  Tamim's real information from his CV.
- The contact form's EmailJS keys were reset to placeholders (the old
  keys belonged to the previous owner's account — leaving them in would
  have sent every message from this site straight to someone else's inbox).

THINGS YOU (TAMIM) STILL NEED TO DO
-------------------------------------
1. GITHUB REPOS: The "Featured Projects" cards link to
   https://github.com/Tamim-Munshi and use placeholder repo names
   (AI-Marketplace-Platform, Student-Management-System, Portfolio-Website)
   for live GitHub stats. Once you push these projects to GitHub, open
   index.html, search for "data-gh-repo" and update the repo names (and
   the GitHub button hrefs) to match your actual repo names exactly.

2. CONTACT FORM EMAIL DELIVERY: The contact form currently just shows a
   success message locally — it does not send real emails yet. To make it
   actually deliver messages to your inbox, follow the steps in the
   comment block at the top of the contact-form section in script.js
   (search for "EmailJS") — takes about 2 minutes, free plan.

3. CASE STUDY IMAGE: The "Case Study" modal for AI Marketplace Platform
   currently uses a simple generated graphic (no real screenshot exists
   yet). Once you have a real screenshot, replace the <svg> block in the
   #caseStudyModal section of index.html with an <img> tag.

4. CERTIFICATE / PROJECT IMAGES: Since no certificate images or project
   screenshots were provided, certificates use icon placeholders and
   projects use colored icon thumbnails instead of real photos. If you'd
   like real images, drop them into assets/images/ and update the
   relevant <img>/<i> tags in index.html.

5. Update "Updated <Month Year>" in the footer whenever you make changes.

HOSTING
-------
This is a static site (HTML/CSS/JS) — you can host it for free on GitHub
Pages: push this folder to a repo named Tamim-Munshi.github.io, enable
Pages in repo settings, and it'll be live at
https://tamim-munshi.github.io/
