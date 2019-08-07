<template>
    <div>
        手机端访问，电脑端暂时没有写对应事件
        <!-- <div>
      <button @click="add">+</button>
      <button @click="sub">-</button>
    </div> -->
        <!-- <div class="img">
      <img src="@/assets/logo.png" alt="" :style="`transform: translate3d(-50%, -50%, 0) scale(${scaleVal})`">
    </div> -->

        <div class="outer" ref="outer" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <ul class="inner" :style="`transform: translate3d(${x}px, 0, 0);transition: ${isTransition ? 'transform .4s' : ''}`" @transitionend="transitionend">
                <li v-for="(item, index) in 4" :key="index" :style=" `width: ${liWidth}px` ">
                    <img class="swiper-img" :src="require(`../assets/${index}.jpg`)" alt="">
                </li>
                <li :style=" `width: ${liWidth}px` ">
                    <img class="swiper-img" src="@/assets/0.jpg" alt="">
                </li>
            </ul>
        </div>
        <div>当前索引为：{{index}}</div>
        <div>
            <label>
                是否开启循环:
                <input type="checkbox" v-model="loop">
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            liWidth: 0,
            scaleVal: 1,
            x: 0,
            index: 0,
            loop: false,
            isTransition: false,
        };
    },
    mounted() {
        this.liWidth = this.$refs.outer.offsetWidth;
        this.minDivX = -(4 * this.liWidth);
        this.maxDivX = 0;
    },
    methods: {
        add() {
            this.scaleVal = this.scaleVal + 0.2;
        },
        sub() {
            if (this.scaleVal > 1) {
                this.scaleVal = this.scaleVal - 0.2;
            }
        },
        touchStart(e) {
            this.canBeMove = true;
            this.startX = e.targetTouches[0].pageX;
            this.startTempX = this.x;
        },
        touchMove(e) {
            if (!this.canBeMove) return;

            this.moveX = e.targetTouches[0].pageX;
            this.mouseDistance = this.moveX - this.startX;
            this.x = this.startTempX + this.mouseDistance;
        },
        touchEnd(e) {
            this.isTransition = true;
            if (this.x > this.maxDivX) {
                if (this.loop) {
                    this.index = 3;
                    this.x = -this.index * this.liWidth;
                    return;
                } else {
                    this.x = this.maxDivX;
                }
            }
            if (this.x < this.minDivX) {
                if (this.loop) {
                    this.index = 0;
                    this.x = -this.index * this.liWidth;
                    return;
                } else {
                    this.x = this.minDivX;
                }
            }
            if (Math.abs(this.x - this.startTempX) > 100) {
                if (this.mouseDistance < 0) {
                    this.x = -this.index * this.liWidth - this.liWidth;
                    this.index++;
                }
                if (this.mouseDistance > 0) {
                    this.x = -this.index * this.liWidth + this.liWidth;
                    this.index--;
                }
            } else {
                this.x = this.startTempX;
            }
        },
        transitionend() {
            this.isTransition = false;
        }
    }
};
</script>

<style scoped>
.img {
    height: 30rem;
    margin-top: 2rem;
    border: 1px solid #cccc;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}
.img > img {
    position: absolute;
    top: 50%;
    left: 50%;
}

.outer {
    width: 100%;
    max-width: 500px;
    height: 355px;
    overflow: hidden;
}
.inner {
    /* display: flex; */
    height: 100%;
    white-space: nowrap;
}
.inner > li {
    height: 100%;
    display: inline-block;
}
.swiper-img {
    width: 100%;
    height: 100%;
}
ul {
    padding: 0;
    margin: 0;
}
li {
    list-style-type: none;
    white-space: nowrap;
}
</style>
