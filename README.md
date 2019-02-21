# roselia-encore-react

![Roselia-Encore-React](https://raw.githubusercontent.com/Somainer/roselia-encore-react/master/public/img/logo.png)

在学习了React之后，我决定写一个东西练练手，就决定是你了，Roselia-Encore！

之前的roselia-encore使用了Vue.js，但是我当时没有用到他的脚手架，导致了模板混入主页面，十分难看，而且为了图方便，我甚至把数据和逻辑放在了一起，使得改变模板变得麻烦，虽然我写了几个脚本来改善现状，但是还是比较尴尬，比不上官方的脚手架。

关于模板的信息放在`@/rhodonite/protocols/encore.ts`里面，是站点所需模板信息的定义，实际操作可以借鉴`@/encoreinfo/`下面的`roselia.ts`和`starlight.ts`，此外，CVName支持一个属性或属性数组的设计原因是可怜的Roselia的小姐姐毕业事件，还是比较惋惜，于是特地做了设计（

也许是步子迈得太大了，直接使用`TypeScript`使得开发时间超过了我的想象，至少Vue版本的开发还是比较快的（虽然大部分时间用在了调样式和disable愚蠢的`tslint`规则上）还有就是官方的文档只有`JavaScript`的完整指南，而如果你用`TypeScript`会有所不同，此时Google is always your friend.

最近添加了一个将日程加入系统日历的功能，主要是利用构造ics并且下载来实现，因此在iOS设备上会有最丝滑的体验，而在其他设备上则需要下载一个文件然后打开，不够优雅。
之所以没有打包成一个日历供订阅是因为在iOS上，打开一个有一串活动的日历，你还是要一个一个添加，还是一样的麻烦。当然，订阅日历会好用一点，可是这是一个纯前端项目，不执行js，动态生成ics在GitHub Pages还是难以实现的，因此，这个功能就去掉了。

## 需要补充的地方
目前站内的信息提供的内容和动态性，作用性都太小了，所以欢迎大家的帮助。

* 希望关于各个乐队推荐的视频
* 希望添加关于live信息的section
* 乐队Raise a Suilen 将为在信息齐全后分离出来。
* 希望提供立绘和封面图。

React新手，审美不好，欢迎发起PR，或者开Issue。

P.S. 如果你喜欢Roselia的随机歌词插件，可以将其添加到[捷径](https://www.icloud.com/shortcuts/d3aee628657445c3814e283a5bb40c23)