import { ref, computed, watch } from 'vue';

import { intersect } from '@/utils/array';

import storage from '@/modules/localStorage';
import WORD_LISTS, { WordList } from '@/data/words';

const SELECTED_WORD_LIST_KEYS_STORAGE_KEY = 'swl';

export const selectedListKeys = ref(Object.keys(WORD_LISTS) as WordList[]);

export default function useWordLists() {
  selectedListKeys.value = getSelectedWordListKeysFromStorage();

  watch(selectedListKeys, saveSelectedWordListKeysToStorage);

  const wordsPoll = computed(() => {
    let wordsSet = new Set<string>();

    selectedListKeys.value.forEach((listKey) => {
      if (WORD_LISTS[listKey]) {
        wordsSet = new Set([...wordsSet, ...WORD_LISTS[listKey].list]);
      }
    });

    return Array.from(wordsSet);
  });

  function getIntersection(words: string[]) {
    return intersect(wordsPoll.value, words);
  }

  return {
    selectedListKeys,
    getIntersection,
    wordsPoll,
  };
}

function saveSelectedWordListKeysToStorage(list: WordList[]) {
  storage.set(SELECTED_WORD_LIST_KEYS_STORAGE_KEY, list.join(','));
}

function getSelectedWordListKeysFromStorage() {
  const keys = storage.get(SELECTED_WORD_LIST_KEYS_STORAGE_KEY);

  if (keys === null) {
    return Object.keys(WORD_LISTS) as WordList[];
  }

  return keys.split(',') as WordList[];
}
