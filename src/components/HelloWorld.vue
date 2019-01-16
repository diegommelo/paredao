<template>
  <div class="edicoes hero faster animated slideInLeft">
      <h6 class="title is-5 sombra-texto">Escolha as edições</h6>
      <ul>
          <li v-for="edicao in edicoes_totais">
            <div class="field">
                <b-checkbox-button v-model="edicoes_escolhidas" :native-value="edicao" type="is-dark">
                    <i class="fas fa-check"></i><span>BBB {{edicao}}</span>
                </b-checkbox-button>
            </div>
          </li>
      </ul>
      <br/>
      <div class="play-button">
        <a class="button is-dark is-medium" v-on:click="comecaParedao(edicoes_escolhidas,participantes)"><i class="fas fa-cog" :class="{'fa-spin':carregando}"></i><span> Gerar</span></a> 
      </div>
  </div>

</template>

<script>
export default {
  name: 'edicoes',
  props: ['edicoes_totais, edicoes_escolhidas']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
