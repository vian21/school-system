$(document).ready(function () {
    $('input').attr("autocomplete", 'off');
    fetchSchoolInfo().then(function () {

        checkPay();
        //Fecth all teachers and add them to and array and make a table using the array

        //fetch all student and add them to an array and add them to select option list using the student's array
        fetchAcademicPeriods().then(function () {

            fetchTeachers();

            fetchStreams();

            fetchSubjects();

            fetchGrading();

            fetchStudents().then(function () {
                dashboard()
            })
        });


    })

    $("#addTerm").click(function () {
        // located : ../create/period.js
        newPeriodForm();
    })


    $("#editTerm").click(function () {
        // located : ../create/period.js
        editPeriodForm();
    })
    //students tab
    $("#tab1").click(function () {
        studentsTab();
    })

    //teachers tab
    $("#tab2").click(function () {

        makeTeachersTable()
    })

    //marks tab
    $("#tab3").click(function () {
        marks();
        return false;
    })

    //accounting tab
    $("#tab4").click(function () {
        accounting();

        return false;
    })


    //misc tab
    $("#tab5").click(function () {
        misc('container');

        return false;
    })
})