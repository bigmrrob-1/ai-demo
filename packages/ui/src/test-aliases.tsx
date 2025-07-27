import { formatText } from '@/utils/helpers'
import { UIComponentProps } from '@/types/ui'
import { Button } from '@/button'
import { Card } from '@/card'

export function TestAliasesComponent() {
  const testText = formatText('  HELLO WORLD  ')
  console.log('Formatted text:', testText)
  
  return (
    <div>
      <h1>Testing UI Package Path Aliases</h1>
      <p>Formatted text: {testText}</p>
      <Button appName="Test App">Click Me</Button>
      <Card title="Test Card" href="#">
        Card content with path aliases working
      </Card>
    </div>
  )
}

export type { UIComponentProps }