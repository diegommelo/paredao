<template>
  <div>
    <section class="hero is-info is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Gerador de Paredão
          </h1>
          <h2 class="subtitle">
            Crie o BBB dos seus sonhos!
          </h2>
          <p>Se você sempre quis saber como seria uma edição do Big Brother Brasil com seus participantes favoritos, veio ao lugar certo.<br/>
            Escolha as edições, monte sua casa virtual mais vigiada do Brasil, e vote até chegar no campeão!
          </p>
          <br/>
          <p><small>PS: Nosso algoritmo recria todas as provas de líderes, festas, e intrigas com a mesma precisão dos palpites do @chicobarney. ;)</small></p>
          <br/>
         <router-link to="/paredao" class="button is-primary is-large">Bora espiar!</router-link>
        </div>
      </div>
    </section>    
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
