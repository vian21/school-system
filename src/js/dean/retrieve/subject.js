function fetchSubjects() {
    var url = "modules/fetch.php?subjects=";
    $.ajax({
        url: url,
        success: function (response) {
            subjects = JSON.parse(response);
            return false;
        }
    })
}