<template>
    <div id='image-cropper'>
        <div class="cropper-wrap">
            <img id="image"
                :src="base64"
                class="user-image">
        </div>
        <div class='main-operation'>
            <el-button type='primary'
                @click='getImage'>
                选择图片
            </el-button>
            <el-button @click='showSaveDialog=true'>
                保存
            </el-button>
        </div>
        <div class='assist'
            flex='dir:left box:first'>
            <div class='other-operation'>
                <p>其他操作</p>
                <el-button @click='handleScaleX'>
                    左右反转
                </el-button>
                <el-button @click='handleScaleY'>
                    上下反转
                </el-button>
                <el-button @click='cropper.rotate(degree*-1)'>
                    左旋转{{degree}}°
                </el-button>
                <el-button @click='cropper.rotate(degree)'>
                    右旋转{{degree}}°
                </el-button>
                <el-input-number v-model="degree"
                    :min="0"
                    :step="5"></el-input-number>
            </div>
            <div class='preview-container'>
                <p>预览区域 </p>
                <p class='detail'> {{cropWidth}}px*{{cropHeight}}px </p>
                <div class="preview"></div>
            </div>
        </div>
        <p>tips：剪切框可通过鼠标调整，原图可通过滚轮和鼠标缩放和拖动</p>
        <el-dialog title="提示"
            :visible.sync="showSaveDialog"
            width="60%"
            center>
            <el-input placeholder="请输入截图名称"
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
require('cropperjs/dist/cropper.css');
import Cropper from 'cropperjs';
import utils from '@/global/utils.js'
export default {
    name: 'image-cropper',
    data() {
        return {
            base64: '',
            cropper: undefined,
            degree: 45,
            fileName: '',
            showSaveDialog: false,
            scaleX: -1,
            scaleY: -1,
            cropHeight: 0,
            cropWidth: 0,
        };
    },
    async mounted() {
        let data = await this.sendMessage(cmds.GET_DEFAULT_IMAGE)
        this.base64 = data.base64;
        this.$nextTick(() => {
            this.cropper = this.createCropper();
        })
    },
    methods: {
        createCropper() {
            let image = document.getElementById('image');
            return new Cropper(image, {
                viewMode: 0,
                dragMode: "move",
                toggleDragModeOnDblclick: false,
                preview: '.preview',
                crop: (e) => {
                    var data = e.detail;
                    this.cropHeight = Math.round(data.height);
                    this.cropWidth = Math.round(data.width);
                },
            });
        },
        handleScaleX() {
            this.cropper.scaleX(this.scaleX)
            this.scaleX *= -1;
        },
        handleScaleY() {
            this.cropper.scaleY(this.scaleY)
            this.scaleY *= -1;
        },
        getImage() {
            let base64 = this.sendMessage(cmds.OPEN_DIALOG, { subpath: 'resources' })
            console.log(base64)
            this.base64 = base64;
        },
        save() {
            let base64 = this.cropper.getCroppedCanvas().toDataURL()
            this.sendMessage(cmds.SAVE_FILE, { saveData: base64, fileName: this.fileName + '.png' }).then(({ msg }) => {
                this.$message(msg);
            })
        }
    }
}
</script>

<style lang="less" scoped>
#image-cropper {
    text-align: center;
    .main-operation {
        margin-top: 20px;
    }
    .assist {
        .other-operation {
            text-align: center;
            width: 150px;
            .el-button {
                margin-left: 0;
                margin-bottom: 3px;
            }
            .el-input-number {
                width: 100%;
            }
        }
    }
    .preview-container {
        overflow: auto;
        position: relative;
        .detail {
            position: absolute;
            top: 0;
            right: 0;
        }
        .preview {
            clear: both;
            margin: 0 auto;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
}
</style>