<template>
  <div class="home-main">
    <div id="fullpage">
      <div class="section one">
        one
      </div>
      <div class="section two">
        two
      </div>
      <div class="section three">
        <img class="cloud-img" src="../assets/cloud.webp" alt="">
        <img class="greed-star-big" src="../assets/green-star-big.png" alt="">
        <img class="green-star-mini2" src="../assets/green-star-mini2.png" alt="">
        <img class="green-star" src="../assets/green-star.png" alt="">
      </div>
      <div class="section four">
        <img class="airship-big" src="../assets/airship-big.png" alt="">
      </div>
      <div class="section five"></div>
      <div class="section end">
        <div class="copy-right">
          <div class="copy-right-main">
            © 2021-2025 by RomoVerse
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fullpage from 'fullpage.js';

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      fullPageIndex: 0,
      fullpage: null,
    };
  },
  watch: {
    page(newVal) {
      this.fullpage.moveTo(newVal + 1);
    },
  },
  mounted() {
    // eslint-disable-next-line no-new
    this.fullpage = new Fullpage('#fullpage', {
      afterLoad: (origin, destination) => {
        if (destination.index !== this.page) {
          this.$emit('update:page', destination.index);
        }
      },
      // options here
      autoScrolling: true,
      scrollHorizontally: true,
    });
  },
};
</script>

<style scoped lang="scss">
.section {
  margin: 0;
  background-repeat: no-repeat;
  background-size: auto 100%;
  position: relative;

  &.one {
    background-image: url('../assets/main-1.gif');
  }

  &.two {
    transition: all 0.8s;
    background-image: url('../assets/main-2.gif');
  }

  &.three {
    background:
    linear-gradient(180deg, #BB6F79 21.854686737060547%, #4682B4 91.72639846801758%, #287EAB 100%);
    .cloud-img {
      width: 455px;
      right: 0;
      position: absolute;
      top: 120px;
    }
    .greed-star-big {
      width: 600px;
      position: absolute;
      right: -110px;
      top: 160px;
    }
    .green-star-mini2 {
      position: absolute;
      left: 140px;
      top: 50%;
    }
    .green-star {
      position: absolute;
      bottom: 80px;
      left: 280px;
    }
  }

  &.four {
    background:
    linear-gradient(180deg, #4682B4 0%, #000000 100%);

    .airship-big {
      position: absolute;
      left: 150px;
      bottom: 30px;
      width: 405px;
    }
  }

  &.five {
    background-color: #250937;
  }

  &.end {
    background: linear-gradient(180deg, #000000 12.51974105834961%, #B75FA0 100%);

    .copy-right {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      position: absolute;
      bottom: 0;
      height: 100px;
      width: 100%;
      background: linear-gradient(180deg, #3F3F3F 0%, #000000 100%);
    }
  }
}
</style>
