---
layout: post
title: Bootstrap项目实战(聪哥学院)
tags: 
- BootstrapDemo
categories: Demo
date: 2019-5-15 15:06
---



 [项目预览](/website/bootstrapDemo1/index.html) 

### 所运用到Bootstrap的知识点

## 1. 栅格布局

![](/blogimg/Bootstrap/pc1.png)

将屏幕分成12列，使用`.col-md-*`声明该盒子占几列。所有的列必须放在类名为`.row`内。

![](/blogimg/Bootstrap/pc2.png)

```html
<div class="row">
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
</div>
<div class="row">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```



## 2.不同设备的适配

![](/blogimg/Bootstrap/pc3.png)

对标签加上`.hidden-*`的类名可以让其在不同的设备是否隐藏

从 v3.2.0 版本起，形如 `.visible-*-*` 的类针对每种屏幕大小都有了三种变体，每个针对 CSS 中不同的 `display` 属性，列表如下：

![](/blogimg/Bootstrap/pc4.png)

因此，以超小屏幕（`xs`）为例，可用的 `.visible-*-*` 类是：`.visible-xs-block`、`.visible-xs-inline` 和 `.visible-xs-inline-block`。

`.visible-xs`、`.visible-sm`、`.visible-md` 和 `.visible-lg` 类也同时存在。但是**从 v3.2.0 版本开始不再建议使用**。

> 小屏幕向大屏幕适配（即如果小屏幕的布局、样式与大屏幕一致则只需设置小屏幕的样式）

## 3.轮播图（焦点图）不同设备图片的处理

*思想：在真实开发的过程中一般有两套图片。在中等、大屏幕的设备上采用背景图来设置，原因是在浏览器不断拉伸的过程中图片的内容要始终在`可视区域`中间（图片两边一般是留白区域），则设置背景图的`css`样式的`background-position:center`来解决。小设备则可以直接用`img`标签引进另外一套图片让其100%显示在设备上*

例

```html
html:
	<div class="item" data-sm-img="imgs/slide_02_2000x410.jpg" data-lg-img="imgs/slide_02_640x340.jpg">
        
```

```css
css:
    .item{
      background:no-repeat center center;
      background-size:cover;
    }
```

```js
js:
    $(window).on("resize", function () {
        // 获取当前窗口宽度
        let clientW = $(window).width()

        // 判断是否为小设备
        let charge = clientW > 800

        // 获取所有的item
        let $Iitems = $("#cg_banner .item")

        // 分别对大小设备进行处理
        $Iitems.each(function (index, item) {
            let imgUrl = charge ? $(item).data("sm-img") : $(item).data("lg-img")
            $(item).css({
                backgroundImage: 'url("' + imgUrl + '")',
            })
            if (charge) {
                $(item).empty()

            } else {
                let img = '<img src="' + imgUrl + '" alt="" >'
                $(item).empty().append(img)
            }
        })
    })
```

## 4.文字

**情镜文本颜色**

![](/blogimg/Bootstrap/pc5.png)

**中心内容**

通过添加 `.lead` 类可以让段落突出显示。(会让字体变大但不会变粗且有一定的间距)

![](/blogimg/Bootstrap/pc7.png)



## 5.图片

**响应式图片**

在 Bootstrap 版本 3 中，通过为图片添加 `.img-responsive` 类可以让图片支持响应式布局。其实质是为图片设置了 `max-width: 100%;`、 `height: auto;` 和 `display: block;` 属性，从而让图片在其父元素中更好的缩放。

