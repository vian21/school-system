$(document).ready(function () {
    $('input').attr("autocomplete", 'off');
    fetchSchoolInfo().then(function () {

        checkPay();
        //Fecth all teachers and add them to and array and make a table using the array

        //fetch all student and add them to an array and add them to select option list using the student's array
        fetchAcademicPeriods().then(function () {

            fetchTeachers();

            fetchStreams();

            fetchStudents().then(function(){
                accounting();
            })
        });


    })

})