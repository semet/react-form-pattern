import { ComponentProps } from 'react'
import { FieldValues, Path, RegisterOptions } from 'react-hook-form'

export type RadioButtonProps<T extends FieldValues> =
  ComponentProps<'input'> & {
    label: string
    name: Path<T>
    rules?: RegisterOptions
    containerClassName?: string
    labelClassName?: string
    errorClassName?: string
    options: Array<TOption>
  }

type TOption = {
  label: string
  value: string
  id?: string
}
