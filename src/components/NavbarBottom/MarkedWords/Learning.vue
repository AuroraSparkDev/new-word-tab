<script lang="ts" setup>
import WordList, { ActionButton } from '@/components/shared/WordList'
import useIgnoredWords from '@/composables/words/useIgnoredWords'
import useLearnedWords from '@/composables/words/useLearnedWords'

import useLearningWords from '@/composables/words/useLearningWords'

defineEmits<{
  (e: 'showDefinition', word: string): void
}>()

const { setAsIgnored } = useIgnoredWords()
const { setAsLearned } = useLearnedWords()
const { learningWords, removeLearningWords } = useLearningWords()

function handleMarkAsLearned(word: string) {
  setAsLearned(word)
  removeLearningWords(word)
}

function handleMarkAsIgnored(word: string) {
  setAsIgnored(word)
  removeLearningWords(word)
}
</script>

<template>
  <WordList
    :list="learningWords"
    max-height="calc(100vh - 165px)"
    stretch
    pointer
    @row-click="$emit('showDefinition', $event)"
  >
    <template #actions="{ word }">
      <ActionButton title="Mark as Learned" @click="handleMarkAsLearned(word)">
        <i-ic-round-check-circle-outline />
      </ActionButton>

      <ActionButton title="Ignore word" @click="handleMarkAsIgnored(word)">
        <i-ic-outline-visibility-off />
      </ActionButton>

      <ActionButton title="Remove from list" @click="removeLearningWords(word)">
        <i-ic-round-remove-circle-outline />
      </ActionButton>
    </template>

    <template #empty>
      <p class="empty-state">
        Mark words as <i>Learning</i> using
        <i-ic-round-bookmark-add class="empty-state__icon" /> icon
      </p>
    </template>
  </WordList>
</template>

<style scoped>
.empty-state {
  font-size: 0.9rem;
  padding: 30px 5px;
  text-align: center;
}

.empty-state__icon {
  display: inline-block;
  margin-bottom: -5px;
}
</style>
