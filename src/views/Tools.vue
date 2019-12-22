<template>
    <div id="tools">
        <div class='list'
            flex='main:center'>
            <el-radio-group v-model="activeTools">
                <el-radio-button :label='QR_CODE'>生成二维码</el-radio-button>
                <el-radio-button :label="DATE_TRANSFORM">日期<=>时间戳</el-radio-button>
                <el-radio-button :label="STRING_RELATED">字符串处理</el-radio-button>
                <el-radio-button :label="CALCULATOR">计算器</el-radio-button>
            </el-radio-group>
        </div>
        <div class='link-container'>
            <common-link url='https://doka.photo/'
                style='margin-right:20px'
                desc="`支持旋转，剪切，滤镜，标记等功能`">图片编辑</common-link>
            <common-link url='https://tinypng.com/'>图片压缩</common-link>
        </div>
        <div class='tool-container'>
            <QRcode v-if='activeTools===QR_CODE'></QRcode>
            <date-transform v-if='activeTools===DATE_TRANSFORM'></date-transform>
            <string-related v-if='activeTools===STRING_RELATED'></string-related>
            <calculator v-if='activeTools===CALCULATOR'></calculator>
        </div>
        <div class='introduction'>
            <el-link href='https://github.com/weiweiwei256/super-encourager/issues/5'>说说你还想要啥工具</el-link>
        </div>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
import QRcode from '@/substance/tools/QRcode.vue'
import DateTransform from '@/substance/tools/DateTransform.vue'
import StringRelated from '@/substance/tools/StringRelated.vue'
import Calculator from '@/substance/tools/Calculator.vue'
import CommonLink from '@/components/CommonLink.vue'
export default {
    name: 'tools',
    components: {
        QRcode,
        DateTransform,
        StringRelated,
        Calculator,
        CommonLink,
    },
    data() {
        return {
            webConfig: {},
            QR_CODE: 'qrcode',
            DATE_TRANSFORM: 'date-transform',
            STRING_RELATED: 'string-related',
            CALCULATOR: 'calculator',
            // TEST:
            activeTools: '',  // 需要与常量保持一致
        }
    },
    created() {
        this.webConfig = this.getters('setting').globalState
    },
    methods: {
        changeHiType() {
            this.sendMessage(cmds.UPDATE_WEB_CONFIG, { page: 'encourager', key: 'hitokoto_type', value: this.webConfig.hitokoto_type })
        }
    }
}
</script>
<style lang='less' scoped>
#tools {
    .list {
        /deep/ .el-radio-button__inner {
            padding: 10px;
            margin-left: 5px;
            margin-right: 5px;
            border-left: 1px solid;
            border-radius: 4px;
        }
    }
    .link-container {
        margin-top: 20px;
        text-align: center;
    }
    .tool-container {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .introduction {
        position: absolute;
        bottom: 300px;
        left: 0;
        right: 0;
        text-align: center;
    }
}
</style>
