<template>
  <div class="d-flex background">
    <ShiftsLeft />
    <DrawerRight />
  </div>
</template>

<script>
import "../style/WaarneemApp.css";
import ShiftsLeft from "../components/ShiftsLeft.vue"
import DrawerRight from "../components/DrawerRight.vue";
export default {
  name: 'WaarneemApp',
  data(){
    return {
      updateSideBar: {
        sideBar: false,
        action: "add"
      }
    }
  },
  components: {
    ShiftsLeft,
    DrawerRight
  }
}
</script>
