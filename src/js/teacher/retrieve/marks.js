function appendMarks(json, testID) {
    var tabletemplate = "";

    if (isJSON(json) && json !== "") {
        var jsonArray = JSON.parse(json);
        tabletemplate += "<table id='marksTable'><tr><th>#</th><th>Name</th><th>Marks</th></tr>";
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
        
        tabletemplate += "<br><div id='msgBoard'></div>"

        tabletemplate += "<button class='delete' onclick='deleteAssessment(" + testID + ")'>Delete</button>"

        $("#results").html("");
        $("#results").append(tabletemplate);
        //Function 

        $('.mark').on('change', function () {
            var studentId = $(this).attr('id');
            console.log(studentId)
            var newMark = $(this).val();
            if (newMark < 0 || newMark > 100) {

                $("#msgBoard").html('')
                $("#msgBoard").append("<b style='color:red;'>Marks should be between 0 and 100.</b>").fadeIn();
                //$("#msgBoard").fadeIn().delay(2000).fadeOut();
            }
            else {
                var newMarkInfo = {
                    student_id: studentId,
                    mark: newMark,
                    test: testID
                }

                //Location : ../update/marks.js
                updateMark(newMarkInfo)

            }

            return false;
        })
    }
    if (json == '') {

        tabletemplate += "<button class='delete' onclick='deleteAssessment(" + testID + ")'>Delete</button>"
        tabletemplate += "<div id='msgBoard'></div>"

        $("#results").html("<span>No marks recorded. May be because no students were enrolled when the assessment was created.</span><br>");

        $("#results").append(tabletemplate);
    }
    return false;
}