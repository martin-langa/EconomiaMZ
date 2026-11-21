<script setup>
import { computed, ref, useId, watch } from 'vue'
import { criarResumo, enviarResumo, modoSimulado } from '../services/emailService.js'

const props = defineProps({
  dados: { type: Array, required: true },
  base: Object,
  comparado: Object,
  variacaoPontosPercentuais: Number,
  fonte: { type: String, required: true },
})

const idErro = useId()
const resumo = computed(() => criarResumo(props))
const campo = ref(null)
const destinatario = ref('')
const erroEndereco = ref('')
const enviando = ref(false)
const resultado = ref('')
const falhou = ref(false)

watch([resumo, destinatario], () => { resultado.value = '' })

async function submeter() {
  if (enviando.value || !props.dados.length) return
  if (!campo.value.validity.valid) {
    erroEndereco.value = 'Introduza um endereço de e-mail válido.'
    campo.value.focus()
    return
  }

  erroEndereco.value = ''
  resultado.value = ''
  falhou.value = false
  enviando.value = true
  const mensagem = resumo.value
  try {
    await enviarResumo(destinatario.value.trim(), mensagem)
    if (mensagem === resumo.value) {
      resultado.value = modoSimulado
        ? 'Simulação concluída. Nenhum e-mail foi enviado.'
        : 'O serviço de e-mail aceitou o envio do resumo.'
    }
  } catch {
    falhou.value = true
    resultado.value = 'Não foi possível enviar o resumo. Verifique a configuração do serviço e tente novamente.'
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <form v-if="dados.length" class="formulario-email" novalidate @submit.prevent="submeter">
    <div class="cabecalho-email">
      <span class="icone-email" aria-hidden="true">✉</span>
      <div><h2>Levar estes dados consigo</h2><p>Receba os anos e taxas seleccionados, a comparação e a fonte.</p></div>
    </div>
    <p v-if="modoSimulado" class="aviso-email">Modo de demonstração: o envio real requer a configuração do EmailJS.</p>
    <details>
      <summary>Ver conteúdo do e-mail</summary>
      <pre>{{ resumo }}</pre>
    </details>
    <label>
      Endereço de e-mail
      <input ref="campo" v-model.trim="destinatario" type="email" required autocomplete="email" placeholder="nome@exemplo.com"
        :disabled="enviando" :aria-invalid="Boolean(erroEndereco)"
        :aria-describedby="erroEndereco ? idErro : undefined" @input="erroEndereco = ''">
    </label>
    <p v-if="erroEndereco" :id="idErro" role="alert">{{ erroEndereco }}</p>
    <button type="submit" :disabled="enviando">
      {{ enviando ? 'A processar…' : modoSimulado ? 'Simular envio' : 'Enviar resumo' }}
    </button>
    <p :role="falhou ? 'alert' : 'status'" aria-live="polite" :class="{ 'estado-erro': falhou }">{{ enviando ? 'A processar o pedido…' : resultado }}</p>
  </form>
</template>

<style scoped>
.formulario-email { display: grid; gap: 1rem; min-width: 0; border: 1px solid #c8d8ce; border-radius: 1rem; padding: clamp(1rem, 3vw, 1.6rem); background: linear-gradient(140deg, #ffffff, #edf5ee); box-shadow: 0 12px 30px #173b2710; }
.formulario-email :is(h2, p) { margin: 0; }
.cabecalho-email { display: flex; align-items: flex-start; gap: .8rem; }
.cabecalho-email h2 { line-height: 1.2; }
.cabecalho-email p { color: #526a5c; }
.icone-email { display: grid; place-items: center; flex: none; width: 2.5rem; height: 2.5rem; border-radius: .75rem; color: #fff; background: #145e50; font-size: 1.35rem; }
.aviso-email { padding: .7rem .85rem; border-radius: .5rem; background: #fff5df; color: #67440e; }
.formulario-email label { display: grid; gap: .35rem; }
.formulario-email input { box-sizing: border-box; width: min(100%, 30rem); min-height: 3rem; padding: .6rem .8rem; font: inherit; border: 1px solid #82988e; border-radius: .55rem; background: #fff; }
.formulario-email input[aria-invalid="true"] { border-color: #a33c2a; }
.formulario-email button { justify-self: start; min-height: 2.75rem; margin: 0; }
.formulario-email summary { cursor: pointer; }
.formulario-email pre { white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; }
.formulario-email [role=alert], .estado-erro { color: #8c2e20; }
</style>
