<template>
  <div>
    <b-loading :is-full-page="true" :active="true" v-if="edicoes.length==0"></b-loading> 
    <section class="is-info is-bold is-fullheight">
      <div class="hero-body">
          <div class="brand">
            <h3 class="meu-paredao">Gerador de Paredões do</h3>
            <a href="/"><img src="/img/bbb-logo.png" class="bbb-logo" /></a> 
          </div>        
        <div class="edicoes faster animated slideInLeft">
          <div class="lista-edicoes">
            <h2>Selecionar participantes</h2>
            <ul>
              <li v-for="edicao in edicoes">
                <a class="button is-dark" @click="carregaEdicao(parseInt(edicao['.key']))">BBB {{parseInt(edicao['.key'])+1}}</a>
              </li>
            </ul>
          </div>
          <div class="participantes-escolhidos">
            <h2>Participantes escolhidos</h2>
            <ul>
              <li v-for="(bbb,key) in participantes" v-on:click="removeParticipante(bbb)">
                <div>
                  <v-lazy-image :src="'img/fotos/'+bbb.foto+'.jpg'" src-placeholder="img/icons/robo.jpg" />
                  <!-- <img :src="'img/fotos/'+bbb.foto+'.jpg'"/> -->
                  <br/>
                  <span class="edicao-bbb">(BBB {{bbb.edicao}})</span>
                </div>
              </li>              
              <li v-for="n in total_participantes" class="robo">
                <div>
                  <img src="img/icons/robo.jpg" /><br/>
                  <p>&nbsp</p>
                </div>
              </li>
            </ul>   
            <button class="button is-dark btnLimpar" :disabled="isVazio()" @click="participantes = [];total_participantes = 14"><i class="fas fa-eraser"></i> <span>Limpar</span></button>      
          </div>          
        </div>
        <div class="edicao-buttons">
          <a class="button is-dark" @click="salvaEdicao()"><i class="fas fa-cog"></i> <span>Gerar Paredão</span></a>
          <router-link class="button is-dark" to="/"><i class="fas fa-redo"></i><span> Voltar</span></router-link>
        </div>
      </div>
    </section>  
  </div>

</template>

<script>
// @ is an alias to /src
import edicoes from '@/components/edicoes.vue'
import confirmaedicao from '@/components/confirmaedicao.vue'
import imagesLoaded from 'vue-images-loaded'
import { Carousel, Slide } from 'vue-carousel';
import { db } from '../firebaseconfig'

export default {
  name: 'Config',
  data: function() {
    return {
      edicoes: [],
      edicaoSalva: [],
      participantes: [],
      total_participantes:14,
      edicoes_escolhidas:[],
      isLoading:true
    }
  },
  methods: {
    carregaEdicao: function(edicaoescolhida){
      let el = this
      this.$buefy.modal.open({
        parent: this,
        component: edicoes,
        props: {
          "escolhida":this.edicoes[edicaoescolhida],
          "participantes":this.participantes
        },
        width:750,
        events: {
          escolheBBB: function(event){
            let hasBBB = _.findIndex(el.participantes, function(o){
              return o.foto == event.foto
            })
            if(el.participantes.length == 14){
              if(hasBBB == -1){
                el.$buefy.toast.open({
                  duration: 2000,
                  message: 'Edição completa',
                  position: 'is-bottom',
                  type: 'is-warning'                  
                })                
              } else {
                el.removeParticipante(event)
              } 
            } else {
              if(hasBBB == -1){
                el.participantes.push(event)
                el.total_participantes = el.total_participantes - 1 
                el.edicoes_escolhidas.push(event.edicao)
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
    },
    salvaEdicao: function(){
      let router = this.$router
      let el = this
      if(this.participantes.length < 14) {
        this.$buefy.toast.open({
          duration:2000,
          message: 'Faltam participantes',
          position:'is-bottom',
          type:'is-danger'
        })
      } else {
        this.$firebaseRefs.edicaoSalva.push({
          participantes: el.participantes,
          edicoes_escolhidas:_.uniq(el.edicoes_escolhidas),
          criado_por:"",
          created_at:Date(Date.now())
        }).then(function(docRef){
          el.$buefy.modal.open({
            parent: el,
            component: confirmaedicao,
            props: {
              "edicaoId":docRef.key
            },
            canCancel: []
          })
/*           router.push({name:'paredao',query:{c:docRef.key}})
 */        }).catch(function(err){
            console.error('erro ao salvar edição especial')
          })    
      }  
    },
    isVazio: function(){
      console.log(this.participantes.length)
      if(this.participantes.length == 0){
        return true
      } else {
        return false
      }
    }
  },
  firebase: {
    edicoes: db.ref('edicoes'),
    edicaoSalva: db.ref('personalizado').limitToFirst(1)
  },  
  components: {
    edicoes,
    confirmaedicao
  },
  head: {
    title: {
      inner:'Personalizar Paredão',
      separator:' ',
      complement:' '
    }
  }
}
</script>
<style scoped>
  @media (min-width: 1281px) {
    .participantes-escolhidos img {
      width:90px;
      height:90px;
    }
    .robo {
      min-height:130px;
      vertical-align: top;
    }    
  }  
  @media (max-width:768px) {
    .participantes-escolhidos img {
      width:60px;
      height:60px;      
    }
    .edicao-buttons a {
      margin:8px 10px !important;
    }
    .robo {
      min-height:95px;
      vertical-align: top;
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
  .lista-edicoes {
    margin-bottom:40px;
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
  .edicao-buttons a {
    margin:0 15px;
  }
  .btnLimpar{
    margin-top:20px;
  }
  .edicao-bbb {
    font-size:0.9rem;
  }
  .v-lazy-image {
  filter: blur(3px);
  transition: filter 0.7s;
}
  .v-lazy-image-loaded {
    filter: blur(0);
  }
</style>