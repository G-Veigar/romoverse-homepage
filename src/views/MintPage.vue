<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->

<template>
  <div class="mint-page" @mousemove="handleMouseMove">
    <div class="opensea-btn" @click="goOpensea"></div>
    <div class="ufo" :class="{flying: ufoFly}"></div>
    <div class="mint-toast" v-if="showToast">Mint Successful!</div>
    <div class="mint-toast fail" v-if="showFailToast">{{failText}}</div>
    <div class="shine-star star-2">
      <div class="star-text">+</div>
      <div class="bg-star"></div>
    </div>
    <div class="shine-star star-3">
      <div class="star-text">+</div>
      <div class="bg-star"></div>
    </div>
    <div class="shine-star star-4 small">
      <div class="star-text">+</div>
      <div class="bg-star"></div>
    </div>
    <div class="shine-star star-5 big">
      <div class="star-text">+</div>
      <div class="bg-star"></div>
    </div>
    <div class="shine-star star-6 small">
      <div class="star-text">+</div>
      <div class="bg-star"></div>
    </div>
    <main>
      <!-- logo -->
      <div class="logo-text">
        <Transition
          name="custom-classes"
          enter-active-class="animate__animated animate__rubberBand"
        >
          <div class="inner-text" v-show="showLogoText">RomoVerse</div>
        </Transition>
        <div class="shine-star star-1">
          <div class="star-text">+</div>
          <div class="bg-star"></div>
        </div>
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
        <div class="content-text">
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
        <div class="mint-tip">Maximum up to 5 vaccines 💉 for 1 wallet <span class="mint-fxx">motherfxxkers</span>!!!</div>
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
      ufoFly: false,
      showToast: false,
      showFailToast: false,
      showLogoText: false,
      mintNum: 1,
      loading: false,
      address: '',
      fullAddress: '',
      bgStyle: {
        backgroundPosition: '50% 50%',
      },
      pageSize: {
        width: 1000,
        height: 1000,
      },
      minting: false,
      mintResShow: false,
      failText: 'Mint Fail!',
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
    goOpensea() {
      window.open('https://opensea.io/collection/romoverse-vaccine');
    },
    async handleClick() {
      this.loading = true;
      try {
        const { provider, signer, web3Instance } = await connectWallet();
        const address = await signer.getAddress();
        const ens = await provider.lookupAddress(address);
        this.address = ens || formatAddress(address);
        this.fullAddress = address;
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
      try {
        const { signer, contract, mergeContract } = await connectWallet();
        const contractWithSigner = contract.connect(signer);
        const mergeContractWithSigner = mergeContract.connect(signer);
        const value = ethers.utils.parseEther(
          '0',
        );
        // const tx = await contractWithSigner.approve('0x9ffdd2917d457211ab88d8d99e8fa9c5663b0e04', 'adfdf', {
        //   value,
        // });
        const totalSupply = await contractWithSigner.totalSupply({
          value,
        });
        const balanceOf = await contractWithSigner.balanceOf(this.fullAddress, {
          value,
        });
        const id = await contractWithSigner.tokenByIndex(3);

        const uri = await contractWithSigner.tokenURI(id);
        console.log(uri);

        const uri2 = await mergeContractWithSigner.tokenURI(0);
        console.log(uri2);

        // await contractWithSigner.setApprovalForAll('0x17982614a27baf2890f41275e3212e00c0b5353e', true);

        await mergeContractWithSigner.merge(1, 2, 3);
      } catch (err) {
        console.log(err);
      }

      if (this.minting) {
        return;
      }
      this.minting = true;
      try {
        const { signer, contract } = await connectWallet();
        const contractWithSigner = contract.connect(signer);
        const value = ethers.utils.parseEther(
          '0',
        );
        const tx = await contractWithSigner.mint(this.mintNum, {
          value,
        });
        const response = await tx.wait();
        this.mintResShow = true;
        setTimeout(() => {
          this.mintResShow = false;
        }, 4000);
        setTimeout(() => {
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        }, 1500);
      } catch (err) {
        if (err.message.includes('nums must less than')) {
          this.failText = 'Mint Fail: Don\'t be too greedy...!';
        } else {
          this.failText = 'Ops! Mint Fail';
        }
        this.showFailToast = true;
        setTimeout(() => {
          this.showFailToast = false;
        }, 3000);
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
    setTimeout(() => {
      this.ufoFly = true;
    }, 2000);
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

.mint-page {
  background: url('../assets/繁星2.png') #000;
  background-size: 1000px;
  background-position: 50% 50%;
  height: 100vh;
  width: 100vw;
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
    position: relative;
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
        width: 280px;
        height: 280px;
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
    .content-text {
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
  &.small {
    font-size: 10px;
    .bg-star {
      width: 14px;
      height: 14px;
    }
  }
  &.big {
    font-size: 14px;
    .bg-star {
      width: 28px;
      height: 28px;
    }
  }
  &.star-1 {
    right: -40px;
    top: 50px;
  }
  &.star-2 {
    left: 40%;
    top: 5%;
  }
  &.star-3 {
    right: 40%;
    bottom: 10%;
  }
  &.star-4 {
    left: 10%;
    top: 45%;
  }
  &.star-5 {
    right: 20%;
    top: 60%;
  }
  &.star-6 {
    right: 10%;
    top: 10%;
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

.mint-toast {
  position: fixed;
  width: 200px;
  height: 60px;
  line-height: 60px;
  z-index: 1;
  left: 50%;
  top: 50%;
  background: rgba(0,0,0,0.7);
  transform: translate(-50%, -50%);
  text-align: center;
  text-shadow: 0 0 2px #49ff18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49ff18;
  font-size: 20px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px -1px #B4FF9A;
  font-family: Schwifty;

  &.fail {
      text-shadow: 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323;
      width: 280px;
      font-size: 18px;
  }
}

.mint-tip {
  margin-top: 14px;
  font-size: 14px;
  font-family: monospace;
  text-align: center;
  .mint-fxx {
      text-shadow: 0 0 2px #49ff18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49FF18, 0 0 2px #49ff18;
  }
}

@media only screen and (max-width: 600px) {
  .logo-text {
    font-size: 60px !important;
    margin-bottom: 10px !important;
  }
  .content {
    flex-direction: column;
    align-items: center;
  }
  .content-text {
    font-size: 14px !important;
    margin-left: 0 !important;
    margin-top: -10px;
  }
  .ufo {
    display: none;
  }
}

@keyframes fly {
  from {
    right: -100px;
  }
  to {
    right: 100%;
  }
}
.ufo {
  background: url('../assets/ufo.png');
  background-size: 100% 100%;
  width: 70px;
  height: 60px;
  position: fixed;
  top: 70px;
  z-index: 10;
  transition: right 10s;
  right: -100px;

  &.flying {
    animation: fly 10s linear;
  }
}

.opensea-btn {
  width: 30px;
  height: 30px;
  background: url('../assets/link.png');
  background-size: 100% 100%;
  position: fixed;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
