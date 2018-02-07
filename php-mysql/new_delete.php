<?php
header("Content-type:text/html;charset=utf-8");

// 接收id
$id = isset($_GET['id']) ? (integer)$_GET['id'] : 0;

if($id == 0){
  header('Refresh:2;url=news_list.php');
  echo '当前删除的新闻不存在！';
  exit;
}

// 删除数据
include_once 'news_public.php';

$sql = 'delete from n_news where id = ' . $id;
my_error($link,$sql);

// 提示
header('Refresh:2;url=news_list.php');
echo '当前新闻已经删除！';