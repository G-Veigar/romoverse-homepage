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
        <img
          class="greed-star-big"
          :class="{'animate__animated': page === 2, 'animate__jello': page === 2}"
          src="../assets/green-star-big.png"
          alt="">
        <img
          class="green-star-mini2"
          src="../assets/green-star-mini2.png" alt="">
        <img
          class="green-star"
          src="../assets/green-star.png"
          alt="" />
      </div>
      <div class="section four">
        <div class="img-block">
          <img class="star-red" src="../assets/star-red.png" alt="">
          <img class="star-yellow" src="../assets/star-yellow.png" alt="">
          <img class="star-purple" src="../assets/star-purple.png" alt="">
          <img class="airship-big" src="../assets/airship-big.png" alt="">
        </div>
      </div>
      <div class="section five">
        <div class="section-wrapper">
          <div class="section-part section-left">left</div>
          <div class="section-part section-middle">middle</div>
          <div class="section-part section-right">
            <div class="avatar-wrapper">
              <img class="avatar-item" :class="{active: activeAvatar === 4753}" src="../assets/avatar/4753.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4754}" src="../assets/avatar/4754.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4755}" src="../assets/avatar/4755.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4756}" src="../assets/avatar/4756.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4757}" src="../assets/avatar/4757.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4758}" src="../assets/avatar/4758.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4759}" src="../assets/avatar/4759.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4760}" src="../assets/avatar/4760.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4761}" src="../assets/avatar/4761.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4762}" src="../assets/avatar/4762.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4763}" src="../assets/avatar/4763.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4764}" src="../assets/avatar/4764.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4765}" src="../assets/avatar/4765.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4766}" src="../assets/avatar/4766.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4767}" src="../assets/avatar/4767.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4768}" src="../assets/avatar/4768.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4769}" src="../assets/avatar/4769.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4770}" src="../assets/avatar/4770.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4771}" src="../assets/avatar/4771.png" alt="">
              <img class="avatar-item" :class="{active: activeAvatar === 4772}" src="../assets/avatar/4772.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="section end">
        <img class="planet-big" src="../assets/planet-big.png" alt="">
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
      activeAvatar: 4758,
    };
  },
  methods: {
    randomAvatar() {
      this.activeAvatar = 4753 + Math.floor(Math.random() * (4772 - 4753));
    },
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
    setInterval(this.randomAvatar, 1000);
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
    // linear-gradient(180deg, #BB6F79 0%, #287EAB 100%);
    linear-gradient(180deg, #260E36 0%, #4682B4 100%);
    // transition: all 0.8s;

    // &.active {
    //   background: linear-gradient(180deg, #260E36 0%, #000000 100%);
    // }

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

    .img-block {
      position: absolute;
      left: 150px;
      bottom: 30px;
      width: 500px;
      height: 500px;

      .star-red {
        width: 67px;
        height: 67px;
        position: absolute;
        bottom: 190px;
        left: 400px;
      }

      .star-yellow {
        position: absolute;
        bottom: 500px;
        left: 450px;
        width: 55px;
      }

      .star-purple {
        position: absolute;
        width: 61px;
        left: 0;
      }

      .airship-big {
        position: absolute;
        left: 0px;
        bottom: 30px;
        width: 405px;
      }
    }
  }

  &.five {
    background-color: #250937;

    .section-wrapper {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .section-part {
      flex: 1;
    }

    .section-right {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 0;
    }

    .avatar-item {
      width: 90px;
      height: 90px;
      margin-left: 6px;
      margin-bottom: 6px;
      opacity: 0.5;
      transition: all 0.5s;

      &.active {
        opacity: 1;
      }
    }
  }

  &.end {
    background: linear-gradient(180deg, #000000 12.51974105834961%, #B75FA0 100%);

    &.active {
      .planet-big {
        right: 6vw;
      }
    }

    .planet-big {
      width: 745px;
      position: absolute;
      bottom: 100px;
      right: 25vw;
      transition: all 1s;
    }

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
