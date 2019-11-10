<template>
    <div id='calculator'>
        <div style='text-align:center'>
            <el-button @click="changeModeEvent"
                round
                class='mode-btn'
                size='mini'>
                {{isNormalMode?"切换至高级模式":"切换至常规模式"}}</p>
            </el-button>
        </div>
        <input class="result"
            v-model="current" />
        <div class="container"
            v-if="isNormalMode">
            <button class="button"
                @click="press">7</button>
            <button class="button"
                @click="press">8</button>
            <button class="button"
                @click="press">9</button>
            <button class="button"
                @click="press">*</button>
            <button class="button"
                @click="press">&#60;=</button>
            <button class="button"
                @click="press">C</button>
            <button class="button"
                @click="press">4</button>
            <button class="button"
                @click="press($event)">5</button>
            <button class="button"
                @click="press">6</button>
            <button class="button"
                @click="press">/</button>
            <button class="button"
                @click="press">(</button>
            <button class="button"
                @click="press">)</button>
            <button class="button"
                @click="press">1</button>
            <button class="button"
                @click="press">2</button>
            <button class="button"
                @click="press">3</button>
            <button class="button"
                @click="press">-</button>
            <button class="button"
                @click="press">x ²</button>
            <button class="button"
                @click="press">±</button>
            <button class="button"
                @click="press">0</button>
            <button class="button"
                @click="press">.</button>
            <button class="button"
                @click="press">%</button>
            <button class="button"
                @click="press">+</button>
            <button class="button equal-sign"
                @click="press">=</button>
        </div>
        <div class="container"
            v-else>
            <button class="button"
                @click="press">sin</button>
            <button class="button"
                @click="press">cos</button>
            <button class="button"
                @click="press">tan</button>
            <button class="button"
                @click="press">x^</button>
            <button class="button"
                @click="press">&#60;=</button>
            <button class="button"
                @click="press">C</button>
            <button class="button"
                @click="press">log</button>
            <button class="button"
                @click="press">ln</button>
            <button class="button"
                @click="press">e</button>
            <button class="button"
                @click="press">∘</button>
            <button class="button"
                @click="press">rad</button>
            <button class="button"
                @click="press">√</button>
            <button class="button"
                @click="press">7</button>
            <button class="button"
                @click="press">8 </button>
            <button class="button"
                @click="press">9</button>
            <button class="button"
                @click="press">/</button>
            <button class="button"
                @click="press">x ²</button>
            <button class="button"
                @click="press">x !</button>
            <button class="button"
                @click="press">4</button>
            <button class="button"
                @click="press">5</button>
            <button class="button"
                @click="press">6</button>
            <button class="button"
                @click="press">*</button>
            <button class="button"
                @click="press">(</button>
            <button class="button"
                @click="press">)</button>
            <button class="button"
                @click="press">1</button>
            <button class="button"
                @click="press">2</button>
            <button class="button"
                @click="press">3</button>
            <button class="button"
                @click="press">-</button>
            <button class="button"
                @click="press">%</button>
            <button class="button"
                @click="press">±</button>
            <button class="button"
                @click="press">0</button>
            <button class="button"
                @click="press">.</button>
            <button class="button"
                @click="press">&#x003C0;</button>
            <button class="button"
                @click="press">+</button>
            <button class="button equal-sign"
                @click="press">=</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'calculator',
    data() {
        return {
            current: '',
            isNormalMode: true
        }
    },
    methods: {
        press: function press(event) {
            var key = event.target.textContent;

            if (key != '=' && key != 'C' && key != '*' && key != '/' && key != '√' && key != "x ²" && key != "%" && key != "<=" && key != "±" && key != "sin" && key != "cos" && key != "tan" && key != "log" && key != "ln" && key != "x^" && key != "x !" && key != "π" && key != "e" && key != "rad" && key != "∘") {
                this.current += key;
            } else if (key === '=') {

                if (this.current.indexOf('^') > -1) {
                    var base = this.current.slice(0, this.current.indexOf('^'));
                    var exponent = this.current.slice(this.current.indexOf('^') + 1);
                    this.current = eval('Math.pow(' + base + ',' + exponent + ')');
                } else {
                    this.current = eval(this.current);
                }
            } else if (key === 'C') {

                this.current = '';
            } else if (key === '*') {

                this.current += '*';
            } else if (key === '/') {

                this.current += '/';
            } else if (key === '+') {

                this.current += '+';
            } else if (key === '-') {

                this.current += '-';
            } else if (key === '±') {

                if (this.current.charAt(0) === '-') {
                    this.current = this.current.slice(1);
                } else {
                    this.current = '-' + this.current;
                }
            } else if (key === '<=') {

                this.current = this.current.substring(0, this.current.length - 1);
            } else if (key === '%') {

                this.current = this.current / 100;
            } else if (key === 'π') {

                this.current = this.current * Math.PI;
            } else if (key === 'x ²') {

                this.current = eval(this.current * this.current);
            } else if (key === '√') {

                this.current = Math.sqrt(this.current);
            } else if (key === 'sin') {

                this.current = Math.sin(this.current);
            } else if (key === 'cos') {

                this.current = Math.cos(this.current);
            } else if (key === 'tan') {

                this.current = Math.tan(this.current);
            } else if (key === 'log') {

                this.current = Math.log10(this.current);
            } else if (key === 'ln') {

                this.current = Math.log(this.current);
            } else if (key === 'x^') {

                this.current += '^';
            } else if (key === 'x !') {

                var number = 1;
                if (this.current === 0) {
                    this.current = '1';
                } else if (this.current < 0) {
                    this.current = NaN;
                } else {
                    var _number = 1;
                    for (var i = this.current; i > 0; i--) {
                        _number *= i;
                    }
                    this.current = _number;
                }
            } else if (key === 'e') {

                this.current = Math.exp(this.current);
            } else if (key === 'rad') {

                this.current = this.current * (Math.PI / 180);
            } else if (key === '∘') {

                this.current = this.current * (180 / Math.PI);
            }
        },
        changeModeEvent() {
            this.isNormalMode = !this.isNormalMode;
        }
    }
}
</script>

<style lang="less" scoped>
#calculator {
    .mode-btn {
        height: 27px;
        margin-bottom: 11px;
    }
    .result {
        display: block;
        margin: 0 auto;
        width: 402px;
        height: 50px;
        border-radius: 0px;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 30px;
    }
    .container {
        width: 415px;
        margin: 0 auto;
        margin-bottom: 10px;
        .button {
            margin: 3px;
            width: 63px;
            height: 30px;
            border-radius: 4px;
            cursor: pointer;
            outline: none;
        }
    }
}
</style>

