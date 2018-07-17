# 使用海外VPS搭建ShadowsocksR助你科学上网

*注：本教程适合有一定计算机基础的朋友使用，小白先百度了解一下基础知识。切勿使用本教程做一切违反中国人民共和国相关法律法规之事！*

## 一、购买VPS

其实只要是非大陆地区的VPS都可以搭建代理，我这里推荐几款比较热门的主机商，不建议自己去淘宝买海外VPS，事先准备好paypal付款，不是所有国外网站都支持支付宝。

### Bandwagon Host

Bandwagon Host被国人称为搬瓦工，他们家的VPS有专门对国内网络连接速度优化，国人用的非常多。官网为 [https://bwh1.net/cart.php](https://bwh1.net/cart.php)

建议大家购买下面这两款：

![img](https://ww2.sinaimg.cn/large/a15b4afegy1foqqesdu1mj20ro0q60ub.jpg)

这两个都是直连cn2线路，第一个只能年付，第二个可以月付。但是第二个更贵，因为配置更高，流量更多。（流量这里要补充一下，如果你用服务器搭建代理翻墙的话，流量是要减半的，意思是如果你买的是第一个，网页上写流量一个月500g，平时翻墙的时候就是250g，超出的话就会另收费。具体原因是你挂的代理访问google，请求是先发到你的代理服务器上面，然后代理服务器再请求google。它从goole服务器下载到网页，这是一部分流量，然后它还要把这个网页发给你，这就有产生了流量。总共花费正常情况的2被流量）

### Vultr

Vultr也是一个老牌VPS厂商了，他家的也不错，VPS可以按小时收费，价格也可以。其实按小时收费的最好了，如果你的IP被封了，你可以删除实例，再重新创建一个，它就会给你重新分配一个IP。如果是按月收费或者是按年收费就像搬瓦工，IP被墙了，只能再花钱换IP了。官网：[https://www.vultr.com/](https://www.vultr.com/)

建议大家购买下面这两款：

![img](https://ww2.sinaimg.cn/large/a15b4afegy1foqqx0t2wbj21030jntaa.jpg)

机房位置吧，建议选择美国西海岸的。

### DigitalOcean

DigitalOcean老牌VPS厂商，本人就是用的他家的旧金山机房，配合谷歌BBR加速，YouTube 2K妥妥的，4K也可以。和Vultr一样支持按小时收费，价格和Vultr差不多。官网：[https://www.digitalocean.com/](https://www.digitalocean.com/)

建议大家购买下面这一款：

![img](https://ww2.sinaimg.cn/large/a15b4afegy1foqr61ozjlj20fs01rjr8.jpg)

机房位置选择旧金山。

## 二、优化网络

网络是必须优化的，不优化效果会很不好，目前有两种较稳定效果好的优化方案。（以下的所有操作都在Debian 7/8 X64系统下均正常，强烈建议大家选择这款系统）

### 锐速(破解版)

这是一个TCP连接优化加速软件（不支持OpenVZ），因为官方破产，所以现在只能用用破解的锐速了。这个软件也是非常强大，不需要多余设置，一键安装，效果明显！

```
1. root用户连接上VPS

2. 执行 wget -N –no-check-certificate https://raw.githubusercontent.com/91yun/serverspeeder/master/serverspeeder.sh && bash serverspeeder.sh

3. 等待一段时间安装成功后，重启vps

#重启锐速
/serverspeeder/bin/serverSpeeder.sh restart
#启动锐速
/serverspeeder/bin/serverSpeeder.sh start
#停止锐速
/serverspeeder/bin/serverSpeeder.sh stop
#查看锐速运行情况
/serverspeeder/bin/serverSpeeder.sh status
```

### 谷歌BBR算法

谷歌大佬的TCP-BBR是最新出来的一种TCP拥塞控制技术，和锐速差不多，不过这个加速效果个人测试强于锐速，免费，同样不支持OpenVZ。

```
1. root用户连接vps

2. 执行 wget -N –no-check-certificate https://softs.fun/Bash/bbr.sh && chmod +x bbr.sh && bash bbr.sh

3. 会提示输入内核版本，直接回车获取最新版本

4. 会出现一个对话框，选择no

5. 提示需要重启，输入y重启vps

# 启动BBR
bash bbr.sh start
# 关闭BBR
bash bbr.sh stop
# 查看BBR状态
bash bbr.sh status
```
## 三、安装/配置ShadowsocksR服务端

### 下载ShadowsocksR服务端

```
// 依此执行下面三行代码

apt-get update

apt-get install git vim -y

git clone -b manyuser https://github.com/ToyoDAdoubi/shadowsocksr.git
```

### 配置ShadowsocksR服务端

```
// 依此执行下面三行代码

cd shadowsocksr

bash initcfg.sh

vi user-config.json
```

按 i 键进入编辑模式，并按如下配置

```
{
 "server": "0.0.0.0",
 "server_ipv6": "::",
 // 更改服务端口，建议4位
 "server_port": 8388,
 "local_address": "127.0.0.1",
 "local_port": 1080,
 
// 更改密码
 "password": "m",
 "timeout": 120,
 "udp_timeout": 60,
// 务必记住 加密方法(method) 协议(protocol) 混淆(obfs)
 "method": "aes-128-ctr",
 "protocol": "auth_aes128_md5",
 "protocol_param": "",
 "obfs": "tls1.2_ticket_auth_compatible",
 "obfs_param": "",
 "speed_limit_per_con": 0,
 "speed_limit_per_user": 0,
 
 "dns_ipv6": false,
 "connect_verbose_info": 0,
 "redirect": "",
 "fast_open": false
}
```

更改完端口和密码后按 esc 键 + :wq + 回车 保存并退出

### 开启ShadowsocksR服务端

```
// 依此执行下面三行代码

cd shadowsocks

chmod +x *.sh

./logrun.sh
```

### 查看日志

```
./tail.sh
```
## 四、安装/配置ShadowsocksR客户端

客户端配置方法都一样，填写你服务器的IP、刚才自己设置的端口、密码、加密方法(method)、协议(protocol)、混淆(obfs)

### Windows

[点击下载客户端/百度云](https://pan.baidu.com/s/1eTeJWxc) 密码：8xb2

[点击下载客户端/github](https://github.com/blogwy/personal-practice/tree/master/ssr/win/ssr.7z)

### Android

[点击下载客户端/百度云](https://pan.baidu.com/s/1eUhcduM) 密码：9cwq

[点击下载客户端/github](https://github.com/blogwy/personal-practice/tree/master/ssr/android/shadowsocksr-3.5.4.apk)

### iOS

1. 下载 potatso lite（需切换到美区AppStore）

2. 或者到pp助手免费下载Shadowrocket

## 五、感谢
感谢 [逗比根据地](https://doub.io/) ，本文相关代码都是从逗比根据地网站上复制的，本人只是做了整合。相关高级操作请关注 [逗比根据地](https://doub.io/) ！