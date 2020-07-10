<link rel="stylesheet" href="<?php echo $app_url; ?>src/css/bootstrap.css">
<script src="<?php echo $app_url; ?>src/js/jquery.js"></script>
<script src="<?php echo $app_url; ?>src/js/pace.js"></script>

<link rel="stylesheet" href="<?php echo $app_url; ?>src/css/select2.css">
<script src="<?php echo $app_url; ?>src/js/select2.js"></script>

<!-- service worker -->
<script>
    var app_url = "<?php echo $app_url; ?>";

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('<?php echo $app_url; ?>src/js/sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration
                    .scope);
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    $(document).ajaxStart(function() { Pace.restart(); });

    window.paceOptions = {
      // Only show the progress on regular and ajax-y page navigation,
      // not every request
      restartOnRequestAfter: 5,

      ajax: {
        trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'REMOVE'],
        trackWebSockets: true,
        ignoreURLs: []
      }
    };
</script>

<style>
    .pace {
        -webkit-pointer-events: none;
        pointer-events: none;

        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .pace-inactive {
        display: none;
    }

    .pace .pace-progress {
        background: #29d;
        position: fixed;
        z-index: 2000;
        top: 0;
        right: 100%;
        width: 100%;
        height: 2px;
    }
</style>