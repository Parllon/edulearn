import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import styles from './Switch.module.css';

const Switch = React.forwardRef(({ ...props }, ref) => (
  <SwitchPrimitives.Root className={styles.root} {...props} ref={ref}>
    <SwitchPrimitives.Thumb className={styles.thumb} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
export { Switch };
