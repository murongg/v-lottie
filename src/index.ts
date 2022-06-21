import type { AnimationConfig, AnimationConfigWithData, AnimationConfigWithPath, AnimationDirection } from 'lottie-web'
import Lottie from 'lottie-web'
import type { Ref } from 'vue-demi'
import { isRef, onUnmounted, unref, watch } from 'vue-demi'

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

export function unrefs(result: Record<string, any> | Ref[]): Record<string, any> | [] {
  if (Array.isArray(result)) {
    const realValues = {}
    for (const key of result) {
      // @ts-expect-error: Internal
      realValues[key] = isRef(result[key]) ? result[key].value : result[key]
    }
    return realValues
  }
  else {
    const realValues = {}
    Object.keys(result).forEach((key) => {
      // @ts-expect-error: Internal
      realValues[key] = isRef(result[key]) ? result[key].value : result[key]
    })
    return realValues
  }
}

export function useLottie(el: MaybeRef<Element>, options: MaybeRefValues<UseLottieOptions>) {
  const { speed, direction } = options

  const result = Lottie.loadAnimation({
    container: unref(el),
    ...unrefs(options),
  })

  if (isRef(speed)) {
    watch(speed, (val) => {
      result.setSpeed(val)
    })
  }

  if (isRef(direction)) {
    watch(direction, (val) => {
      result.setDirection(val)
    })
  }

  onUnmounted(() => {
    result.destroy()
  })

  return result
}
