import type { ItemTitleProps } from '@/types/componentProps';
import styles from './ItemTitle.module.css';

export function ItemTitle({ title }: ItemTitleProps) {
  return <div className={styles.itemTitle}>{title}</div>;
}
