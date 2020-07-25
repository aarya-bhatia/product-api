<template>
  <div class="navbar container">
    <nav>
      <div class="nav-wrapper">
        <ul class="center">
          <li>
            <a href="#new-product">
              <i class="material-icons">add</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>

<style>
nav {
  margin: 20px 0;
  background: teal;
}
</style>