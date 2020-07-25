<template>
  <div class="hello">
    <Navbar />
    <Searchbar />
    <ReadComponent />
    <CreateComponent />
    <UpdateComponent />
  </div>
</template>

<script>
import CreateComponent from "@/components/CreateComponent";
import ReadComponent from "@/components/ReadComponent";
import UpdateComponent from "@/components/UpdateComponent";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";

export default {
  name: "Index",
  components: {
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    Navbar,
    Searchbar,
  },
  created() {
    this.$store.dispatch("retrieveProducts");
  },
}
</script>