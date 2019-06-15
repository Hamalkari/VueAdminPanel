<template lang="pug">
  v-layout(justify-center).mt-4
    v-flex(sm6)
      v-card
        v-card-text
          h3.title.mb-3 ID - {{ user._id }}
          h3.title.mb-3 Имя пользователя - {{user.username}}
          h3.title Почтовый ящик - {{user.email }}
        v-card-actions
          v-spacer
          v-btn(color="success" small :to="{name: 'update-user',params: {id: user._id}}") Изменить
          v-btn(color="error" @click="deleteUser" small) Удалить
</template>

<script>
import Nprogress from 'nprogress';
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteUser() {
      Nprogress.start();
      this.$store.dispatch('deleteUser', this.user._id).then(() => {
        this.$router.push({ name: 'users' });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
