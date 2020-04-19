import Vue from 'vue'
import Vuex from 'vuex';

import { Store } from '@/store/Store';
import { CountStore } from '@/store/CountStore';
import { MetaStore } from '@/store/MetaStore';
import { ClassyCountStore } from '@/store/ClassyCountStore';
import { ClassyMetaStore } from '@/store/ClassyMetaStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Store,
    CountStore,
    MetaStore,
    ClassyCountStore,
    ClassyMetaStore,
  }
});
