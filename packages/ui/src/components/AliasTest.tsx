import type { UIComponentProps } from '@/types/ui';
import { formatText } from '@/utils/helpers';

export function AliasTest({ className, children }: UIComponentProps) {
  const formattedClass = className ? formatText(className) : '';

  return (
    <div className={formattedClass}>
      <h3>Path Alias Test Component</h3>
      {children}
    </div>
  );
}
