<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <HomeMain></HomeMain>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeHeader from '@/components/home-header.vue';
import HomeMain from '@/components/home-main.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeHeader,
    HomeMain,
  },
});
</script>

<style lang="scss" scoped>
.home {
  // padding-top: 80px;
}
</style>
