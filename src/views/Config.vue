<template>
  <div>
    <section class="is-info is-bold is-fullheight">
      <div class="hero-body">
          <div class="brand">
            <h3 class="meu-paredao">Gerador de Paredões do</h3>
            <img src="/img/bbb-logo.png" class="bbb-logo" />            
          </div>        
        <div class="edicoes">
          <div class="participantes-escolhidos">
            <h2>Participantes escolhidos</h2>
            <ul>
              <li v-for="(bbb,key) in participantes">
                <img :src="'img/fotos/'+bbb.foto+'.jpg'" />
              </li>              
              <li v-for="n in 14-participantes.length">
                <img src="img/icons/robo.jpg" />
              </li>
            </ul>            
          </div>
          <div class="lista-edicoes">
            <h2>Selecionar participantes</h2>
            <ul>
              <li v-for="edicao in edicoes">
                <div class="field">
                <a class="button is-dark" @click="carregaEdicao(parseInt(edicao['.key']))">BBB {{parseInt(edicao['.key'])+1}}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>  
  </div>

</template>

<script>
// @ is an alias to /src
import edicoes from '@/components/edicoes.vue'
import imagesLoaded from 'vue-images-loaded'
import { Carousel, Slide } from 'vue-carousel';
import { db } from '../firebaseconfig'

export default {
  name: 'Config',
  data: function() {
    return {
      edicoes: {},
      participantes: []
    }
  },
  methods: {
    carregaEdicao: function(edicaoescolhida){
      let el = this
      this.$modal.open({
        parent: this,
        component: edicoes,
        props: {
          "escolhida":this.edicoes[edicaoescolhida],
        },
        events: {
          escolheBBB: function(event){
            el.participantes.push(event)
            console.log(event)
          }
        }
      })
    }
  },
  firebase: {
    edicoes: {
      source: db.ref('edicoes'),
      cancelCallback(err){
        console.error(err);
      }
    }
  },  
  components: {
    edicoes
  }
}
</script>
<style scoped>
  .edicoes {
    max-width:620px;
    margin:30px auto;
  }
  .participantes-escolhidos img {
    border:1px solid #000;
    width:60px;
    height:60px;
    border-radius:100px;
  }
</style>