import { useState, useCallback, FocusEvent, useMemo } from 'react'
import { Variant } from '@/types/app'
import { Adornment } from '@/types/elements'
import { GridFocusVariant, GridVariant, InputVariant } from './variants'

type EventCallback = FocusEvent<HTMLInputElement, Element>

type HookResponse = {
  inputFocus: boolean
  handleActiveFocus: (
    active: boolean,
    e: EventCallback,
    callback?: (event: EventCallback) => void
  ) => void
  classes: {
    gridClass: string
    inputClass: string
  }
}

type Hook = {
  endAdornment?: Adornment
  variant?: Variant
  startAdornment?: Adornment
}

export const InputHook = ({
  startAdornment,
  endAdornment,
  variant,
}: Hook): HookResponse => {
  const [inputFocus, setInputFocus] = useState(false)

  const gridClass = useMemo(() => {
    const classes = ['bg-white rounded-lg items-center gap-x-3']

    classes.push(
      inputFocus && (startAdornment || endAdornment)
        ? GridFocusVariant[variant ?? 'primary']
        : GridVariant[variant ?? 'primary']
    )

    classes.push(startAdornment ? 'px-4 border grid-cols-input-1' : '')
    classes.push(endAdornment ? 'px-4 border grid-cols-input-2' : '')
    classes.push(
      (startAdornment && endAdornment && 'px-4 border grid-cols-input-3') ?? ''
    )

    return classes.join(' ')
  }, [inputFocus, startAdornment, endAdornment, variant])

  const inputClass = useMemo(() => {
    const classes = [InputVariant[variant ?? 'primary']]
    classes.push(!startAdornment && !endAdornment ? 'px-4 border' : '')
    classes.push(startAdornment ? 'focus-visible:outline-0' : '')
    classes.push(endAdornment ? 'focus-visible:outline-0' : '')

    return classes.join(' ')
  }, [startAdornment, endAdornment, variant])

  const handleActiveFocus = useCallback(
    (
      active: boolean,
      e: EventCallback,
      callback: (event: EventCallback) => void = () => null
    ) => {
      setInputFocus(active)
      callback(e)
    },
    []
  )

  return {
    inputFocus,
    handleActiveFocus,
    classes: {
      gridClass,
      inputClass,
    },
  }
}