如果需要让使用了 `.img-responsive` 类的图片水平居中，请使用 `.center-block` 类，不要用 `.text-center`。 [请参考助手类章节](https://v3.bootcss.com/css/#helper-classes-center) 了解更多关于 `.center-block` 的用法。

**图片形状**

通过为 `<img>` 元素添加以下相应的类，可以让图片呈现不同的形状。

![](/blogimg/Bootstrap/pc6.png)

## 6.按钮

为 `<a>`、`<button>` 或 `<input>` 元素添加按钮类（button class）即可使用 Bootstrap 提供的样式。

![](/blogimg/Bootstrap/pc8.png)

```html
<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">
```

> **针对组件的注意事项**
>
>虽然按钮类可以应用到 `<a>` 和 `<button>` 元素上，但是，导航和导航条组件只支持 `<button>` 元素。



>**链接被作为按钮使用时的注意事项**
>
>如果 `<a>` 元素被作为按钮使用 -- 并用于在当前页面触发某些功能 -- 而不是用于链接其他页面或链接当前页面中的其他部分，那么，务必为其设置 `role="button"` 属性。



>**跨浏览器展现**
>
>我们总结的最佳实践是：**强烈建议尽可能使用`<bottom>`元素**来获得在各个浏览器上获得相匹配的绘制效果。

**样式**

![](/blogimg/Bootstrap/pc9.png)

```html
<!-- Standard button -->
<button type="button" class="btn btn-default">（默认样式）Default</button>

<!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
<button type="button" class="btn btn-primary">（首选项）Primary</button>

<!-- Indicates a successful or positive action -->
<button type="button" class="btn btn-success">（成功）Success</button>

<!-- Contextual button for informational alert messages -->
<button type="button" class="btn btn-info">（一般信息）Info</button>

<!-- Indicates caution should be taken with this action -->
<button type="button" class="btn btn-warning">（警告）Warning</button>

<!-- Indicates a dangerous or potentially negative action -->
<button type="button" class="btn btn-danger">（危险）Danger</button>

<!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
<button type="button" class="btn btn-link">（链接）Link</button>
```



## 9.选项卡(标签页)

![](/blogimg/Bootstrap/pc12.png)

```html
<div>
    
  <!-- 导航条 -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
  </ul>

  <!-- 导航内容 -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="home">...</div>
    <div role="tabpanel" class="tab-pane" id="profile">...</div>
    <div role="tabpanel" class="tab-pane" id="messages">...</div>
    <div role="tabpanel" class="tab-pane" id="settings">...</div>
  </div>

</div>
```

导航条的`aria-controls`属性与导航内容的`id`相匹配

如果想要淡入淡出的效果只需要在导航内容添加类名`.fade`，默认激活的为`.fade in`

```html
<!-- 导航内容 -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane fade in active" id="home">...</div>
  <div role="tabpanel" class="tab-pane fade" id="profile">...</div>
  <div role="tabpanel" class="tab-pane fade" id="messages">...</div>
  <div role="tabpanel" class="tab-pane fade" id="settings">...</div>
</div>
```

## 8.徽章

给链接、导航等元素嵌套 `<span class="badge">` 元素，可以很醒目的展示新的或未读的信息条目。

![](/blogimg/Bootstrap/pc10.png)

```html
<a href="#">Inbox <span class="badge">42</span></a>

<button class="btn btn-primary" type="button">
  Messages <span class="badge">4</span>
</button>
```

*项目中使用情况*

![](/blogimg/Bootstrap/pc11.png)

```html
<div class="badge" style="padding:15px;">已更新3000+视频 | 100000+人订阅</div>
```

## 9.导航条

![](/blogimg/Bootstrap/pc13.png)

![](/blogimg/Bootstrap/pc14.png)

```html
<nav class="navbar navbar-default navbar-static-top navbar-cg">
	<div class="container">
		<!-- 中小屏幕下的下拉列表 -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" 
				data-target="#cg1"	ria-expanded="false">
              	<span class="sr-only">Toggle navigation</span>
              	<span class="icon-bar"></span>
              	<span class="icon-bar"></span>
              	<span class="icon-bar"></span>
              </button>
			<a class="navbar-brand" href="#">
				<img src="imgs/lk_logo_sm.png" alt="" width="180">
			</a>
		</div>

		<!-- 导航条的内容-->
		<div class="collapse navbar-collapse" id="cg1">
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">关于我们 </a></li>
				<li><a href="#">课程介绍</a></li>
				<li><a href="#">热门课程</a></li>
				<li><a href="#">名师授课</a></li>
				<li><a href="#">课堂互动</a></li>
				<li><a href="#">联系我们</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right hidden-sm">
				<li><a href="#">个人中心</a></li>
			</ul>
		</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>
```

**固定在顶部**

添加 `.navbar-fixed-top` 类可以让导航条固定在顶部

> **需要为 `body` 元素设置内补（padding）**
>
> 这个固定的导航条会遮住页面上的其它内容，除非你给 `<body>` 元素底部设置了 `padding`。用你自己的值，或用下面给出的代码都可以。提示：导航条的默认高度是 50px。

```html
body { padding-top: 70px; }
```

**固定在底部**

添加 `.navbar-fixed-bottom` 类可以让导航条固定在底部

**静止在顶部**

通过添加 `.navbar-static-top` 类即可创建一个与页面等宽度的导航条，它会随着页面向下滚动而消失。

**反色的导航条**

通过添加 `.navbar-inverse` 类可以改变导航条的外观。

## 10.媒体

![](/blogimg/Bootstrap/pc15.png)

```html
<ul class="media-list">
  <li class="media">
    <div class="media-left">
      <a href="#">
        <img class="media-object" src="..." alt="...">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">Media heading</h4>
      ...
    </div>
    <div class="media-right">
      <h4 class="media-heading">Media heading</h4>
      ...
    </div>
  </li>
</ul>
```

`.pull-left` 和 `.pull-right` 这两个类以前也曾经被用在了媒体组件上，但是，从 v3.3.0 版本开始，他们就不再被建议使用了。`.media-left` 和 `.media-right` 替代了他们，不同之处是，在 html 结构中， `.media-right` 应当放在 `.media-body` 的后面。

装载图片盒子的可选参数`media-top` 、`media-middla`、`media-bottom`让其与右边的文字上、中、下对齐

```html
<ul class="media-list">
  <li class="media">
    <div class="media-left media-middle">
      <a href="#">
        <img class="media-object" src="..." alt="...">
      </a>
    </div>
    <div class="media-body">
		...
    </div>
  </li>
</ul>
```

## 11.提示框

在标签上添加`data-toggle="tooltip" data-placement="显示的方向" title="显示的内容"`

![](/blogimg/Bootstrap/pc16.png)

```html
<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="Tooltip on right">Tooltip on right</button>
```

**要在js中引用**

```js
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
```



## 12.自定义样式按钮

**[链接](http://blog.koalite.com/bbg/)**

## 13.路径导航

![](/blogimg/Bootstrap/pc20.png)

```html
<ol class="breadcrumb">
  <li><a href="#">Home</a></li>
  <li><a href="#">Library</a></li>
  <li class="active">Data</li>
</ol>
```

## 14. 快速浮动

通过添加一个类，可以将任意元素向左或向右浮动。`!important` 被用来明确 CSS 样式的优先级。

>**不能用于导航条组件中**
>
>排列导航条中的组件时可以使用这些工具类：`.navbar-left` 或 `.navbar-right` 。 [参见导航条文档](https://v3.bootcss.com/components/#navbar-component-alignment)以获取更多信息。

### 踩到过的坑

## 1.高度设死导致内容溢出

正常：

![](/blogimg/Bootstrap/pc18.png)

样式崩塌：

![](/blogimg/Bootstrap/pc17.png)

原因：将包裹导航条的div`设死了高度`导致缩小到小设备屏幕的宽度时弹出的列表溢出显示导致样式崩塌

## to be continued

### 收获到的知识点

## 1.让内容垂直绝对居中

```css
.parent{
	display: flex;
    flex-direction: column; //垂直排布
    justify-content: center; //主轴居中
    align-items: center; //交叉轴居中
}
//子元素无需设置
```

## 2.更深刻的理解vertical-align

`vertical-middle`:把此元素放置在`父元素`的中部。

![](/blogimg/Bootstrap/pc19.png)

