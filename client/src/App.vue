<template lang="pug">
  v-app
    v-container
      Navbar
      router-view
</template>

<script>
import TableOfUsers from '@/components/TableOfUsers';
import Navbar from '@/components/Navbar';
export default {
  components: {
    TableOfUsers,
    Navbar
  }
};
</script>

<style lang="scss" scoped></style>
