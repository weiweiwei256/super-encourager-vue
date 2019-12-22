<template>
    <div id='root'
        ref='root'>
        <view-nav :def-view='activeItem'
            @change='handleChange'></view-nav>
        <div class='page-container'
            flex='dir:top'>
            <div class='page-header'
                flex-box="0"
                flex='main:first cross:center'>
                <div flex-box='1'
                    class='title'>{{pageTitle}}</div>
                <el-button class='use-driver'
                    size='mini'
                    @click.stop='invokeDriver'>使用向导</el-button>
                <span v-show='countDown>0'
                    class='counter'
                    @click='stopClose'>自动关闭: {{countDown}}秒</span>
                <span v-show='countDown<=0'
                    class='counter'>请手动关闭</span>
            </div>
            <div class='page-content'
                flex-box="1">
                <encourager v-if='activeItem===ENCOURAGER'>
                </encourager>
                <common-API v-if='activeItem===COMMONAPI'></common-API>
                <tools v-if='activeItem===TOOLS'></tools>
                <entertainment v-if='activeItem===ENTERTAINMENT'></entertainment>
                <recommendation v-if='activeItem===RECOMMENDATION'></recommendation>
                <web-config v-show='activeItem===WEB_CONFIG'></web-config>
                <about v-show='activeItem===ABOUT'></about>
                <test v-if='activeItem===TEST'></test>
            </div>
        </div>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import * as types from '@/store/types.js'
import driver from './global/driver.js'
import "./app.less"
import ViewNav from '@/views/ViewNav.vue'
import CommonAPI from '@/views/CommonAPI.vue'
import Encourager from '@/views/Encourager.vue'
import WebConfig from '@/views/WebConfig.vue'
import Tools from '@/views/Tools.vue'
import Entertainment from '@/views/Entertainment.vue'
import About from '@/views/About.vue'
import Recommendation from '@/views/Recommendation.vue'
import Test from '@/test/Test.vue'
export default {
    components: {
        ViewNav,
        CommonAPI,
        Encourager,
        WebConfig,
        Tools,
        Entertainment,
        About,
        Recommendation,
        Test
    },
    data() {
        return {
            activeItem: 'encourager', // 需是全局全局page常量
            // count down
            Countdowner: undefined,
            countDown: 0,
            driver,
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
                case this.TOOLS:
                    pageTitle = '常见工具'
                    break;
                case this.RECOMMENDATION:
                    pageTitle = '推荐页'
                    break;
                case this.ENTERTAINMENT:
                    pageTitle = '娱乐'
                    break;
                case this.WEB_CONFIG:
                    pageTitle = '设置'
                    break;
                case this.ABOUT:
                    pageTitle = '关于'
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
                    this.stopClose();
                }
            }, 1000)
        }
        if (process.env.NODE_ENV === 'development') {
            this.activeItem = 'recommendation'
            // this.activeItem ='test'
        }
    },
    methods: {
        invokeDriver() {
            this.driver.start();
        },
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
        .use-driver {
            padding: 5px 10px;
            font-size: 12px;
            margin-right: 10px;
        }
        .counter {
            font-size: 12px;
            margin-right: 10px;
        }
    }
    .page-content {
        margin-left: 40px;
    }
    .page-footer {
        text-align: center;
        color: #409eff;
    }
}
</style>



