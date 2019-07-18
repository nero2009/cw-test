<template>
  <div class="search">
    <form v-if="!showResults" @submit.prevent="search" class="search-form">
      <div class="wrapper">
        <input
          type="text"
          class="search-form__input"
          v-model="searchQuery"
          placeholder="Search for photo"
        />
        <font-awesome-icon icon="search" class="icon" />
      </div>
    </form>

    <div v-else-if="loading" @click="showInput" class="result-header">
      <p class="result-title">
        Searching for
        <span class="result-title__subtitle">"{{searchQuery}}"</span>
      </p>
    </div>
    <div v-else-if="results.length == 0" @click="showInput" class="result-header">
      <p class="result-title">
        No result found for
        <span class="result-title__subtitle">"{{searchQuery}}"</span>
      </p>
    </div>
    <div v-else @click="showInput" class="result-header">
      <p class="result-title">
        Search Results for
        <span class="result-title__subtitle">"{{searchQuery}}"</span>
      </p>
    </div>
    <results v-if="results.length > 1" :data="results" :status="loading"></results>
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from "axios";
import { ROOT_URL, ACCESS_KEY } from "../constants";
import Results from "./SearchResults";

export default {
  components: {
    Results
  },
  data() {
    return {
      results: [],
      searchQuery: "Africa",
      loading: false,
      showResults: false
    };
  },

  methods: {
    getImages: async function() {
      this.loading = true;
      try {
        let response = await Axios.get(
          `${ROOT_URL}?query=${this.searchQuery}&client_id=${ACCESS_KEY}`
        );
        this.results = response.data.results;

        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
    search: function() {
      this.showResults = true;
      this.getImages();
    },
    showInput: function() {
      this.searchQuery = "";
      this.showResults = false;
    }
  },

  mounted() {
    this.getImages();
  }
};
</script>

<style lang="scss" scoped>
.search {
  height: 300px;
  background-color: #dbe1e8;
  text-align: center;
}
.search-form {
  padding-top: 150px;
  &__input {
    width: 50%;
    height: 50px;
    border: none;
    border-radius: 8px;
    padding-left: 45px;
  }
}
.result-header {
  padding-top: 150px;
}
.wrapper {
  position: relative;
  width: 100%;
}
.icon {
  position: absolute;
  top: calc(50% - 0.5em);
  left: 25%;
  color: #ccd2da;
}
.result-title {
  color: #253858;
  font-size: 32px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
  &__subtitle {
    color: #6d7b91;
  }
}
</style>

