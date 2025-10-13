// generate-cards.js — build university cards from shared data
document.addEventListener('DOMContentLoaded', function () {
  const data = window.universities || {};
  const grid = document.querySelector('.card-grid');
  if (!grid) return;

  // clear existing static cards placeholder if any
  grid.innerHTML = '';

  Object.keys(data).forEach(function (key) {
    const u = data[key];
    const card = document.createElement('article');
    card.className = 'card glass';
    card.innerHTML = `
      <h3>${u.name}</h3>
      <p class="muted">${(u.location||'').split(',')[0] || ''}</p>
      <p class="meta">Acceptance: <strong>${u.acceptance || 'N/A'}</strong></p>
      <p class="highlight">${(u.pros||'').slice(0,90)}${(u.pros && u.pros.length>90? '…':'')}</p>
      <a class="btn" href="${u.page || '#'}">View Details</a>
    `;
    grid.appendChild(card);
  });
});
