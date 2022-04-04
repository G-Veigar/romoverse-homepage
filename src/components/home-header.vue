<template>
  <div class="home-header">
    <div class="header-main">
      <div class="header-logo">ROMOVERSE</div>
      <nav class="header-nav">
        <div
          class="nav-item"
          :class="{active: page === 0}"
          @click="moveTo(0)"
          @keypress="moveTo(0)">ROMOVERSE</div>
        <div
          class="nav-item"
          :class="{active: page === 1}"
          @click="moveTo(1)"
          @keypress="moveTo(1)">CEMETERY</div>
        <div
          class="nav-item"
          :class="{active: page === 2}"
          @click="moveTo(2)"
          @keypress="moveTo(2)">ROMOER</div>
        <div
          class="nav-item"
          :class="{active: page === 3}"
          @click="moveTo(3)"
          @keypress="moveTo(3)">ROADMAP</div>
        <div
          class="nav-item"
          :class="{active: page === 4}"
          @click="moveTo(4)"
          @keypress="moveTo(4)">TEAM</div>
        <div class="connect-wallet">
          <div v-if="address" class="connect-address">{{address}}
            <div class="disconnect-btn" @click="disconnect" @keypress="disconnect"></div>
          </div>
          <button
            v-else
            class="connect-btn"
            @click="handleClick"
            :disabled="loading">
            {{ loading? 'Connecting...' : 'Connect Wallet'}}
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { connectWallet, disconnectWallet } from '@/module/wallet';
import { formatAddress, padWidth } from '@/module/utils';
import { set, get, subscribe } from '@/module/store';

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      address: '',
    };
  },
  methods: {
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
        console.log('链接钱包失败，请重试');
      }
      this.loading = false;
    },

    async disconnect() {
      await disconnectWallet();
      set('address', '');
      set('fullAddress', '');
      this.address = '';
    },

    moveTo(pageIndex) {
      this.$emit('update:page', pageIndex);
    },
  },
};
</script>

<style lang="scss">
.home-header {
  height: 80px;
  display: flex;
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #1C0D27;
  padding: 0 10vw;
  display: flex;
  box-sizing: border-box;
  z-index: 1;

  .header-main {
    flex: auto;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-logo {
      color: #BADA55;
      font-family: reklamescriptw00-medium;
      font-weight: bold;
    }

    .header-nav {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
    }

    .connect-wallet {
      margin-left: 20px;
      .connect-address,
      .connect-btn {
        padding: 0 14px;
        height: 36px;
        border: none;
        border-radius: 18px;
        background-color: #fff;
        color: #333;
        cursor: pointer;
      }

      .connect-address {
        line-height: 36px;
        padding-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .disconnect-btn {
        background: url('../assets/close.png');
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
        margin-left: 8px;

        &:hover {
          background-image: url('../assets/close-active.png');
        }
      }
    }

    .nav-item {
      color: #fff;
      transition: color 0.3s;
      cursor: pointer;
      padding: 4px 6px;
      margin-left: 20px;

      &:hover {
        color: #BADA55;
      }

      &.active {
        color: #BADA55
      }
    }
  }
}
</style>
