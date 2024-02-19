<?php
    require '../vendor/autoload.php';
    include_once '../jwt/comprobartoken.php';
    
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Methods: POST, PUT, DELETE, UPDATE, OPTIONS");
    header("Access-Control-Allow-Origin: * ");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    use PhpOffice\PhpSpreadsheet\IOFactory;

    $capsalera = getallheaders();

// Verificar el método de la solicitud (Arregla problema de CORS)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // Si es una solicitud OPTIONS, responder con éxito y terminar la ejecución del script
        header('HTTP/1.1 200 OK');
        exit();
    }
    
    if(!array_key_exists('Authorization', $capsalera)){
        echo "Passa per aquí";
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Encabezado de autorización no presente.";

        die;
    }
    try {
        if (!verificarJWT2($capsalera)) {
            header("HTTP/1.1 401 Unauthorized");
            echo "Error 401: Unauthorized - Token JWT no verificado correctamente.";
            die;
        }
    } catch (UnexpectedValueException $exception) {
        echo $exception->getMessage();
    }

    $api_data = json_decode(file_get_contents("php://input"));
    $ano = $api_data->ano;
    $idAlumno = $api_data->id;

    $excels = array(
        "DWES",
        "DWEC",
        "DAW",
        "DIW",
        "EIE"
    );

    $data = array();

    foreach ($excels as $excel) {
        $excelFilePath = '../../excels/Cuaderno_TSDAW_'.$excel.'_'.$ano.'.xlsx';
        $spreadsheet = IOFactory::load($excelFilePath);
        $worksheet = $spreadsheet->getActiveSheet();

        $highestRow = $worksheet->getHighestRow();
        $highestColumn = $worksheet->getHighestColumn();

        $highestColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumn);

        if ($idAlumno) {
            for ($row = 1; $row <= $highestRow; ++$row) {
                $rowData = array();

                $valueColumnA = $worksheet->getCellByColumnAndRow(1, $row)->getValue();

                if ($valueColumnA !== null) {
                    // Crea el array solo del alumno con id igual al valor de la columna A
                    if ($idAlumno == $valueColumnA) {
                        $count = 1;
                        $media = 0;
                        for ($col = 5; $col <= $highestColumnIndex; $col += 3) {
                            $value = $worksheet->getCellByColumnAndRow($col, $row)->getValue();

                            if ($value !== null) {
                                // $rowData["RA$count"] = $value;
                                $media = $media + $value;
                                $count ++;
                            }

                        }
                        $media = $media / $count;
                        $data[$excel]["Media"] = $media;
                    }
                }
            }
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo "Error 400: Bad Request - La solicitud no se pudo procesar correctamente.";
        }
    }

    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');
    echo $jsonData;
