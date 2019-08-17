<template>
    <div class="card">
      <div class="card-content">
        <h1>Edição Especial Criada com sucesso!</h1>
        <p>Compartilhe com os amigos enviando o link abaixo:</p>
        <p>www.geradordeparedao.com.br/especial/{{edicaoId}}</p>
        <div class="redes-sociais">
          
        </div>
        <div class="edicao-buttons">
          <a class="button is-dark" @click="this.$parent.close"><i class="fas fa-cog"></i> <span>Ver edição</span></a>
          <router-link class="button is-dark" to="/"><i class="fas fa-redo"></i><span> Novo paredão</span></router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'confirmaEdicao',
  props: ['edicaoId'],
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  border-radius:10px;
  text-align: center;
}
</style>
