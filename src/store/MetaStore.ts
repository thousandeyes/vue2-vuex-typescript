import { RootState } from '@/store/RootState';
import { mapState, Module } from 'vuex';
import Vue from 'vue';

export const STORE_NAME = 'MetaStore';
export const NEW_MUTATION = 'increment';

export const MetaStore: Module<MetaState, RootState> = {
    namespaced: true,
    state: {
        meta: {
            mutationCount: 0,
        },
    },
    mutations: {
        [NEW_MUTATION](state) {
            state.meta.mutationCount += 1;
        },
    },
};

export const mappedMetaState = mapState(STORE_NAME, [
    'meta',
]);

export interface MetaState {
    meta: {
        mutationCount: number;
    };
}

export const MetaComponentBase = Vue.extend<void, void, MetaState, void>({
    computed: {
        ...mappedMetaState,
    },
});

export class MetaComponentBaseClass extends Vue implements MetaState {
    meta!: MetaState['meta'];
}
