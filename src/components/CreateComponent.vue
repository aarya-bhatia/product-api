<template>
  <div class="new-product container" id="new-product">
    <h2>Add Products</h2>
    <form @submit.prevent="addItem" autocomplete="off">
      <div class="field">
        <label for="name"></label>NAME
        <input type="text" name="name" v-model="name" />
      </div>

      <div class="field">
        <label for="description"></label>DESCRIPTION
        <input type="text" name="description" v-model="description" />
      </div>

      <div class="field">
        <label for="price"></label>PRICE
        <input type="text" name="price" v-model="price" />
      </div>

      <p v-if="feedback" style="color:red">{{ feedback }}</p>
      <br />

      <div class="field">
        <button class="btn btn-floating waves-effect waves-light" type="submit">
          <i class="material-icons">add</i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateComponent",
  data() {
    return {
      name: null,
      description: null,
      price: null,
      feedback: null,
    };
  },
  methods: {
    addItem() {
      if (!this.name || !this.description || !this.price) {
        this.feedback = "You must enter all fields";
        return;
      } else if (this.feedback) {
        this.feedback = null;
      }

      //unique id
      let id = Date.now() + String(Math.round(Math.random()))
      //console.log("ID:",id)

      const product = {
        id: id,
        name: this.name,
        description: this.description,
        price: this.price,
      };

      this.$store.commit("addProduct", { product }); // add locally
      this.$store.dispatch("addProduct", { product }); // add to firestore
      this.$store.commit("searchProducts"); // reset search products

      // Reset input fields
      this.name = this.description = this.price = null;
    },
  },
};
</script>

<style>
.new-product {
  padding: 10px 0;
  background: #eee;
  margin-bottom: 20px;
}
.new-product .field {
  display: inline-block;
  margin-right: 10px;
  padding: 10px;
}
.new-product button {
  display: block;
  margin-top: 10px;
}
.new-product button:hover {
  background: #c8e6c9;
}
.new-product .field input {
  text-align: center;
}
</style>