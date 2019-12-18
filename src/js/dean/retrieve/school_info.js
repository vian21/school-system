async function fetchSchoolInfo() {
    var url = "modules/dean/fetch/info.php";

    await $.ajax({
        url: url,
        method: 'post',
        data: {
            user: userId
        },
        success: function (response) {
            if (isJSON(response)) {
                var info = JSON.parse(response);
                schoolId = info['id'];
                schoolName = info['name'];
                schoolType = info['type'];
                schoolEmail = info['email'];
                schoolWebsite = info['website'];
            }

            return true;
        }
    })
}