<template>
  <div>
    <top-header />
    <main id="main" role="main">
      <nuxt />
    </main>
    <bottom-footer />
  </div>
</template>

<script>
import TopHeader from "~/components/TopHeader";
import BottomFooter from "~/components/BottomFooter";

export default {
  components: {
    TopHeader,
    BottomFooter
  }
};
</script>

<style lang="scss">
@import "../assets/scss/styles.scss";
</style>
