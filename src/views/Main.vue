<template>
    <div>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>      
    <section v-if="paredaoCarregado" class="hero is-info is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="brand">
            <h3 class="meu-paredao">Gerador de Paredões do</h3>
            <img src="/img/bbb-logo.png" class="bbb-logo" />            
          </div>
          <div v-if="start" class="edicoes hero faster animated slideInLeft">
              <h6 class="title is-5 sombra-texto">Escolha as edições</h6>
              <ul>
                  <li v-for="edicao in edicoes_totais">
                    <div class="field">
                    <b-checkbox-button v-model="edicoes_escolhidas" :native-value="edicao" type="is-dark"><i class="fas fa-check"></i><span>BBB {{edicao}}</span></b-checkbox-button>
                    </div>
                  </li>
              </ul>
              <br/>
              <div class="play-button">
                <a class="button is-dark is-medium" v-on:click="comecaParedao(edicoes_escolhidas,participantes)"><i class="fas fa-cog" :class="{'fa-spin':carregando}"></i><span> Gerar</span></a> 
              </div>
          </div>
          <div v-show="!start" class="conteudo animated faster slideInLeft">
            <div class="game" v-show="!isLoading">
              <h3 v-if="campeao.length==0 && paredao.length>0" class="title is-4 sombra-texto">Quem você quer eliminar?</h3>
              <div class="paredao animated box" v-show="campeao.length==0 && paredao.length>0 ">
                <h4 v-if="restantes.length>2" class="title titulo-paredao">Paredão {{historico.length+1}}</h4>
                <h4 v-if="restantes.length==2" class="title titulo-paredao">Final</h4>
                <div class="columns is-mobile" v-if="paredao.length>0">
                  <div class="column animated faster" :class="[!showcard1 ? elemanim1 : 'fadeInDown']" v-on:click="eliminaParedao(paredao[0],0)">
                    <div class="card-paredao">
                      <figure class="image avatar">
                        <img :src="'https://api.adorable.io/avatars/256/'+paredao[0].nome" /> 
                      </figure>      
                      <div class="conteudo-card-paredao">
                      <p><strong>{{paredao[0].nome}}</strong></p>
                      <small>(BBB {{paredao[0].edicao}})</small>       
                      </div>
                    </div>
                  </div>
                  <div class="column is-narrow versus"><span>VS</span></div>
                  <div class="column animated faster" :class="[!showcard2 ? elemanim2 : 'fadeInDown']" v-on:click="eliminaParedao(paredao[1],1)">
                    <div class="card-paredao">
                        <figure class="image avatar">
                          <img :src="'https://api.adorable.io/avatars/256/'+paredao[1].nome" /> 
                        </figure> 
                        <div class="conteudo-card-paredao">
                          <h4><strong>{{paredao[1].nome}}</strong></h4>
                          <small>(BBB {{paredao[1].edicao}})</small>        
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="animated columns" v-show="campeao.length>0" :class="{'bounceIn':campeao.length>0}">
                <div class="column box is-three-fifths is-offset-one-fifth" v-if='campeao.length>0'>
                    <h1 class="title titulo-paredao has-text-warning"><i class="fas fa-trophy"></i> Campeão <i class="fas fa-trophy"></i></h1>
                    <figure class="avatar">
                      <img :src="'https://api.adorable.io/avatars/256/'+campeao[0].nome" /> 
                    </figure> 
                    <div class="campeao conteudo-card-paredao">
                      <p><strong>{{campeao[0].nome}}</strong></p>
                      <small>(BBB {{campeao[0].edicao}})</small>        
                    </div>
                  </div>
              </div>
              <div v-show="campeao.length>0" class="historico" :class="{'bounceIn':campeao.length>0}">
                <h4 class="sombra-texto" v-if="campeao.length>0">Histórico de Paredões</h4>
                <carousel>
                    <slide v-for="(paredon,index) in historico">
                      <h4 v-if="index==0">Final</h4>
                      <h4 v-else>Paredão {{13-index}}</h4>
                      <ul>
                        <li>
                          <!--<img :src="'https://api.adorable.io/avatars/256/'+paredon[0].nome" class="mini-avatar" :class="{eliminado:isVencedor(paredon[0],paredon)}" />-->
                          <div class="conteudo-card-historico">
                            <i v-if="isVencedor(paredon[0],paredon)" class="fas fa-crown"></i>
                            <i v-else class="fas fa-times"></i>
                            <h4 :class="{'riscado':!isVencedor(paredon[0],paredon)}">{{paredon[0].nome}}</h4>
                            <small>(BBB {{paredon[0].edicao}})</small>        
                          </div>                        
                        </li>
                        <li class="is-narrow versus">
                          VS
                        </li>
                        <li>
                          <!--<img :src="'https://api.adorable.io/avatars/256/'+paredon[1].nome" class="mini-avatar" :class="{eliminado:isVencedor(paredon[1],paredon)}"/>-->
                          <div class="conteudo-card-historico">
                            <i v-if="isVencedor(paredon[1],paredon)" class="fas fa-crown"></i>
                            <i v-else class="fas fa-times"></i>                          
                            <h4 :class="{'riscado':!isVencedor(paredon[1],paredon)}">{{paredon[1].nome}}</h4>
                            <small>(BBB {{paredon[1].edicao}})</small>        
                          </div>                        
                        </li>
                      </ul>                            
                    </slide>
                  </carousel>
              </div>
              <hr class="divisor"></hr>
              <div class="participantes" v-show="!start">
                <div class="columns">
                  <div class="column">
                    <div v-images-loaded="imageProgress">
                      <ul>
                        <h5 class="participantes-titulo sombra-texto">Participantes</h5>
                        <li v-for="(bbb,key) in sorteados" :key="key" :class="[{eliminado:isEliminado(bbb)}]">
                          <b-tooltip :label="bbb.nome">
                            <img :src="'https://api.adorable.io/avatars/256/'+bbb.nome" />
                          </b-tooltip>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="column">
                    <ul class="animated faster">
                      <h5 class="participantes-titulo sombra-texto">Edições</h5>
                      <li v-for="edicao in edicoes_escolhidas">
                        <span class="tag is-blue"><i class=" fas fa-check"></i>BBB {{edicao}}</span>
                      </li>
                    </ul>
                  </div>                
                </div>
              </div>
              <a v-if="!start" class="button is-dark" v-on:click="resetaParedao">
                <i class="fas fa-redo"></i><span> Novo Paredão</span>
              </a>                
          </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <footer>
          feito com <i class="fas fa-heart"></i>por <span class="orange">@paulinha_v</span> e <span class="orange">@dieguitoo</span>
          <p class="disclaimer">Este site não é afiliado a Globo ou a Endemol.<br/>  Todos os direitos reservados a seus respectivos proprietários.</p>
        </footer>        
      </div>    
    </section>
    </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'
