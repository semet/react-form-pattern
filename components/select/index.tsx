import dynamic from 'next/dynamic'
import { ChangeEvent, useId } from 'react'
import { Controller, FieldError, get, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { SelectProps } from './type'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

export const Select = <T extends Record<string, any>>(
  props: SelectProps<T>,
) => {
  const {
    name,
    id,
    label,
    onChange,
    className,
    containerClassName,
    errorClassName,
    labelClassName,
    required,
    isSearchable = false,
    ...rest
  } = props
  const generatedId = useId()

  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error: FieldError = get(errors, name)
  return (
    <div
      className={twMerge([
        containerClassName,
        'relative flex w-full flex-col gap-1.5',
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
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <ReactSelect
              instanceId={id ?? generatedId}
              onChange={(newValue, actionMeta) => {
                if (onChange) {
                  onChange(
                    newValue as ChangeEvent<HTMLInputElement>,
                    actionMeta,
                  )
                }
                field.onChange(newValue)
              }}
              value={field.value}
              isSearchable={isSearchable}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '.25rem',
                  borderColor: error ? '#f43f5e' : '#818cf8',
                  color: '#374151',
                }),
              }}
              {...rest}
            />
          )
        }}
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
