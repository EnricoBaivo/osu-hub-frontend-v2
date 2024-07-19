"use client"
import React from 'react'
import { useDimensions } from './useDimensions'

export default function BreakpointLayout({ children, breakpoint,breakpointComponent }: { children: React.ReactNode, breakpoint: number, breakpointComponent: React.ReactNode }) {
    const { width } = useDimensions()

    if (width >0 &&  width < breakpoint) {
        return breakpointComponent
    }
    return children

}
