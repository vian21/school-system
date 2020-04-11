$(document).ready(function () {
    fetchSchoolInfo().then(function () {
        //Fecth all teachers and add them to and array and make a table using the array
        fetchTeachers();

        //fetch all student and add them to an array and add them to select option list using the student's array
        fetchStudents().then(function () {
            dashboard()
        });

        fetchAcademicPeriods();

        fetchStreams();

        fetchSubjects();
    })

    $("#addTerm").click(function () {
        // located : ../create/period.js
        newPeriodForm();
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

    //misc tab
    $("#tab4").click(function () {
        misc('container');

        return false;
    })
})