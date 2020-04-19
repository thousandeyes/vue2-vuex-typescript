<template>
  <div>
    {{ countLabel }}
    <br>
    <button @click="internalPerformAsyncIncrement">{{ buttonLabel }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Wrapper } from '@/util';
import { ClassyCountComponentBaseClass } from '@/store/ClassyCountStore';
import { ClassyMetaComponentBaseClass } from '@/store/ClassyMetaStore';

@Component
export default class ClassierCounter extends
        mixins(ClassyCountComponentBaseClass, ClassyMetaComponentBaseClass, Vue) {

  // data
  delayMs = 4000;

  // props (decorators are experimental, and this is a third party dependency)
  @Prop({ default: () => ({ increment: 13 })})
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
