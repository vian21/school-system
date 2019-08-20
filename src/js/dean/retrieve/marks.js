function appendMarks(json, testID) {
    if (isJSON(json) && json !== "") {
        var jsonArray = JSON.parse(json);
        var tabletemplate = "<table id='marksTable'><tr><th>#</th><th>Name</th><th>Marks</th></tr>";
        var i = 0;
        var number = 0;
        for (i; i < jsonArray.length; i++) {
            number++;

            tabletemplate += "<tr>";
            tabletemplate += "<td>" + number + "</td>";
            tabletemplate += "<td>" + jsonArray[i]['name'] + "</td>";
            tabletemplate += "<td><input class='mark' id='" + jsonArray[i]['id'] + "' value=" + jsonArray[i]['marks'] + "></td>";
            tabletemplate += "</tr>";
            //console.log(jsonArray[i]);
        }
        tabletemplate += "</table>";
        tabletemplate += "<button onclick='deleteAssessment(" + testID + ")'>Delete</button>"
        tabletemplate += "<div id='msgBoard'></div>"
        $("#results").html("");
        $("#results").append(tabletemplate);

        //Function 

        $('.mark').on('change', function () {
            var studentId = $(this).attr('id');
            console.log(studentId)
            var newMark = $(this).val();

            var newMarkInfo = {
                student_id: studentId,
                mark: newMark,
                test: testID
            }

            //Location : ../update/marks.js
            updateMark(newMarkInfo)

            return false;
        })
    }
    else {
        return false;
    }
    return false;
}