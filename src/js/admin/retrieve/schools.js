async function fetchSchools() {
    var url = app_url + "modules/admin/retrieve/schools.php";

    await $.ajax({
        url: url,
        method: 'post',
        success: function (response) {
            if (isJSON(response) || response==null) {
                schools = JSON.parse(response);
            }
            return true;

        }
    })
}