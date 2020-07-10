function newFee(data) {
    var url = app_url + "modules/dean/create/fee.php";
    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "post",
        data: data,
        success: (response) => {
            if (response == 'ok') {
                alert("Fee applied!");

                deleteModal();

                accounting();
            }
            else {
                $("#save").attr('disabled', false);

                alert("Failed to apply fee!")
            }
        }

    });
}