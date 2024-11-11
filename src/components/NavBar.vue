<template>
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/register" class="nav-link">Register</router-link>
    </nav>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  nav {
    padding: 1em;
  }
  
  .nav-link {
    margin-right: 1em;
  }
  </style>
  