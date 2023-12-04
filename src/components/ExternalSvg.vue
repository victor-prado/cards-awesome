<template>
  <div>
    <svg class="custom-icon">
      <image x="0" y="0" width="48" height="48" :xlink:href="iconUrl"></image>
    </svg>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExternalSvg",
  props: ["iconUrl"],
});
</script>
<style scoped>
.custom-icon image {
  fill: red; /* Change the color to your desired color */
  width: 48px; /* Adjust the width and height as needed */
  height: 48px;
}
</style>
