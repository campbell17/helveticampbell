'use client'

import React, { useState } from 'react'
import {
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  offset,
  flip,
  shift,
  FloatingPortal,
  arrow,
  FloatingArrow,
  useDismiss,
  useRole,
  safePolygon,
} from '@floating-ui/react'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Tooltip({
  children,
  content,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const arrowRef = React.useRef(null)
  
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen
  
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'top',
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  })
  
  const hover = useHover(context, {
    move: false,
    handleClose: safePolygon(),
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])
  
  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()} className="inline">
        {children}
      </span>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              transition: 'opacity 200ms',
              opacity: open ? 1 : 0
            }}
            className="bg-white text-black rounded-lg p-2 text-sm max-w-xs z-50 shadow-lg border border-gray-200 select-text cursor-auto"
            {...getFloatingProps()}
          >
            {content}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill="white" 
              stroke="rgb(229 231 235)"
              strokeWidth={1}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  )
} 