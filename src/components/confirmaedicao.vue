<template>
    <div class="cardB">
      <div class="card-content">
        <a class="fa-stack fa-4x check-confirm">
          <i class="fas fa-circle fa-stack-2x fa-inverse"></i>
          <i class="fas fa-check-circle fa-stack-2x confirm fa-inverse"></i>
        </a>  
        <p>Compartilhe com seus amigos enviando o link abaixo:</p>
        <b-input v-model="url_share" icon-pack="far" type="copy" @focus="$event.target.select(); copiarUrl();" ref="urlshare"></b-input>
        <p>Ou postando em suas redes sociais:</p>
        <div class="redes-sociais">
          <a class="fa-stack fa-2x">
            <i class="fas fa-square fa-stack-2x twitter"></i>
            <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
          </a>
          <a class="fa-stack fa-2x">
            <i class="fas fa-square fa-stack-2x facebook"></i>
            <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
          </a>
          <a class="fa-stack fa-2x">
            <i class="fas fa-square fa-stack-2x whatsapp"></i>
            <i class="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
          </a>                              
        </div>
        <div class="edicao-buttons">
          <a class="button is-dark" @click="fechaConfirm('paredao',edicaoId)"><i class="far fa-eye"></i> <span>Espiar edição</span></a>
          <a class="button is-dark" @click="fechaConfirm('home',edicaoId)"><i class="fas fa-redo"></i> <span>Novo paredão</span></a>
<!--           <router-link class="button is-dark" to="/" @click="this.$parent.close"><i class="fas fa-redo"></i><span> Novo paredão</span></router-link>
 -->        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'confirmaEdicao',
  props: ['edicaoId'],
  data: function(){
    return {
      url_share: "https://geradordeparedao.com.br/?especial="+this.edicaoId
    }
  },
  methods: {
    copiarUrl: function(){
      document.execCommand("copy");
      this.$toast.open({
        duration:1500,
        message: 'Url Copiada',
        type:"is-info",
        position:"is-bottom"
      })
    },
    fechaConfirm: function(para,urlId){
      this.$emit('close');
      if(para=="home"){
        this.$router.push('/')
      } else if(para="paredao"){
        this.$router.push({name:'paredao',query:{"especial":urlId}});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardB {
  border-radius:10px;
  text-align: center;
  max-width: 450px;
  margin: 0 auto;
  line-height: 30px;
}
.ok {
  max-width: 120px;
}
.redes-sociais {
  margin-bottom:30px;
}
.check-confirm {
  margin-bottom:10px;
}
.facebook {
  color:#3b5998 !important;
}
.twitter {
  color:#1da1f2  
}
.whatsapp {
  color:#25D366;
}
.confirm {
  color:#19c029;
}
.card-content .control {
  margin:5px 0 10px 0 !important;
}
.edicao-buttons a {
  margin:0 10px;
}
</style>
