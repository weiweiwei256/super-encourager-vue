<template>
    <div id="web-config">
        <el-form ref="form"
            class='main-form'
            :model="webConfig"
            label-suffix=':'
            label-width="200px">
            <el-form-item label="美图关键字">
                <el-input type="textarea"
                    placeholder="设置美图关键字,用空格分隔多个关键字"
                    @blur='saveKeyword'
                    autosize
                    :rows='3'
                    v-model="webConfig.config.keyword">
                </el-input>
            </el-form-item>
            <el-form-item label="鼓励方式">
                <el-select v-model="webConfig.config.type"
                    placeholder="请选类型">
                    <el-option label="整点激活"
                        value="natural-hour"></el-option>
                    <el-option label="整半点激活"
                        value="natural-half-hour"></el-option>
                    <el-option label="特定时间间隔激活"
                        value="time-interval"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="持续时间(秒)">
                <el-input-number v-model="webConfig.config.timeLast"
                    :min="0"
                    :step="5">
                </el-input-number>
            </el-form-item>
            <el-form-item label="时间间隔(分钟)">
                <el-input-number v-model="webConfig.config.timeInterval"
                    :min="30"
                    :step="30">
                </el-input-number>
            </el-form-item>
            <el-form-item label="激活前提示">
                <el-switch v-model="webConfig.config.needTip"
                    active-text="消息提示"
                    inactive-text="直接激活">
                </el-switch>
            </el-form-item>
            <el-form-item label="搜索动图">
                <el-switch v-model="webConfig.config.isGif">
                </el-switch>
            </el-form-item>
            <el-form-item label="每个关键字最大图片数量">
                <el-input-number v-model="webConfig.config.maxImageNum"
                    :min="5"
                    :step="5">
                </el-input-number>
            </el-form-item>
            <el-form-item label="一言类型">
                <el-select v-model="webConfig.globalState.encourager.hitokoto_type"
                    @change="changeHiType"
                    placeholder="请选类型">
                    <el-option label="动画"
                        value="a"></el-option>
                    <el-option label="漫画"
                        value="b"></el-option>
                    <el-option label="游戏"
                        value="c"></el-option>
                    <el-option label="小说"
                        value="d"></el-option>
                    <el-option label="原创"
                        value="e"></el-option>
                    <el-option label="网络"
                        value="f"></el-option>
                    <el-option label="其他"
                        value="g"></el-option>
                    <el-option label="随机"
                        value=""></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-button @click='reset'>恢复默认属性</el-button>
    </div>
</template>
<script>
import * as cmds from '@/store/cmd-constant.js';
export default {
    name: 'web-config',
    components: {
    },
    props: {
    },
    data() {
        return {
            webConfig: {}
        }
    },
    watch: {
        // 深度watch每一个值的变化
        "webConfig.config.type": function (newVal, oldVal) {
            console.log(newVal)
        },
        "webConfig.config.timeLast": function (newVal, oldVal) {
            console.log(newVal)
        },
        "webConfig.config.timeInterval": function (newVal, oldVal) {
            console.log(newVal)
        },
        "webConfig.config.needTip": function (newVal, oldVal) {
            console.log(newVal)
        },
        "webConfig.config.isGif": function (newVal, oldVal) {
            console.log(newVal)
        },
        "webConfig.config.maxImageNum": function (newVal, oldVal) {
            console.log(newVal)
        },
        "webConfig.globalState.encourager.hitokoto_type": function (newVal, oldVal) {
            console.log(newVal)
        },
    },
    created() {
        this.webConfig = this.getters('setting')
    },
    methods: {
        saveKeyword() {
            // 处理换行问题
            console.log(this.webConfig.config.keyword.replace(/[\r\n]/g, " "))
        },
        changeHiType() {
            this.sendMessage(cmds.UPDATE_WEB_CONFIG, { page: 'encourager', key: 'hitokoto_type', value: this.webConfig.hitokoto_type })
        },
        reset() {
            this.webConfig = {
                config: {
                    keyword: '石原里美 绿色森林 新垣结衣 ⭐我的最爱',
                    type: 'natural-hour',
                    timeLast: 10,
                    timeInterval: 30,
                    needTip: false,
                    maxImageNum: 5,
                    isGif: false,
                },
                extra: {
                    rootPath: 'rootPath',
                    driver: false,
                },
                globalState: {
                    encourager: { hitokoto_type: 'c' },
                },
            }
        }
    }
}
</script>
<style lang='less' scoped>
#web-config {
    height: 100%;
    .main-form {
        margin: 0 auto;
        margin-top: 20px;
        width: 90%;
    }
}
</style>
