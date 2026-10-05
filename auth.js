(function () {
  var PASSWORD = 'Tuqtheseal123';
  var STORAGE_KEY = 'wedding-auth';

  // Runs immediately (this script is a normal, render-blocking <script> placed
  // right after <body> opens, before the gated markup), so if this session
  // already unlocked the site, we flip to "unlocked" before the gate/content
  // below ever paints — no flash of either state.
  if (sessionStorage.getItem(STORAGE_KEY) === 'yes') {
    document.body.classList.add('unlocked');
  }

  // Delegated on `document` so this works even though #gate-form doesn't
  // exist in the DOM yet at the moment this script runs.
  document.addEventListener('submit', function (e) {
    if (!e.target || e.target.id !== 'gate-form') return;
    e.preventDefault();

    var input = document.getElementById('gate-password');
    var error = document.getElementById('gate-error');

    if (input.value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'yes');
      document.body.classList.add('unlocked');
    } else {
      error.classList.add('visible');
      input.value = '';
      input.focus();
    }
  });
})();
