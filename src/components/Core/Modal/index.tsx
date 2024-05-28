import { TestProperties } from '@/types/app'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { FC, Fragment, PropsWithChildren } from 'react'
import { Flex } from '../Display'
import { Button } from '../Button'

type ModalProps = {
  open: boolean
  onChangeOpen: (open: boolean) => void
  className?: string
  title?: string
} & TestProperties

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  onChangeOpen,
  className,
  open,
  title,
  ...props
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        {...props}
        className="relative z-20"
        open={open}
        onClose={onChangeOpen}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 ">
          <div className="flex h-screen w-screen items-center justify-center p-4 text-center overflow-hidden">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`${className} flex flex-col gap-6 h-[80vh] w-[70vw] lg:w-[60vw] overflow-hidden transform rounded-lg bg-white py-6 text-left align-middle shadow-xl transition-all`}
              >
                <Flex className="justify-between items-center px-6">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold leading-6 text-primary-950"
                  >
                    {title}
                  </DialogTitle>
                  <Button
                    onClick={() => onChangeOpen(false)}
                    className="!p-2 w-8 h-8 bg-white text-black hover:text-white border-none text-base hover:bg-white active:bg-white flex justify-center items-center"
                  >
                    X
                  </Button>
                </Flex>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
