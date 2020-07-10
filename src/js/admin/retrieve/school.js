async function fetchSchoolInfo(id) {
    var url = app_url+"modules/admin/retrieve/school.php";

    await $.ajax({
        url: url,
        method: 'post',
        data: {
            id: id
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
                last_paid=info['last_paid'];
                end=info['end'];
                reportsFolder=info['reports'];



                numberOfStudents = info['students'];
                numberOfMaleStudents = info['male'];
                numberOfFemaleStudents = info['female'];
                numberOfTeachers = info['teachers'];

                schoolWebsite = info['website'];
            }

            return true;
        }
    })
}