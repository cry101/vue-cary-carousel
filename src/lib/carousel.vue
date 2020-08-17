<template>
    <div
        ref="carousel"
        class="vue-carousel"
        :style="styleObject"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleTouchStart"
        @mousemove="handleTouchMove"
        @mouseup="handleTouchEnd"
        @mouseleave="handleTouchEnd">
        <div
            ref="wrap"
            class="wrap"
            :style="imageStyle"
        >
            <img
                v-for="(item, index) in list"
                ref="img"
                :key="index"
                :src="item"
                :class="{'shadow': shadow}"
                draggable="false"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueCaryCarousel',
    props: {
        list: {
            type: Array,
            required: true,
            default: () => []
        },
        height: {
            type: Number,
            default: 400
        },
        imgWidth: {
            type: Number,
            default: 120
        },
        imgHeight: {
            type: Number,
            default: 160
        },
        translateZ: {
            type: Number,
            default: 300
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        delay: {
            type: Number,
            default: 3000
        },
        shadow: {
            type: Boolean,
            default: true
        },
        rotateX: {
            type: Number,
            default: -10
        }
    },
    data() {
        return {
            flag: false, // 按压判断
            lastX: 0,
            lastY: 0,
            minusX: 0,
            minusY: 0,
            roY: 0,
            roX: 0,
            timer: null,
            timeplayer: null,
            transtion: ''
        }
    },
    computed: {
        styleObject() {
            return {
                height: this.height + 'px'
            }
        },
        imageStyle() {
            return {
                width: this.imgWidth + 'px',
                height: this.imgHeight + 'px',
                transform: 'rotateX(' + this.roX + 'deg) rotateY(' + this.roY + 'deg)',
                transition: this.transition
            }
        }
    },
    watch: {
        list() {
            this.init()
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
        this.timer && clearInterval(this.timer)
        this.timeplayer && clearInterval(this.timeplayer)
    },
    methods: {
        init() {
            if (this.rotateX) {
                this.roX = this.rotateX // 初始化倾斜角度
            }
            this.$nextTick(() => {
                let oImg = this.$refs.img
                if (oImg) {
                    let oImgLength = oImg.length
                    let deg = 360 / oImgLength

                    for (let i = 0; i < oImgLength; i++) { // 环形出现
                        oImg[i].style.transform = 'rotateY(' + i * deg + 'deg) translateZ(' + this.translateZ + 'px)'
                        oImg[i].style.transition = 'transform 1s ' + (oImgLength - 1 - i) * 0.1 + 's'
                    }

                    this.start()
                }
            })
        },
        start() {
            if (this.autoplay) { // 自动轮播
                const that = this
                let oImg = this.$refs.img
                let oImgLength = oImg.length
                let deg = 360 / oImgLength
                this.transition = 'all .5s'
                this.timeplayer = setInterval(() => {
                    that.roY -= deg
                }, this.delay || 3000)
            } else {
                this.stop()
            }
        },
        stop() {
            this.transition = ''
            this.timeplayer && clearInterval(this.timeplayer)
        },
        handleTouchStart(ev) {
            ev = ev || window.event
            this.lastX = ev.clientX || ev.touches[0].clientX // 移动端和pc端兼容
            this.lastY = ev.clientY || ev.touches[0].clientY
            this.flag = true
            this.stop()
        },
        handleTouchMove(ev) {
            if (!this.flag) return

            ev = ev || window.event

            this.timer && clearInterval(this.timer)

            let nowX = ev.clientX || ev.touches[0].clientX
            let nowY = ev.clientY || ev.touches[0].clientY

            // 坐标差值
            this.minusX = nowX - this.lastX
            this.minusY = nowY - this.lastY

            // 更新wrap的旋转角度，拖拽越快-> minus变化大 -> roY变化大 -> 旋转快
            this.roY += this.minusX * 0.2 // roY = roY + minusX*0.2;
            this.roX -= this.minusY * 0.1

            // 保存旧坐标
            this.lastX = nowX
            this.lastY = nowY
        },
        handleTouchEnd() {
            if (!this.flag) return
            const that = this
            this.timer = setInterval(() => {
                that.minusX *= 0.95
                that.minusY *= 0.95
                that.roY += that.minusX * 0.2 // roY = roY + minusX*0.2;
                that.roX -= that.minusY * 0.1

                if (Math.abs(that.minusX) < 0.1 && Math.abs(that.minusY) < 0.1) {
                    clearInterval(that.timer)
                }
            }, 13)
            this.flag = false
            this.start()
        }
    }
}
</script>

<style scoped>
.vue-carousel{
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
}
.wrap{
    margin: 0 auto;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(0deg) rotateY(0deg);
    user-select: none;
    -webkit-user-drag: none;
}
.wrap img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    border-radius: 1px;
    transform: rotateY(0deg) translateZ(0px);
    user-select: none;
    -webkit-user-drag: none;
}

.wrap img.shadow{
    -webkit-box-reflect: below 5px -webkit-linear-gradient(top,rgba(0,0,0,0) 40%,rgba(0,0,0,0.5) 100%);
}

</style>
