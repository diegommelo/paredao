<template>
  <div>
    <section class="is-info is-bold is-fullheight">
      <div class="">
        <div class="participantes">
          <ul>
            <h5 class="participantes-titulo sombra-texto">Escolha os participantes do BBB {{parseInt(escolhida['.key'])+1}}</h5>
            <li v-for="(bbb,key) in escolhida" :key="key">
              <div class="inside-li" v-on:click="escolheParticipante(bbb)">
                <v-lazy-image :src="'img/fotos/'+bbb.foto+'.jpg'" src-placeholder="img/icons/robo.jpg" :class="[{ativo:isAtivo(bbb)}]" />
                <!-- <img :src="'img/fotos/'+bbb.foto+'.jpg'" :class="[{ativo:isAtivo(bbb)}]"/> -->
                <br/><p>{{bbb.nome}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'edicoes',
  props: ['escolhida', 'participantes'],
  methods: {
    escolheParticipante(bbb){
      this.$emit('escolheBBB',bbb)
      this.$forceUpdate();
    },
    isAtivo: function(bbb){
      if(_.includes(this.participantes,bbb)){
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media (min-width: 1281px) {
    .participantes img {
      border:6px solid #000;
      width:90px;
      height:90px;
    }
   .participantes ul li {
      min-height: 152px;
    }    
/*     .participantes ul li:hover img {
      border: 6px solid #0178BC;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 100px;    
    }       */
  }  
  @media (max-width:768px) {
    .participantes img {
      border:2px solid #000;
      width:60px;
      height:60px;      
    }
    .participantes ul li {
      min-height: 132px;
    }
/*     .participantes ul li:hover img {
      border: 2px solid #0178BC;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 100px;    
    }      */ 
  }
  .participantes {
    text-align: center;
  }
  .participantes p {
    width:85px;
    word-wrap: break-word;
    font-size:0.9em;
  }
  .participantes ul {
    display:table-row;
  }
  .participantes ul li {
    text-align: center;
    vertical-align: middle;
    padding-bottom:10px;
  }
  .participantes ul li:hover img {
    cursor: pointer;
  }

  .participantes img {
    border-radius:100px;
  }
  .ativo {
    border: 6px solid #0178BC !important;
  }
    .v-lazy-image {
  filter: blur(3px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
