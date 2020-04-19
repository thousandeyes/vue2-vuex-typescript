import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';

export const STORE_NAME = 'ClassyMetaStore';
export const NEW_MUTATION = 'increment';

@Module({
    namespaced: true,
})
export class ClassyMetaStore extends VuexModule implements ClassyMetaState {
    // state
    meta = {
        mutationCount: 0,
    };

    // mutations
    @Mutation
    [NEW_MUTATION]() {
        this.meta.mutationCount += 1;
    }
}

interface ClassyMetaState {
    meta: { mutationCount: number };
}

const ClassyCounterStoreNs = namespace(STORE_NAME);

@Component
export class ClassyMetaComponentBaseClass extends Vue implements ClassyMetaState {
    // There is no compile time check that the decorators are defined correctly
    @ClassyCounterStoreNs.State('meta') meta!: { mutationCount: number };
}
