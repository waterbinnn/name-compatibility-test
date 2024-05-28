import { useStyle } from '@/hooks';
import styles from './Result.module.scss';

export const Result = () => {
  const { styled: cx } = useStyle(styles);

  return <div>Result</div>;
};
