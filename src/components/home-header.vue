<template>
  <div class="home-header">
    <div class="header-main">
      <div class="header-logo">ROMOVERSE</div>
      <nav class="header-nav">
        <div class="nav-item">ROMOVERSE</div>
        <div class="nav-item">CEMETERY</div>
        <div class="nav-item">ROMOER</div>
        <div class="nav-item">ROADMAP</div>
        <div class="nav-item">TEAM</div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {

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

    .nav-item {
      color: #fff;
      transition: color 0.3s;
      cursor: pointer;
      padding: 4px 6px;
      margin-left: 20px;

      &:hover {
        color: #BADA55;
      }
    }
  }
}
</style>
