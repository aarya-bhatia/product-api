<template>
  <div class="hello">
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

    <div class="search-bar container">
      <form @submit.prevent>
        <div class="field">
          <input type="text" placeholder="Search" v-model="search" />
        </div>
      </form>
    </div>

    <div class="products container" id="my-products">
      <h2>Products</h2>
      <div v-for="product in products" :key="product.id" class="card teal darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{ product.name }}</span>
          <p>{{ product.description }}</p>
        </div>
        <div class="card-action">
          <span>Rs {{ product.price }}/-</span>
        </div>
        <div class="button-group">
          <a class="btn btn-floating waves-effect waves-light" href="#edit-product" @click="editItem(product)">
            <i class="material-icons">edit</i>
          </a>
          <button class="btn btn-floating waves-light waves-light" @click="deleteItem(product)">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>

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
      <hr v-if="activeDropdownItem" />
      <div class="edit-product-form" v-if="activeDropdownItem">
        <form @submit.prevent="updateItem" autocomplete="off">
          <div class="field">
            <label for="name"></label>NAME
            <input type="text" name="name" v-model="changeName" />
          </div>

          <div class="field">
            <label for="description"></label>DESCRIPTION
            <input type="text" name="description" v-model="changeDescription" />
          </div>

          <div class="field">
            <label for="price"></label>PRICE
            <input type="text" name="price" v-model="changePrice" />
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      allProducts: [],
      products: [],
      name: null,
      description: null,
      price: null,
      feedback: null,
      search: null,
      activeDropdownItem: null,
      dropdownState: false,
      changeName: null,
      changeDescription: null,
      changePrice: null,
    };
  },
  methods: {
    getItems() {
      axios
        .get(this.$api)
        .then((res) => {
          this.allProducts = res.data;
          this.products = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addItem() {
      if (!this.name || !this.description || !this.price) {
        this.feedback = "You must enter all fields";
        return;
      } else if (this.feedback) {
        this.feedback = null;
      }

      const newProduct = {
        name: this.name,
        description: this.description,
        price: this.price,
      };

      // Update local copy of products array
      this.allProducts.push(newProduct);
      // research the new products
      this.searchItems();
      // Reset input fields
      this.name = this.description = this.price = null;

      // post request to api for create new document
      axios
        .post(this.$api, newProduct)
        .then(() => {
          console.log("Added Item");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editItem(product) {
      this.selectItem(product)
    },
    deleteItem(product) {
      // Delete local copy of product
      this.allProducts = this.allProducts.filter((p) => {
        return p != product;
      });
      this.products = this.products.filter((p) => {
        return p != product;
      });
      // delete request to api
      axios
        .delete(`${this.$api}${product.id}`)
        .then(() => {
          console.log("Item deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchItems() {
      const searchString = this.search.toLowerCase();
      this.products = this.allProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchString);
      });
    },
    selectItem(product) {
      this.activeDropdownItem = product;
      this.changeName = product.name;
      this.changeDescription = product.description;
      this.changePrice = product.price;
    },
    isSelectedItem(product) {
      return this.activeDropdownItem == product;
    },
    toggleDropdownState() {
      this.dropdownState = !this.dropdownState;
    },
    updateItem(){
      if(this.activeDropdownItem && this.changeName && this.changeDescription && this.changePrice) {
        this.feedback = null

        //local update
        this.activeDropdownItem.name = this.changeName
        this.activeDropdownItem.description = this.changeDescription
        this.activeDropdownItem.price = this.changePrice
        
        console.log(`${this.$api}${this.activeDropdownItem.id}`);
        //put request to api
        axios.put(`${this.$api}${this.activeDropdownItem.id}`,{
          name: this.changeName,
          description: this.changeDescription,
          price: this.changePrice
        }).then(() => {
          console.log('Updated Item');
        }).catch(err => {
          console.log(err);
        })

        this.changeName = null
        this.changeDescription = null
        this.changePrice = null
        this.activeDropdownItem = null
        if(!this.dropdownState) {
          this.dropdownState = true
        }

      } else {
        this.feedback = "You must enter all fields"
      }
    }
  },
  created() {
    this.getItems();
  },
  watch: {
    search: function () {
      this.searchItems();
    },
  },
};
</script>

<style>
body {
  background: #ddd;
}
nav {
  margin: 20px 0;
  background: teal;
}
.search-bar input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari/Edge */
  color: teal;
}
.products,
.new-product,
.edit-product {
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
.products .button-group button, .products .button-group a {
  margin-right: 10px;
  background: #66bb6a;
}
.products .button-group button:hover {
  background: #c8e6c9;
}
.new-product .field,
.edit-product .field {
  display: inline-block;
  margin-right: 10px;
  padding: 10px;
}
.new-product button,
.edit-product form > button {
  display: block;
  margin-top: 10px;
}
.edit-product .edit-product-form {
  margin-top: 10px;
}
.new-product button:hover,
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
.new-product .field input,.edit-product .field input{
  text-align: center;
}
</style>