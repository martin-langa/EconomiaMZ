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
    resultado.value = 'Não foi possível enviar o resumo. Verifique a configuração do serviço e tente novamente.'
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <form v-if="dados.length" class="formulario-email" novalidate @submit.prevent="submeter">
    <h2>Receber resumo por e-mail</h2>
    <p v-if="modoSimulado">Modo de demonstração. Pode testar o formulário com um endereço fictício.</p>
    <details>
      <summary>Ver conteúdo do e-mail</summary>
      <pre>{{ resumo }}</pre>
    </details>
    <label>
      Endereço de e-mail
      <input ref="campo" v-model.trim="destinatario" type="email" required autocomplete="email"
        :disabled="enviando" :aria-invalid="Boolean(erroEndereco)"
        :aria-describedby="erroEndereco ? idErro : undefined" @input="erroEndereco = ''">
    </label>
    <p v-if="erroEndereco" :id="idErro" role="alert">{{ erroEndereco }}</p>
    <button type="submit" :disabled="enviando">
      {{ enviando ? 'A processar…' : modoSimulado ? 'Simular envio' : 'Enviar resumo' }}
    </button>
    <p role="status" aria-live="polite">{{ enviando ? 'A processar o pedido…' : resultado }}</p>
  </form>
</template>

<style scoped>
.formulario-email { display: grid; gap: .8rem; min-width: 0; border-top: 1px solid #c8d8ce; padding-top: 1.5rem; }
.formulario-email :is(h2, p) { margin: 0; }
.formulario-email label { display: grid; gap: .35rem; }
.formulario-email input { box-sizing: border-box; width: min(100%, 26rem); min-height: 2.75rem; padding: .5rem .75rem; font: inherit; border: 1px solid #82988e; border-radius: .4rem; }
.formulario-email button { justify-self: start; min-height: 2.75rem; margin: 0; }
.formulario-email summary { cursor: pointer; }
.formulario-email pre { white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; }
.formulario-email [role=alert] { color: #8c2e20; }
</style>
