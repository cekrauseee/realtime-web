import { signUpDto, type SignUpDto } from '@/domain/identity/auth/dtos'
import { signUp } from '@/domain/identity/auth/service'
import { Label } from '@/domain/ui/cn/components/label'
import { Form } from '@/domain/ui/components/fragments/form'
import { Input } from '@/domain/ui/components/fragments/input'
import { LoadingButton } from '@/domain/ui/components/fragments/loading-button'
import { SecretInput } from '@/domain/ui/components/fragments/secret-input'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

export const SignUpPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [signing, setSigning] = useState(false)

  const handleSubmit = async () => {
    const body: SignUpDto = {
      email,
      username: username.trim(),
      password: password.trim()
    }

    if (!signUpDto.shape.email.safeParse(body.email).success) {
      toast.warning('Invalid email', { description: 'Email should be in a valid format.' })
      return
    }

    if (!signUpDto.shape.username.safeParse(body.username).success) {
      toast.warning('Invalid username', { description: "Username shouldn't be empty." })
      return
    }

    if (!signUpDto.shape.password.safeParse(body.password).success) {
      toast.warning('Invalid password', { description: "Password should't be empty." })
      return
    }

    setSigning(true)

    try {
      await signUp(body).finally(() => setSigning(false))

      navigate('/')
      toast.success('Signed up', { description: 'Signed up successfully.' })
    } catch {
      toast.error('Unknown error', { description: 'Something went wrong while signing in' })
    }
  }

  return (
    <main className='min-w-72 space-y-6'>
      <h1 className='text-2xl font-bold'>Create an account</h1>
      <Form
        onSubmit={handleSubmit}
        className='space-y-6'
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
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              autoComplete='username'
              placeholder='johndoe'
              value={username}
              onValueChange={setUsername}
            />
          </div>
          <div className='grid gap-y-2'>
            <Label htmlFor='password'>Password</Label>
            <SecretInput
              id='password'
              autoComplete='new-password'
              placeholder='johndoe123'
              value={password}
              onValueChange={setPassword}
            />
          </div>
        </div>
        <div className='space-y-2'>
          <LoadingButton
            loading={signing}
            className='w-full'
          >
            Create
          </LoadingButton>
          <Link
            to='/sign-in'
            className='inline-button'
          >
            Already have an account?
          </Link>
        </div>
      </Form>
    </main>
  )
}
