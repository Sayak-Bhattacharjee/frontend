<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" required />
        <input v-model="email" placeholder="Email" required type="email" />
        <input v-model="password" placeholder="Password" required type="password" />
        <button type="submit">Register</button>
      </form>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        message: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await api.post('/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password
          });
          this.message = response.data.message;
        } catch (error) {
          this.message = error.response.data.message || 'Registration failed';
        }
      }
    }
  };
  </script>
  