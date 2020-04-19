import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { STORE_NAME as CLASSY_META_STORE_NAME, NEW_MUTATION } from '@/store/ClassyMetaStore';

const STORE_NAME = 'ClassyCountStore';
const INCREMENT = 'increment';

@Module({
    namespaced: true,
})
export class ClassyCountStore extends VuexModule implements ClassyCountStateAndGettersAndActions {
    // state
    count = 0;

    // getters
    get isEven() {
        return !(this.count % 2);
    }

    // mutations
    @Mutation
    [INCREMENT](increment = 1) {
        this.count += increment;
    }

    // actions
    @Action({ commit: INCREMENT })
    async performAsyncIncrement({ increment, delayMs }: { increment: number; delayMs: number }) {
        const { context: { commit, /*rootState */}} = this;

        await new Promise<void>(resolve => {
            setTimeout(() => {
                commit(`${CLASSY_META_STORE_NAME}/${NEW_MUTATION}`, null, { root: true });
                resolve();
            }, delayMs);
        });

        return increment;
    }

    // @MutationAction is pretty cool too, avoids unnecessary @Mutation. See https://github.com/championswimmer/vuex-module-decorators
}

interface ClassyCountStateAndGettersAndActions {
    count: number;
    isEven: boolean;
    performAsyncIncrement: (options: { increment: number; delayMs: number }) => Promise<number>;
}

const ClassyCounterStoreNs = namespace(STORE_NAME);

@Component
export class ClassyCountComponentBaseClass extends Vue implements ClassyCountStateAndGettersAndActions {
    // There is no compile time check that the decorators are defined correctly
    @ClassyCounterStoreNs.State('count') count!: number;
    @ClassyCounterStoreNs.Getter('isEven') isEven!: boolean;
    @ClassyCounterStoreNs.Action('performAsyncIncrement') performAsyncIncrement!: (options: { increment: number; delayMs: number }) => Promise<number>;
}
