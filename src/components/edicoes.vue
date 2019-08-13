<template>
  <div>
    <section class="is-info is-bold is-fullheight">
      <div class="hero-body">
        <div class="participantes">
          <ul>
            <h5 class="participantes-titulo sombra-texto">Escolha os participantes</h5>
            <li v-for="(bbb,key) in escolhida['.value']" :key="key">
              <div class="inside-li" v-on:click="escolheParticipante(bbb)">
                <img :src="'img/fotos/'+bbb.foto+'.jpg'" />
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
  props: ['escolhida'],
  methods: {
    escolheParticipante(bbb){
      this.$emit('escolheBBB',bbb)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .participantes {
    text-align: center;
  }
  .participantes p {
    width:80px;
    word-wrap: break-word;
    font-size:0.9em;
  }
  .participantes ul {
    display:table-row;
  }
  .participantes ul li {
    text-align: center;
    min-height: 120px;
    vertical-align: middle;
    padding-bottom:10px;
  }
  .participantes img {
    border:1px solid #000;
    width:60px;
    height:60px;
    border-radius:100px;
  }
</style>
