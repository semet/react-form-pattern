import dayjs from 'dayjs'
import React, { useId } from 'react'
import ReactDatePicker from 'react-date-picker'
import { Controller, FieldError, get, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { DatePickerProps } from './type'

export const DatePicker = <T extends Record<string, any>>(
  props: DatePickerProps<T>,
) => {
  const {
    name,
    id,
    label,
    className,
    containerClassName,
    errorClassName,
    labelClassName,
    required,
    ...rest
  } = props

  const {
    control,
    formState: { errors },
  } = useFormContext()

  const generatedId = useId()

  const error: FieldError = get(errors, name)
  return (
    <div
      className={twMerge([
        containerClassName,
        'relative flex w-fit flex-col gap-1',
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
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactDatePicker
            id={id ?? generatedId}
            onChange={(date) => {
              const formattedDate = date
                ? dayjs(String(date)).format('YYYY-MM-DD')
                : null
              field.onChange(formattedDate)
            }}
            format="dd/MM/y"
            className={twMerge([
              className,
              'w-full rounded border text-gray-700',
              error
                ? 'border-rose-500 ring-rose-500'
                : 'border-indigo-400 ring-indigo-400',
            ])}
            value={field.value}
            {...rest}
          />
        )}
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
