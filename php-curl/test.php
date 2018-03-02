<?php
// 设置响应头
header('Content-Type:application/json; charset=utf-8');
// 初始化
$ch = curl_init();

// 参数
$size = $_GET["size"];
$kw = urlencode($_GET["kw"]);
$page = $_GET["page"];
$url = 'http://47.52.162.224/api/search?size=' . $size . '&sortDirections=desc&word=' . $kw . '&from=home&page=' . $page;

// 设置选项，包括URL
curl_setopt($ch, CURLOPT_URL,$url);

// 伪造UA
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11");

// 伪造ip
curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:47.52.162.224','CLIENT-IP:47.52.162.224',));

// 伪造来路 
curl_setopt($ch, CURLOPT_REFERER, 'http://www.cilimao.me/'); 

// 不直接输入内容
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// 执行并获取HTML文档内容
$output = curl_exec($ch);
// 释放curl句柄
curl_close($ch);
// 打印获得的数据
echo $output;
?>