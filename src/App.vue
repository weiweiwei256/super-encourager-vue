<template>
    <div id='root'>
        <div class='nav'
            ref='nav'
            @mouseover='handleOver'>
            <el-radio-group v-model="activeItem">
                <el-radio-button class="iconfont item"
                    :label='ENCOURAGER'>&#xe9d0;</el-radio-button>
                <el-radio-button class="iconfont item"
                    :label='COMMONAPI'>&#xe640;</el-radio-button>
            </el-radio-group>
        </div>
        <encourager v-show='activeItem===ENCOURAGER'>
        </encourager>
        <common-API v-show='activeItem===COMMONAPI'></common-API>
    </div>
</template>
<script>
import CommonAPI from '@/views/CommonAPI.vue'
import Encourager from '@/views/Encourager.vue'
export default {
  components: {
    CommonAPI,
    Encourager
  },
  data() {
    return {
      activeItem: 'encourager',
      ENCOURAGER: 'encourager',
      COMMONAPI: 'common-API',
      isMoveNav: false,
      yOffset: 0,
    };
  },
  methods: {
    handleOver() {
      let navDom = this.$refs['nav']
      navDom.style.cursor = 'move';
    }
  },
  mounted() {
    let navDom = this.$refs['nav']
    navDom.onmousedown = function (e) {
      let y = e.clientY;
      let t = navDom.offsetTop;
      this.yOffset = y - t;
      this.isMoveNav = true;
      navDom.style.cursor = 'move';
    }
    navDom.onmousemove = function (e) {
      if (this.isMoveNav == false) {
        return;
      }
      var ny = e.clientY;
      var nt = ny - this.yOffset;
      navDom.style.top = nt + 'px';
    }
    navDom.onmouseup = function () {
      //开关关闭
      this.isMoveNav = false;
      navDom.style.cursor = 'default';
    }
  }
};
</script>
<style lang='less' scoped>
html,
body,
#app,
#root,
.main {
    height: 100%;
    margin: 0;
}
.nav {
    position: absolute;
    width: 20px;
    top: 40%;
    word-break: break-word;
    border: 1px solid black;
    text-align: center;
    border-radius: 11px;
    padding-top: 6px;
    padding-bottom: 6px;
    z-index: 10;
    /deep/ .el-radio-button__inner {
        border: none !important;
        border-radius: 2px !important;
        padding: 0;
    }
    /deep/ .el-radio-button__orig-radio {
        margin: 0;
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: darkgrey;
        box-shadow: none;
    }
    .item {
        margin-top: 3px;
        margin-bottom: 3px;
    }
}
@font-face {
    font-family: 'iconfont';
    src: url('./assets/font/iconfont.eot');
    src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
        url('./assets/font/iconfont.woff2') format('woff2'),
        url('./assets/font/iconfont.woff') format('woff'),
        url('./assets/font/iconfont.ttf') format('truetype'),
        url('./assets/font/iconfont.svg#iconfont') format('svg');
}
.iconfont {
    font-family: 'iconfont' !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
