<template>
    <div id='root'
        ref='root'>
        <view-nav :def-view='activeItem'
            @change='handleChange'></view-nav>
        <div class='page-container'
            flex='dir:top'>
            <div class='page-header'
                flex-box="0"
                flex='main:justify cross:center'>
                <div class='title'>{{pageTitle}}</div>
                <span v-show='countDown>0'
                    class='counter'
                    @click='stopClose'>自动关闭: {{countDown}}秒</span>
                <span v-show='countDown<=0'
                    class='counter'>请手动关闭</span>
            </div>
            <div class='page-content'
                flex-box="1">
                <encourager v-show='activeItem===ENCOURAGER'>
                </encourager>
                <common-API v-show='activeItem===COMMONAPI'></common-API>
                <web-config v-show='activeItem===WEB_CONFIG'></web-config>
                <test v-show='activeItem===TEST'></test>
            </div>
            <div class='page-footer'
                flex-box="0">
                广告位
            </div>
        </div>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import * as types from '@/store/types.js'
import ViewNav from '@/components/ViewNav.vue'
import CommonAPI from '@/views/CommonAPI.vue'
import Encourager from '@/views/Encourager.vue'
import WebConfig from '@/views/WebConfig.vue'
import Test from '@/test/Test.vue'
export default {
    components: {
        ViewNav,
        CommonAPI,
        Encourager,
        WebConfig,
        Test
    },
    data() {
        return {
            // TEST:
            activeItem: 'encourager',
            ENCOURAGER: 'encourager',
            COMMONAPI: 'common-API',
            WEB_CONFIG: 'web-config',
            TEST: 'test',
            // count down
            Countdowner: undefined,
            countDown: 0,
        };
    },
    computed: {
        pageTitle: function () {
            let pageTitle = ''
            switch (this.activeItem) {
                case this.TEST:
                    pageTitle = '测试页'
                    break;
                case this.ENCOURAGER:
                    pageTitle = '鼓励'
                    break;
                case this.COMMONAPI:
                    pageTitle = '常见API'
                    break;
                default:
                    console.log('未知activeItem:' + this.activeItem)
            }
            return pageTitle;
        }
    },
    created() {
        this.countDown = this.getters('setting').config.timeLast
        if (this.countDown > 0) {
            this.Countdowner = setInterval(() => {
                this.countDown--;
                if (this.countDown <= 0) {
                    this.invokeClose();
                }
            }, 1000)
        }
    },
    methods: {
        stopClose() {
            this.countDown = -1;
            clearInterval(this.Countdowner)
            this.sendMessage(cmds.STOP_CLOSE)
        },
        invokeClose() {
            console.log('关闭...')  // 无效发布消息 extension有计时自动关闭
        },
        handleChange(e) {
            this.activeItem = e;
        },
        handRootClock() {
            this.stopClose();
            // 移除终止监听
            this.$refs['root'].removeEventListener('click', this.handRootClock, true)
        },
    },
    mounted() {
        // 增加点击终止关闭监听
        this.$refs['root'].addEventListener('click', this.handRootClock, true)
    },
    beforeDestroy() {
        // not work 
        this.sendMessage(cmds.BEFORE_CLOSE)
    }
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
.page-container {
    height: 100%;
    .page-header {
        .title {
            font-size: 22px;
            font-weight: bold;
        }
        .counter {
            font-size: 12px;
            margin-right: 10px;
        }
    }
}
</style>



