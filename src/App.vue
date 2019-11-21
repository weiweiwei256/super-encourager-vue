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
                <web-config v-show='activeItem===WEB_CONFIG'></web-config>
                <about v-show='activeItem===ABOUT'></about>
                <test v-if='activeItem===TEST'></test>
            </div>
            <div class='page-footer'
                flex-box="0">
                <el-link @click.stop='showAd=true'
                    style='font-size:20px'>内推</el-link>
            </div>
        </div>
        <el-drawer title="伴鱼内推"
            :visible.sync="showAd"
            size='60'
            direction="btt">
            <p>RUNNERUP所在的伴鱼内推:前端，后端，客户端，产品，运营等等岗位 工作地点:北京 可年后入职
                <p style='font-size: 15px;'>公司简介:<br>
                    北京读我科技有限公司(伴鱼)刚刚完成C轮融资，公司的各个方面都处于快速发展阶段。成立至今已经4年，目前伴鱼拥有超过1W优质外教，1200W注册用户，20W付费学员。成功打造伴鱼少儿英语，伴鱼绘本，伴鱼英语等一系列非常受欢迎的教育产品。
                    <p style='font-size: 15px;'>自评:本人负责伴鱼少儿英语学生端，老师端以及增长等相关业务开发(H5+小程序)。19年3月入职。
                        <ul>
                            <li>公司薪资水平很不错，本人就涨了不少。</li>
                            <li>工作是有一定压力和强度的，公司正处于快速发展阶段。所以混日子养老或没啥本事爱玩权谋的就自觉退让吧。这里不会有狼性的洗脑，但也是某种意义上的战场。</li>
                            <li>这里会不断接近你能力上限，挖掘你的潜力，让你能完成质变的成长。本人就成长了很多。例如这次鼓励师的更新，在没耽误正常工作的情况下，前前后后2周左右完成。这放到以前基本没可能。现在感觉自己可以做很多很多的事。都开始膨胀了：P</li>
                            <li>再说说福利，六险一金，住房公积金按最高标准，住的近有租房补助，远的有打车补助，电脑补助，下午茶。过个节还要搞点事情（程序员节我抽了个大恐龙：p）</li>
                            <li>技术氛围浓厚。vue和react我们都有深度使用和丰富的经验积累。而且公司很关注大家的技术成长，部门间，部门内技术交流是每周日常。另外我们比较关注前沿技术和最新动态：最新的chrome更新，最新的ES10内容，大厂的技术方向都是我们的议题 。技术我就罗列点关键字：gitlab，ci，cd，sentry，yapi，jenkins，confluence，jira，jumpserver，kibana...你自己了解下。</li>
                        </ul>
                        其他想要了解的也可以邮件交流 简历内推email：(点击即可编辑邮件)
                        <a href="mailto:super_encourager@163.com?subject=伴鱼内推&body=祝好；">super_encourager@163.com</a>
                        我每天都会处理并及时答复</p>
        </el-drawer>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import * as types from '@/store/types.js'
import ViewNav from '@/views/ViewNav.vue'
import CommonAPI from '@/views/CommonAPI.vue'
import Encourager from '@/views/Encourager.vue'
import WebConfig from '@/views/WebConfig.vue'
import Tools from '@/views/Tools.vue'
import Entertainment from '@/views/Entertainment.vue'
import About from '@/views/About.vue'
import Test from '@/test/Test.vue'
import driver from './global/driver.js'
import "./app.less"
export default {
    components: {
        ViewNav,
        CommonAPI,
        Encourager,
        WebConfig,
        Tools,
        Entertainment,
        About,
        Test
    },
    data() {
        return {
            showAd: false,
            // TEST:
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