import { Carousel, Slide } from 'vue-carousel';
import { db } from '../firebaseconfig'

export default {
  name: 'Paredao',
  data: function() {
    return {
      bbbs: [],
      sorteados:[],
      paredao:[],
      restantes:[],
      campeao:[],
      historico:[],
      edicoes_totais:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
      edicoes_escolhidas:[],
      participantes: 14,
      showcard1:true,
      showcard2:true,
      elimanim1:false,
      elimanim2:false,
      start:false,
      showhistorico:false,
      carregando:false,
      shareId:"",
      paredaoCarregado:{},
      isLoading: true,
      isFullPage: true
    }
  },  
  methods: {
  	sorteiaParedao: function(){
    	let el = this
      setTimeout(function(){ el.paredao=_.sampleSize(el.restantes,2);el.showcard1=true;el.showcard2=true}, 300);
    },
    eliminaParedao: function(bbb,clicado){
      if(this.restantes.length>1){
       	_.remove(this.restantes,function(n){
      			return n.nome == bbb.nome
      	})
        let vencedor = (_.differenceWith(this.paredao,[bbb],_.isEqual))
       	this.paredao.push(vencedor[0])
        this.historico.unshift(this.paredao)
        if(clicado==0){
        	this.elemanim1 = 'fadeOutLeft'
          this.elemanim2 = 'fadeOutUp'
        } else {
				  this.elemanim1 = 'fadeOutUp'
          this.elemanim2 = 'fadeOutRight'
        }
        this.showcard1=false
        this.showcard2=false
      //this.paredao = []
      }
      if(this.restantes.length==1){
      	this.encerraParedao()
      } else {
        let el = this
        el.sorteiaParedao()
      // 	setTimeout(function(){},300)
      }
    },
    isEliminado: function(bbb){
    	if(this.restantes.indexOf(bbb) == -1){
      	return true
      } else {
      	return false
      }
    },
    isVencedor: function(bbb,paredao){
    	return (bbb.nome == paredao[2].nome) ?  true : false;
    },
    escolheEdicao: function(edicao){
    	console.log(edicao)
    },
    checaEdicao: function(edicao){
    	return (this.edicoes_escolhidas.indexOf(edicao)==1) ? true : false
    },
    comecaParedao: function(edicoes,participantes){
      if(this.edicoes_escolhidas.length>0){
      	let el = this
      	_.forEach(edicoes,function(edicao){
        	_.forEach(el.edicoesSalvas[edicao-1]['.value'],function(val){
          	el.bbbs.push(val)
          })
        })
      	this.sorteados = _.sampleSize(this.bbbs,participantes)
        //reseta database
      	this.restantes = this.sorteados.slice(0)
        this.historico = []
        this.paredao = []
        this.bbbs = []
        this.campeao = []
        this.participantes = 14
      	this.sorteiaParedao()
      	this.carregando= true        
        } else {
          this.$toast.open({
              duration: 2000,
              message: 'Selecione pelo menos uma edição',
              position: 'is-bottom',
              type: 'is-danger'
          })          
        }
    },
    imageProgress: function(instance) {
      this.start = false
      this.carregando = false
      scroll(0,0)
      console.log('imgloaded')
    },
    resetaParedao: function(){
      this.restantes=[]
      this.campeao=[]
      this.historico=[]
      this.edicoes_escolhidas=[]
      this.paredao=[]
      this.start = true
      this.$router.push({name:'paredao'})
    },
    encerraParedao: function(){
        var router = this.$router
        console.log(router)
        this.$firebaseRefs.paredoesSalvos.push({
          campeao: this.restantes.slice(0),
          edicoes_escolhidas:this.edicoes_escolhidas,
          sorteados:this.sorteados,
          historico:this.historico,
          created_at:Date(Date.now())
        }).then(function(docRef){
          console.log(docRef)
          router.push({name:'paredao',query:{p:docRef.key}})
        })
    },
    carregaParedao: function(paredaoId){
      this.$bindAsObject('paredaoCarregado', db.ref('paredoes').child(paredaoId), null, () => {
        this.start = false        
        this.sorteados = this.paredaoCarregado.sorteados
        this.campeao = this.paredaoCarregado.campeao
        this.edicoes_escolhidas = this.paredaoCarregado.edicoes_escolhidas
        this.historico = this.paredaoCarregado.historico
        this.campeao = this.paredaoCarregado.campeao
        //this.paredao = this.paredaoCarregado.historico[0]
        this.shareId = this.paredaoCarregado['.key']
        this.isLoading = false
      })

    }
  },
  created: function(){
    console.log('created')
    if(this.$route.query.p==undefined){
      this.start = true
      this.isLoading = false
    } else {
      this.carregaParedao(this.$route.query.p)
    }
	},    
	watch: {
	  '$route' (to,from) {
	    console.log('watch')
	    if(to.query.p==undefined) {
	      this.start = true
        this.isLoading = false
	    } else {
	      this.carregaParedao(to.query.p)
	    }
	  },
	  'paredaoCarregado' () {
	    if(this.paredaoCarregado.hasOwnProperty('.value')) {
	      console.log('ue')
	      this.campeao = []
	      this.paredao = []
	      this.sorteados = []
	      this.edicoes_escolhidas = []
        this.$toast.open({
            duration: 2000,
            message: 'Paredão não encontrado',
            position: 'is-bottom',
            type: 'is-danger'
        }) 	      
        this.$router.push({name:'paredao'})
	    }
	  }
	},
  components: {
    Carousel,
    Slide    
  },
  directives: {
    imagesLoaded,
  },
  firebase: function(){
    return {
      edicoesSalvas: db.ref('edicoes'),
      paredoesSalvos: db.ref('paredoes').limitToFirst(1),
    }
  }
}
</script>

