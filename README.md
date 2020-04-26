# web_cli
## 简介
团队内部前端代码脚手架工具，志在打造全方终端位解决方案。

- 手机端解决方案
- PC端解决方案
- web端解决方案
- 服务端
- 小程序

## 使用步骤

0. 前置条件需要本地有git环境

略

1. 切换npm源为本地址
> npm config set registry http://117.78.44.64:31998/

这里推荐使用nrm
   
> npm install nrm -g

查看所有的源

> nrm ls

添加本平台源

> nrm add 源的名称  https:// 地址

切换到本平台源

> nrm use 源的名字

2. 基于本平台安装脚手架

> npm install web_cli -g

3. 查看本平台提供的web模板

> web_cli list

4. 构建框架

> web_cli init 模板名称 项目名称

5. 更多帮助

> web_cli -V