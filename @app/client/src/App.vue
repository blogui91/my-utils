<script setup lang="ts">
// import { CurrentUser } from '@blogui91/arsenal/dist/auth/types';
import { createAuth } from '@blogui91/arsenal';
import { Button } from '@blogui91/ui-lib';
import { onMounted, ref } from 'vue';

const currentUser = ref<any|null>(null);

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

const errors = { "message": "El campo surcharges.4.days_after_cut_off es requerido.", "errors": { "surcharges.4.days_after_cut_off": ["El campo surcharges.4.days_after_cut_off es requerido."] } }

</script>

<template>
  <div class="flex gap-3 p-3">

    <app-form-field :errors="errors" name="surcharges.4.days_after_cut_off" label="Nombre">
      <input type="text" class=" border-gray-300 transition-all border h-[44px] rounded p-2">
    </app-form-field>

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
