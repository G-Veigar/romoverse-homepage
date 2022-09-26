<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="mint-page" @mousemove="handleMouseMove">
    <div class="shine-star star-1">
      <div class="star-text">+</div>
      <div class="bg-star"></div>
    </div>
    <!-- <div class="shine-star star-2">
      <div class="star-text">+</div>
      <div class="bg-star2"></div>
    </div> -->
    <main>
      <!-- logo -->
      <div class="logo-text">
        <Transition
          name="custom-classes"
          enter-active-class="animate__animated animate__rubberBand"
        >
          <div class="inner-text" v-show="showLogoText">RomoVerse</div>
        </Transition>
      </div>

      <!-- content -->
      <div class="content">
        <div class="portal-wrapper">
          <!-- <div class="portal-bg"></div> -->
          <div class="portal">
            <Transition
              name="custom-classes"
              enter-active-class="animate__animated animate__zoomIn"
              leave-active-class="animate__animated animate__zoomOutDown"
            >
              <img class="vaccine-gun" v-show="mintResShow" src="../assets/res.png" alt="mint-res"/>
            </Transition>
          </div>
        </div>
        <div class="text">
          <p>Geezzzz!</p>
          <p>Finally we will get vaccine 💉 from chrono rift Hmmmm but not sure whether it works tho......</p>
          <p class="shine-text">Anyway let’s try it out and save Mamo !!!</p>
        </div>
      </div>

      <!-- mint数量 -->
      <div class="mint-input">
        <button class="mint-btn remove-btn" @click="mintRemove">-</button>
        <div class="mint-num">{{mintNum}}</div>
        <button class="mint-btn add-btn" @click="mintAdd">+</button>
      </div>

      <!-- 连接钱包 -->
      <div class="connect-wallet">
        <div v-if="address" class="connect-address">{{address}}
          <div class="disconnect-btn" @click="disconnect" @keypress="disconnect">X</div>
        </div>
        <button v-if="address" class="mint-main-btn" @click="callMint">Mint</button>
        <button
          v-else
          class="connect-btn"
          @click="handleClick"
          :disabled="loading">
          {{ loading? 'Connecting...' : 'CONNECT WALLET'}}
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { connectWallet, disconnectWallet } from '@/module/wallet';
import { formatAddress } from '@/module/utils';
import { set } from '@/module/store';
import { ethers } from 'ethers';
import 'animate.css';

export default {
  data() {
    return {
      showLogoText: false,
      mintNum: 1,
      loading: false,
      address: '',
      bgStyle: {
        backgroundPosition: '50% 50%',
      },
      pageSize: {
        width: 1000,
        height: 1000,
      },
      minting: false,
      mintResShow: false,
    };
  },
  methods: {
    randomAvatar() {
      this.activeAvatar = 4753 + Math.floor(Math.random() * (4772 - 4753));
    },
    mintRemove() {
      if (this.mintNum > 1) {
        this.mintNum -= 1;
      }
    },
    mintAdd() {
      if (this.mintNum < 5) {
        this.mintNum += 1;
      }
    },
    async handleClick() {
      this.loading = true;
      try {
        const { provider, signer, web3Instance } = await connectWallet();
        const address = await signer.getAddress();
        const ens = await provider.lookupAddress(address);
        this.address = ens || formatAddress(address);
        set('address', ens || formatAddress(address));
        set('fullAddress', address);
        web3Instance.on('accountsChanged', async (accounts) => {
          if (accounts.length === 0) {
            await disconnectWallet();
            set('address', '');
            set('fullAddress', '');
            this.address = '';
          } else {
            const address2 = accounts[0];
            const ens2 = await provider.lookupAddress(address2);
            this.address = ens2 || formatAddress(address2);
            set('address', ens || formatAddress(address2));
            set('fullAddress', address2);
          }
        });
        console.log('链接钱包成功', this.address);
      } catch (err) {
        await disconnectWallet();
        set('address', '');
        set('fullAddress', '');
        this.address = '';
        console.log('链接钱包失败，请重试', err);
      }
      this.loading = false;
    },
    async disconnect() {
      await disconnectWallet();
      set('address', '');
      set('fullAddress', '');
      this.address = '';
    },
    async callMint() {
      if (this.minting) {
        return;
      }
      this.minting = true;
      try {
        const { signer, contract } = await connectWallet();
        const contractWithSigner = contract.connect(signer);
        const value = ethers.utils.parseEther(
          // this.mintNum === 1 ? '0.01' : '0.02',
          '0',
        );
        const tx = await contractWithSigner.mint(this.mintNum, {
          value,
        });
        const response = await tx.wait();
        this.mintResShow = true;
        setTimeout(() => {
          this.mintResShow = false;
        }, 3000);
      } catch (err) {
        alert('铸造失败');
        console.log('铸造失败', err.message);
      }
      this.minting = false;
    },
  },
  watch: {
    page(newVal) {
      this.fullpage.moveTo(newVal + 1);
    },
  },
  mounted() {
    this.showLogoText = true;
  },
};
</script>

