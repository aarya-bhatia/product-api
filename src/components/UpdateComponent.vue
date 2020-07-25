<template>
  <div class="container edit-product" id="edit-product">
    <h2>Edit Products</h2>
    <div class="container">
      <p>SELECT PRODUCT</p>
      <button class="btn btn-floating" id="dropdown-button" @click="toggleDropdownState">
        <i class="material-icons">arrow_drop_down</i>
      </button>
    </div>

    <div v-if="dropdownState">
      <div class="dropdown-items" v-for="product in products" :key="product.id">
        <p
          @click="selectItem(product)"
          :class="{active: isSelectedItem(product)}"
        >{{ product.name }}</p>
      </div>
    </div>
    <hr v-if="selectedProduct" />
    <div class="edit-product-form" v-if="selectedProduct">
      <form @submit.prevent="updateItem" autocomplete="off">
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
            <i class="material-icons">save</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "UpdateComponent",
  data() {
    return {
        name: null,
        description: null,
        price: null,
        feedback: null,
        selectedProduct: null,
        dropdownState: false,
    };
  },
  props: ["products", "newEditItem"],
  methods: {
    selectItem(product) {
      this.selectedProduct = product;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
    },
    isSelectedItem(product) {
      return this.selectedProduct == product;
    },
    toggleDropdownState() {
      this.dropdownState = !this.dropdownState;
    },
    updateItem() {
      if (
        this.selectedProduct &&
        this.name &&
        this.description &&
        this.price
      ) {
        this.feedback = null;

        //local update
        this.$emit('updateProduct', 
        {
            'product':this.selectedProduct,
            'args': {
                'name': this.name,
                'description': this.description,
                'price': this.price
            }
        })

        //put request to api
        axios
          .put(`${this.$api}${this.selectedProduct.id}`, {
            name: this.name,
            description: this.description,
            price: this.price,
          })
          .then(() => {
            console.log("Updated Item");
          })
          .catch((err) => {
            console.log(err);
          });

        this.name = null;
        this.description = null;
        this.price = null;
        this.selectedProduct = null;
        if (!this.dropdownState) {
          this.dropdownState = true;
        }
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  },
  watch: {
    newEditItem: function() {
      console.log(this.newEditItem)
      this.selectItem(this.newEditItem)
      this.dropdownState = true
    }
  }
};
</script>

<style>
.edit-product {
  padding: 10px 0;
  background: #eee;
  margin-bottom: 20px;
}
.edit-product .field {
  display: inline-block;
  margin-right: 10px;
  padding: 10px;
}
.edit-product form > button {
  display: block;
  margin-top: 10px;
}
.edit-product .edit-product-form {
  margin-top: 10px;
}
.edit-product button:hover {
  background: #c8e6c9;
}
.edit-product .dropdown-items {
  width: 100px;
  margin: 0 auto 10px;
  cursor: pointer;
}
.edit-product .dropdown-items .active {
  border-bottom: 2px solid #66bb6a;
}
.edit-product hr {
  width: 5%;
  border: 12px dotted teal;
  border-bottom: none;
  margin: 50px auto;
}
.edit-product .field input {
  text-align: center;
}
</style>