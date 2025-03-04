<script setup lang="ts">
import type { IWordDefinition } from '@/composables/words/useWordDefinitions'

import IconButton from '@/components/shared/IconButton.vue'
import useGoogleTranslate from '@/composables/useGoogleTranslate'
import useIgnoredWords from '@/composables/words/useIgnoredWords'

import useLearningWords from '@/composables/words/useLearningWords'

const props = defineProps<{
  definition: IWordDefinition
}>()

const emit = defineEmits(['marked'])

const { targetLanguage } = useGoogleTranslate()
const { setAsIgnored } = useIgnoredWords()
const { setAsLearning, removeLearningWords } = useLearningWords()

function handleMarkAsLearning() {
  setAsLearning(props.definition.word)
  emit('marked')
}

function handleMarkAsIgnored() {
  removeLearningWords(props.definition.word)
  setAsIgnored(props.definition.word)
  emit('marked')
}
</script>

<template>
  <div class="actions">
    <IconButton
      :title="`Google translate (${targetLanguage.lang})`"
      :href="`https://translate.google.com/?sl=en&tl=${targetLanguage.code}&text=${definition.word}&op=translate`"
      target="_blank"
    >
      <i-ic-round-g-translate />
    </IconButton>

    <IconButton title="Ignore word" @click="handleMarkAsIgnored">
      <i-ic-round-visibility-off />
    </IconButton>

    <IconButton title="Mark as Learning" @click="handleMarkAsLearning">
      <i-ic-round-bookmark-add />
    </IconButton>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
}
</style>
