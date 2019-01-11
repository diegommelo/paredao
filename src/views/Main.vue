<template>
    <div>
    <section v-if="" class="hero is-info is-bold is-fullheight">
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
          <div v-show="!start" class="conteudo animated faster slideInRight">
            <div class="game">
              <h3 v-if="campeao.length==0" class="title is-4 sombra-texto">Quem você quer eliminar?</h3>
              <div class="paredao animated box" v-show="campeao.length==0">
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
                      <img :src="'https://api.adorable.io/avatars/256/'+paredao[1].nome" /> 
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
              <div class="participantes" v-show="paredao.length>0">
                <div class="columns">
                  <div class="column">
                    <div v-images-loaded="imageProgress">
                      <ul>
                        <h5 class="participantes-titulo sombra-texto">Participantes</h5>
                        <li v-for="(bbb,key) in sorteados" :class="[{eliminado:isEliminado(bbb)}]">
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
            <!--  <div v-if='historico != ""' class="historico">-->
            <!--    <div class="card" v-for="paredao in historico">-->
            <!--     <p class="historico-eliminado" :class="{winner:isVencedor(paredao[0],paredao)}">-->
            <!--     {{paredao[0].nome}}-->
            <!--     </p>-->
            <!--     <p>-->
            <!--     x-->
            <!--     </p>-->
            <!--     <p class="historico-eliminado" :class="{winner:isVencedor(paredao[1],paredao)}">-->
            <!--     {{paredao[1].nome}}-->
            <!--     </p>-->
            <!--  </div>              -->
            <!--</div>-->
          </div>
            <a v-if="!start" class="button is-dark" v-on:click="resetaParedao">
              <i class="fas fa-redo"></i><span> Novo Paredão</span></a>            
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <footer>
          feito com <i class="fas fa-heart"></i>por <span class="orange">@paulinha_v</span> e <span class="orange">@dieguitoo</span>
        </footer>        
      </div>      
    </section>
    </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'Paredao',
  data: function() {
    return {
      bbbs: [],
      edicoes: [[
        { nome: "Kléber Bambam", edicao: 1 },
        { nome: "Vanessa Pascale", edicao: 1 },
        { nome: "André Carvalho", edicao: 1 },
        { nome: "Sérgio Tavares", edicao: 1 },
        { nome: "Alessandra Begliomini", edicao: 1 },
        { nome: "Estela Padilha", edicao: 1 },
        { nome: "Adriano de Castro", edicao: 1 },
        { nome: "Helena Louro", edicao: 1 },
        { nome: "Cristiana Mota", edicao: 1 },
        { nome: "Bruno Saladini", edicao: 1 },
        { nome: "Xaiane Dantas", edicao: 1 },
        { nome: "Caetano Zonaro", edicao: 1 }
        ],
        [
        { nome: "Rodrigo Leonel", edicao: 2 },
        { nome: "Manuela Saadeh", edicao: 2 },
        { nome: "Cida Junqueira", edicao: 2 },
        { nome: "Thyrso Matos", edicao: 2 },
        { nome: "Tarciana Lima", edicao: 2 },
        { nome: "Fabricio Amaral", edicao: 2 },
        { nome: "Thaís Ventura", edicao: 2 },
        { nome: "Moisés Cruz", edicao: 2 },
        { nome: "Jeferson dos Santos", edicao: 2 },
        { nome: "Fernando Fernandes", edicao: 2 },
        { nome: "Tina Soares", edicao: 2 },
        { nome: "Rita Gonçalves", edicao: 2 }  ],
        [      
          { nome: "Dhomini", edicao: 3 },
        { nome: "Elane Silva", edicao: 3 },
        { nome: "Viviane Oliveira", edicao: 3 },
        { nome: "Jean Massumi", edicao: 3 },  
        { nome: "Harry Grossman", edicao: 3 },
        { nome: "Sabrina Sato", edicao: 3 },
        { nome: "Emílio Rodrigues", edicao: 3 },
        { nome: "Alan Conceição", edicao: 3 },  
        { nome: "Juliana Alves", edicao: 3 },
        { nome: "Andrea Guerrero", edicao: 3 },
        { nome: "Marcelo Kretzer", edicao: 3 },
        { nome: "Joseane Oliveira", edicao: 3 },  
        { nome: "Dilson Walkarez", edicao: 3 },
        { nome: "Paulo Carotini", edicao: 3 },
        { nome: "Samantha Pereira", edicao: 3 }],
        [      
          { nome: "Cida dos Santos", edicao: 4 },  
        { nome: "Thiago Lira", edicao: 4 },
        { nome: "Juliana Lopes", edicao: 4 },
        { nome: "Solange Couto", edicao: 4 },
        { nome: "Marcela Queiroz", edicao: 4 },  
        { nome: "Rogério Dragone", edicao: 4 },
        { nome: "Marcelo Dourado", edicao: 4 },
        { nome: "Zulu Gomes", edicao: 4 },
        { nome: "Edilson Buba", edicao: 4 },  
        { nome: "Géris de Souza", edicao: 4 },
        { nome: "Antonela Avellaneda", edicao: 4 },
        { nome: "Cristiano Carnevale", edicao: 4 },
        { nome: "Eduardo Monteiro", edicao: 4 },  
        { nome: "Tatiana Giordano", edicao: 4 }   ],
        [    
        { nome: "Jean Wyllys", edicao: 5 },
        { nome: "Grazielli Massafera", edicao: 5 },
        { nome: "Sammy Ueda", edicao: 5 },  
        { nome: "Alan Passos", edicao: 5 },
        { nome: "Tatiane Pink", edicao: 5 },
        { nome: "Karla Barbosa", edicao: 5 },
        { nome: "Aline dos Santos", edicao: 5 },  
        { nome: "Tatiana Machado", edicao: 5 },
        { nome: "Natália Nara", edicao: 5 },
        { nome: "Paulo André Costa", edicao: 5 },
        { nome: "Rogério Padovan", edicao: 5 },        
        { nome: "Giullianno Ciarelli", edicao: 5 },
        { nome: "Marcos Maçaneiro", edicao: 5 },
        { nome: "Marielza Santos", edicao: 5 },
        { nome: "Juliana Brandão", edicao: 5 } ],
        [    
        { nome: "Mara Viana", edicao: 6 },
        { nome: "Mariana Felício", edicao: 6 },
        { nome: "Rafael Valente", edicao: 6 },  
        { nome: "Agustinho Mendonça", edicao: 6 },
        { nome: "Gustavo Borges", edicao: 6 },
        { nome: "Iran Alves", edicao: 6 },
        { nome: "Carlos Castello", edicao: 6 },  
        { nome: "Inês Gomes", edicao: 6 },
        { nome: "Thaís Macedo", edicao: 6 },
        { nome: "Léa Ferreira", edicao: 6 },
        { nome: "Roberta Brasil", edicao: 6 },        
        { nome: "Daniel Saullo", edicao: 6 },
        { nome: "Dan Costa", edicao: 6 },
        { nome: "Juliana Canabarro", edicao: 6 } ],
        [    
        { nome: "Diego Gasques", edicao: 7 },
        { nome: "Carollini Honório", edicao: 7 },
        { nome: "Bruna Tavares", edicao: 7 },  
        { nome: "Analy Rosa", edicao: 7 },
        { nome: "Airton Cabral", edicao: 7 },
        { nome: "Alberto Pimentel", edicao: 7 },
        { nome: "Fani Pacheco", edicao: 7 },  
        { nome: "Flavia Viana", edicao: 7 },
        { nome: "Íris Stefanelli", edicao: 7 },
        { nome: "Bruno Jácome", edicao: 7 },
        { nome: "Fernando Luiz Bacalow", edicao: 7 },        
        { nome: "Felipe Cobra", edicao: 7 },
        { nome: "Alan Pierre Miranda", edicao: 7 },
        { nome: "Liane de Souza", edicao: 7 },
        { nome: "Daniel Belangero", edicao: 7 },
        { nome: "Juliana Regueiro", edicao: 7 }],
        [    
        { nome: "Rafinha Ribeiro", edicao: 8 },
        { nome: "Gyselle Soares", edicao: 8 },
        { nome: "Natália Casassola", edicao: 8 },  
        { nome: "Marcos Silva", edicao: 8 },
        { nome: "Thatiana Bione", edicao: 8 },
        { nome: "Marcelo Arantes", edicao: 8 },
        { nome: "Juliana Góes", edicao: 8 },  
        { nome: "Felipe Basílio", edicao: 8 },
        { nome: "Fernando Mesquita", edicao: 8 },
        { nome: "Bianca Jahara", edicao: 8 },
        { nome: "Thalita Lippi", edicao: 8 },        
        { nome: "Alexandre Scaquette", edicao: 8 },
        { nome: "Rafael Memória", edicao: 8 },
        { nome: "Jaqueline Khury", edicao: 8 }],
        [    
        { nome: "Maximiliano Porto", edicao: 9 },
        { nome: "Priscila Pires", edicao: 9 },
        { nome: "Francine Piaia", edicao: 9 },  
        { nome: "Ana Carolina Madeira", edicao: 9 },
        { nome: "Flávio Steffli", edicao: 9 },
        { nome: "Josiane de Oliveira", edicao: 9 },
        { nome: "Milena Fagundes", edicao: 9 },  
        { nome: "Naiá Giannocaro", edicao: 9 },
        { nome: "Maíra Cardi", edicao: 9 },
        { nome: "Ralf Krause", edicao: 9 },
        { nome: "Mirla Prado", edicao: 9 },        
        { nome: "André de Almeida", edicao: 9 },
        { nome: "Emanuel Milchevski", edicao: 9 },
        { nome: "Newton Siqueira", edicao: 9 },
        { nome: "Alexandre Gomes", edicao: 9 },        
        { nome: "Leonardo Jancu", edicao: 9 },
        { nome: "Norberto Carias", edicao: 9 },
        { nome: "Michelle da Costa", edicao: 9 },
        { nome: "Maíra Britto", edicao: 9 },
        { nome: "Daniel Gevaerd", edicao: 9 } ],
        [    
        { nome: "Marcelo Dourado", edicao: 10 },
        { nome: "Fernanda Cardoso", edicao: 10 },
        { nome: "Cadu Parga", edicao: 10 },  
        { nome: "Lia Kheireddine", edicao: 10 },
        { nome: "Dicesar Ferreira", edicao: 10 },
        { nome: "Anamara Brito", edicao: 10 },
        { nome: "Sérgio Franceschini", edicao: 10 },  
        { nome: "Michel Turtchin", edicao: 10 },
        { nome: "Eliéser Ambrósio", edicao: 10 },
        { nome: "Cláudia Colucci", edicao: 10 },
        { nome: "Angélica Martins", edicao: 10 },        
        { nome: "Elenita Rodrigues", edicao: 10 },
        { nome: "Uilliam Cardoso", edicao: 10 },
        { nome: "Alex Vilanova", edicao: 10 },
        { nome: "Tessália Serighelli", edicao: 10 },        
        { nome: "Ana Marcela Alves", edicao: 10 },
        { nome: "Joseane Oliveira", edicao: 10 } ],
        [    
        { nome: "Maria Melillo", edicao: 11 },
        { nome: "Wesley Schunk", edicao: 11 },
        { nome: "Daniel Rolim", edicao: 11 },  
        { nome: "Diana Balsini", edicao: 11 },
        { nome: "Rodrigão Gomes", edicao: 11 },
        { nome: "Paula Leite", edicao: 11 },
        { nome: "Jaqueline Faria", edicao: 11 },  
        { nome: "Maurício Joaquim", edicao: 11 },
        { nome: "Talula Pascoli", edicao: 11 },
        { nome: "Janaína dos Santos", edicao: 11 },
        { nome: "Diogo Preto", edicao: 11 },        
        { nome: "Adriana Sant'anna", edicao: 11 },
        { nome: "Natália Castro", edicao: 11 },
        { nome: "Lucival França", edicao: 11 },
        { nome: "Cristiano Naya", edicao: 11 },        
        { nome: "Igor Serra", edicao: 11 },
        { nome: "Michelly Freitas", edicao: 11 },
        { nome: "Rodrigo Carvalho", edicao: 11 },
        { nome: "Ariadna Arantes", edicao: 11 }  ],
        [    
        { nome: "Fael Cordeiro", edicao: 12 },
        { nome: "Fabiana Teixeira", edicao: 12 },
        { nome: "Jonas Sulzbach", edicao: 12 },  
        { nome: "Kelly Medeiros", edicao: 12 },
        { nome: "João Carvalho", edicao: 12 },
        { nome: "Monique Amin", edicao: 12 },
        { nome: "Yuri Fernandes", edicao: 12 },  
        { nome: "Renata Dávila", edicao: 12 },
        { nome: "Rafa Oliveira", edicao: 12 },
        { nome: "Laisa Portela", edicao: 12 },
        { nome: "João Mauricio Dantas", edicao: 12 },        
        { nome: "Ronaldo Peres", edicao: 12 },
        { nome: "Mayara Medeiros", edicao: 12 },
        { nome: "Jakeline Leal", edicao: 12 },
        { nome: "Analice de Souza", edicao: 12 },        
        { nome: "Daniel Echaniz", edicao: 12 }  ],
        [    
        { nome: "Fernanda Keulla", edicao: 13 },
        { nome: "Nasser Rodrigues", edicao: 13 },
        { nome: "Andressa Ganacin", edicao: 13 },  
        { nome: "Natália Casassola", edicao: 13 },
        { nome: "André Martinelli", edicao: 13 },
        { nome: "Fani Pacheco", edicao: 13 },
        { nome: "Kamilla Salgado", edicao: 13 },  
        { nome: "Anamara Brito", edicao: 13 },
        { nome: "Marcello Soares", edicao: 13 },
        { nome: "Eliéser Ambrósio", edicao: 13 },
        { nome: "Ivan Marcondes", edicao: 13 },        
        { nome: "Marien Carretero", edicao: 13 },
        { nome: "Yuri Fernandes", edicao: 13 },
        { nome: "Aslan Cabral", edicao: 13 },
        { nome: "Dhomini Ferreira", edicao: 13 },        
        { nome: "Aline Mattos", edicao: 13 },
        { nome: "Kleber Bambam", edicao: 13 },        
        { nome: "André Coelho", edicao: 13 },
        { nome: "Bernardo Lima", edicao: 13 },
        { nome: "Kelly Baron", edicao: 13 },
        { nome: "Samara Fonseca", edicao: 13 }],
        [    
        { nome: "Vanessa Mesquita", edicao: 14 },
        { nome: "Angela Munhoz", edicao: 14 },
        { nome: "Clara Aguilar", edicao: 14 },  
        { nome: "Marcelo Zagonel", edicao: 14 },
        { nome: "Valter Araújo", edicao: 14 },
        { nome: "Tatiele Polyana", edicao: 14 },
        { nome: "Cássio Lannes", edicao: 14 },  
        { nome: "Diego Grossi", edicao: 14 },
        { nome: "Aline Dahlen", edicao: 14 },
        { nome: "Franciele Almeida", edicao: 14 },
        { nome: "Roni Mazon", edicao: 14 },        
        { nome: "Letícia Santiago", edicao: 14 },
        { nome: "Junior Gianetti", edicao: 14 },
        { nome: "Amanda Gontijo", edicao: 14 },
        { nome: "Vagner Lara", edicao: 14 },        
        { nome: "Bella Maia", edicao: 14 },
        { nome: "Princy Cavalcante", edicao: 14 },        
        { nome: "Rodrigo Lima", edicao: 14 },
        { nome: "Alisson Gomes", edicao: 14 },
        { nome: "João Almeida", edicao: 14 }]         
        ],    
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
      start:true,
      showhistorico:false,
      carregando:false
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
      	this.campeao = this.restantes.slice(0)
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
      	let el = this._data
      	_.forEach(edicoes,function(edicao){
        	_.forEach(el.edicoes[edicao-1],function(val){
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
      console.log('kfjsalfj')
    },
    resetaParedao: function(){
      this.start=true
      this.restantes=[]
      this.campeao=[]
      this.historico=[]
    }
  },
  created: function(){
		//this.comecaParedao(this.edicoes_totais,this.participantes)
	},    
  components: {
    Carousel,
    Slide    
  },
  directives: {
    imagesLoaded,
    
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
</style>