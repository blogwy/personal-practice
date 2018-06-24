# MSDN API

msdn.itellyou.cn API

**msdn请求需设置 Referer,下面贴出我用nginx做反向代理的配置**

```
location /Category/ {
  proxy_pass https://msdn.itellyou.cn;
  proxy_set_header   Referer    https://msdn.itellyou.cn/;			
}
```

## 获取资源列表id

### URL & Method
```
POST

https://msdn.itellyou.cn/Category/Index
```

### 参数
```
form data 形式

分类中文描述     key: value

企业解决方案     id: aff8a80f-2dee-4bba-80ec-611ac56d3849

MSDN 技术资源库  id: 23958de6-bedb-4998-825c-aa3d1e00d097

工具和资源       id: 95c4acfd-d1a6-41fe-b14d-a6816973d2aa

应用程序         id: 051d75ee-ff53-43fe-80e9-bac5c10fc0fb

开发人员工具     id: fcf12b78-0662-4dd4-9a82-72040db91c9e

操作系统         id: 7ab5f0cb-7607-4bbe-9e88-50716dc43de6

服务器           id: 36d3766e-0efb-491e-961b-d1a419e06c68

设计人员工具      id: 5d6967f0-b58d-4385-8769-b886bfc2b78c
```

### 返回值

```
[
  {
    id: "id值",
    name: "具体名字"
  }
]
```


## 获取资源列表语言id

### URL & Method

```
POST

https://msdn.itellyou.cn/Category/GetLang
```

### 参数

```
form data 形式

id: 具体的资源id

id: dff1cf73-b56e-4214-b037-3cadabb4287c
```

### 返回值

```
{
  status: true,
  result: [
    {
      id: "语言id",
      lang: "语言描述"
    }
  ]
}
```

## 获取资源列表信息

### URL & Method

```
POST

https://msdn.itellyou.cn/Category/GetList
```

### 参数

```
form data 形式

id: 资源列表id

lang: 资源语言id

id: dff1cf73-b56e-4214-b037-3cadabb4287c

lang: 041dbbd2-c198-4523-b438-590128265d82

filter: true
```

### 返回值

```
{
  status: true,
  result: [
    {
      id: "资源具体id",
      name: "资源名字",
      post: "资源发布时间",
      url: "资源下载地址"
    }
  ]
}
```

## 获取具体资源下载信息

### URL & Method

```
POST

https://msdn.itellyou.cn/Category/GetProduct
```

### 参数

```
form data 形式

id: 具体的资源id
```

### 返回值

```
{
  status: true,
  result: {
    DownLoad: "资源下载地址",
    FileName: "资源文件名",
    PostDateString: "资源发布时间",
    SHA1: "资源sha1",
    size: "资源大小"
  }
}
```