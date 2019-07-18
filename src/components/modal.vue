<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" role="dialog">
      <div class="modal" ref="modal">
        <button type="button" class="btn-close btn-right" @click="close" aria-label="Close modal">x</button>

        <section class="modal-body">
          <img class="image" :src=" selectedImage?selectedImage.urls.regular: ''" />
        </section>

        <footer class="modal-footer">
          <p class="image-name">{{selectedImage?selectedImage.user.name: ''}}</p>
          <p class="image-location">{{selectedImage?selectedImage.user.location: ''}}</p>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    selectedImage: Object
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" >
.btn {
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}
.image {
  height: 600px;
  width: 100%;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 700px;
  border-radius: 10px;
  overflow: hidden;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  text-align: initial;
}

.modal-body {
  position: relative;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #3a3a3a;
  background: transparent;
  position: absolute;
  right: 1%;
  top: 0px;
}

.btn {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.image-name {
  font-size: 16px;
  font-weight: 600;
  color: #4e4e4e;
  margin: 0px 0px 5px 0px;
}
.image-location {
  font-size: 12px;
  color: #bababa;
  margin: 0;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 768px) {
  .modal {
    width: 80%;
    height: 500px;
  }
  .image {
    height: 400px;
    width: 100%;
  }
}
</style>
