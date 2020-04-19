import { RootState } from '@/store/RootState';
import { mapActions, mapGetters, mapState, Module } from 'vuex';
import { ActionTreeAdaptor, GetterTreeAdaptor } from '@/util';

const STORE_NAME = 'Store';
const INCREMENT = 'increment';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
    isEven(state: State) {
        return !(state.count % 2);
    },
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
    async performAsyncIncrement({ commit, /*state, rootState*/ }, { increment, delayMs }) {
        await new Promise<void>(resolve => {
            setTimeout(() => {
                commit(INCREMENT, increment);
                resolve();
            }, delayMs);
        });
    },
};

export const Store: Module<State, RootState> = {
    namespaced: true,
    state: {
        count: 0,
        meta: {
            mutationCount: 0,
        },
    },
    getters,
    mutations: {
        [INCREMENT](state, increment = 1) {
            state.meta.mutationCount += 1;
            state.count += increment;
        },
    },
    actions,
};

export const mappedState = mapState(STORE_NAME, [
    'count',
    'meta',
]);

export interface State {
    meta: {
        mutationCount: number;
    };
    count: number;
}

export const mappedGetters = mapGetters(STORE_NAME, [
    'isEven',
]);

export interface Getters {
    isEven: boolean;
}

export const mappedActions = mapActions(STORE_NAME, [
    'performAsyncIncrement',
]);

export type Actions = {
    performAsyncIncrement: (payload: { increment: number; delayMs: number }) => Promise<void>;
}
