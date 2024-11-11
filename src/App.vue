<template>
  <div id="app">
    <NavBar />
    <Loader :loading="loading" />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Loader from './components/LoaderComp.vue';

export default {
  components: {
    NavBar,
    Loader
  },
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.loading = true;
      next();
    });
    this.$router.afterEach(() => {
      this.loading = false;
    });
  }
};
</script>
