async function fetchSchoolInfo() {
    var url = "modules/dean/fetch/info.php";

    await $.ajax({
        url: url,
        method: 'post',
        data: {
            user: userId,
            school:schoolId
        },
        success: function (response) {
            if (isJSON(response)) {
                var info = JSON.parse(response);
                schoolId = info['id'];
                schoolName = info['name'];
                schoolMotto = info['motto'];
                schoolType = info['type'];
                schoolEmail = info['email'];
                schoolImage = info['image'];
                paid = info['paid'];

                schoolWebsite = info['website'];
            }

            return true;
        }
    })
}