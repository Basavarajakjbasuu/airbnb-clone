'use client'

import { useCallback, useEffect, useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string
}

import { IoMdClose } from 'react-icons/io';
import Button from "../Button";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled
}) => {

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {

    setShowModal(isOpen);
  }, [isOpen]); 
  
  const handleClose = useCallback(() => {
    if (disabled) return;
    
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)

  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();

  }, [disabled, secondaryAction])


  if (!isOpen) {
    return null;
  }
  return (
    <main>

      <div
        className="
          flex
          justify-center
          items-center
          overflow-y-hidden
          overflow-x-hidden
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            rounded-lg
            h-full

            lg:max-h-[600px]
            md:max-h-[500px]
          "
        >
          {/* CONTENT */}
          <div
            className={`
              translate
              duration-300
              h-full
              ${showModal ? 'translate-y-0': 'translate-y-full'}
              ${showModal ? 'opacity-100': 'opacity-0'}
            `}
          >
            <div
              className="
                translate
                h-full
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              "
            >
              {/* Header */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  rounded-t
                  p-6
                  sticky
                  z-[60]
                  bg-white
                  top-0
                  border-b-[1px]
                "
              >
                {/* close modal */}
                <button
                  onClick={handleClose}
                  className="
                    p-2
                    border-0
                    hover:bg-neutral-100
                    rounded-full
                    transition
                    absolute
                    left-9
                  "
                >
                  <IoMdClose size={18} />
                </button>

                {/* modal title */}
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>

              {/* Body */}
              <div
                className="
                  md:h-auto
                  md:overflow-y-auto
                  md:scrollbar-hide
                "  
              >

                <div className="relative px-6 pt-4 flex-auto">
                  {body}
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-2 p-6">
                  <div
                    className="
                      flex
                      flex-row
                      items-center
                      gap-4
                      w-full
                    "
                  >
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      />
                      )}
                  </div>
                  {footer}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    
  )
}

export default Modal