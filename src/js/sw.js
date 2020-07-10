var app_url = "http://localhost/bridge/";

var CACHE_NAME = 'files';
var urlsToCache = [
    app_url + 'src/js/jquery.js',
    app_url + 'src/js/pace.js',
    app_url + 'src/js/variables.js',
    app_url + 'src/js/select2.js',
    app_url + 'src/js/functions.js',
    app_url + 'src/css/bootstrap.css',
    app_url + 'src/css/select2.css',
    app_url + 'src/css/dean.css',
    app_url + 'src/css/teacher.css'



];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.onfetch = function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (cachedFiles) {
                if (cachedFiles) {
                    return cachedFiles;
                } else {
                    return fetch(event.request);
                }
            })
    );
}