# v-lottie

Vue composables for [Lottie](https://github.com/airbnb/lottie-web)!


[![NPM version](https://img.shields.io/npm/v/v-lottie?color=a1b858&label=)](https://www.npmjs.com/package/v-lottie)


## Usage

```bash
npm install v-lottie
```

```vue
<script setup>
import { onMounted } from 'vue'
import { useLottie } from 'v-lottie'
const el = ref(null)
onMounted(() => {
  const animation = useLottie(el)
})
</script>

<template>
  <div ref="el" />
</template>
```

## Type Declarations

```ts
export type MaybeRef<T> = Ref<T> | T
export type MaybeRefValues<T extends UseLottieOptions> = {
  [K in keyof T]: MaybeRef<T[K]>
}
export type AnimationConfigOmitContainer<T extends AnimationConfig> = Omit<T, 'container'>
export type UseLottieMix<A extends AnimationConfig<'svg'>, B extends AnimationConfig<'svg'>> =
  (AnimationConfigOmitContainer<A> | AnimationConfigOmitContainer<B>) & UseLottieOtherOptions

export interface UseLottieOtherOptions {
  speed: number
  direction: AnimationDirection
}
export type UseLottieOptions = UseLottieMix<AnimationConfigWithData, AnimationConfigWithPath>
export function useLottie(el: MaybeRef<Element>, options: MaybeRefValues<UseLottieOptions>): AnimationItem
```
