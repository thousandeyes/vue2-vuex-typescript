<template>
  <div>
    {{ countLabel }}
    <br>
    <button @click="internalPerformAsyncIncrement">{{ buttonLabel }}</button>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import mixins from 'vue-typed-mixins';
import { Wrapper } from '@/util';
import { CountComponentBase } from '@/store/CountStore';
import { MetaComponentBase } from '@/store/MetaStore';

export default mixins(CountComponentBase, MetaComponentBase).extend<Data, Methods, Computed, Props>({
  data() {
    return {
      delayMs: 1000,
    }
  },
  props: {
    wrapper: { type: Object as PropType<Wrapper>, default: () => ({ increment: 11 }) },
  },
  computed: {
    buttonLabel() {
      return `Click here to increment (${this.delayMs}ms delay)`;
    },
    countLabel() {
      return `The current count is an ${this.isEven ? 'even' : 'odd'} number: ${this.count} (clicked ${this.meta.mutationCount} times)`;
    },
  },
  methods: {
    internalPerformAsyncIncrement() {
      this.performAsyncIncrement({ increment: this.wrapper.increment, delayMs: this.delayMs });
    },
  },
});

interface Data {
  delayMs: number;
}

interface Methods { // no need to mix with CountActions
  internalPerformAsyncIncrement(): void;
}

interface Computed { // no need to mix with CountState, MetaState and CountGetters
  buttonLabel: string;
  countLabel: string;
}

interface Props {
  wrapper: Wrapper;
}
</script>
