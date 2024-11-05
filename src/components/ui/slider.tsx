'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(
  ({ className, ...props }: any, ref) => {
    const isMaxValue = parseInt(String(props?.value[0] || '0')) === props.max
    const isMinValue = parseInt(String(props?.value[0] || '0')) === props.min
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn('relative py-[20px] flex w-full touch-none select-none items-center group', className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-homehbg">
          <SliderPrimitive.Range className="absolute h-full bg-[#aaaaaa] shadow-md" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={`${isMinValue ? 'ml-[-50%]' : ''} ${isMaxValue ? 'ml-[50%]' : ''} mt-[2.5px] group-hover:opacity-100 opacity-0 inline-block animate-none transition-none h-[18px] w-[18px] rounded-full shadow-md border-white bg-white ring-offset-background focus-visible:outline-0 focus-visible:border-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50`}
        />
      </SliderPrimitive.Root>
    )
  }
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
