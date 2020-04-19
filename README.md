# vuex-ts
## Purpose
Vue3 and its composition API are supposedly just around the corner 
https://github.com/vuejs/vue/projects/6 (release planned for end of Q2, at the time of writing
this). The new Vuex4 will apparently not feature any major changes and focus on compatibility
https://github.com/vuejs/vuex/releases

Neither are quite ready though, and in the meantime, I did a little study to see what can be done
with Vue2.x Option API and Vuex3.x in terms of type safety.

There are 4 examples:
- Counter
- BetterCounter
- ClassyCounter
- ClassierCounter

The idea is to easily access store state, getters, and actions from within vue components with as
little boilerplate as possible, while ensuring type-safety.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
