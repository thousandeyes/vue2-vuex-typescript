<template>
  <div>
    {{ countLabel }}
    <br>
    <button @click="internalPerformAsyncIncrement">{{ buttonLabel }}</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Wrapper } from '@/util';
import { mappedGetters, mappedActions, Actions, Getters, State, mappedState } from '@/store/Store';

export default Vue.extend<Data, Methods, Computed, Props>({
  data() {
    return {
      delayMs: 500,
    };
  },
  props: {
    wrapper: { type: Object as PropType<Wrapper>, default: () => ({ increment: 10 }) },
  },
  computed: {
    ...mappedState,
    ...mappedGetters,
    buttonLabel() {
      return `Click here to increment (${this.delayMs}ms delay)`;
    },
    countLabel() {
      return `The current count is an ${this.isEven ? 'even' : 'odd'} number: ${this.count} (clicked ${this.meta.mutationCount} times)`;
    },
  },
  methods: {
    ...mappedActions,
    internalPerformAsyncIncrement() {
      this.performAsyncIncrement({ increment: this.wrapper.increment, delayMs: this.delayMs });
    },
  },
});

interface Data {
  delayMs: number;
}

type Methods = Actions & {
  internalPerformAsyncIncrement(): void;
}

type Computed = State & Getters & {
  buttonLabel: string;
  countLabel: string;
}

interface Props {
  wrapper: Wrapper;
}
</script>
