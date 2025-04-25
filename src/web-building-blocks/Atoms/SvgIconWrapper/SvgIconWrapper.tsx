import { useEffect, useState } from 'react';
import { cn } from '../../shadcnUI/lib/utils';


export interface SvgIconWrapperPropsBase {
  svgUrl: string;
  styles?: {
    wrapper: string;
  };
  dataTestId?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export type SvgIconWrapperProps = SvgIconWrapperPropsBase &
  (
    | { colorType: 'css'; cssColor: string; tailwindColor?: never; svgColor?: { fill?: boolean; stroke?: boolean } }
    | { colorType: 'tailwind'; cssColor?: never; tailwindColor: string; svgColor?: { fill?: boolean; stroke?: boolean } }
  );

const SvgIconWrapper = ({
  dataTestId = 'Icon-wrapper-1',
  styles,
  colorType,
  cssColor,
  tailwindColor,
  svgUrl,
  svgColor = { fill: true, stroke: true },
  onClick,
}: SvgIconWrapperProps) => {
  const fetchAndColorSVG = async (url: string, color?: string) => {
    try {
      const response = await fetch(url);
      const svgText = await response.text();
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;
      const elementsWithStrokeOrFill = svgElement.querySelectorAll('[stroke], [fill]');
      color &&
        elementsWithStrokeOrFill.forEach((element) => {
          svgColor?.stroke && element.setAttribute('stroke', color);
          svgColor?.fill && element.setAttribute('fill', color);
        });
      return new XMLSerializer().serializeToString(svgElement);
    } catch (error) {
      console.error('Error fetching SVG:', error);
      return null;
    }
  };

  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const loadSVG = async () => {
      let desiredColor: string | undefined;

      if (colorType === 'css') {
        desiredColor = cssColor;
      } else if (colorType === 'tailwind' && tailwindColor) {
        desiredColor = tailwindColor;
      }

      const coloredSVG = await fetchAndColorSVG(`${svgUrl}`, desiredColor);
      setSvgContent(coloredSVG);
    };
    loadSVG();
  }, [colorType, cssColor, tailwindColor, svgUrl]);

  return (
    <div
      onClick={onClick}
      data-testid={dataTestId}
      className={cn('svg-container flex items-center justify-center', styles?.wrapper)}
      dangerouslySetInnerHTML={{ __html: svgContent || '' }}
    />
  );
};

export default SvgIconWrapper;
