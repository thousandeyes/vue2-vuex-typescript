import { RootState } from '@/store/RootState';
import { mapActions, mapGetters, mapState, Module } from 'vuex';
import { ActionTreeAdaptor, GetterTreeAdaptor } from '@/util';
import Vue from 'vue';
import { STORE_NAME as META_STORE_NAME, NEW_MUTATION } from '@/store/MetaStore';

const STORE_NAME = 'CountStore'
const INCREMENT = 'increment';

const getters: GetterTreeAdaptor<CountGetters, CountState, RootState> = {
    isEven(state: CountState) {
        return !(state.count % 2);
    },
};

const actions: ActionTreeAdaptor<CountActions, CountState, RootState> = {
    async performAsyncIncrement({ commit, /*state, rootState*/ }, { increment, delayMs }) {
        await new Promise<void>(resolve => {
            setTimeout(() => {
                commit(`${META_STORE_NAME}/${NEW_MUTATION}`, null, { root: true });
                commit(INCREMENT, increment);
                resolve();
            }, delayMs);
        });
    },
};

export const CountStore: Module<CountState, RootState> = {
    namespaced: true,
    state: {
        count: 0,
    },
    getters,
    mutations: {
        [INCREMENT](state: CountState, increment = 1) {
            state.count += increment;
        },
    },
    actions,
};

export const mappedCountState = mapState(STORE_NAME, [
    'count',
]);

export interface CountState {
    count: number;
}

export const mappedCountGetters = mapGetters(STORE_NAME, [
    'isEven',
]);

export interface CountGetters {
    isEven: boolean;
}

export const mappedCountActions = mapActions(STORE_NAME, [
    'performAsyncIncrement',
]);

export type CountActions = {
    performAsyncIncrement: (payload: { increment: number; delayMs: number }) => Promise<void>;
}

export const CountComponentBase = Vue.extend<void, CountActions, CountState & CountGetters, void>({
    computed: {
        ...mappedCountState,
        ...mappedCountGetters,
    },
    methods: {
        ...mappedCountActions,
    },
});

export class CountComponentBaseClass extends Vue implements CountState, CountGetters, CountActions {
    count!: CountState['count'];
    isEven!: CountGetters['isEven'];
    performAsyncIncrement!: (payload: { increment: number; delayMs: number }) => Promise<void>;
}
