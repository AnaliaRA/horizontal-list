import styles from './Spacer.module.css';
import type { SpacerProps } from '@/types/componentProps';

export function Spacer({ width }: SpacerProps) {
  return (
    <div
      className={styles.spacer}
      style={{ '--spacer-width': `${width}px` } as React.CSSProperties}
    />
  );
}
