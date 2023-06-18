<script setup lang="ts">
import { createAuth } from '@blogui91/arsenal';
import { Button } from '@blogui91/ui-lib';

import HelloWorld from './components/HelloWorld.vue';

const auth = createAuth({
  baseURL: 'http://corahui.test',
  loginURL: 'auth/login',
  logoutURL: 'auth/logout',
});

const handleSubmit = () => {
  auth.login('vendedor@corahui.com', 'adminadmin')
  .then(response => {
    console.log(response.data);  
  })
  .catch(error => {
    console.log(error);
  });
};

</script>

<template>
  <HelloWorld msg="Vite + Vue" class="text-red-600" />
  <Button @click="handleSubmit">
    Login
  </Button>
</template>
