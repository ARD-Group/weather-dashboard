import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../shadcnUI/lib/utils';
import ShowIf from '../../Atoms/ShowIf/ShowIf';

export interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
  dataTestId?: string;
  styleClasses?: {
    root?: string;
    skeleton?: string;
  };
}

const Skeleton = ({ styleClasses, dataTestId, children, ...props }: React.HTMLAttributes<HTMLDivElement> & SkeletonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number; borderRadius?: string } | null>(null);

  useEffect(() => {
    if (containerRef.current && children) {
      const outerChild = containerRef.current.firstElementChild as HTMLElement;
      const innerChild = outerChild?.firstElementChild as HTMLElement;

      if (outerChild && innerChild) {
        const { width, height } = outerChild.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(innerChild);
        setDimensions({
          width,
          height,
          borderRadius: computedStyle.borderRadius || '0px',
        });
      }
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', styleClasses?.root)}
      data-testid={`${dataTestId ? `${dataTestId}-` : ''}skeleton`}
      {...props}
    >
      <ShowIf If={!children}>
        <div className={cn('bg-input h-full w-full animate-pulse rounded-md', styleClasses?.skeleton)} />
      </ShowIf>
      <ShowIf If={!!dimensions}>
        <div
          style={{
            width: dimensions?.width,
            height: dimensions?.height,
            borderRadius: dimensions?.borderRadius,
          }}
          className={cn('bg-input z-1 absolute left-0 top-0 animate-pulse', styleClasses?.skeleton)}
        />
      </ShowIf>
      {children && <div className="relative [&>*]:pointer-events-none [&>*]:select-none [&>*]:opacity-0">{children}</div>}
    </div>
  );
};

export default Skeleton;
