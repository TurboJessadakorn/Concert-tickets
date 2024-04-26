import { forwardRef, ReactNode } from 'react'

export type ModalProps = {
  children?: ReactNode
  onBackdropClick?: () => void
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, onBackdropClick }, ref) => {
    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button
            type="button"
            onClick={() => {
              onBackdropClick && onBackdropClick()
            }}
          >
            close
          </button>
        </form>
      </dialog>
    )
  }
)