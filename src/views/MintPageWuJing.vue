<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->

<template>
  <div class="mint-page" @mousemove="handleMouseMove">
    <div class="mint-toast" v-if="showToast">Merge Successful!</div>
    <div class="mint-toast fail" v-if="showFailToast">{{failText}}</div>
    <main>

      <!-- 连接钱包 -->
      <div class="connect-wallet">
        <div class="mint-tip">1,400 <span class="nft-name">IAMCHINESE</span> NFT <br> MINT TO BECOME <span class="name-bold">CHINESE</span></div>

        <button v-if="address && !loading" class="mint-main-btn" :class="{'mint-main-btn-active':minting}" @click="callMint" :disabled="minting">
          {{minting ? 'minting . . .' : 'mint'}}
        </button>

        <button
          v-else
          class="connect-btn"
          @click="handleClick"
          :disabled="loading">
          {{ loading? 'Connecting...' : 'CONNECT WALLET'}}
        </button>

<!--        <div class="mint-tip">Maximum up to 5 vaccines 💉 for 1 wallet <span class="mint-fxx">motherfxxkers</span>!!!</div>-->
      </div>
    </main>
    <vue-danmaku
      class="danmu"
      v-model:danmus="danmus"
      :channels="3"
      :debounce = "1000"
      :speeds="90"
      :randomChannel="true"
      useSlot
      loop
      style="height:240px; width:100%;">
      <template v-slot:dm="{ danmu }">
        <div class="danmu-text">{{ danmu.zh }}</div>
        <div class="danmu-text">{{ danmu.en }}</div>
      </template>
    </vue-danmaku>
    <img class="wujing" src="../assets/wujing.gif" alt="">

    <div v-if="address" class="connect-address">{{address}}
      <img src="../assets/wj-close.png" alt="" class="disconnect-btn" @click="disconnect" @keypress="disconnect" />
    </div>
  </div>
</template>

<script>
import { connectWallet, disconnectWallet } from '@/module/wallet-wujing';
import { formatAddress } from '@/module/utils';
import { set } from '@/module/store';
import { ethers } from 'ethers';
import 'animate.css';
import VueDanmaku from 'vue3-danmaku';

