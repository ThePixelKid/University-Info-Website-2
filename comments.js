// comments.js — client-side personal notes widget saved to localStorage
document.addEventListener('DOMContentLoaded', function () {
  try {
    // Only run on university detail pages which include a section.university-detail
    const detail = document.querySelector('.university-detail');
    if (!detail) return;

    // derive a stable key for this page (use pathname or filename)
    const pageKey = (window.location.pathname || window.location.href).split('/').pop() || 'page';
    const storageKey = 'uni-notes::' + pageKey;

    // build widget
    const widget = document.createElement('aside');
    widget.className = 'comments-widget glass';
    widget.style.marginTop = '1.5rem';
    widget.style.padding = '1rem';
    widget.style.borderRadius = '12px';
    widget.innerHTML = `
      <h3 style="margin:0 0 .5rem 0;">Your Notes</h3>
      <textarea aria-label="Personal notes" placeholder="Write personal notes about this university..." style="width:100%;min-height:110px;padding:.5rem;border-radius:8px;resize:vertical;"></textarea>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;">
        <button class="btn save">Save</button>
        <button class="btn clear">Clear</button>
        <button class="btn delete" style="background:#b22222;">Delete</button>
      </div>
      <p class="muted" style="margin-top:.5rem;font-size:.9rem;color:#bdbdbd;">Notes saved locally in your browser. They are not shared or uploaded.</p>
    `;

    // insert widget at end of detail section
    detail.appendChild(widget);

    const textarea = widget.querySelector('textarea');
    const btnSave = widget.querySelector('button.save');
    const btnClear = widget.querySelector('button.clear');
    const btnDelete = widget.querySelector('button.delete');

    // load existing
    try {
      const existing = localStorage.getItem(storageKey);
      if (existing) textarea.value = existing;
    } catch (e) {
      // localStorage may be blocked; show hint
      textarea.placeholder = 'Notes unavailable (storage blocked)';
    }

    btnSave.addEventListener('click', function () {
      try {
        localStorage.setItem(storageKey, textarea.value);
        btnSave.textContent = 'Saved';
        setTimeout(() => btnSave.textContent = 'Save', 1000);
      } catch (e) {
        alert('Unable to save notes. Your browser may block localStorage.');
      }
    });

    btnClear.addEventListener('click', function () {
      textarea.value = '';
      textarea.focus();
    });

    btnDelete.addEventListener('click', function () {
      if (!confirm('Delete all notes for this page?')) return;
      try {
        localStorage.removeItem(storageKey);
        textarea.value = '';
        btnDelete.textContent = 'Deleted';
        setTimeout(() => btnDelete.textContent = 'Delete', 1000);
      } catch (e) {
        alert('Unable to delete notes.');
      }
    });

    // small accessibility: keyboard shortcut Ctrl+S to save when typing
    textarea.addEventListener('keydown', function (ev) {
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 's') {
        ev.preventDefault();
        btnSave.click();
      }
    });

  } catch (err) {
    // don't break pages if something goes wrong
    console.error('comments.js error', err);
  }
});

/* Minimal styles injected to keep changes local and avoid editing CSS file */
(function injectStyles(){
  const css = `
    .comments-widget textarea{background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.06);color:#fff}
    .comments-widget .btn{background:#6a00ff;color:#fff;border-radius:8px;padding:.45rem .6rem;border:none;cursor:pointer}
    .comments-widget .btn:hover{opacity:0.95}
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();
