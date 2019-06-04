---
layout: post
title: Vue-Music(day04)
categories: [Vue,Demo]
tags: 
- day04
date: 2019-6-4
---

## 第四天项目实战

1. 播放页面的组件（Player.vue）是在app.vue上使用的，默认覆盖整个可视区，它分为两个部分（迷你播放区、和正常页面的播放区），它们通过v-show（值为vuex里的FullScreen）来控制它的的显示跟隐藏<br><br>

## 收获

### 更加深一步的了解Vuex在实际开发中怎么去使用

- 知道了mapMutations、mapGetters、mapActions的用法

  ```js
  import { mapGetters, mapMutations, mapActions } from "vuex";
  
  ...mapActions(["selectPlay", "randomPlay"])
   ...mapGetters(["fullScreen", "playlist", "currentSong"])
   ...mapMutations({
        setFullScreen: "SET_FULL_SCREEN"
      })
  
  //此后在方法里面使用这些参数则默认带有$stroe.xxxx(对应触发的方法名)
  ```

  

 



