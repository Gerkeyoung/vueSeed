--------------

### 目录结构
	|-- build                                  // webpack配置文件
	|-- config                                 // 项目打包路径
	|-- node_modules                           // 打包依赖文件
	|-- src                                    // 源码目录
	|   |-- common                             // 全局配置文件
	|       |-- config                         // 环境配置
	|           |-- dev.json                   // 测试环境配置
	|           |-- prod.json                  // 开发环境配置
    |       |-- lang                           // 语言配置
	|           |-- zh.json                    // 中文配置
	|           |-- en.json                    // 英文配置
    |           |-- langconfig.json            // 语言设置
    |   |-- plugins                            // 获取配置和公共方法
	|           |-- config.json                // 获取环境配置
    |           |-- httpserve.js               // 封装的服务
    |           |-- autologin.js               // dome自动登录
    |   |-- router                             // 路由
	|           |-- router.js                  // 路由配置
    |           |-- routerIndex.js             // 各模块的路由注册
    |   |-- store                              // 状态管理
	|           |-- taskmgmt                   // taskmgmt模块状态管理
    |               |-- actions.js             // taskmgmt状态管理action	
    |               |-- getters.js             // taskmgmt状态管理getters	
    |               |-- index.js               // taskmgmt 状态管理的入口
    |               |-- mutations.js           // taskmgmt状态管理mutations    
    |           |-- function.js                // 状态管理公共方法	
    |           |-- index.js                   // 状态管理入口
    |   |-- style                              // 样式
	|           |-- common.less                // 全局样式
    |           |-- theme.js                   // 主题样式(vux)	
    |   |-- taskmgmt                           // taskmgmt模块
	|           |-- asset                      // taskmgmt静态资源
	|           |-- components                 // taskmgmt静态资源组件
	|           |-- pages                      // 具体界面
	|           |-- router.json                // taskmgmt的路由
	|   |-- App.vue                            // 页面入口
	|   |-- main.js                            // 程序入口
	|-- .babelrc                               // ES6语法编译配置
	|-- .editorconfig                          // 代码编写规格
	|-- .gitignore                             // push忽略文件
	|-- index.html                             // 入口html页面
	|-- package.json                           // 依赖及配置
--------------