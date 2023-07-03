<template>
    <div class="right" :class="{ 'sideBarOpen': getSideBarData.state }">
      <div class="d-flex sidebarHead">
        <h3 class="margin-0">{{ getSideBarData.actions }}</h3>
        <i class="fas fa-xmark cursor-pointer" @click="removeSidebar"></i>
      </div>
      <div class="p-3">
        <el-input v-model=title placeholder="Title" />
        <el-input class="mt-2" v-model="description" :rows="3" type="textarea" placeholder="Description" />
        <el-date-picker class="mt-2" v-model="date" type="date" placeholder="Select a date"></el-date-picker>
      </div>
      <div class="d-flex p-3 sidebarHead pt-0 pb-0">
        <p class="datePara" v-if= date>{{ dateFormat }}</p>
        <i class="fas fa-xmark cursor-pointer" v-if= date @click="clearInputs"></i>
      </div>
      <div class="p-3 m-3 tag mt-2 " v-if= date>
        <div class="d-flex">    
          <el-time-picker class="time-picker" v-model="startTime" placeholder="start time" />
          <el-time-picker class="ml-1 time-picker" v-model="endTime" placeholder="end time" />
          <el-input class="ml-1 price" v-model="price" placeholder="Price" :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"/>
        </div><br>
        <div>
          <el-select v-model="type" placeholder="Type">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"/>
          </el-select>
        </div>
      </div>
      <p class="error p-3 " v-if="error">Please fill all details</p>
      <div class="d-flex justify-content-around mt-10">
        <button class="button-delete" @click="clearInputs">Delete</button>
        <button class="button-positive" v-on:click="save">Save</button>
      </div>
    </div>
  </template>
  
  <script>
  import "../style/DrawerRight.css";
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['getSideBarData', 'getEditDataArr']),
      dateFormat: function(){
          const gmtDate = new Date(this.date);
          const formatter = new Intl.DateTimeFormat('en-US');
          const date = formatter.format(gmtDate);
        return date
      }
    },
    name: 'DrawerRight',
    props: {
      updateSideBar: {
      type: Object
    },
    },
    data() {
      return {
        title: '',
        description: '',
        date: '',
        startTime: "",
        endTime: "",
        type: "",
        options: ["Consulation", "Telephone", "Ambulance"],
        price: "",
        allInputFilled: false,
        error: false
      };
    },
    methods: {
      removeSidebar: function(){
        this.$store.dispatch('updateSideBarData', {state: false, actions: ""});
        this.clearInputs()
      },
      clearInputs: function(){
        this.title= ""; 
        this.description="";
        this.date="";
        this.startTime="";
        this.endTime="";
        this.price="";
        this.type=""
      },

      checkInputsValue: function(){
        if(this.title != "" &&
        this.description !="" &&
        this.date !="" &&
        this.startTime !="" &&
        this.endTime !="" &&
        this.price !="" &&
        this.type !="" ){
          this.allInputFilled = true;
          this.error = false
        }
      },
      async save(){
        this.checkInputsValue()
        if(this.getSideBarData.actions == "Create"){
          if(this.allInputFilled){
            await this.$store.dispatch('save', {title: this.title, description: this.description, date: this.date, startTime:this.startTime, endTime:this.endTime, price: this.price, type:this.type});
            await this.$store.dispatch('fetchData')
            this.clearInputs()
          }else{
            this.error = true
          }
        }else{
          if(this.allInputFilled){
            this.$store.dispatch('edit', {title: this.title, description: this.description, date: new Date(this.date).toISOString(), startTime:new Date(this.startTime).toISOString(), endTime:new Date(this.endTime).toISOString(), price: this.price, type:this.type});
            this.clearInputs()
          }else{
            this.error = true
          }
        }
      }
    }
  }
  </script>