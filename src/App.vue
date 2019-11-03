<template>
    <div id='root'>
        <view-nav :def-view='activeItem'
            @change='handleChange'></view-nav>
        <encourager v-if='activeItem===ENCOURAGER'>
        </encourager>
        <common-API v-if='activeItem===COMMONAPI'></common-API>
        <test v-if='activeItem===TEST'></test>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import * as types from '@/store/types.js'
import ViewNav from '@/components/ViewNav.vue'
import CommonAPI from '@/views/CommonAPI.vue'
import Encourager from '@/views/Encourager.vue'
import Test from '@/test/Test.vue'
export default {
    components: {
        ViewNav,
        CommonAPI,
        Encourager,
        Test
    },
    data() {
        return {
            // TEST:
            activeItem: 'test',
            ENCOURAGER: 'encourager',
            COMMONAPI: 'common-API',
            TEST: 'test'
        };
    },
    methods: {
        handleChange(e) {
            this.activeItem = e;
        }
    },
};
</script>
<style lang='less'>
html,
body,
#app,
#root {
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



