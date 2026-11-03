window.CERTS = window.CERTS || {};
(window.CERT_FOLDERS || []).forEach(id => {
  document.write(`<script src="certs/${id}/bank.js"><\/script>`);
});
