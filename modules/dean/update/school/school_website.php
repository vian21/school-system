<?php

if (
    isset($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $website = sanitize($_POST['website']);
    $id = sanitize($_POST['id']);

    $change = $connect->query("UPDATE schools SET website='$website' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
