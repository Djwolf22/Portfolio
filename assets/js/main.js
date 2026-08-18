document.documentElement.classList.add('js');

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 900px)').matches;

  /* ============ BOOT SEQUENCE ============ */
  function boot() {
    var el = document.getElementById('boot');
    if (!el) return;
    if (reduce) { el.classList.add('done'); return; }

    var lines = el.querySelectorAll('.boot-line');
    var bar = el.querySelector('.boot-bar i');
    var i = 0;

    lines.forEach(function (l) { l.style.visibility = 'hidden'; });

    var step = function () {
      if (i < lines.length) {
        lines[i].style.visibility = 'visible';
        i++;
        if (bar) bar.style.width = Math.round((i / lines.length) * 100) + '%';
        setTimeout(step, 170);
      } else {
        setTimeout(function () { el.classList.add('done'); }, 420);
      }
    };
    setTimeout(step, 220);
  }
  boot();

  document.addEventListener('DOMContentLoaded', function () {

    /* ============ PROJECT CARDS ============ */
    var list = document.getElementById('projectsList');
    if (list && typeof PROJECTS !== 'undefined') {
      var h = '';
      PROJECTS.forEach(function (p, n) {
        var has = p.link && p.link !== '#';
        var ext = has && /^https?:\/\//i.test(p.link);
        var tag = has ? 'a' : 'article';
        var attrs = has ? ' href="' + esc(p.link) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') : '';
        var idn = String(n + 1).padStart(3, '0');

        h += '<' + tag + ' class="proj rv"' + attrs + '>';
        if (p.image) {
          h += '<div class="proj-img"><img src="' + esc(p.image) + '" alt="" loading="lazy"></div>';
        }
        h += '<div class="proj-hd"><span>CASE-' + idn + '</span><span>' + (ext ? 'EXTERNAL' : 'INTERNAL') + '</span></div>';
        h += '<div class="proj-bd">';
        h += '<h3>' + esc(p.title) + '</h3>';
        h += '<p>' + esc(p.description) + '</p>';
        if (p.bullets && p.bullets.length) {
          h += '<ul>';
          p.bullets.forEach(function (b) { h += '<li>' + esc(b) + '</li>'; });
          h += '</ul>';
        }
        if (p.tech) h += '<span class="proj-tech">' + esc(p.tech) + '</span>';
        if (has) h += '<span class="arrow">' + esc(p.ctaLabel || 'Open file') + ' &rarr;</span>';
        h += '</div></' + tag + '>';
      });
      list.innerHTML = h;
    }

    function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    /* ============ NAV ============ */
    var nb = document.getElementById('navbtn'), nl = document.getElementById('navlinks');
    if (nb && nl) {
      nb.addEventListener('click', function () {
        var o = nl.classList.toggle('open');
        nb.textContent = o ? 'CLOSE' : 'MENU';
      });
    }

    /* ============ CURSOR RETICLE ============ */
    var ret = document.getElementById('reticle');
    if (ret && desktop && !reduce) {
      window.addEventListener('mousemove', function (e) {
        ret.style.transform = 'translate(' + (e.clientX - 230) + 'px,' + (e.clientY - 230) + 'px)';
      });
    }

    /* ============ LIVE CLOCKS ============ */
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    var clocks = document.querySelectorAll('[data-clock]');
    if (clocks.length) {
      var tickClock = function () {
        var t = new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Chicago', hour12: false,
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        clocks.forEach(function (c) { c.textContent = t; });
      };
      tickClock(); setInterval(tickClock, 1000);
    }

    /* Session uptime counter */
    var up = document.getElementById('uptime');
    if (up) {
      var t0 = Date.now();
      setInterval(function () {
        var s = Math.floor((Date.now() - t0) / 1000);
        up.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);
      }, 1000);
    }

    /* ============ ROTATING ROLE ============ */
    var rot = document.getElementById('rotator');
    if (rot && !reduce) {
      var words = (rot.getAttribute('data-words') || '').split('|').filter(Boolean);
      if (words.length) {
        var wi = 0, ci = 0, del = false;
        var run = function () {
          var w = words[wi];
          rot.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
          var wait = del ? 40 : 78;
          if (!del && ci > w.length) { del = true; wait = 1500; }
          else if (del && ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; wait = 260; }
          setTimeout(run, wait);
        };
        run();
      } else { rot.textContent = ''; }
    } else if (rot) {
      rot.textContent = (rot.getAttribute('data-words') || '').split('|')[0] || '';
    }

    /* ============ TYPED TERMINAL LINES ============ */
    document.querySelectorAll('[data-type]').forEach(function (el, idx) {
      var txt = el.getAttribute('data-type');
      if (reduce) { el.textContent = txt; return; }
      el.classList.add('typed');
      var i = 0;
      setTimeout(function () {
        var t = setInterval(function () {
          el.textContent = txt.slice(0, i + 1); i++;
          if (i >= txt.length) { clearInterval(t); el.classList.remove('typed'); }
        }, 34);
      }, 600 + idx * 900);
    });

    /* ============ COUNTERS ============ */
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var go = function () {
        var s = null, dur = 1100;
        var f = function (ts) {
          if (s === null) s = ts;
          var p = Math.min((ts - s) / dur, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(f); else el.textContent = target;
        };
        requestAnimationFrame(f);
      };
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en, o) {
          en.forEach(function (e) { if (e.isIntersecting) { go(); o.unobserve(e.target); } });
        }, { threshold: 0.4 }).observe(el);
      } else { el.textContent = target; }
    });

    /* ============ SCROLL REVEAL ============ */
    var rvs = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && rvs.length) {
      var ro = new IntersectionObserver(function (en, o) {
        en.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      rvs.forEach(function (el) { ro.observe(el); });
    } else { rvs.forEach(function (el) { el.classList.add('in'); }); }

    /* ============ 3D TILT ============ */
    if (desktop && !reduce) {
      document.querySelectorAll('.tile, .proj').forEach(function (c) {
        c.addEventListener('mousemove', function (e) {
          var r = c.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          c.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (y * -6) + 'deg) translateY(-4px)';
        });
        c.addEventListener('mouseleave', function () { c.style.transform = ''; });
      });
    }

    /* ============ LIVE EVENT TICKER ============ */
    var feed = document.getElementById('tickerFeed');
    if (feed) {
      var srcs = ['sentinel', 'defender', 'splunk', 'ndr', 'servicenow', 'carbonblack', 'extrahop'];
      var evts = [
        ['query executed', 'i'], ['detection tuned', 'u'], ['alert triaged', 'i'],
        ['rule updated', 'u'], ['anomaly reviewed', 'em'], ['intel enriched', 'i'],
        ['incident documented', 'u'], ['escalation cleared', 'i'], ['baseline verified', 'u'],
        ['false positive suppressed', 'em'], ['hunt query saved', 'i'], ['playbook referenced', 'u']
      ];
      var mk = function () {
        var s = srcs[Math.floor(Math.random() * srcs.length)];
        var e = evts[Math.floor(Math.random() * evts.length)];
        var id = Math.floor(Math.random() * 90000 + 10000);
        var tag = e[1];
        return '<span>[<' + tag + '>' + s + '</' + tag + '>] ' + e[0] +
               ' <i>#' + id + '</i></span>';
      };
      var build = function () {
        var out = '';
        for (var i = 0; i < 14; i++) out += mk();
        feed.innerHTML = out + out; // duplicate for seamless loop
      };
      build();
      setInterval(build, 46000);
    }

  });
})();
