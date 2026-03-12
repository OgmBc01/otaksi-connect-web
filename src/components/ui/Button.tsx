'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-midnight disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] text-white hover:opacity-90 hover:shadow-lg hover:shadow-[#5B6CFF]/25',
        secondary: 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#5B6CFF] hover:bg-white/10',
        outline: 'border-2 border-transparent [background:linear-gradient(#0B0616,#0B0616)_padding-box,linear-gradient(135deg,#FF2E9F,#5B6CFF)_border-box] hover:opacity-80',
      },
      size: {
        default: 'px-6 py-3 text-base',
        small: 'px-4 py-2 text-sm',
        large: 'px-8 py-4 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button