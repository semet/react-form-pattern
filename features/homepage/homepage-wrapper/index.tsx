import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { DatePicker } from '@/components/date-picker'
import { Input } from '@/components/input'
import { RadioButton } from '@/components/radio-button'
import { Select } from '@/components/select'

import { ageOptions, genderOptions } from './options'
import { schema, TForm } from './schema'

export const HomepageWrapper = () => {
  const formMethods = useForm<TForm>({
    defaultValues: {
      username: '',
      email: '',
      gender: {
        label: 'Select Gender',
        value: '',
      },
      age: '',
      dateOfBirth: '',
    },
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log(data)
  })
  return (
    <div className="container mx-auto my-6 rounded-md bg-gray-50 p-4 shadow">
      <FormProvider {...formMethods}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
        >
          <Input<TForm>
            name="username"
            label="Username"
            placeholder="Type Username"
          />
          <Input<TForm>
            name="email"
            label="Username"
            placeholder="Type Username"
            type="email"
          />
          <Select<TForm>
            label="Gender"
            name="gender"
            options={genderOptions}
          />
          <RadioButton<TForm>
            label="How old are you (approximately)?"
            name="age"
            options={ageOptions}
          />
          <DatePicker<TForm>
            label="Date of Birth"
            name="dateOfBirth"
          />
          <button
            type="submit"
            className="w-min self-center rounded bg-indigo-500 px-4 py-2 text-white shadow hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
