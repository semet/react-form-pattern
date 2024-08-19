import React, { useId } from 'react'
import { FieldError, get, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { RadioButtonProps } from './type'

export const RadioButton = <T extends Record<string, any>>(
  props: RadioButtonProps<T>,
) => {
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
    options,
    ...rest
  } = props

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error: FieldError = get(errors, name)

  return (
    <div className="relative flex flex-col gap-2">
      {label && (
        <span className={twMerge([labelClassName, 'text-gray-700'])}>
          {label}
        </span>
      )}
      <div className="flex gap-4">
        {options.map(({ label: inputLabel, value, id: inputId }) => (
          <div
            key={value}
            className="flex items-center gap-1.5"
          >
            <input
              type="radio"
              value={value}
              className={twMerge([className])}
              id={inputId ?? value.toString()}
              {...register(name, rules)}
              {...rest}
            />
            <label
              htmlFor={inputId ?? value.toString()}
              className="text-base text-gray-700"
            >
              {inputLabel}
            </label>
          </div>
        ))}
      </div>
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