<style>
  @media (min-width: 320px) and (max-width: 480px) {
    .VueCarousel {
    max-width:320px !important;
    }
  }
  @media (min-width: 1281px) {
    .card-paredao:hover img {
      border: 2px solid #19386b;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;    
    }
    .card-paredao:hover, .card-paredao:hover strong {
      color:#19386b !important;
    }
    .paredao {
      min-height:360px;
    }
  } 
  .box {
    padding: 1rem !important;
  }
  .hero-body {
    padding: 2rem 1.5rem !important;
  }
  .play-button{
    margin-bottom:20px;
  }
  .brand h1 {
    font-size:2em;    
  }
  .brand img {
    padding:5px;
  }
  .bbb-logo {
    width:256px;
  }
  .game {
    margin: auto;
    max-width:620px;
    padding-top:20px;
  }
  .avatar {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width:200px;
  }
  .avatar img {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;   
    border: 1px solid #dbdbdb;    
  }
  footer {
    margin-bottom:10px;
  }
  .participantes {
    margin-bottom: 30px;
  }
  .participantes img {
    border:1px solid #000;
    width:45px;
    height:45px;
  }
  .edicoes {
    max-width:620px;
    margin:30px auto;
  }
  .participantes-titulo{
    text-align:left;
    padding:0 0 5px 7px;
    font-weight:bold;
  }
  /*.sombra-texto{*/
  /*  text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;*/
  /*}*/
  .sombra-texto {
    text-shadow: 0 0 2px #000;
  }
  .meu-paredao{
    font-size:1.2em;
    text-shadow: 0 0 1px #000;
    padding-bottom:5px;
  }
  .titulo-paredao{
    color:#4a4a4a !important;
  }
  .divisor {
    max-width:100px;
    margin:40px auto;
  }
  .campeao p {
    font-size:1.2em;
  }
  .card-paredao{
    text-align:center;
    padding:5px;
  }  
  .tag:not(body).is-blue {
    background-color: #19386b;
    color: white;
  }
  .eliminado {
    -webkit-filter: grayscale(100%);
  }
  i{
    margin-right:5px;
    margin-top:2px;
  }
  .historico {
    margin-top:30px;
  }
  .historico-card {
    margin:0 30px 10px 30px !important;
  }
  figure {
    display:block;
    margin:auto;
    padding:auto;
  }
  .conteudo-card-paredao{
    padding:5px;
  }
  .versus{
    padding:10px;
    width:35px;
    height:35px;
    vertical-align:top;
  }
  .mini-avatar{
    width:45px;
    background-size:cover;
  }
  .instrucoes{
    text-align:left !important;
  }  
  .VueCarousel {
    margin:0 auto;
  }
  .conteudo-card-historico {
    color:#000;
    font-size:0.8em;
  }
  .conteudo-card-historico small {
    color:#fff;
  }
  .conteudo-card-historico h4 {
    font-weight:bold;
  }
  .fa-times {
    color:red;
  }
  .fa-crown {
    color:orange;
  }
  .riscado {
    text-decoration: line-through;
  }
  .fa-heart {
    color:red;
  }
  .orange {
    color:#99CC99;
  }
  .disclaimer {
    margin-top:5px;
    font-size:0.6rem;
    color:#C0D6DF;
  }
</style>