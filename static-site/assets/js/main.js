document.addEventListener('DOMContentLoaded', function () {
    var menuButton = document.getElementById('menuButton');
    var mainMenu = document.getElementById('mainMenu');
    var contactForm = document.getElementById('contactForm');
    var formFeedback = document.getElementById('formFeedback');
    var projectsList = document.getElementById('projectsList');

    // Render project cards from assets/js/projects-data.js (add new projects there, not here)
    if (projectsList && typeof PROJECTS !== 'undefined') {
        var html = '';
        PROJECTS.forEach(function (project) {
            var hasLink = project.link && project.link !== '#';
            var tag = hasLink ? 'a' : 'article';
            var linkAttrs = hasLink ? ' href="' + escapeHtml(project.link) + '" target="_blank" rel="noopener"' : '';

            html += '<' + tag + ' class="project-card"' + linkAttrs + '>';
            html += '<h2>' + escapeHtml(project.title) + '</h2>';
            html += '<p>' + escapeHtml(project.description) + '</p>';
            if (project.bullets && project.bullets.length) {
                html += '<ul>';
                project.bullets.forEach(function (bullet) {
                    html += '<li>' + escapeHtml(bullet) + '</li>';
                });
                html += '</ul>';
            }
            if (project.tech) {
                html += '<p class="tech">' + escapeHtml(project.tech) + '</p>';
            }
            if (hasLink) {
                html += '<span class="project-cta">View project &rarr;</span>';
            }
            html += '</' + tag + '>';
        });
        projectsList.innerHTML = html;
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Mobile menu toggle, with label + aria state so it's clear the menu is open
    if (menuButton && mainMenu) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.addEventListener('click', function () {
            var isOpen = mainMenu.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuButton.textContent = isOpen ? 'Close' : 'Menu';
        }, false);

        mainMenu.addEventListener('click', function (event) {
            if (event.target.tagName === 'A' && mainMenu.classList.contains('open')) {
                mainMenu.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.textContent = 'Menu';
            }
        }, false);
    }

    // Contact form: live character count + inline validation feedback
    if (contactForm && formFeedback) {
        var nameField = document.getElementById('name');
        var emailField = document.getElementById('email');
        var messageField = document.getElementById('message');
        var charCount = document.getElementById('charCount');
        var minMessageLength = 10;

        if (messageField && charCount) {
            var updateCharCount = function () {
                var remaining = minMessageLength - messageField.value.trim().length;
                charCount.textContent = remaining > 0
                    ? remaining + ' more character' + (remaining === 1 ? '' : 's') + ' needed'
                    : messageField.value.trim().length + ' characters';
            };
            messageField.addEventListener('input', updateCharCount, false);
            updateCharCount();
        }

        var clearFieldError = function (field) {
            field.classList.remove('input-error');
        };

        [nameField, emailField, messageField].forEach(function (field) {
            if (field) {
                field.addEventListener('input', function () {
                    clearFieldError(field);
                    formFeedback.textContent = '';
                }, false);
            }
        });

        contactForm.addEventListener('submit', function (event) {
            var valid = true;
            formFeedback.textContent = '';

            if (nameField && nameField.value.trim().length < 2) {
                valid = false;
                nameField.classList.add('input-error');
            }

            if (emailField && emailField.value.trim().indexOf('@') === -1) {
                valid = false;
                emailField.classList.add('input-error');
            }

            if (messageField && messageField.value.trim().length < minMessageLength) {
                valid = false;
                messageField.classList.add('input-error');
            }

            if (!valid) {
                event.preventDefault();
                formFeedback.textContent = 'Please complete the highlighted fields before submitting.';
            }
        }, false);
    }
}, false);