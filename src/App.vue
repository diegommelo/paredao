<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css');
@import url('https://fonts.googleapis.com/css?family=Roboto|Fira+Sans');
@import url('https://use.fontawesome.com/releases/v5.2.0/css/all.css');
@import url('https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css');

html {
  background-color: #0286d1 !important;
}
body {
  font-family: 'Fira Sans', sans-serif !important;  
  color:#fff !important;
}
#app {
  text-align:center;
  margin: auto;
}
ul > li {
    display: inline-block;
    /* You can also add some margins here to make it look prettier */
    zoom:1;
    *display:inline;
    padding:3px;
    /* this fix is needed for IE7- */
}

</style>
