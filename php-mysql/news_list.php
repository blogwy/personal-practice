<?php

include_once 'news_public.php';

$sql = "select * from n_news";

$res = my_error($link,$sql);

$news = array();

// 方案 1
// $num = mysqli_num_rows($res);
// for($i = 0;$i < $num;$i++){
//   $news[] = mysqli_fetch_assoc($res);
// }
// print_r($news);

// 方案 2
while ($row = mysqli_fetch_assoc($res)) {
  $news[] = $row;
}

// 显示模板文件
include_once 'news_list.html';