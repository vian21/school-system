
function studentsTab() {
    $("#container").html("<button id='addStudentButton'>Add</button>\
    <select name='student' id='searchStudent'>\
      <option></option>\
    </select>\
 <div id='info'>\
     <center><img src='src/img/user.png' alt='' id='schoolImage'><br><br></center>\
    <span>Name: "+ schoolName + "</span><br>\
    <span>Number of students :"+ numberOfStudents + "</span><br>\
    <span>Number of male students :"+ numberOfMaleStudents + "</span><br>\
    <span>Number of female students :"+ numberOfFemaleStudents + "</span><br>\
    <span>Country :Burundi</span><br>\
    <span>Nationalities :5</span><br>\
    <span>Number of teachers :"+ numberOfTeachers + "</span><br>\
</div>\
")
    addToForm();

    $("#searchStudent").on("change", function () {
        //console.log($(this)/*.find("selected:option").attr("value")*/)
        var position = $("#searchStudent").select2('val');
        console.log(position)
        var studentSelected = studentsArray[position];
        var studentInfoTemplate = "";
        var studentSelectedImage = studentSelected['image'];
        if (studentSelectedImage == "") {
            studentSelectedImage = "src/img/user.png";
        }
        var studentSelectedName = studentSelected['name'];
        var studentSelectedDOB = studentSelected['DOB'];
        var studentSelectedEmail = studentSelected['email'];
        var studentSelectedGrade = studentSelected['stream']['grade'] + ' ' + studentSelected['stream']['stream'];
        studentInfoTemplate += "<center><img id='studentImage' src='" + studentSelectedImage + "'></center>";
        studentInfoTemplate += "Name : <input type='text' id='studentInfoName'  value='" + studentSelectedName + "'></br>";

        studentInfoTemplate += "Gender: <select id='studentInfoGender'>";
        studentInfoTemplate += "<option value='0'>Male</option>";
        studentInfoTemplate += "<option value='1'>Female</option>";
        studentInfoTemplate += "</select><br>";

        studentInfoTemplate += "DOB : <input type='date' id='studentInfoDOB'  value='" + studentSelectedDOB + "'></br>";
        studentInfoTemplate += "Grade : ";
        studentInfoTemplate += "<select id='studentInfoGrade'>";
        studentInfoTemplate += "<option value='" + studentSelected['id'] + "'>" + studentSelectedGrade + "</option>"
        studentInfoTemplate += "<option></option>"
        studentInfoTemplate += streamsOptions();
        studentInfoTemplate += "</select>";
        studentInfoTemplate += "<button onclick='deleteStudent(" + studentSelected['id'] + ")'>Delete</button>";
        studentInfoTemplate += "<div id='msgBoard'></div>"
        $("#info").html(studentInfoTemplate);

        //Make the gender selected
        $("#studentInfoGender").val(studentSelected['gender']).trigger('change');

        //Add listeners for change in student info
        $("#studentInfoName").change(function () {
            // console.log(1)
            //$("document").click(function(){
            save(2, studentSelected['id'], 'name', $("#studentInfoName").val());
            //console.log(1)
            //})
        })

        //change gender
        $("#studentInfoGender").change(function () {
            //$("body").click(function(){
            console.log(1)
            save(2, studentSelected['id'], 'gender', $("#studentInfoGender").val());
            //})
        })

        $("#studentInfoGrade").change(function () {
            //$("body").click(function(){
            console.log(1)
            save(2, studentSelected['id'], 'grade', $("#studentInfoGrade").val());
            //})
        })

        $("#studentInfoDOB").change(function () {
            //$("document").click(function(){
            console.log(1)
            save(2, studentSelected['id'], 'dob', $("#studentInfoDOB").val());
            //})
        })
    })

    $("#addStudentButton").click(function () { showStudentForm() });
}