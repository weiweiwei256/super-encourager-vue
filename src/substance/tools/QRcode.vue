<template>
    <div id='qrcode'>
        <div flex='box:last'>
            <div class='property'>
                <el-form ref="form"
                    :model="properties"
                    label-width="80px">
                    <el-form-item label="内容">
                        <el-input type="textarea"
                            autosize
                            :rows="4"
                            v-model="properties.text"></el-input>
                    </el-form-item>
                    <el-form-item label="尺寸">
                        <el-input-number v-model="properties.size"
                            :min="0"
                            :step="50"></el-input-number>
                    </el-form-item>
                    <el-form-item label="容错级别">
                        <el-select v-model="properties.correctLevel">
                            <el-option label="极佳"
                                :value="2"></el-option>
                            <el-option label="高"
                                :value="3"></el-option>
                            <el-option label="中"
                                :value="0"></el-option>
                            <el-option label="底"
                                :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="外边距">
                        <el-input-number v-model="properties.margin"
                            :min="0"
                            :step="5"></el-input-number>
                    </el-form-item>
                    <el-form-item label="实点颜色">
                        <el-color-picker v-model="properties.colorDark"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="空白颜色">
                        <el-color-picker v-model="properties.colorLight"></el-color-picker>
                    </el-form-item>

                </el-form>
            </div>
            <div class='show'
                flex='main:center cross:center'>
                <vue-qr :text="properties.text"
                    ref='vue-qr'
                    :size='properties.size'
                    :dotScale='1'
                    :margin='properties.margin'
                    :colorDark='properties.colorDark'
                    :colorLight='properties.colorLight'
                    :correctLevel='properties.correctLevel'></vue-qr>
            </div>
        </div>
        <div class='footer'>
            <el-button @click.stop='showSaveDialog=true'>保存</el-button>
            <p>备注:由于精力与技术有限,暂仅支持保存二维码到特定目录:<br><b>{{savePath}}</b></p>
        </div>
        <el-dialog title="提示"
            :visible.sync="showSaveDialog"
            width="60%"
            center>
            <el-input placeholder="请输入二维码图片名"
                v-model="fileName">
                <template slot="append">.png</template>
            </el-input>

            <span slot="footer"
                class="dialog-footer">
                <el-button type="primary"
                    @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as cmds from '@/store/cmd-constant.js';
import VueQr from 'vue-qr'
export default {
    name: 'qrcode',
    data() {
        return {
            showSaveDialog: false,
            fileName: '',
            properties: {
                text: 'https://github.com/weiweiwei256/super-encourager',
                size: 200,
                correctLevel: 3,  //    { L: 1, M: 0, Q: 3, H: 2 };
                colorDark: '#000000',
                colorLight: '#ffffff',
                margin: 20
            }
        }
    },
    computed: {
        savePath() {
            return this.getters('setting').extra.rootPath + '/download'
        }
    },
    components: {
        VueQr
    },
    methods: {
        save() {
            this.showSaveDialog = false;
            let img = this.$refs['vue-qr'].$el
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let dataURL = canvas.toDataURL();
            this.sendMessage(cmds.SAVE_FILE, { saveData: dataURL, fileName: this.fileName + '.png' }).then(({ msg }) => {
                this.$message(msg);
            })
        }
    }
}
</script>

<style lang='less' scoped>
#qrcode {
    .show {
        overflow: auto;
    }
    .property {
        /deep/ .el-form-item {
            margin-bottom: 10px;
        }
        /deep/ .el-form-item__content {
            // line-height: 20px;
        }
    }
    .footer {
        text-align: center;
    }
}
</style>
