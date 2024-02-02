// Écouter les événements de changement de tab
opera.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        // Récupérer l'URL de la page
        let url = tab.url;
        // Récupérer les scripts enregistrés dans le stockage local
        opera.storage.local.get({ scripts: [] }, function (result) {
            let scripts = result.scripts;
            // Parcourir les scripts enregistrés pour vérifier si l'URL correspond
            scripts.forEach(function (script) {
                if (url.includes(script.siteUrl)) {
                    // Injecter le script dans la page
                    opera.tabs.executeScript(tabId, { code: script.scriptCode });
                }
            });
        });
    }
});