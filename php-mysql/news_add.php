<?php
// 接收用户数据，插入数据库
header("Content-type:text/html;charset=utf-8");

// 数据接收
$title = isset($_POST['title']) ? $_POST['title'] : '';
$isTop = isset($_POST['isTop']) ? 1 : 2;
$content = isset($_POST['content']) ? $_POST['content'] : '';
$publiser = isset($_POST['publiser']) ? $_POST['publiser'] : '佚名';

// 数据验证
if(empty($title) || empty($content)){
  header('Refresh:2;url=edit.html');
  exit('标题和内容不能为空');
}

include_once 'news_public.php';

$time = time();
$sql = "insert into n_news values(null,'{$title}',$isTop,'{$content}','{$publiser}',$time)";

$insert_id = my_error($link,$sql);

header('Refresh:2;url=news_list.php');
echo $title . '增加成功';

