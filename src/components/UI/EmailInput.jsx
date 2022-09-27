import React from 'react'

import '../../styles/components/UI/AuthInput.css'

export const EmailInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="email"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="authInput" />
  )
}
