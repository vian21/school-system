async function fetchStreams(){
    var url="modules/fetch.php?streams";

    await $.ajax({
        url:url,
        success:function(response){
            streams = JSON.parse(response);
            return true;
        }
    })
}