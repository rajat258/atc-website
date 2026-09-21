import { useCountUp } from "../hooks/useCountUp";
import styles from "./Stat.module.css";

type StatProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  note?: string;
};

/**
 * One headline figure, counted up the first time it reaches the viewport.
 *
 * The rendered number is marked aria-hidden and the final value is given to
 * assistive technology as plain text, so a screen reader hears "2.5 million"
 * once rather than every frame of the animation.
 */
export function Stat({ value, decimals = 0, suffix = "", label, note }: StatProps) {
  const { ref, value: current } = useCountUp(value);
  const display = current.toFixed(decimals);

  return (
    <div className={styles.stat}>
      <p className={styles.figure}>
        <span ref={ref} aria-hidden="true">
          {display}
        </span>
        {suffix && (
          <span className={styles.suffix} aria-hidden="true">
            {suffix}
          </span>
        )}
        <span className="visually-hidden">
          {value.toFixed(decimals)}
          {suffix}
        </span>
      </p>
      <p className={styles.label}>{label}</p>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
