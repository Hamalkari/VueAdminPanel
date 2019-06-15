<template lang="pug">
  v-toolbar(color="primary" dark)
    v-toolbar-title
      router-link(to="/").link.white--text Админ панель
    v-spacer
    v-toolbar-items
      v-btn(:to="{name: 'users'}" flat exact).white--text Пользователи
      v-btn(:to="{name: 'create-user'}" flat exact).white--text Создать пользователя
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
