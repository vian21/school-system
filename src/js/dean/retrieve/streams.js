async function fetchStreams() {
    var url = app_url+"modules/dean/fetch/streams.php";

    await $.ajax({
        url: url,
        method: "post",
        data: {
            school: schoolId
        },
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