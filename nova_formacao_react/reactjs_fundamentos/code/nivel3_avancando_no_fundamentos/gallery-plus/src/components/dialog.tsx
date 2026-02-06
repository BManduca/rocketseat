/** biome-ignore-all lint/nursery/useSortedClasses: nao precisa aplicar sort */
// biome-ignore lint/performance/noNamespaceImport: necessário para importar os components
import * as DialogPrimitive from "@radix-ui/react-dialog"
import React from "react"
import XIcon from "../assets/icons/x.svg?react"
import ButtonIcon from "./button-icon"
import Card from "./card"
import Divider from "./divider"
import Text from "./text"

// wrapper geral
export const Dialog = DialogPrimitive.Root

// mecanismo para disparar a abertura do dialog
export const DialogTrigger = DialogPrimitive.Trigger

// mecanismo para fechar o dialog
export const DialogClose = DialogPrimitive.Close

export function DialogOverlay({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      {...props}
      className={`
        fixed inset-0 z-50 bg-background-secondary/60
        backdrop-blur-sm
        data-[state=open]:animate-in
        data-[state=open]:fade-in-0
        data-[state=close]:animate-out
        data-[state=close]:fade-out-0
    `}
    />
  )
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={`
            fixed top-[50%] left-[50%] z-60 w-full max-w-lg
            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=open]:slide-in-from-bottom-[48%]
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:slide-out-to-bottom-[48%]
            translate-x-[-50%] translate-y-[-50%]
        `}
      ref={ref}
      {...props}
    >
      <Card size="lg" variant="primary">
        {children}
      </Card>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

DialogContent.displayName = DialogPrimitive.Content.displayName

export function DialogHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <header
        className={`
            flex items-center justify-between
            `}
        {...props}
      >
        <DialogPrimitive.Title>
          <Text className="flex-1" variant="heading-medium">
            {children}
          </Text>
        </DialogPrimitive.Title>
        <DialogClose asChild>
          <ButtonIcon icon={XIcon} variant="ghost" />
        </DialogClose>
      </header>
      <Divider className="mt-1.5 mb-5" />
    </>
  )
}

export function DialogBody({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>
}

export function DialogFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <Divider className="mt-5 mb-1.5" />
      <footer className="flex items-center justify-end gap-3">
        {children}
      </footer>
    </div>
  )
}
