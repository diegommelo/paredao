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
              <li v-for="(bbb,key) in participantes" v-on:click="removeParticipante(bbb)">
                <div>
                  <img :src="'img/fotos/'+bbb.foto+'.jpg'"/><br/>
                  <span>(BBB {{bbb.edicao}})</span>
                </div>
              </li>              
              <li v-for="n in total_participantes">
                <div>
                  <img src="img/icons/robo.jpg" /><br/>
                  <span>&nbsp</span>
                </div>
              </li>
            </ul>            
          </div>
          <div class="lista-edicoes">
            <h2>Selecionar participantes</h2>
            <ul>
              <li v-for="edicao in edicoes">
                <a class="button is-dark" @click="carregaEdicao(parseInt(edicao['.key']))">BBB {{parseInt(edicao['.key'])+1}}</a>
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
      participantes: [],
      total_participantes:14
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
          "participantes":this.participantes
        },
        events: {
          escolheBBB: function(event){
            let hasBBB = _.findIndex(el.participantes, function(o){
              return o.foto == event.foto
            })
            if(el.participantes.length == 14){
              el.$toast.open({
                duration: 2000,
                message: 'Edição completa',
                position: 'is-bottom',
                type: 'is-danger'                  
              })
            } else {
              if(hasBBB == -1){
                el.participantes.push(event)
                el.total_participantes = el.total_participantes - 1
              } else {
                el.removeParticipante(event)
              }
            }            
          }
        }
      })
    },
    removeParticipante: function(bbb){
      _.remove(this.participantes, function(n){
        return n.foto == bbb.foto
      })
      this.total_participantes = this.total_participantes + 1
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
  @media (min-width: 1281px) {
    .participantes-escolhidos img {
      width:90px;
      height:90px;
    }
  }  
  @media (max-width:480px) {
    .participantes-escolhidos img {
      width:60px;
      height:60px;      
    }
  }
  .edicoes {
    max-width:620px;
    margin:30px auto;
  }
  .participantes-escolhidos {
    padding-bottom:15px;
  }
  .participantes-escolhidos img {
    border:6px solid #0178BC;
    border-radius:100px;
  }
  .participantes-escolhidos li, .lista-edicoes li {
    
  }  
  .lista-edicoes li a {
    margin:5px;
  }
  .participantes-escolhidos ul li:hover img {
/*       border: 6px solid #7F0000;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 100px;    */ 
      cursor: pointer;
  }
  .edicoes h2 {
    padding-bottom:10px;
  }
</style>