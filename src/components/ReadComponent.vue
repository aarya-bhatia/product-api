<template>
  <div class="products container" id="my-products">
    <h2>Products</h2>
    <div v-if="products">
      <div v-for="product in products" :key="product.id" class="card teal darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{ product.name }}</span>
          <p>{{ product.description }}</p>
        </div>
        <div class="card-action">
          <span>Rs {{ product.price }}/-</span>
        </div>
        <div class="button-group">
          <a
            class="btn btn-floating waves-effect waves-light"
            href="#edit-product"
            @click="editItem(product)"
          >
            <i class="material-icons">edit</i>
          </a>
          <button class="btn btn-floating waves-light waves-light" @click="deleteItem(product.id)">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p id="loading-products">Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadComponent",
  computed: {
    products() {
      return this.$store.state.productsLocal;
    },
  },
  methods: {
    editItem(product) {
      this.$store.commit("setItemToEdit", { product });
    },
    deleteItem(id) {
      const idCopy = String(id)
      this.$store.commit("deleteProduct", { id: idCopy });
      this.$store.dispatch("deleteProduct", { id: idCopy });
      this.$store.commit("searchProducts");
    },
  },
};
</script>

<style>
.products {
  padding: 10px 0;
  background: #eee;
  margin-bottom: 20px;
}
.products .card {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
}
.products p {
  font-size: 1.2rem;
}
.products span {
  color: white;
  font-size: 1rem;
}
.products .button-group {
  margin-bottom: 20px;
}
.products .button-group button,
.products .button-group a {
  margin-right: 10px;
  background: #66bb6a;
}
.products .button-group button:hover,
.products .button-group a:hover {
  background: #c8e6c9;
}
</style>