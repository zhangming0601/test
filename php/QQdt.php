<?php 
sleep(1);
    $pagenum=$_GET["pages"];
		
    $pagenum++;
	$jsondata=file_get_contents("../data/data2.json");
	$jsondata=json_decode($jsondata);
	$datastart=($pagenum-1)*5;
    $datape=array_slice($jsondata, $datastart,5);

	$arrayName = array('tt' =>  $datape,
						'page'=> $pagenum);
	$datas=json_encode($arrayName);
	echo ($datas);
 ?>