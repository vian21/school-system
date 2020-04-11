<?php
ob_start();
if (isset($_GET['grade']) and is_numeric($_GET['grade'])) {
    include '../../functions.php';
    $grade = $_GET['grade'];
    $students = fetchStudentsIn(($grade));
    $stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];
    $school = fetchSchoolInfo($_GET['school']);
    //number of check boxes
    $boxes = 20;
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
                align-content: center;
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

            .number {
                width: 5%;
            }

            .name {
                width: 40%;
            }

            .id {
                width: 10%;
            }

            .box {
                width: 2.16%;
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
                    <img src="../../../src/img/uploaded/<?php echo $school['image']; ?>" alt='' style="width: 90px;" />

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
            <h1 class="heading" style="text-align:center;padding:10px;">Class list</h1>
        </center>

        <!-- h1 to break line since br does not work -->
        <h1></h1>

        <h4>Grade: <?php echo $stream; ?></h4>
        <table>
            <tr>
                <!-- ⚠ Caution ⚠: use double quotes otherwise css rules won't apply -->
                <th class="number">#</th>
                <th class="name">Name</th>
                <th class="id">ID</th>
                <?php
                $i = 0;
                while ($i <= $boxes) {
                    $i++;

                    // ⚠ Caution ⚠: use double quotes otherwise css rules won't apply
                    echo '<th class="box"></th>';
                }
                ?>
            </tr>
            <?php
            if (!empty($students) and $students !== ' ') {


                $number = 1;
                foreach ($students as $student) {
                    echo "<tr>";
                    echo "<td>" . $number . "</td>";
                    echo "<td>" . $student['name'] . "</td>";
                    echo "<td>" . $student['id'] . "</td>";
                    $i = 0;
                    while ($i <= $boxes) {
                        $i++;
                        echo "<td></td>";
                    }
                    echo "</tr>";

                    $number++;
                }
            }
            ?>

        </table>
    </body>

    </html>
<?php
    $html = ob_get_clean();

    require_once('../../tcpdf/tcpdf.php');

    $tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set title of pdf
    $tcpdf->SetTitle('Class List');


    // set header and footer in pdf
    $tcpdf->setPrintHeader(false);
    $tcpdf->setPrintFooter(false);
    $tcpdf->setListIndentWidth(3);



    $tcpdf->AddPage();

    $tcpdf->writeHTML($html, true, false, false, false, '');

    //Close and output PDF document
    $tcpdf->Output('class-list.pdf', 'I');
}
