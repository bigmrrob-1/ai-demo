import { Button } from '@/button';
import { Card } from '@/card';
import type { UIComponentProps } from '@/types/ui';
import { formatText } from '@/utils/helpers';

export function TestAliasesComponent() {
  const testText = formatText('  HELLO WORLD  ');

  return (
    <div>
      <h1>Testing UI Package Path Aliases</h1>
      <p>Formatted text: {testText}</p>
      <Button appName="Test App">Click Me</Button>
      <Card href="#" title="Test Card">
        Card content with path aliases working
      </Card>
    </div>
  );
}

export type { UIComponentProps };
