<template>
    <div>
        我这边是index页面呢
        <!-- <div>
      <button @click="add">+</button>
      <button @click="sub">-</button>
    </div> -->
        <!-- <div class="img">
      <img src="@/assets/logo.png" alt="" :style="`transform: translate3d(-50%, -50%, 0) scale(${scaleVal})`">
    </div> -->

        <div class="outer" ref="outer">
            <ul class="inner" :style="`transform: translate3d(${moveX}px, 0, 0)`" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
                <li v-for="(item, index) in 4" :key="index" :style=" `width: ${liWidth}px` ">
                    <img class="swiper-img" :src="require(`../assets/${index}.jpg`)" alt="">
                </li>
            </ul>
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
            moveX: 0
        };
    },
    mounted() {
        this.liWidth = this.$refs.outer.offsetWidth;
        this.minLeft = -(3 * this.liWidth);
        this.maxLeft = 0;
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
            this.offsetLeft = this.startX - this.moveX;
            this.startMoveX = this.moveX;
        },
        touchMove(e) {
            if (!this.canBeMove) return;
            // console.log(this.startMoveX + this.liWidth);
            // if (this.startMoveX - this.liWidth < this.minLeft || this.startMoveX + this.liWidth > this.maxLeft) return;
            this.moveX = e.targetTouches[0].pageX - this.offsetLeft;
            this._moveX = e.targetTouches[0].pageX;
            if (Math.abs(this._moveX - this.startX) > 100) {
                this.canBeMove = false;
                if (this._moveX - this.startX < 0) {
                    // console.log(this.startMoveX - this.liWidth);
                    // if (this.startMoveX - this.liWidth < this.minLeft) {
                    //     this.moveX = this.minLeft;
                    //     return;
                    // }
                    this.moveX = this.startMoveX - this.liWidth;
                }
                if (this._moveX - this.startX > 0) {
                    // console.log(this.moveX);
                    // if (this.startMoveX + this.liWidth > this.maxLeft) {
                    //     this.movex = this.maxLeft;
                    //     return;
                    // }
                    this.moveX = this.startMoveX + this.liWidth;
                }
            }
            // console.log('moveX', this.moveX);
        },
        touchEnd(e) {
            this.canBeMove = false;
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
    width: 500px;
    height: 355px;
    overflow: hidden;
}
.inner {
    display: flex;
    height: 100%;
    transition: transform 0.2s;
}
.inner > li {
    height: 100%;
}
.swiper-img {
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
