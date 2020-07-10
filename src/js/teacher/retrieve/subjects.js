async function fetchSubjectsTaught() {
    var url = "modules/teacher/retrieve/subjects.php";

    await $.ajax({
        url: url,
        method: 'post',
        data: {
            user: userId,
            start: start,
            end: end

        },
        success: function (response) {
            if (isJSON(response) || response==null) {
                var info = JSON.parse(response);
                subjects = info;

            }
            else{
                subjects="";

            }

            return true;
        }
    })
}