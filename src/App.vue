<template>
    <div id='root'>
        <div class='nav'
            ref='nav'
            @mouseover='handleOver'>
            <el-radio-group v-model="activeItem">
                <el-radio-button class="iconfont item"
                    :label='ENCOURAGER'>&#xe614;
                </el-radio-button>
                <el-radio-button class="iconfont item"
                    :label='COMMONAPI'>&#xe64f;</el-radio-button>
            </el-radio-group>
        </div>
        <encourager v-show='activeItem===ENCOURAGER'>
        </encourager>
        <common-API v-show='activeItem===COMMONAPI'></common-API>
        <test v-show='activeItem===TEST'></test>
    </div>
</template>
<script>
import CommonAPI from '@/views/CommonAPI.vue'
import Encourager from '@/views/Encourager.vue'
import Test from '@/test/Test.vue'
export default {
  components: {
    CommonAPI,
    Encourager,
    Test
  },
  data() {
    return {
      activeItem: '',
      ENCOURAGER: 'encourager',
      COMMONAPI: 'common-API',
      isMoveNav: false,
      yOffset: 0,

      TEST: 'test'
    };
  },
  created() {
    // this.activeItem = this.ENCOURAGER;
    // TEST
    this.activeItem = this.TEST;
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
<style lang='less'>
html,
body,
#app,
#root {
    user-select: none;
    height: 100%;
    margin: 0;
    color: auto;
    background: auto;
    // 全局修改element-ui样式
    /deep/ .el-link.el-link--default {
        color: inherit;
    }
    /deep/ .el-checkbox {
        color: inherit;
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
    font-size: 22px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="less" scoped>
.nav {
    position: absolute;
    width: 30px;
    top: 40%;
    word-break: break-word;
    border: 1px solid;
    text-align: center;
    border-radius: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    z-index: 10;

    .item {
        margin-top: 3px;
        margin-bottom: 3px;
        /deep/ .el-radio-button__inner {
            background-color: inherit;
            border: none;
            border-radius: 2px !important;
            padding: 0;
            font-size: 22px;
            color: inherit;
        }
        /deep/ .el-radio-button__orig-radio {
            margin: 0;
        }
        /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            box-shadow: none;
            border: 1px dashed;
            color: inherit;
        }
    }
}
</style>



