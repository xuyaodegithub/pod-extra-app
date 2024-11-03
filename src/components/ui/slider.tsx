'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative py-[20px] flex w-full touch-none select-none items-center group', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-homehbg">
        <SliderPrimitive.Range className="absolute h-full bg-[#aaaaaa] shadow-md" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="ml-[15px] group-hover:block hidden h-5 w-5 rounded-full border-2 shadow-md border-white bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
