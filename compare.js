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
  // Tuition (in/out)
  document.getElementById('in-a').textContent = a.in || '-';
  document.getElementById('in-b').textContent = b.in || '-';
  document.getElementById('out-a').textContent = a.out || '-';
  document.getElementById('out-b').textContent = b.out || '-';

  // Acceptance
  document.getElementById('acc-a').textContent = (a.acceptanceRate !== undefined && a.acceptanceRate !== null) ? (typeof a.acceptanceRate === 'number' ? (Math.round(a.acceptanceRate * 100) + '%') : a.acceptance) : a.acceptance || '-';
  document.getElementById('acc-b').textContent = (b.acceptanceRate !== undefined && b.acceptanceRate !== null) ? (typeof b.acceptanceRate === 'number' ? (Math.round(b.acceptanceRate * 100) + '%') : b.acceptance) : b.acceptance || '-';

  // Avg starting salary
  document.getElementById('sal-a').textContent = a.avgSalary || '-';
  document.getElementById('sal-b').textContent = b.avgSalary || '-';

  // Cost of living index
  document.getElementById('col-a-val').textContent = (a.costOfLivingIndex !== undefined && a.costOfLivingIndex !== null) ? a.costOfLivingIndex : '-';
  document.getElementById('col-b-val').textContent = (b.costOfLivingIndex !== undefined && b.costOfLivingIndex !== null) ? b.costOfLivingIndex : '-';

  // Notable programs (array -> comma list)
  document.getElementById('prog-a').textContent = Array.isArray(a.notablePrograms) ? a.notablePrograms.join(', ') : (a.notablePrograms || '-');
  document.getElementById('prog-b').textContent = Array.isArray(b.notablePrograms) ? b.notablePrograms.join(', ') : (b.notablePrograms || '-');

  // Strengths
  document.getElementById('str-a').textContent = a.strengths || '-';
  document.getElementById('str-b').textContent = b.strengths || '-';

  // Pros (legacy short blurb)
  document.getElementById('pros-a').textContent = a.pros || '-';
  document.getElementById('pros-b').textContent = b.pros || '-';
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
