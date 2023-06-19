<script setup lang="ts">
import { createAuth } from '@blogui91/arsenal';
import { CurrentUser } from '@blogui91/arsenal/dist/auth/types';
import { Button } from '@blogui91/ui-lib';
import { onMounted, ref } from 'vue';

const currentUser = ref<CurrentUser|null>(null);

const auth = createAuth({
  baseURL: 'http://corahui.test',
  currentUserEndpoint: 'api/me',
});
  
auth.onUserChange = (response) => {
  console.log('El usuario ha cambiado!', response);
  currentUser.value = response;
}

const handleSubmit = () => {
  auth.login({ email: 'vendedor@corahui.com', password: 'adminadmin' })
  .then(response => {
    console.log(response.data);  
  })
  .catch(error => {
    console.log(error);
  });
};

const handleLogout = () => {
  auth.logout()
  .catch(error => {
    console.log(error);
  });
};

onMounted(() => {
  if (auth.isAuthenticated()) {
    auth.getCurrentUser();
  }
});

</script>

<template>
  <div class="flex gap-3 p-3">

    <Button @click="handleSubmit">
      Login
    </Button>
  
    <Button class="bg-red-500" @click="handleLogout">
      Logout
    </Button>
  </div>
<pre>
  {{ currentUser }}
</pre>
</template>
