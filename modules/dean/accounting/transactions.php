<?php
ob_start();
if (isset($_GET['grade']) and is_numeric($_GET['grade'])) {
    include '../../functions.php';
    $grade = $_GET['grade'];
    $students = fetchStudentsIn(($grade));
    $stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];
    $school = fetchSchoolInfo($_GET['school']);

    //limit for transactions
    $limit = 30;
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
        <?php
        $number = 0;
        foreach ($students as $student) {

            $number++;

            $id = $student['id'];
            $name = $student['name'];
        ?>
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
                <h1 class="heading" style="text-align:center;padding:10px;">Transactions</h1>
            </center>

            <!-- h1 to break line since br does not work -->
            <h1></h1>

            <h4 style="font-size:12px;">Name: <?php echo $name; ?></h4>
            <h4 style="font-size:12px;">ID: <?php echo $id; ?></h4>
            <h4 style="font-size:12px;">Grade: <?php echo $stream; ?></h4>
            <table>
                <tr>
                    <!-- ⚠ Caution ⚠: use double quotes otherwise css rules won't apply -->
                    <th class="number">#</th>
                    <th class="name">Date</th>
                    <th class="id">Item</th>
                    <th class="balance">Amount</th>


                </tr>
            <?php
            if (!empty($students) and $students !== ' ') {
                $balance = 0;
                $query = $connect->query("SELECT * FROM accounting WHERE student_id=$id LIMIT $limit");
                $transactions = array();
                $shown = 0;
                foreach ($query as $row) {
                    $shown++;
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['date'] . "</td>";
                    echo "<td>" . $row['item'] . "</td>";
                    echo "<td>" . $row['amount'] . "</td>";
                    $balance += $row['amount'];
                    echo "</tr>";
                }
                $missing = $limit - $shown;
                $i = 0;
                while ($i < $missing) {
                    echo '<tr><td></td><td></td><td></td><td></td></tr>';
                    $i++;
                }
                echo "<tr>";
                echo '<td colspan="3" style="font-weight: bold;">Balance</td>';
                echo '<td style="font-weight: bold;">' . $balance . '</td>';
                echo "</tr>";
            }
            echo "</table>";
            //add page break if not last page
            if (count($students) !== $number) {
                echo '<div style="page-break-before: always;"></div>';
            }
        }

            ?>

    </body>

    </html>
<?php
    $html = ob_get_clean();

    require_once('../../tcpdf/tcpdf.php');

    $tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set title of pdf
    $tcpdf->SetTitle('Transactions');


    // set header and footer in pdf
    $tcpdf->setPrintHeader(false);
    $tcpdf->setPrintFooter(false);
    $tcpdf->setListIndentWidth(3);



    $tcpdf->AddPage();

    $tcpdf->writeHTML($html, true, false, false, false, '');

    //Close and output PDF document
    $tcpdf->Output('Transactions.pdf', 'I');
}


















//transactions for one student
else {
    include '../../functions.php';
    $student_id = $_GET['id'];
    $student = getStudentInfo($student_id);
    $school = fetchSchoolInfo($_GET['school']);
    $year=$_GET['year'];


    //limit for transactions
    $limit = 30;
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
        <?php

            $id = $student['id'];
            $name = $student['name'];
        ?>
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
                <h1 class="heading" style="text-align:center;padding:10px;">Transactions</h1>
            </center>

            <!-- h1 to break line since br does not work -->
            <h1></h1>

            <h4 style="font-size:12px;">Name: <?php echo $name; ?></h4>
            <h4 style="font-size:12px;">ID: <?php echo $id; ?></h4>
            <h4 style="font-size:12px;">Grade: <?php echo whatGrade($id,$year); ?></h4>
            <table>
                <tr>
                    <!-- ⚠ Caution ⚠: use double quotes otherwise css rules won't apply -->
                    <th class="number" style="font-weight:bold;border:1px solid black;">#</th>
                    <th class="name" style="font-weight:bold;border:1px solid black;">Date</th>
                    <th class="id" style="font-weight:bold;border:1px solid black;">Item</th>
                    <th class="balance" style="font-weight:bold;border:1px solid black;">Amount</th>


                </tr>
            <?php
                $balance = 0;
                $query = $connect->query("SELECT * FROM accounting WHERE student_id=$id LIMIT $limit");
                $transactions = array();
                $shown = 0;
                foreach ($query as $row) {
                    $shown++;
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['date'] . "</td>";
                    echo "<td>" . $row['item'] . "</td>";
                    echo "<td>" . $row['amount'] . "</td>";
                    $balance += $row['amount'];
                    echo "</tr>";
                }
                $missing = $limit - $shown;
                $i = 0;
                while ($i < $missing) {
                    echo '<tr><td></td><td></td><td></td><td></td></tr>';
                    $i++;
                }
                echo "<tr>";
                echo '<td colspan="3" style="font-weight: bold;">Balance</td>';
                echo '<td style="font-weight: bold;">' . $balance . '</td>';
                echo "</tr>";
            
            echo "</table>";
        

            ?>

    </body>

    </html>
<?php
    $html = ob_get_clean();

    require_once('../../tcpdf/tcpdf.php');

    $tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set title of pdf
    $tcpdf->SetTitle('Transactions');


    // set header and footer in pdf
    $tcpdf->setPrintHeader(false);
    $tcpdf->setPrintFooter(false);
    $tcpdf->setListIndentWidth(3);



    $tcpdf->AddPage();

    $tcpdf->writeHTML($html, true, false, false, false, '');

    //Close and output PDF document
    $tcpdf->Output('Tranasctions.pdf', 'I');
}
