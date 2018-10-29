# roselia-encore-react

在学习了React之后，我决定写一个东西练练手，就决定是你了，Roselia-Encore！

之前的roselia-encore使用了Vue.js，但是我当时没有用到他的脚手架，导致了模板混入主页面，十分难看，而且为了图方便，我甚至把数据和逻辑放在了一起，使得改变模板变得麻烦，虽然我写了几个脚本来改善现状，但是还是比较尴尬，比不上官方的脚手架。

关于模板的信息放在`@/rhodonite/protocols/encore.ts`里面，是站点所需模板信息的定义，实际操作可以借鉴`@/encoreinfo/`下面的`roselia.ts`和`starlight.ts`，此外，CVName支持一个属性或属性数组的设计原因是可怜的Roselia的小姐姐毕业事件，还是比较惋惜，于是特地做了设计（

也许是步子迈得太大了，直接使用`TypeScript`使得开发时间超过了我的想象，至少Vue版本的开发还是比较快的（虽然大部分时间用在了调样式和disable愚蠢的`tslint`规则上）还有就是官方的文档只有`JavaScript`的完整指南，而如果你用`TypeScript`会有所不同，此时Google is always your friend.