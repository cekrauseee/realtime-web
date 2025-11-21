import { Button } from '@/domain/ui/cn/components/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/domain/ui/cn/components/dialog'
import { Label } from '@/domain/ui/cn/components/label'
import { Form } from '@/domain/ui/components/fragments/form'
import { Input } from '@/domain/ui/components/fragments/input'
import { LoadingButton } from '@/domain/ui/components/fragments/loading-button'
import { useState } from 'react'
import { toast } from 'sonner'
import { useShallow } from 'zustand/react/shallow'
import { createTopicDto } from '../../dtos'
import { useTopicStore } from '../../store'
import type { CreateTopicDto, TopicVisibility } from '../../utils/types'
import { TopicVisibilitySelect } from './topic-visibility-select'

type CreateTopicDialogProps = { children: React.ReactNode }

export const CreateTopicDialog = ({ children }: CreateTopicDialogProps) => {
  const createTopic = useTopicStore(useShallow((state) => state.createTopic))

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [visibility, setVisibility] = useState<TopicVisibility>('private')

  const [creating, setCreating] = useState(false)

  const handleSubmit = async () => {
    const body: CreateTopicDto = { name: name.trim(), visibility }

    if (!createTopicDto.shape.name.safeParse(body.name).success) {
      toast('Invalid name', { description: "Name shouldn't be empty" })
      return
    }

    setCreating(true)

    try {
      await createTopic(body).finally(() => setCreating(false))

      setOpen(false)
      toast.success('Topic created', { description: 'Topic created successfully.' })
    } catch {
      toast.error('Unknown error', { description: 'Something went wrong while creating topic.' })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Create a new topic</DialogTitle>
          {/* TODO: Description */}
          <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</DialogDescription>
        </DialogHeader>
        <Form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <div className='grid gap-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              autoComplete='name'
              placeholder='Random conversations'
              value={name}
              onValueChange={setName}
            />
          </div>
          <DialogFooter>
            <TopicVisibilitySelect
              value={visibility}
              onValueChange={setVisibility}
            />
            <div className='flex gap-x-2'>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='outline'
                >
                  Cancel
                </Button>
              </DialogClose>
              <LoadingButton loading={creating}>Create</LoadingButton>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
