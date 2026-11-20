<script setup>
defineProps({
  anos: { type: Array, required: true },
  inicio: { type: Number, required: true },
  fim: { type: Number, required: true },
})
const emit = defineEmits(['update:inicio', 'update:fim'])
</script>

<template>
  <fieldset class="filtro">
    <legend>Período de consulta</legend>
    <label>
      Ano inicial
      <select :value="inicio" @change="emit('update:inicio', Number($event.target.value))">
        <option v-for="ano in anos" :key="ano" :value="ano" :disabled="ano > fim">{{ ano }}</option>
      </select>
    </label>
    <label>
      Ano final
      <select :value="fim" @change="emit('update:fim', Number($event.target.value))">
        <option v-for="ano in anos" :key="ano" :value="ano" :disabled="ano < inicio">{{ ano }}</option>
      </select>
    </label>
  </fieldset>
</template>

<style scoped>
.filtro { display: flex; flex-wrap: wrap; gap: .8rem; margin: 0; padding: 0; border: 0; }
legend { margin-bottom: .5rem; padding: 0; font-weight: 600; }
label { display: grid; gap: .25rem; font-size: .9rem; }
select { min-height: 2.75rem; padding: .4rem .8rem; font: inherit; color: #18382f; background: #fff; border: 1px solid #8da59c; border-radius: .4rem; }
</style>
