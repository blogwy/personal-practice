<?php
header("Content-type:text/html;charset=utf-8");

// 接收id
$id = isset($_GET['id']) ? (integer)$_GET['id'] : 0;

if($id == 0){
  header('Refresh:2;url=news_list.php');
  echo '当前编辑的新闻不存在！';
  exit;
}

include_once 'news_public.php';

$sql = "select * from n_news where id = {$id}";

$res = my_error($link,$sql);

$new = mysqli_fetch_assoc($res);

include_once 'new_edit.html';

