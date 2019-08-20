async function fetchSchoolInfo() {
    var url = "modules/fetch.php?school_info";

    await $.ajax({
        url: url,
        method:'post',
        data: {
            user: userId
        },
        success: function (response) {
            var info = JSON.parse(response);
            schoolId = info['id'];
            schoolName = info['name'];
            schoolType = info['type'];
            schoolEmail = info['email'];
            schoolWebsite = info['website'];

            return true;
        }
    })
}