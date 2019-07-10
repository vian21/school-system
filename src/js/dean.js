//Variable to contain all students
var studentsArray = [];
//Variable to conatiner all teachers
var teachersArray = [];
$("document").ready(function () {
    fetchStudents();
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
    $("#searchStudent").on("change", function () {
        //console.log($(this)/*.find("selected:option").attr("value")*/)
        var position=$(this).children('option:selected').attr('value');
        var studentSelected=studentsArray[position];
        var studentInfoTemplate="";
        var studentSelectedImage=studentSelected['image'];
        if(studentSelectedImage==""){
            studentSelectedImage="src/img/user.png";
        }
        var studentSelectedName=studentSelected['name'];
        var studentSelectedDOB=studentSelected['DOB'];
        var studentSelectedEmail=studentSelected['email'];
        var studentSelectedGrade=studentSelected['stream']['grade']+' '+studentSelected['stream']['stream'];
        studentInfoTemplate+="<center><img id='studentImage' src='"+studentSelectedImage+"'></center>";
        studentInfoTemplate+="<span>Name : "+studentSelectedName+"</span></br>";
        studentInfoTemplate+="<span>DOB : "+studentSelectedDOB+"</span></br>";
        studentInfoTemplate+="<span>Grade : "+studentSelectedGrade+"</span></br>";
        $("#info").html(studentInfoTemplate);
    })
})
//Fetch all students and palce them in array
function fetchStudents() {
    $.ajax({
        url: "modules/fetch.php?allStudents=",
        method: "get",
        success: function (data) {
            if (data != "") {
                fetchedStudents(data);
            }

        }
    });
}



//add students to search form
function addToForm() {
    var options = "";
    for (var i = 0; i < studentsArray.length; i++) {
        options += "<option value='" + i+ "'>" + studentsArray[i]['name'] + "</option>";

    }
    $("#searchStudent").append(options);
    /*/Integrating select2 in options
    $("#searchStudent").select2({
        placeholder: "Search student"
    });*/
}
//Function to fire when students have been fetched
function fetchedStudents(data) {
    studentsArray = JSON.parse(data);
    addToForm();
}

