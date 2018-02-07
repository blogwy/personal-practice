<?php

header("Content-type:text/html;charset=utf-8");

$link = mysqli_connect('127.0.0.1:3306','root','root') or die('数据库连接失败！');

//封装mysql语法错误检测函数
function my_error($link,$sql){
  $res = mysqli_query($link,$sql);
  if(!$res){
    echo 'sql执行错误，错误编号为：' . myslqi_errno($link) . '<br/>';
    echo 'sql执行错误，错误消息为：' . myslqi_error($link) . '<br/>';

    // 终止错误继续执行
    exit;
  }
  return $res;
}

my_error($link,'set names utf8');

my_error($link,'use news');


