/*
 * Takes any FunctionTree and adds an ActionContext as first parameter of each function, to make a
 * valid ActionTree type.
 */
import { ActionContext, ActionMethod } from 'vuex';

export type GetterTreeAdaptor<Type, State, RootState> = {
    [Key in keyof Type]: (state: State, getters: any, rootState: RootState, rootGetters: any) => Type[Key];
}

export type ActionTreeAdaptor<Type extends Record<string, ActionMethod>, State, RootState> = {
    [Key in keyof Type]: (a: ActionContext<State, RootState>, ...p: Parameters<Type[Key]>) => ReturnType<Type[Key]>;
}

export interface Wrapper {
    increment: number;
}
