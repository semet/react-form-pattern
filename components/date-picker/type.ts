import type { DatePickerProps as OriginalProps } from 'react-date-picker'
import { FieldValues, Path, RegisterOptions } from 'react-hook-form'

export type DatePickerProps<T extends FieldValues> = OriginalProps & {
  label?: string
  name: Path<T>
  rules?: RegisterOptions
  containerClassName?: string
  labelClassName?: string
  errorClassName?: string
}
