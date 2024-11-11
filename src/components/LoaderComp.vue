<template>
    <div class="loader" v-if="loading">Loading...</div>
  </template>
  
  <script>
  export default {
    props: {
      loading: Boolean
    }
  };
  </script>
  
  <style>
  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: #333;
  }
  </style>
  