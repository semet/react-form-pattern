import { useId } from 'react'
import { useFormContext, get, FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { InputProps } from './type'

export const Input = <T extends Record<string, any>>(props: InputProps<T>) => {
  const {
    id,
    name,
    rules,
    className,
    containerClassName,
    label,
    labelClassName,
    errorClassName,
    required,
    type = 'text',
    ...rest
  } = props

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const generatedId = useId()

  const error: FieldError = get(errors, name)

  return (
    <div
      className={twMerge([
        containerClassName,
        'relative flex w-full flex-col gap-1',
      ])}
    >
      {label && (
        <label
          htmlFor={id ?? generatedId}
          className={twMerge([labelClassName, 'text-gray-700'])}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id ?? generatedId}
        className={twMerge([
          className,
          'w-full rounded text-gray-700 focus:ring-0',
          error
            ? 'border-rose-500 ring-rose-500'
            : 'border-indigo-400 ring-indigo-400',
        ])}
        {...register(name, rules)}
        {...rest}
      />
      {error && (
        <span
          className={twMerge([
            errorClassName,
            'absolute -bottom-4 text-xs text-rose-500',
          ])}
        >
          {error?.message?.toString()}
        </span>
      )}
    </div>
  )
}
