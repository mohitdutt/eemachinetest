<template>
    <div class="left margin-auto">
        <div class="slider-filter mt-6">
          <h3 class="ml-4">Filter</h3>
          <div class="d-flex mt-6">
            <span>Filter on price</span>
            <el-slider class="w-75 ml-10" v-model="sliderValue" :max="500"/>
          </div>
        </div>
        <div class="shifts mt-10">
          <div class="d-flex shiftsHead">
            <h3 class="margin-0 mr-20 ml-4">Shifts</h3>
            <button class="button-positive" v-on:click="addShifts">Add Shift</button>
          </div>
          <div class="container"  v-for="shifts in shiftsArray" :key="shifts.id">
            <div class="white-box d-flex justify-content">
              <div class="w-100">
                <h4 class="margin-0">{{ shifts.title }}</h4><br>
                <span>{{ shifts.description }}</span>
                <h4>Dates</h4>
                <div class="dates d-flex">
                  <span class="w-25 ml-5">{{ shifts.date }}</span>
                  <span>{{ shifts.startTime }}</span>
                  <span>{{ shifts.endTime }}</span>
                  <span>{{ shifts.type }}</span>
                  <span class="w-25 ml-10">{{ shifts.price }}</span>
                </div>
              </div>
              <div>
                <i class="fas fa-pen cursor-pointer" v-on:click="editShifts(shifts._id)"></i>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import "../style/ShiftsLeft.css";
  import '@fortawesome/fontawesome-free/css/all.css';
  import { mapGetters } from 'vuex';
  export default {
    name: 'ShiftsLeft',
    data () {
      return {
        shiftsArray: [],
        isSideBarOpen: false,
        sliderValue: 70
      }
    },
    computed: {
      ...mapGetters(['getSideBarData']),
    },
      created() {
      this.getShiftsData()
    },
    watch: {
      async sliderValue(val){
        const storedShiftsArray = this.$store.getters.getShiftsDataArr.filter(e=> e.price< val)
        this.shiftsArray = [...storedShiftsArray]
      }
    },
    methods: {
      async getShiftsData() {
        await this.$store.dispatch('fetchData')
        this.shiftsArray = this.$store.getters.getShiftsDataArr;
        this.shiftsArray.forEach(e=> {
          e.date = new Date(e.date).toLocaleDateString();
          e.startTime = new Date(e.startTime).toLocaleTimeString()
          e.endTime = new Date(e.endTime).toLocaleTimeString()
        })
    },

    dateFormat(){
      const gmtDate = new Date(this.date);
      const formatter = new Intl.DateTimeFormat('en-US');
      const date = formatter.format(gmtDate);
      return date
    },

    addShifts: function(){
      this.isSideBarOpen = !this.isSideBarOpen;
      this.$store.dispatch('updateSideBarData', {state: true, actions: "Create"});
    },

    async editShifts(shiftId){
      await this.$store.dispatch('updateSideBarData', {state: true, actions: "Edit"});
      await this.$store.dispatch('fetchDataById', {id: shiftId});
      this.isSideBarOpen = !this.isSideBarOpen;
    }
  },
  }
  </script>