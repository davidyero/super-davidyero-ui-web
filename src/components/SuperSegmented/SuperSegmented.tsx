import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import { Option, Thumb, Track } from './SuperSegmented.styles';
import type { SuperSegmentedProps } from './SuperSegmented.types';

interface ThumbBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Selector segmentado en píldora para 2–4 opciones excluyentes. El fondo de la
 * activa se desliza al cambiar. Variante `icon` para banderas de idioma.
 * Flechas, Inicio y Fin mueven la selección (patrón ARIA de tabs).
 */
export const SuperSegmented = <TValue extends string = string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  className,
}: SuperSegmentedProps<TValue>): ReactElement => {
  const refs = useRef(new Map<TValue, HTMLButtonElement>());
  const trackRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<ThumbBox | null>(null);
  // La primera medida coloca el fondo sin animar; las siguientes se deslizan.
  const [animate, setAnimate] = useState(false);
  const enabled = options.filter((option) => !option.disabled);

  const measure = useCallback((): void => {
    const el = refs.current.get(value);
    if (!el) {
      setBox(null);
      return;
    }
    setBox({ x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight });
  }, [value]);

  useLayoutEffect(measure, [measure, options, size, fullWidth]);

  useEffect(() => {
    if (box && !animate) {
      const frame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [box, animate]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const index = enabled.findIndex((option) => option.value === value);
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % enabled.length,
      ArrowLeft: (index - 1 + enabled.length) % enabled.length,
      Home: 0,
      End: enabled.length - 1,
    };
    const target = enabled[keys[event.key] ?? -1];
    if (!target) return;
    event.preventDefault();
    onChange(target.value);
    refs.current.get(target.value)?.focus();
  };

  return (
    <Track
      ref={trackRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      $fullWidth={fullWidth}
      $variant={variant}
      className={className}
    >
      {box && (
        <Thumb
          aria-hidden
          $variant={variant}
          $animate={animate}
          style={{
            width: box.width,
            height: box.height,
            transform: `translate(${box.x}px, ${box.y}px)`,
          }}
        />
      )}
      {options.map((option) => {
        const active = option.value === value;
        const iconOnly = variant === 'icon' && option.icon !== undefined;
        return (
          <Option
            key={option.value}
            ref={(el) => {
              if (el) refs.current.set(option.value, el);
              else refs.current.delete(option.value);
            }}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={iconOnly ? option.label : undefined}
            title={iconOnly ? option.label : undefined}
            tabIndex={active ? 0 : -1}
            disabled={option.disabled}
            $active={active}
            $size={size}
            $fullWidth={fullWidth}
            $variant={variant}
            onClick={() => onChange(option.value)}
          >
            {option.icon}
            {!iconOnly && option.label}
          </Option>
        );
      })}
    </Track>
  );
};

export type { SuperSegmentedProps, SuperSegmentedOption } from './SuperSegmented.types';
