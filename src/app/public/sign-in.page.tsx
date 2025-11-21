import { signInDto, type SignInDto } from '@/domain/identity/auth/dtos'
import { useSessionStore } from '@/domain/identity/auth/store'
import { Label } from '@/domain/ui/cn/components/label'
import { Form } from '@/domain/ui/components/fragments/form'
import { Input } from '@/domain/ui/components/fragments/input'
import { LoadingButton } from '@/domain/ui/components/fragments/loading-button'
import { SecretInput } from '@/domain/ui/components/fragments/secret-input'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useShallow } from 'zustand/react/shallow'

export const SignInPage = () => {
  const navigate = useNavigate()
  const signIn = useSessionStore(useShallow((state) => state.signIn))

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signing, setSigning] = useState(false)

  const handleSubmit = async () => {
    const body: SignInDto = { email, password: password.trim() }

    if (!signInDto.shape.email.safeParse(body.email).success) {
      toast.warning('Invalid email', { description: 'Email should be in a valid format.' })
      return
    }

    if (!signInDto.shape.password.safeParse(body.password).success) {
      toast.warning('Invalid password', { description: "Password should't be empty." })
      return
    }

    setSigning(true)

    try {
      await signIn(body).finally(() => setSigning(false))

      navigate('/')
      toast.success('Signed in', { description: 'Signed in successfully.' })
    } catch {
      toast.error('Unknown error', { description: 'Something went wrong while signing in' })
    }
  }

  return (
    <main className='space-y-6'>
      <h1 className='text-2xl font-bold'>Sign in into Realtime</h1>
      <Form
        onSubmit={handleSubmit}
        className='min-w-72 space-y-6'
      >
        <div className='space-y-4'>
          <div className='grid gap-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              autoComplete='email'
              placeholder='johndoe@domain.com'
              value={email}
              onValueChange={setEmail}
            />
          </div>
          <div className='grid gap-y-2'>
            <Label htmlFor='password'>Password</Label>
            <SecretInput
              id='password'
              autoComplete='current-password'
              placeholder='johndoe123'
              onValueChange={setPassword}
            />
          </div>
        </div>
        <div className='space-y-2'>
          <LoadingButton
            loading={signing}
            className='w-full'
          >
            Continue
          </LoadingButton>
          <Link
            to='/sign-up'
            className='inline-button'
          >
            Don't have an account?
          </Link>
        </div>
      </Form>
    </main>
  )
}
