<template>
    <div id="web-config">
        <el-form ref="form"
            class='main-form'
            :model="webConfig"
            label-suffix=':'
            label-width="200px">
            <el-form-item label="美图关键字"
                id='keyword'>
                <el-input type="textarea"
                    placeholder="设置美图关键字,用空格分隔多个关键字"
                    @blur='saveKeyword'
                    autosize
                    :rows='3'
                    v-model="webConfig.config.keyword">
                </el-input>
            </el-form-item>
            <el-form-item label="鼓励时间(秒)"
                id='timeLast'>
                <el-input-number v-model="webConfig.config.timeLast"
                    :min="0"
                    :step="5">
                </el-input-number>
            </el-form-item>
            <el-form-item label="鼓励方式"
                id='type'>
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
            <el-form-item label="时间间隔(分钟)"
                id='timeInterval'>
                <el-input-number v-model="webConfig.config.timeInterval"
                    :disabled="webConfig.config.type!=='time-interval'"
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
            isInit: false,
            webConfig: {}
        }
    },
    watch: {
        // 深度watch每一个值的变化 初次init时不触发属性监听
        "webConfig.config.timeLast": function (newVal) {
            this.isInit && this.setConifg('config', 'timeLast', newVal)
        },
        "webConfig.config.type": function (newVal) {
            this.isInit && this.setConifg('config', 'type', newVal)
        },
        "webConfig.config.timeInterval": function (newVal) {
            this.isInit && this.setConifg('config', 'timeInterval', newVal)
        },
        "webConfig.config.needTip": function (newVal) {
            this.isInit && this.setConifg('config', 'needTip', newVal)
        },
        "webConfig.config.isGif": function (newVal) {
            this.isInit && this.setConifg('config', 'isGif', newVal)
        },
        "webConfig.config.maxImageNum": function (newVal) {
            this.isInit && this.setConifg('config', 'maxImageNum', newVal)
        },
        "webConfig.globalState.encourager.hitokoto_type": function (newVal) {
            this.isInit && this.setConifg('globalState', 'hitokoto_type', newVal, 'encourager')
        },
    },
    created() {
        this.webConfig = this.getters('setting')
        this.$nextTick(() => {
            this.isInit = true;
        })
    },
    methods: {
        /** 
         * 由于用户每输入一个字符都会触发input的model的改变 所以在blur 统一保存
        */
        saveKeyword() {
            // 处理换行问题
            let keyword = this.webConfig.config.keyword.replace(/[\r\n]/g, " ");
            this.setConifg('config', 'keyword', keyword)
        },
        /**
         *  scope 属性所属域: config,extra,globalState
         *  sub:当scope = globalState有效 用于指定对哪个分页的设置
         *  key: 属性key
         *  value: 属性值
         */
        setConifg(scope, key, value, sub = undefined) {
            this.sendMessage(cmds.UPDATE_WEB_CONFIG, { scope, sub, key, value })
        },
        reset() {
            this.webConfig = {
                config: {
                    keyword: '石原里美 绿色森林 新垣结衣 ⭐我的最爱',
                    timeLast: 20,
                    type: 'natural-hour',
                    timeInterval: 30,
                    needTip: false,
                    maxImageNum: 40,
                    isGif: false,
                },
                extra: {
                    rootPath: 'rootPath',
                    activeDriver: false,
                },
                globalState: {
                    encourager: { hitokoto_type: '' },
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
