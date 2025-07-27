import { formatText } from '@/utils/helpers'
import { UIComponentProps } from '@/types/ui'

export function AliasTest({ className, children }: UIComponentProps) {
  const formattedClass = className ? formatText(className) : ''
  
  return (
    <div className={formattedClass}>
      <h3>Path Alias Test Component</h3>
      {children}
    </div>
  )
}