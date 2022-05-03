<template>
  <div class="home-main">
    <div class="left-part"></div>
    <div class="main-cotent">
      <div class="main-title">MINT YOUR OWN ROMO</div>
      <div class="main-desc">“we all going to die, come watch tv”</div>

      <div class="mint-wrapper">
        <div class="mint-price-count">
          <div class="label-unit">
            <div class="label">MINT</div>
            <div class="unit">eth</div>
          </div>
          <div class="value">0.05</div>
        </div>
        <div class="mint-price-count romo">
          <div class="label-unit">
            <div class="label">mint-wrapper</div>
            <div class="unit">eth</div>
          </div>
          <div class="value">10500</div>
        </div>
      </div>
      <div class="mint-input">
        <div class="mint-btn remove-btn">-</div>
        <div class="mint-num">0</div>
        <div class="mint-btn add-btn">+</div>
      </div>
      <button class="mint-main-btn">MINT</button>
    </div>
    <div class="right-part"></div>
  </div>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
.home-main {
  display: flex;
  align-items: center;
  flex: auto;
}
.main-title {
  font-family: MarkerFelt;
  font-size: 25px;
  color: #1EFDED;
  letter-spacing: 1.8px;
  font-weight: 400;
}

.main-cotent {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-desc {
  font-family: MarkerFelt;
  font-size: 15px;
  color: #E0F100;
  letter-spacing: 1.08px;
  font-weight: 400;
  margin-top: 5px;
}

.mint-wrapper {
  display: flex;
  margin-top: 85px;
}

.mint-price-count {
  display: flex;
  flex-direction: column;
  align-items: center;

  &.romo {
    margin-left: 120px;
  }

  .label-unit {
    display: flex;
    margin-bottom: 13px;

    .label {
      font-family: MarkerFelt;
      font-size: 20px;
      color: #FFFFFF;
      letter-spacing: 0;
      font-weight: 400;
    }

    .unit {
      font-family: MarkerFelt;
      font-size: 20px;
      color: #E4EF00;
      letter-spacing: 0;
      font-weight: 400;
      margin-left: 20px;
    }
  }

  .value {
    font-family: MarkerFelt;
    font-size: 20px;
    color: #00FF00;
    letter-spacing: 0;
    font-weight: 400;
  }
}

.mint-input {
  display: flex;
  margin-top: 53px;
}

.mint-btn {
  font-family: MarkerFelt;
  font-size: 50px;
  color: #FFFFFF;
  letter-spacing: 0;
  font-weight: 400;
}

.mint-num {
  font-family: MarkerFelt;
  font-size: 50px;
  color: #00FFEE;
  letter-spacing: 0;
  font-weight: 400;
  margin: 0 85px;
}

.mint-main-btn {
  margin-top: 33px;
  width: 154px;
  height: 40px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #000000;
  font-family: MarkerFelt;
  font-size: 20px;
  color: #00FFEE;
  letter-spacing: 0;
  font-weight: 400;
  text-shadow: 0 0 2px #000;
}
</style>
