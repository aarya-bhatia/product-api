<template>
  <div class="navbar">
    <nav>
      <div class="nav-wrapper">
        <ul class="center">
          <li class="right" style="position: absolute; right: 5%">
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
  margin-bottom: 20px;
  background: teal;
}
</style>