<template lang="pug">
  v-layout
    v-flex
      v-data-table(:headers="headers" :items="users")
        template(v-slot:items="props")
          td {{props.item._id}}
          td {{props.item.username}}
          td {{props.item.email}}
          td {{props.item.password}}
          td: router-link(:to="{name: 'user',params: {id: props.item._id} }") Перейти 
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'ID',
          value: '_id'
        },
        { text: 'Имя пользователя', value: 'username' },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Пароль',
          value: 'password'
        },
        {
          text: 'Профиль',
          value: 'profile'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
