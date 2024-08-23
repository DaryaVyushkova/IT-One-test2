import React from 'react'
import { Input } from 'antd'

interface FilterInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const FilterInput: React.FC<FilterInputProps> = ({
  value,
  onChange,
  placeholder = 'Filter...',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={className}>
      <Input
        allowClear
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default FilterInput
