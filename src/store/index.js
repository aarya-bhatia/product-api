import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    api: 'https://social-app-1-dbb91.web.app/api/',
    productsLocal: [],
    products: [],
    search: null,
    itemToEdit: null
  },
  getters: {

  },
  mutations: {
    retrieveProducts: (state, payload) => {
      state.products = state.productsLocal = payload.products
    },
    addProduct: (state, payload) => {
      state.products.push(payload.product)
    },
    deleteProduct: (state, payload) => {
      state.products = state.products.filter(product => {
        return product.id != payload.id
      })
    },
    updateProduct: (state, payload) => {
      const current = state.products.filter(product => {
        return product.id == payload.newProduct.id
      })[0]
      if (current) {
        current.name = payload.newProduct.args.name
        current.description = payload.newProduct.args.description
        current.price = payload.newProduct.args.price
        console.log('Item updated successfully')
      } else {
        console.log('No item was found')
      }
    },
    searchProducts: (state) => {
      if(state.search) {
        const searchString = String(state.search).toLowerCase()
        state.productsLocal = state.products.filter(product => {
          return String(product.name).toLowerCase().includes(searchString)
        })
      } else {
        state.productsLocal = state.products
      }
    },
    updateSearch: (state, payload) => {
      state.search = payload.search
    },
    setItemToEdit: (state, payload) => {
      console.log("In set item to edit");
      state.itemToEdit = payload.product
    }
  },
  actions: {
    retrieveProducts: (context) => {
      axios.get(context.state.api)
        .then(res => {
          context.commit('retrieveProducts', { 'products': res.data })
        }).catch(err => {
          console.log(err)
        })
    },
    addProduct: (context, payload) => {
      axios.post(context.state.api, payload.product).then(() => {
        console.log("Item Added")
      }).catch(err => {
        console.log(err)
      })
    },
    updateProduct: (context, payload) => {
      const endpoint = `${context.state.api}${payload.newProduct.id}`
      axios
        .put(endpoint, payload.newProduct.args)
        .then(() => {
          console.log("Updated Item");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct: (context, payload) => {
      if(!payload.id){
        console.log("invalid id");
        return
      }
      const endpoint = `${context.state.api}${payload.id}`
      axios
        .delete(endpoint)
        .then(() => {
          console.log("Item deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

export default store