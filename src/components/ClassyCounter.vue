<template>
  <div>
    {{ countLabel }}
    <br>
    <button @click="internalPerformAsyncIncrement">{{ buttonLabel }}</button>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import Vue, { PropType } from 'vue';
import { Wrapper } from '@/util';
import {
  CountComponentBaseClass,
  mappedCountState,
  mappedCountGetters,
  mappedCountActions,
} from '@/store/CountStore';
import { mappedMetaState, MetaComponentBaseClass } from '@/store/MetaStore';

const Base = Vue.extend({
  // There is no compile time check on the following, it needs to be set properly
  computed: {
    ...mappedCountState,
    ...mappedCountGetters,
    ...mappedMetaState,
  },
  methods: {
    ...mappedCountActions,
  },
});

@Component({
  props: {
    wrapper: {
      type: Object as PropType<Wrapper>,
      default: () => ({ increment: 12 }),
    },
  },
})
export default class ClassyCounter extends mixins(CountComponentBaseClass, MetaComponentBaseClass, Base) {
  // data
  delayMs = 2000;

  // props
  wrapper!: Wrapper;

  // computed
  get buttonLabel() {
    return `Click here to increment (${this.delayMs}ms delay)`;
  }

  get countLabel() {
    return `The current count is an ${this.isEven ? 'even' : 'odd'} number: ${this.count} (clicked ${this.meta.mutationCount} times)`;
  }

  // methods
  internalPerformAsyncIncrement() {
    this.performAsyncIncrement({ increment: this.wrapper.increment, delayMs: this.delayMs });
  }
}
</script>
