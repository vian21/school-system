$(document).ready(function () {
    fetchSchoolInfo()
    //fetcth periods;
    fetchAcademicYears();
    //Fetch all streams id
    fetchStreams();
    //Fetch all subjects
    fetchSubjects();

    dashboard()

    //students tab
    $("#tab1").click(function () {
        studentsTab();
    })

    //teachers tab
    $("#tab2").click(function () {

        makeTeachersTable(teachersArray, 'container')
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