<style lang="scss" scoped>
@keyframes textblink {
  0% {
      text-shadow: 0 0 3px #FFF, 0 0 5px #FFF, 0 0 5px #FFF, 0 0 10px #49ff18, 0 0 10px #49FF18, 0 0 12px #49FF18, 0 0 16px #49FF18, 0 0 20px #49ff18;
  }
  50% {
      text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 30px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 50px #49FF18, 0 0 60px #49ff18;
  }
  100% {
      text-shadow: 0 0 3px #FFF, 0 0 5px #FFF, 0 0 5px #FFF, 0 0 10px #49ff18, 0 0 10px #49FF18, 0 0 12px #49FF18, 0 0 16px #49FF18, 0 0 20px #49ff18;
  }
}

@keyframes starblink {
  // from {
  //   text-shadow: 0 0 1px #FFF, 0 0 1px #FFF, 0 0 1px #FFF, 0 0 2px #49ff18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49ff18;
  // }
  // to {
  //   text-shadow: 0 0 2px #FFF, 0 0 2px #FFF, 0 0 2px #FFF, 0 0 4px #49ff18, 0 0 4px #49FF18, 0 0 4px #49FF18, 0 0 4px #49FF18, 0 0 4px #49ff18;
  // }
  0% {
    font-size: 12px;
  }

  50% {
    font-size: 18px;
  }

  100% {
    font-size: 12px;
  }
}

@keyframes bgmove {
  from {
    background-position: 50% 50%;
  }
  to {
    background-position: 350% 50%;
  }
}
.mint-devtool {
  position: absolute;
  top: 0;
}
.mint-page {
  background: url('../assets//繁星2.png') #000;
  background-size: 1000px;
  background-position: 50% 50%;
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: bgmove 180s linear infinite;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo-text {
    font-family: Schwifty;
    font-size: 80px;
    color: #1DF9E6;
    text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
    animation: textblink 4s linear infinite;
    margin-bottom: 30px;
  }

  .logo {
    width: 70vw;
    max-width: 400px;
    margin-bottom: 100px;
  }
  .content {
    width: 80vw;
    max-width: 900px;
    display: flex;
    justify-content: space-between;
    .portal-wrapper {
      position: relative;
      .portal-bg {
        width: 200px;
        height: 200px;
        box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 30px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: transparent;
        border-radius: 50%;
      }
      .portal {
        background-color: #fff;
        width: 300px;
        height: 300px;
        background: url("../assets/entry.gif");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .vaccine-gun {
          width: 200px;
          height: 200px;
        }
      }
    }
    .text {
      max-width: 440px;
      margin-left: 60px;
      font-family: monospace;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .shine-text {
        text-shadow: 0 0 2px #49ff18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49ff18;
      }
    }
  }
}

.mint-input {
  display: flex;
  margin-top: 0px;
  justify-content: center;
}

.mint-btn {
  font-family: MarkerFelt;
  font-size: 50px;
  color: #B4FF9A;
  letter-spacing: 0;
  font-weight: 400;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:hover {
    text-shadow: 0 0 2px #FFF, 0 0 4px #FFF, 0 0 4px #FFF, 0 0 30px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
  }
}

.mint-num {
  font-family: MarkerFelt;
  width: 50px;
  text-align: center;
  font-size: 30px;
  line-height: 64px;
  color: #fff;
  letter-spacing: 0;
  margin: 0 50px;
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
  cursor: pointer;
}

.connect-wallet {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  display: flex;
  justify-content: center;

  .mint-main-btn,
  .connect-btn {
    width: 200px;
    border-radius: 8px;
    cursor: pointer;
    height: 50px;
    line-height: 36px;
    font-family: Schwifty;
    font-size: 14px;
    color: #B4FF9A;
    letter-spacing: 0.16px;
    font-weight: 700;
    text-shadow: 0 0 2px #000;
    border: 3px solid #B4FF9A;
    background: #000;
    transition: all 0.4s;
    &:hover {
      background: #B4FF9A;
      color: #fff;
      box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 30px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
    }
  }

  .connect-address {
    color: #B4FF9A;
    font-family: Schwifty;
    text-align: center;
    line-height: 26px;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .disconnect-btn {
    // background: url('../assets/close.png');
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    margin-left: 8px;

    // &:hover {
    //   background-image: url('../assets/close-active.png');
    // }
  }
}

.shine-star {
  position: absolute;
  .star-text {
    text-shadow: 0 0 2px #FFF, 0 0 2px #FFF, 0 0 2px #FFF, 0 0 4px #49ff18, 0 0 4px #49FF18, 0 0 4px #49FF18, 0 0 4px #49FF18, 0 0 4px #49ff18;
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 12px;
    transform: translate(-50%, -50%);
    color: transparent;
    animation: starblink 1s linear infinite;
  }
  &.star-1 {
    left: 940px;
    top: 170px;
  }
  &.star-2 {
    left: 40%;
    top: 40px;
  }
  .bg-star {
    width: 20px;
    height: 20px;
    background: url('../assets/star1.png');
    background-size: 100% 100%;
  }
  .bg-star2 {
    width: 32px;
    height: 32px;
    background: url('../assets/star2.png');
    background-size: 100% 100%;
  }
}
</style>
