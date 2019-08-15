function fetchStreams(){
    var url="modules/fetch.php?streams=";
    $.ajax({
        url:url,
        success:function(response){
            streams = JSON.parse(response);
            return false;
        }
    })
}