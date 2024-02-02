document.addEventListener('DOMContentLoaded', function () {
    let button = document.getElementById('submitBtn');
    button.addEventListener('click', function () {
        let siteUrl = document.getElementById('siteUrl').value;
        let scriptCode = document.getElementById('script').value;

        // Vérifier si l'URL du site et le script sont fournis
        if (siteUrl.trim() === '' || scriptCode.trim() === '') {
            alert('Veuillez fournir l\'URL du site et le script à injecter.');
            return;
        }

        // Créer un objet pour stocker les détails du script
        let scriptDetails = {
            siteUrl: siteUrl,
            scriptCode: scriptCode
        };

        // Sauvegarder le script dans le stockage local
        sauvegarderScript(scriptDetails);
    });

    function sauvegarderScript(scriptDetails) {
        // Récupérer les scripts existants depuis le stockage local
        chrome.storage.local.get({ scripts: [] }, function (result) {
            var scripts = result.scripts;
            // Ajouter le nouveau script à la liste des scripts
            scripts.push(scriptDetails);
            // Sauvegarder les scripts mis à jour dans le stockage local
            chrome.storage.local.set({ scripts: scripts }, function () {
                alert('Script sauvegardé avec succès.');
            });
        });
    }
});
