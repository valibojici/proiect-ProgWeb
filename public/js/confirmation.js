let id = window.document.getElementsByTagName('span')[0];
let urlparams = new URLSearchParams(window.location.search);
id.textContent = urlparams.get('id');