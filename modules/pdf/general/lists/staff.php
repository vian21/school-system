<?php
ob_start();
if (isset($_GET['staff']) and is_numeric($_GET['staff']) and !empty($_GET['staff'])) {
    include '../../../config.php';
    include '../../../functions.php';

    $school = fetchSchoolInfo(sanitize($_GET['staff']));
    $teachers = fetchAllTeachers(sanitize($school['id']));
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
                    text-align: center;
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

            <table style="width:100%;border-collapse:collapse;border:none">
                <tr style="border:none">
                    <th style="width:20%;border:none;"></th>
                    <th style="width:80%;border:none;"></th>
                </tr>

                <tr style="border:none">
                    <td rowspan="2" style="border:none">
                        <img src="../../../../src/img/uploaded/<?php echo $school['image']; ?>" alt='' style="width: 90px;" />

                    </td>

                    <td style="border:none">
                        <div id="school_name" style="font-size:20px;font-weight: bold;"><?php echo $school['name']; ?></div>
                    </td>
                </tr>

                <tr style="border:none">
                    <td style="border:none">
                        <div id="core_values" style="font-size:10px;"><?php echo $school['motto']; ?></div>

                    </td>
                </tr>
            </table>
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

    require('../../../tcpdf/tcpdf.php');
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
