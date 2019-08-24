async function fetchSubjects() {
    var url = "modules/fetch.php?subjects=";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            id: schoolId
        },
        success: function (response) {
            if (isJSON(response)) {
                subjects = JSON.parse(response);

                return true;
            }
            else {
                subjects = '';
            }
        }
    })
}