export default {
  components: {
    VueDanmaku,
  },
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
      listMap: {},
      maskList: [],
      nfts: [],
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
      danmus: [
        {
          zh: '爱姆拆腻日',
          en: 'I am Chinese',
        },
        {
          zh: '任何邪恶，终将绳之以法！',
          en: 'Any evil，finally roped by law',
        },
        {
          zh: '手机，我只用华为的',
          en: 'iPhone, I only use HUAWEI',
        },
        {
          zh: '依托答辩',
          en: 'A piece of shit',
        },
        {
          zh: '方便面，我只吃白象的',
          en: 'Noodles, I only eat BAIXIANG',
        },
        {
          zh: '最爱的男偶像：丁真',
          en: 'My favorite boi idol: Zhen Ding',
        },
        {
          zh: '最爱的女偶像：谷爱凌',
          en: 'My favorite gal idol: Ailing Gu',
        },
        {
          zh: '我爱国无罪',
          en: 'I love China no sin',
        },
        {
          zh: '堂堂正正中国人',
          en: 'Tang Tang Zheng Zheng Chinese',
        },
        {
          zh: '贱不贱呐',
          en: 'Jian bu jian na?',
        },
        {
          zh: '这里是中国',
          en: 'This is in China',
        },
        {
          zh: '你这是违法行为，肘，跟我去自首',
          en: 'This is illegal action, come, follow me to police',
        },
        {
          zh: '老挝队长',
          en: 'Captain Laos',
        },
        {
          zh: '本以为抓个小贼，没想到捅了老挝',
          en: 'Ben thought caught a lil thief, no think tong Laos',
        },
        {
          zh: '中国人不骗中国人',
          en: 'Chinese no hustle Chinese',
        },
        {
          zh: '不是白象我不吃',
          en: 'No BAIXIANG no eat',
        },
        {
          zh: '没有人比我更懂爱国',
          en: 'Nobody knows better than me about love China',
        },
        {
          zh: '生活在中国🇨🇳，你们就偷着乐吧',
          en: 'Living in China, you should just be stealing happy',
        },
        {
          zh: '那就让我们拭目以待吧',
          en: 'So let us wash eyes and see',
        },
        {
          zh: '美国🇺🇸这是搬起石头🪨砸自己的脚！',
          en: 'USA is like taking up stone and smash own feet!',
        },
      ],
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
        console.log('开始mint');
        const { signer, contract } = await connectWallet();
        const contractWithSigner = contract.connect(signer);
        const value = ethers.utils.parseEther(
          '0。04',
        );
        const tx = await contractWithSigner.mint(this.mintNum, {
          value,
        });
        const response = await tx.wait();
        this.mintResShow = true;
        alert('success');
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
          console.log('Mint Fail: Don\'t be too greedy...!');
        } else {
          this.failText = 'Ops! Mint Fail';
          console.log('Ops! Mint Fail');
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
      text-shadow: 0 0 3px #FFF, 0 0 5px #FFF, 0 0 5px #FFF, 0 0 10px #f12323, 0 0 10px #f12323, 0 0 12px #f12323, 0 0 16px #f12323, 0 0 20px #f12323;
  }
  50% {
      text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 30px #f12323, 0 0 30px #f12323, 0 0 40px #f12323, 0 0 50px #f12323, 0 0 60px #f12323;
  }
  100% {
      text-shadow: 0 0 3px #FFF, 0 0 5px #FFF, 0 0 5px #FFF, 0 0 10px #f12323, 0 0 10px #f12323, 0 0 12px #f12323, 0 0 16px #f12323, 0 0 20px #f12323;
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
  background: url('../assets/wujing-bg.png') #000;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100vw;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // animation: bgmove 180s linear infinite;

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
    text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #f12323, 0 0 30px #f12323, 0 0 40px #f12323, 0 0 55px #f12323, 0 0 75px #f12323;
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
        box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 30px #f12323, 0 0 30px #f12323, 0 0 40px #f12323, 0 0 55px #f12323, 0 0 75px #f12323;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: transparent;
        border-radius: 50%;
      }
      .portal {
        background-color: #fff;
        width: 160px;
        height: 160px;
        background: url("../assets/entry.gif");
        background-size: 100% 100%;
        display: none;
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
        text-shadow: 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323;
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
    text-shadow: 0 0 2px #FFF, 0 0 4px #FFF, 0 0 4px #FFF, 0 0 30px #f12323, 0 0 30px #f12323, 0 0 40px #f12323, 0 0 55px #f12323, 0 0 75px #f12323;
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
  position: fixed;
  width: 500px;
  top: 20%;
  left: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  display: flex;
  justify-content: center;

  .tooltip{
    width: 45px;
    margin-bottom: 30px;
    position: relative;

    img{
      width: 100%;
    }
  }

  .tooltip .tooltiptext {
    top: 105%;
    left: -130px;

    visibility: hidden;
    width: 280px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .list-space {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      margin-top: 10px;
      margin-bottom: 50px;
      width: 130px;
    }
  }

  .text-desc {
    display: none;
  }

  .mask-list, .vaccine-list{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    img{
      margin-left: 10px;
      margin-right: 10px;
      width: 140px;
      border-radius: 20px;
    }
  }

  .mint-main-btn,
  .connect-btn {
    border: none;
    width: 200px;
    border-radius: 6px;
    cursor: pointer;
    height: 50px;
    line-height: 36px;
    // font-family: Schwifty;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0.16px;
    font-weight: 700;
    // text-shadow: 0 0 2px #000;
    // border: 3px solid #B4FF9A;
    background-color: #f12323;
    transition: all 0.4s;
    &:hover {
      color: #fff;
      box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 30px #f12323, 0 0 30px #f12323, 0 0 40px #f12323, 0 0 55px #f12323, 0 0 75px #f12323;
    }
  }
  .mint-main-btn-active {
    background: #B4FF9A;
    color: #fff;
    box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 30px #f12323, 0 0 30px #f12323, 0 0 40px #f12323, 0 0 55px #f12323, 0 0 75px #f12323;
  }

}

.disconnect-btn {
    // background: url('../assets/close.png');
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
  margin-left: 6px;
  // &:hover {
  //   background-image: url('../assets/close-active.png');
  // }
}

.shine-star {
  position: absolute;
  .star-text {
    text-shadow: 0 0 2px #FFF, 0 0 2px #FFF, 0 0 2px #FFF, 0 0 4px #f12323, 0 0 4px #f12323, 0 0 4px #f12323, 0 0 4px #f12323, 0 0 4px #f12323;
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
  text-shadow: 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323;
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
  font-size: 18px;
  font-family: monospace;
  text-align: center;
  font-weight: bold;
  line-height: 40px;
  margin-bottom: 60px;
  .mint-fxx {
      text-shadow: 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323, 0 0 2px #f12323;
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

@media only screen and (min-width: 600px) {
  //.list-space {
  //  position: fixed;
  //  top: 200px;
  //  left: 15%;
  //}
  //
  //.connect-address{
  //  margin-top: 400px;
  //}
  .list-main{
    display: flex;

    .text-desc{
      display: flex;
      flex-direction: column;
      width: 520px;
      font-family: monospace;

      margin-left: 160px;
      p:last-child{
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 30px #f12323, 0 0 30px #f12323, 0 0 40px #f12323, 0 0 55px #f12323, 0 0 75px #f12323;
        color: #B4FF9A;
      }
    }
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

.danmu {
  position: fixed;
  bottom: 1vh;
}

.wujing {
  width: 660px;
  position: fixed;
  bottom: 0;
  right: 15vw;
}

.nft-name {
  color: #f12323;
  font-size: 24px;
}

.name-bold {
  color: #f12323;
}

.danmu-text {
  font-weight: bold;
}

.connect-address {
  position: fixed;
  right: 10px;
  top: 6px;
  color: #f12323;
  // font-family: Schwifty;
  font-weight: bold;
  text-align: center;
  line-height: 26px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
