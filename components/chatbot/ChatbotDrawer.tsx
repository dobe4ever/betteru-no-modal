// components/floating-btn/ChatbotDrawer.tsx
"use client"

import * as React from "react"
import { useState } from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { CircleButton } from "@/components/custom-components/custom-buttons"

export function ChatbotDrawer() {
  // Self-contained state
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      {/* Trigger button */}
      <div
        className="fixed bottom-4 right-4 cursor-pointer"
        style={{ 
          zIndex: 10000,
          position: 'fixed',
          pointerEvents: 'auto'
        }}
        onClick={() => setIsOpen(true)}
      >
        <CircleButton 
          variant="bot"
          className="shadow-lg"
        />
      </div>
    
      {/* Drawer component */}
      <SheetPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <SheetPrimitive.Portal>
          {/* Overlay */}
          <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          
          {/* Content */}
          <SheetPrimitive.Content 
            className="fixed inset-x-0 bottom-0 z-50 h-[100dvh] bg-white
              data-[state=open]:animate-in data-[state=closed]:animate-out 
              data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom
              data-[state=closed]:duration-300 data-[state=open]:duration-400
              rounded-t-xl border-0 p-0 shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-orange-50 to-orange-100">
              <h2 className="text-lg font-semibold text-gray-800">
                AI Assistant
              </h2>
              
              {/* Close button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <X className="h-5 w-5" strokeWidth={2} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 h-[calc(100%-56px)] overflow-auto">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-800">Hi there! How can I help you today?</p>
                </div>
                
                <div className="bg-orange-100 rounded-lg p-3 ml-auto max-w-[80%]">
                  <p className="text-gray-800">I need help with my workout plan.</p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-800">I can definitely help with that! What specific goals are you looking to achieve with your workout plan?</p>
                </div>
              </div>
            </div>
          </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
      </SheetPrimitive.Root>
    </>
  )
}