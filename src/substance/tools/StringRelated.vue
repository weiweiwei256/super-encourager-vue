<template>
    <div id='string-related'>
        <div class='main-container'
            flex='box:first'>
            <div class='operation'>
                <el-button size='mini'
                    @click='encodeUnicode'>Unicode编码</el-button>
                <el-button size='mini'
                    @click='decodeUnicode'>Unicode解码</el-button>
                <el-button @click='handleEncodeURI'
                    size='mini'>encodeURI</el-button>
                <el-button @click='handleDecodeURI'
                    size='mini'>decodeURI</el-button>
                <el-button @click='handleEncodeURIComponent'
                    size='mini'>encodeURICpt</el-button>
                <el-button @click='handleDecodeURIComponent'
                    size='mini'>decodeURICpt</el-button>
                <el-button size='mini'
                    @click='encodeMD5'>md5加密</el-button>
                <el-button @click='formatJson'
                    size='mini'>Json格式化</el-button>
            </div>
            <div class='string-input'>
                <el-input type="textarea"
                    placeholder="请输入内容"
                    v-model="stringModal"
                    :rows="15"></el-input>
            </div>
        </div>

    </div>
</template>

<script>

import crypto from 'crypto'
export default {
    name: 'string-related',
    data() {
        return {
            stringModal: '这是一段测试文本'
        }
    },
    methods: {
        encodeUnicode() {
            this.stringModal = escape(this.stringModal)
        },
        decodeUnicode() {
            this.stringModal = unescape(this.stringModal)
        },
        handleEncodeURI() {
            this.stringModal = encodeURI(this.stringModal)
        },
        handleDecodeURI() {
            this.stringModal = decodeURI(this.stringModal)
        },
        handleEncodeURIComponent() {
            this.stringModal = encodeURIComponent(this.stringModal)
        },
        handleDecodeURIComponent() {
            this.stringModal = decodeURIComponent(this.stringModal)
        },
        encodeMD5() {
            this.stringModal = crypto.createHash("md5").update(this.stringModal).digest('hex')
        },
        formatJson() {
            try {
                this.stringModal = JSON.stringify(JSON.parse(this.stringModal), null, "\t")
            } catch (err) {
                this.$message('请确认该文本符合Json语法!')
            }
        }

    }
}
</script>
<style lang='less' scoped >
#string-related {
    .operation {
        width: 240px;
        padding-right: 5px;
        /deep/ .el-button {
            margin-left: 5px;
            margin-bottom: 5px;
            min-width: 115px;
            padding: 7px 14px;
        }
    }
}
</style>
