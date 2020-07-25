<template>
  <div class="search-bar container">
    <form @submit.prevent>
      <div class="field">
        <input type="text" placeholder="Search" v-model="search" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Searchbar",
  data() {
    return {
      search: null,
    };
  },
  watch: {
    search: function() {
      this.$store.commit('updateSearch', { 'search': this.search })
      this.$store.commit('searchProducts')
    },
  },
};
</script>

<style>
.search-bar input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari/Edge */
  color: teal;
}
</style>