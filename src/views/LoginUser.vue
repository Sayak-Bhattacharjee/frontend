<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Email" required type="email" />
        <input v-model="password" placeholder="Password" required type="password" />
        <button type="submit">Login</button>
      </form>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        message: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/auth/login', {
            email: this.email,
            password: this.password
          });
          localStorage.setItem('token', response.data.token);
          this.message = response.data.message;
          this.$router.push('/');
        } catch (error) {
          this.message = error.response.data.message || 'Login failed';
        }
      }
    }
  };
  </script>
  