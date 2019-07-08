//Variable to contain all students
var studentsArray = [];
//Variable to conatiner all teachers
var teachersArray = [];
$("document").ready(function () {
    $("#tab1").click(function () {
        $("#two").hide();
        $("#three").hide();
        $("#one").css('display', 'block');
    })
    $("#tab2").click(function () {
        $("#one").hide();
        $("#three").hide();
        $("#two").css('display', 'block');
    })
    $("#tab3").click(function () {
        $("#one").hide();
        $("#two").hide();
        $("#three").css('display', 'block');
    })

    $("#searchStudent").on("keyup", function () {
        console.log(1)
    })
})
function fetchStudents() {
    $.ajax({
        url: "modules/fetch.php?allStudents=",
        method: "get",
        success: function (data) {
            if (data != "") {
                studentsArray = JSON.parse(data);
            }

        }
    });
}
fetchStudents();