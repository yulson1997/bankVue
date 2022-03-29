<!--
 * @Author: yinfu
 * @Date: 2020-12-08 16:44:26
 * @LastEditTime: 2021-01-11 09:47:42
 * @Description: 
-->
# standard

## 项目结构
``` 
webpack
 |--build      # 项目构建源码
 |--config     # 项目个性化配置
 |--src        # 开发目录
     |--resource     # 项目的公共资源，包含img、font、excel、xml等文件
     |--style        # 项目的公共样式，包含css和less文件    
     |--utils        # 项目工具类
     |--lib          # 项目的公共脚本文件
     |--model        # 项目的公共数据模型   
     |--service      # 项目的公共接口交互     
     |--comp         # 项目的公共vue组件
     |--pages        # 页面模块
          |--.html        # 模板文件
          |--.js          # 入口文件
          |--.vue         # 根组件
          |--router       # 配置路由
          |--views        # 子路由
          |--vuex         # 配置状态管理
```

## 主要配置
  + webpack：4+
  + babel：7+
  + vue：2.5+
  + vue-loader：15+（要先将项目中的vux代码移除掉，否则打包就会出错）
  + vue-router：2+
  + axios：0.16.2

## 开发规范
  + 页面
    - 总入口：默认是src下的pages
    - 每个页面
      - pages中的每个目录对应一个页面，目录名就是页面名
      - 每个页面目录下必须要有一个入口文件(js)，模板文件统一使用src下面的index.html
  + 样式
    - 全局
      - 对于element-ui使用按需加载，减少文件的打包体积
      - 对于iview，如果直接使用按需加载会在IE浏览器上出现BUG，所以保持全局引入
    - 组件
      - 不加scoped属性，是作用于整个页面的全局样式，使用时一定要注意样式的全局污染
      - 添加scoped属性，是专属于当前组件的局部样式，如果要覆盖某些内部组件或者第三方组件的样式，使用/deep/
      - 如果要将样式从style中提取出来放在一个单独的文件中，直接使用src属性进行引入
  + 脚本
    - javascript：使用ES6的语法，无需在入口文件处引入babel-polyfill
    - typescript：用于提取业务代码中的model和service层
    - eslint：负责js和ts的代码检查，规则在项目根目录下的.eslintrc.js文件中
  + 模块
    - 规范：尽量使用ES6的import和export，如果不是在顶部引入，可以使用require
    - 引入：尽量不要使用繁琐的相对路径，推荐使用别名

## 命令
  + 安装
    ```
    npm config set registry https://registry.npm.taobao.org
    npm install 
    ```
  + 开发
    ```
    npm run dev
    ```
  + 构建
    ```
    npm run build
    ```

