<template>
  <div class="hello">
    <Navbar />

    <Searchbar 
      @updateSearch="updateSearch($event)" 
    />

    <ReadComponent
      :products="products"
      @deleteItem="deleteItem($event)"
      @editItem="editItem($event)"
    />

    <CreateComponent 
      @addProduct="addProduct($event)" 
      @searchItems="searchItems($event)" 
    />

    <UpdateComponent
      :products="products"
      :newEditItem="newEditItem"
      @updateProduct="updateProduct($event)"
    />
  </div>
</template>

<script>
import CreateComponent from "@/components/CreateComponent";
import ReadComponent from "@/components/ReadComponent";
import UpdateComponent from "@/components/UpdateComponent";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import axios from "axios";

export default {
  name: "Index",
  components: {
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    Navbar,
    Searchbar,
  },
  data() {
    return {
      allProducts: [],
      products: [],
      search: null,
      newEditItem: null,
    };
  },
  methods: {
    addProduct(newProduct) {
      console.log(newProduct);
      this.allProducts.push(newProduct);
    },
    editItem(product) {
      this.newEditItem = product;
    },
    updateProduct(newProduct) {
      console.log(newProduct);
      const p = this.allProducts.filter((product) => {
        return product.id == newProduct.product.id;
      })[0];

      console.log(p);

      p.name = newProduct.args.name;
      p.description = newProduct.args.description;
      p.price = newProduct.args.price;
    },
    updateSearch(search) {
      this.search = search;
      this.searchItems();
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
      if(!this.search) {
        this.products = this.allProducts
        return
      }
      const searchString = this.search.toLowerCase();
      console.log('search:',searchString);
      this.products = this.allProducts.filter((product) => {
        console.log(product)
        return product.name.toLowerCase().includes(searchString);
      });
    },
  },
  created() {
    // Retrieve all products from firestore on creation
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
};
</script>

<style>
body {
  background: #ddd;
}
</style>