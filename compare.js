// Dynamic web effects for compare.html

document.addEventListener('DOMContentLoaded', function () {
  // Dark/Light Mode Toggle
  const modeToggle = document.getElementById('mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-mode');
      modeToggle.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
    });
  }

  // Animated Statistic Counters
  document.querySelectorAll('.animated-counter').forEach(function (el) {
    const target = +el.getAttribute('data-value');
    let current = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    function update() {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = current.toLocaleString();
        requestAnimationFrame(update);
      }
    }
    update();
  });

  // Use shared data loaded from universities-data.js (window.universities)
  const universities = window.universities || {};

  function populateCompareSelects() {
    const a = document.getElementById('compare-a');
    const b = document.getElementById('compare-b');
    if (!a || !b) return;
    // Clear existing
    a.innerHTML = '';
    b.innerHTML = '';
    // Build options from universities object (preserve insertion order)
    Object.keys(universities).forEach(function (key) {
      const optA = document.createElement('option');
      optA.value = key;
      optA.textContent = universities[key].name || key;
      a.appendChild(optA);

      const optB = document.createElement('option');
      optB.value = key;
      optB.textContent = universities[key].name || key;
      b.appendChild(optB);
    });
  }

  function updateCompare() {
    const aKey = (document.getElementById('compare-a') || {}).value;
    const bKey = (document.getElementById('compare-b') || {}).value;
    const a = universities[aKey] || { name: 'N/A', location: '-', enrollment: '-', in: '-', out: '-', acceptance: '-', pros: '-' };
    const b = universities[bKey] || { name: 'N/A', location: '-', enrollment: '-', in: '-', out: '-', acceptance: '-', pros: '-' };
    document.getElementById('col-a').textContent = a.name;
    document.getElementById('col-b').textContent = b.name;
    document.getElementById('loc-a').textContent = a.location;
    document.getElementById('loc-b').textContent = b.location;
    document.getElementById('enr-a').textContent = a.enrollment;
    document.getElementById('enr-b').textContent = b.enrollment;
    document.getElementById('in-a').textContent = a.in;
    document.getElementById('in-b').textContent = b.in;
    document.getElementById('out-a').textContent = a.out;
    document.getElementById('out-b').textContent = b.out;
    document.getElementById('acc-a').textContent = a.acceptance;
    document.getElementById('acc-b').textContent = b.acceptance;
    document.getElementById('pros-a').textContent = a.pros;
    document.getElementById('pros-b').textContent = b.pros;
  }

  // Populate selects then wire events
  populateCompareSelects();
  document.getElementById('compare-a').addEventListener('change', updateCompare);
  document.getElementById('compare-b').addEventListener('change', updateCompare);
  // initialize
  updateCompare();

  // Page Transitions
  document.querySelectorAll('a').forEach(function (a) {
    if (a.target !== '_blank') {
      a.addEventListener('click', function (e) {
        document.body.classList.add('fade-exit');
        setTimeout(function () {
          window.location = a.href;
        }, 400);
        e.preventDefault();
      });
    }
  });
});
