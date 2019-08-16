$(document).ready(function () {
    fetchSchoolInfo()
    //fetcth periods;
    fetchAcademicYears();
    //Fetch all streams id
    fetchStreams();
    //Fetch all subjects
    fetchSubjects();

    dashboard()
    $("#tab1").click(function () {
        studentsTab();
    })

    $("#tab2").click(function () {

        makeTeachersTable(teachersArray, 'container')
    })

    $("#tab3").click(function () {
        $("#three").css('display', 'block');
        //Append the grades in the select grade input when user clicks on the marks tab
        marks();
        //$(this).off('click')
        return false;
    })

    $("#tab4").click(function () {
        misc('container');

        return false;
    })
})