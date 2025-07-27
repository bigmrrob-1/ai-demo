import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestComponent } from './TestComponent'

describe('TestComponent', () => {
  it('should render correctly', () => {
    render(<TestComponent />)
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('should render as a div element', () => {
    const { container } = render(<TestComponent />)
    const divElement = container.querySelector('div')
    expect(divElement).toBeInTheDocument()
    expect(divElement?.textContent).toBe('Test Component')
  })
})