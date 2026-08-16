document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Project card rendering (projects page) ---------- */
  var projectsList = document.getElementById('projectsList');
  if (projectsList && typeof PROJECTS !== 'undefined') {
    var html = '';
    PROJECTS.forEach(function (project) {
      var hasLink = project.link && project.link !== '#';
      var isExternal = hasLink && /^https?:\/\//i.test(project.link);
      var tag = hasLink ? 'a' : 'article';
      var linkAttrs = hasLink
        ? ' href="' + esc(project.link) + '"' + (isExternal ? ' target="_blank" rel="noopener"' : '')
        : '';

      html += '<' + tag + ' class="project-card reveal"' + linkAttrs + '>';
      if (project.image) {
        html += '<div class="project-thumb"><img src="' + esc(project.image) + '" alt="' + esc(project.title) + ' preview" loading="lazy"></div>';
      }
      html += '<div class="project-body">';
      html += '<h2>' + esc(project.title) + '</h2>';
      html += '<p>' + esc(project.description) + '</p>';
      if (project.bullets && project.bullets.length) {
        html += '<ul>';
        project.bullets.forEach(function (b) { html += '<li>' + esc(b) + '</li>'; });
        html += '</ul>';
      }
      if (project.tech) html += '<p class="tech">' + esc(project.tech) + '</p>';
      if (hasLink) {
        var cta = project.ctaLabel ? project.ctaLabel : 'View project';
        html += '<span class="cta-link">' + esc(cta) + ' &rarr;</span>';
      }
      html += '</div></' + tag + '>';
    });
    projectsList.innerHTML = html;
  }

  function esc(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  /* ---------- Mobile menu ---------- */
  var menuButton = document.getElementById('menuButton');
  var mainMenu = document.getElementById('mainMenu');
  if (menuButton && mainMenu) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', function () {
      var open = mainMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuButton.textContent = open ? 'Close' : 'Menu';
    });
  }

  /* ---------- Cursor spotlight ---------- */
  var spotlight = document.getElementById('spotlight');
  if (spotlight && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('mousemove', function (e) {
      spotlight.style.transform = 'translate(' + (e.clientX - 250) + 'px,' + (e.clientY - 250) + 'px)';
    });
  }

  /* ---------- 3D tilt on cards ---------- */
  if (window.matchMedia('(min-width: 900px)').matches) {
    document.querySelectorAll('.stagger-item, .project-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () { card.classList.add('tilting'); });
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (x * 7) + 'deg) rotateX(' + (y * -7) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('tilting');
        card.style.transform = '';
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Console typing ---------- */
  function typeText(el, text, speed, done) {
    if (!el) { if (done) done(); return; }
    el.classList.add('typing');
    var i = 0;
    var t = setInterval(function () {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(t);
        el.classList.remove('typing');
        if (done) done();
      }
    }, speed);
  }

  var line1 = document.getElementById('typeLine1');
  var line2 = document.getElementById('typeLine2');
  var consoleList = document.getElementById('consoleList');
  if (line1) {
    typeText(line1, line1.getAttribute('data-text') || '', 38, function () {
      if (consoleList) {
        setTimeout(function () {
          consoleList.style.opacity = '1';
          setTimeout(function () {
            if (line2) typeText(line2, line2.getAttribute('data-text') || '', 34);
          }, 300);
        }, 180);
      } else if (line2) {
        typeText(line2, line2.getAttribute('data-text') || '', 34);
      }
    });
  }

  /* ---------- Live clock ---------- */
  var clockEl = document.getElementById('liveClock');
  if (clockEl) {
    var tick = function () {
      clockEl.textContent = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Animated counters ---------- */
  document.querySelectorAll('[data-count-to]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var run = function () {
      var start = null, dur = 900;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step); else el.textContent = target;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var co = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) { if (e.isIntersecting) { run(); o.unobserve(e.target); } });
      }, { threshold: 0.4 });
      co.observe(el);
    } else { el.textContent = target; }
  });

  /* ---------- Connector lines between staggered cards ---------- */
  var svg = document.getElementById('connectorSvg');
  if (svg) {
    var draw = function () {
      var grid = document.querySelector('.stagger-grid');
      var c1 = document.getElementById('card1'), c2 = document.getElementById('card2'), c3 = document.getElementById('card3');
      if (!grid || !c1 || !c2 || !c3) return;
      var g = grid.getBoundingClientRect();
      var f = function (el, side) {
        var r = el.getBoundingClientRect();
        return {
          x: (side === 'right' ? r.right : r.left) - g.left,
          y: r.top - g.top + r.height / 2
        };
      };
      var p1 = f(c1, 'right'), p2 = f(c2, 'left'), p3 = f(c3, 'left');
      var d1 = document.getElementById('path12'), d2 = document.getElementById('path23');
      if (d1) d1.setAttribute('d', 'M' + p1.x + ',' + p1.y + ' C' + (p1.x + 60) + ',' + p1.y + ' ' + (p2.x - 60) + ',' + p2.y + ' ' + p2.x + ',' + p2.y);
      if (d2) d2.setAttribute('d', 'M' + p2.x + ',' + p2.y + ' C' + (p2.x - 40) + ',' + (p2.y + 50) + ' ' + (p3.x + 40) + ',' + (p3.y - 50) + ' ' + p3.x + ',' + p3.y);
    };
    window.addEventListener('load', draw);
    window.addEventListener('resize', draw);
    setInterval(draw, 400);
  }

});
