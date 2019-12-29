<?php
ob_start();
if (isset($_GET['staff']) and is_numeric($_GET['staff']) and !empty($_GET['staff'])) {
    include '../../config.php';
    include '../../functions.php';
    $school = $_GET['staff'];
    $teachers = fetchAllTeachers($school);
    if (!empty($teachers) and $teachers !== ' ') {
?>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>

            <style>
                body {
                    width: 90%;
                    margin-left: 5%;
                }

                .heading {
                    width: 100%;
                    border: 2px solid black;
                }

                table {
                    width: 100%;
                }

                table,
                th,
                td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }

                table th {
                    font-weight: bold;
                }

                .number {
                    width: 5%;
                }

                .name {
                    width: 25%;
                }

                .id {
                    width: 10%;
                }

                .email {
                    width: 25%;
                }

                .tel {
                    width: 15%;
                }

                .gender {
                    width: 10%;
                }

                .title {
                    width: 10%;
                }
            </style>
        </head>

        <body>
            <center>
                <!-- ⚠ Caution ⚠: use double quotes otherwise css rules won't apply -->
                <h1 class="heading">Staff list</h1>
            </center>
            <!-- h1 tag to create space since br does not work 😁-->
            <h1></h1>
            </br>
            <table>
                <tr>
                    <!-- ⚠ Caution ⚠: use double quotes otherwise css rules won't apply -->
                    <th class="number">#</th>
                    <th class="name">Name</th>
                    <th class="id">ID</th>
                    <th class="email">Email</th>
                    <th class="tel">Tel</th>
                    <th class="gender">Gender</th>
                    <th class="title">Title</th>
                </tr>
                <?php
                $number = 1;

                foreach ($teachers as $teacher) {
                    echo "<tr>";
                    echo "<td>" . $number . "</td>";
                    echo "<td>" . $teacher['name'] . "</td>";
                    echo "<td>" . $teacher['id'] . "</td>";
                    echo "<td>" . $teacher['email'] . "</td>";
                    echo "<td>" . $teacher['tel'] . "</td>";
                    //using genders array to get text instead of a number  @ ../../config.php
                    echo "<td>" . $genders[$teacher['gender']] . "</td>";
                    echo "<td>" . $staffTypes[$teacher['type']] . "</td>";
                    echo "</tr>";

                    $number++;
                }
                ?>
            </table>
        </body>

        </html>

<?php

    }

    $html = ob_get_clean();

    require('../../tcpdf/tcpdf.php');
    $tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set title of pdf
    $tcpdf->SetTitle('Staff list');


    // set header and footer in pdf
    $tcpdf->setPrintHeader(false);
    $tcpdf->setPrintFooter(false);
    $tcpdf->setListIndentWidth(3);

    $tcpdf->AddPage();

    $tcpdf->writeHTML($html, true, false, false, false, '');

    //Close and output PDF document
    $tcpdf->Output('staff_list.pdf', 'I');
}
