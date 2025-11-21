import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Toggle } from '../../cn/components/toggle'
import { Input, type InputProps } from './input'

type SecretInputProps = Omit<InputProps, 'type'>

export const SecretInput = (props: SecretInputProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className='flex gap-x-2'>
      <Input
        type={visible ? 'text' : 'password'}
        {...props}
      />
      <Toggle
        pressed={visible}
        onPressedChange={setVisible}
      >
        {!visible && <EyeOffIcon />}
        {visible && <EyeIcon />}
      </Toggle>
    </div>
  )
}
