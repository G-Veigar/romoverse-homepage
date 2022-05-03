<template>
  <div class="home">
    <HomeHeader v-model:page="currentPage"></HomeHeader>
    <HomeMain v-model:page="currentPage"></HomeMain>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeHeader from '@/components/home-header.vue';
import HomeMain from '@/components/home-main.vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      currentPage: 0,
    };
  },
  components: {
    HomeHeader,
    HomeMain,
  },
});
</script>

<style lang="scss" scoped>
.home {
  background-color: #270242;
  // background-image: url('../assets/bg.png');
  // background-repeat: repeat;
  min-height: 100vh;
  padding-top: 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
