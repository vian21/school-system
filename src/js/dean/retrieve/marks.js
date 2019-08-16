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
        $("#results").html("");
        $("#results").append(tabletemplate);

        //Function 

        $('.mark').on('change', function () {
            var msg = "<span id='saveMsg'>Data saved successfully</span>";
            var failMsg = "<span id='failedToSaveMsg'>Failed to save data</span>";

            var studentId = $(this).attr('id');
            console.log(studentId)
            var newMark = $(this).val();
            $.ajax({
                url: "modules/update.php?marks=",
                method: "post",
                data: {
                    student_id: studentId,
                    mark: newMark,
                    test: testID
                },
                success: function (data) {
                    if (data == "ok") {
                        console.log(msg)
                        $("#saveMsg").remove()
                        $("#results").append(msg);
                        $("#saveMsg").fadeIn().delay(2000).fadeOut();
                    }
                    if (data == "ko" || data == "") {
                        $("#failedToSaveMsg").remove()
                        $("#results").append(failMsg);
                        $("#failedToSaveMsg").fadeIn().delay(2000).fadeOut();
                    }
                }

            })
            return false;
        })
    }
    else {
        return false;
    }
    return false;
}