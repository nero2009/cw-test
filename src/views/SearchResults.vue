<template>
  <div class="container">
    <div v-if="data.length == 0">
      <p>No Images found</p>
    </div>
    <div v-else class="grid">
      <div
        class="item"
        v-for="image in data"
        v-bind:key="image.id"
        v-images-loaded:on.progress="imageProgress"
      >
        <div v-if="status">
          <content-placeholders :rounded="true">
            <content-placeholders-img />
            <content-placeholders-heading />
          </content-placeholders>
        </div>
        <div class="content" v-else>
          <img
            :src="image.urls.small"
            :alt="image.description"
            class="image"
            @click.prevent="showModal(image)"
          />

          <p class="caption">
            <span>{{image.user.name}}</span>
            <span>{{image.user.location}}</span>
          </p>
        </div>
      </div>
    </div>

    <modal v-show="isModalVisible" @close="closeModal" :selectedImage="modalImage"></modal>
  </div>
</template>

<script>
import Modal from "../components/modal";
import imagesLoaded from "vue-images-loaded";
export default {
  directives: {
    imagesLoaded
  },
  props: {
    data: Array,
    status: Boolean
  },
  components: {
    Modal
  },
  data() {
    return {
      modalImage: null,
      isModalVisible: false
    };
  },
  mounted() {
    window.addEventListener("load", this.resizeAllGridItems);
    window.addEventListener("resize", this.resizeAllGridItems);
  },
  methods: {
    showModal(image) {
      this.modalImage = image;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    imageProgress(instance, image) {
      console.log(instance);
      let item = instance.elements[0];
      this.resizeGridItem(item);
    },
    resizeGridItem(item) {
      let grid = document.getElementsByClassName("grid")[0];
      let rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );
      let rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      );
      let rowSpan = Math.ceil(
        (item.querySelector(".content").getBoundingClientRect().height +
          rowGap) /
          (rowHeight + rowGap)
      );
      item.style.gridRowEnd = "span " + rowSpan;
    },
    resizeAllGridItems() {
      let allItems = document.getElementsByClassName("item");
      for (let x = 0; x < allItems.length; x++) {
        this.resizeGridItem(allItems[x]);
      }
    },
    resizeInstance(instance) {
      item = instance.elements[0];
      this.resizeGridItem(item);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
.image {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  display: block;
  cursor: pointer;
}
.modal-image {
  height: auto;
  width: auto;
}
.mod {
  height: auto;
  width: auto;
}
.content {
  position: relative;
}
.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 20px;
  max-width: 45%;
  margin: 0 auto;
  padding: 0px 12px 0px 12px;
  z-index: 1000;
}
.caption {
  position: absolute;
  top: 80%;
  left: 0;
  color: #333;
  margin: 0;
  color: white;
  letter-spacing: -1px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: initial;
}
@media only screen and (min-device-width: 768px) and (max-device-width: 992px) and (-webkit-min-device-pixel-ratio: 1) {
  .grid {
    max-width: 90%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
@media screen and (min-device-width: 1000px) {
  .grid {
    max-width: 1200px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
@media only screen and (min-device-width: 320px) and (max-device-width: 768px) {
  .grid {
    max-width: 100%;
    grid-template-columns: 100%;
  }
  .caption {
    font-size: 12px;
  }
}
</style>


