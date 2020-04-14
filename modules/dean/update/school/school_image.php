<?php
include "../../../config.php";
if (isset($_FILES['image'])) {
    $oldImage = $_POST['old'];
    $oldImgLocation = "../../../../src/img/uploaded/" . $oldImage;
    $imgName = $_FILES['image']['name'];
    $location = "../../../../src/img/uploaded/" . $imgName;
    $imgType = pathinfo($location, PATHINFO_EXTENSION);
    $validExt = array('jpg', 'png', 'jpeg');
    //Check if sent files are images
    if (!in_array(strtolower($imgType), $validExt)) {
        echo "k";
    } else {
        if (move_uploaded_file($_FILES['image']['tmp_name'], $location)) {
            //Delete the image if they don't have same name because by default it will replace the old one
            if (isset($oldImage) && !empty($oldImage) && $location !== $oldImgLocation) {

                unlink($oldImgLocation);
            }
        }
    }
    //Change image location in database
    $change = $connect->query("UPDATE schools SET image='$imgName'");
    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
