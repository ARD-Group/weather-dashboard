import React, { useEffect, useState } from "react";
import { getS3Path } from "../../utils/functions";
import { fetchAndColorSVG } from "../../lib/fetchAndColorSVG";
import { cn } from "../../shadcnUI/lib/utils";

interface SVGIconProps {
  path: string;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  path,
  color,
  className,
  width,
  height,
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const loadSVG = async () => {
      const svgURL = getS3Path(path);

      const coloredSVG = await fetchAndColorSVG(svgURL, color, width, height);
      setSvgContent(coloredSVG);
    };
    loadSVG();
  }, [path, color, width, height]);

  return (
    <div
      className={cn("svg-container", className)}
      dangerouslySetInnerHTML={{ __html: svgContent || "" }}
    />
  );
};

export default SVGIcon;
