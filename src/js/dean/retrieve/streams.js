async function fetchStreams() {
    var url = "modules/dean/fetch/streams.php";

    await $.ajax({
        url: url,
        success: function (response) {
            if (isJSON(response)) {
                streams = JSON.parse(response);
                return true;
            }
            else {
                streams = '';
            }
        }
    })
}