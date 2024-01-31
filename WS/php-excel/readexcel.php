<?php
    require 'vendor/autoload.php';
    include_once '../jwt/tokens-api/comprobartoken.php';
    include_once '../jwt/tokens-api/header.php';

    use PhpOffice\PhpSpreadsheet\IOFactory;
    print_r($_SERVER);
    if(!array_key_exists('HTTP_AUTHORIZATION', $_SERVER)){
        http_response_code(401);
        die;
    }
    try {
        if (!verificarJWT()) {
            http_response_code(401);
            die;
        }
    } catch (UnexpectedValueException $exception) {
        echo $exception->getMessage();
    }

    $modulo = $_POST['modul'];
    $any =  $_POST['any'];
    echo $excelFilePath = './excels/Cuaderno_TSDAW_'.$modulo.'_'.$any.'.xlsx';
    $spreadsheet = IOFactory::load($excelFilePath);
    $worksheet = $spreadsheet->getActiveSheet();

    $highestRow = $worksheet->getHighestRow();
    $highestColumn = $worksheet->getHighestColumn();

    $highestColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumn);
    
    $data = array();

    if (isset($_POST['id'])) {
        $idAlumno = $_POST['id'];
    
        for ($row = 1; $row <= $highestRow; ++$row) {
            $rowData = array();

            $valueColumnA = $worksheet->getCellByColumnAndRow(1, $row)->getValue();

            if ($valueColumnA !== null) {
                $rowData["id"] = $valueColumnA;

                // Crea el array solo del alumno con id igual al valor de la columna A
                if ($idAlumno == $valueColumnA) {
                    for ($col = 2; $col <= 4; ++$col) {
                        $value = $worksheet->getCellByColumnAndRow($col, $row)->getValue();
                        
                        if ($value !== null) {
                            if ($col ==2) {
                                $rowData["Apellido1"] = $value;
                            }elseif($col == 3){
                                $rowData["Apellido2"] = $value;
                            }else{
                                $rowData["Nombre"] = $value;
                            }
                            
                        }
                    }
                    
                    $count = 1;
                    for ($col = 5; $col <= $highestColumnIndex; $col += 3) {
                        $value = $worksheet->getCellByColumnAndRow($col, $row)->getValue();
                        
                        
                        if ($value !== null) {
                            $rowData["RA$count"] = $value;
                            $count ++;
                        }
                    }
                    $data["Notas"] = $rowData;
                }
            }
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo "Error 400: Bad Request - La solicitud no se pudo procesar correctamente.";
    }

    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');
    echo $jsonData;

?>