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
        <el-dialog title="简历心得"
            :visible.sync="showResumeTips"
            top='5vh'
            width="80%">
            <p>• 简历页数不要过少，正常有3,4年工作经验的简历怎么也得3,4页，别为了页数而压缩内容。</p>
            <p>• 公共信息展示: 博客浏览量（csdn广告太多本人不用了，掘金曝光高于简书）、开源项目、github、star数量等、对于公共资源的深入理解和改进。提供公共链接或二维码</p>
            <p>• 个人技能:</p>
            <p>○ 注意分类：要把相同类型的技术集中分类，切忌胡乱堆砌。 例如：要把git和svn放一类，基本专业性的体现。</p>
            <p>○ 主要描述：我的个人习惯如下</p>
            <p>§ 了解：自己没有实践，但是了解过定位和价值等信息</p>
            <p>§ 熟悉：自己实际使用过，有项目体现，但未深入底层源码或者深入研究原理</p>
            <p>§ 精通：自己深层次使用过，跟过底层代码，并可以独立解决疑难问题（精通要求很高，很可能会被追问，客观实际一点）</p>
            <p>• 项目经历：</p>
            <p>○ 建议将项目定位和价值说明清楚，可以与自己的定位和价值分开说明。最重要的是要有结果说明。例如多少人使用，成功交付，对公司的价值等等。如果是负责架构方面的工作，尽量上个架构图，绝对的亮点。</p>
            <p>○ 涉及到的技术可以分类罗列，难关攻克可以单独说明，但要避免陷入技术细节而且要有难度并体现自己的能力（准备好被追问）</p>
            <p>• 自我评价：</p>
            <p>○ 罗列要有清晰的角度分类。</p>
            <p>○ 一定要和上面的项目经历有呼应，相互增强和体现。</p>
            <p>○ 责任感，抗压能力，学习成长能力都可以说下，别草草了之。</p>
              注：RUNNERUP经历经验有限，仅有心得，特此分享。希望对你有帮助，欢迎补充。
            <span slot="footer"
                class="dialog-footer">
                <el-button type="primary"
                    @click="showResumeTips=false">确 定</el-button>
            </span>
        </el-dialog>
        <el-drawer title="伴鱼内推"
            :visible.sync="showAd"
            size='60'
            direction="btt">
            <p>RUNNERUP所在的伴鱼内推:前端，后端，客户端，产品，运营等等岗位 工作地点:北京 可年后入职
                <p style='font-size: 15px;'>公司简介:<br>
                    北京读我科技有限公司(伴鱼)刚刚完成C轮融资，公司的各个方面都处于快速发展阶段。成立至今已经4年，目前伴鱼拥有超过1W优质外教，1200W注册用户，20W付费学员。成功打造伴鱼少儿英语，伴鱼绘本，伴鱼英语等一系列非常受欢迎的教育产品。p6:30-50k p7:40-70k，p8待遇看面试结果，公司财务健壮，融资顺利。多个业务线负责人/专家岗虚位以待。双休，没有996！每个月有2600额外补贴，中午午休两个小时，下午休一个小时，办公楼下就是公园，随时遛弯跑步！健康生活、快乐工作。
                    <p style='font-size: 15px;'>自评:本人负责伴鱼少儿英语学生端，老师端以及增长等相关业务开发(H5+小程序)。19年3月入职。
                        <ul style='font-size: 13px;'>
                            <li>公司薪资水平很不错，本人就涨了不少。</li>
                            <li>工作是有一定压力和强度的，公司正处于快速发展阶段。所以混日子养老或没啥本事爱玩权谋的就自觉退让吧。这里不会有狼性的洗脑，但也是某种意义上的战场。</li>
                            <li>这里会不断接近你能力上限，挖掘你的潜力，让你能完成质变的成长。本人就成长了很多。例如这次鼓励师的更新，在没耽误正常工作的情况下，前前后后2周左右完成。这放到以前基本没可能。现在感觉自己可以做很多很多的事。都开始膨胀了：P</li>
                            <li>再说说福利，六险一金，住房公积金按最高标准，住的近有租房补助，远的有打车补助，电脑补助，下午茶。过个节还要搞点事情（程序员节我抽了个大恐龙：p）</li>
                            <li>技术氛围浓厚。vue和react我们都有深度使用和丰富的经验积累。而且公司很关注大家的技术成长，部门间，部门内技术交流是每周日常。另外我们比较关注前沿技术和最新动态：最新的chrome更新，最新的ES10内容，大厂的技术方向都是我们的议题 。技术我就罗列点关键字：gitlab，ci，cd，sentry，yapi，jenkins，confluence，jira，jumpserver，kibana...你自己了解下。</li>
                        </ul>
                        其他想要了解的也可以邮件交流 简历内推email：(点击即可编辑邮件)
                        <a href="mailto:super_encourager@163.com?subject=伴鱼内推&body=祝好；">super_encourager@163.com</a>
                        我每天都会处理并及时答复</p>
                    <p>福利: <el-link type="primary"
                            @click="showResumeTips=true">简历编辑心得,点击查看</el-link>
                    </p>
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
            // activeItem: 'test',
            activeItem: 'encourager', // 需是全局全局page常量
            // count down
            Countdowner: undefined,
            countDown: 0,
            driver,
            showResumeTips: false,
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



