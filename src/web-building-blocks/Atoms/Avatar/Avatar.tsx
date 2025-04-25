import React from 'react';
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from '../../shadcnUI/components/ui/avatar';
import { cn } from '../../shadcnUI/lib/utils';

interface AvatarStyle {
  root?: string;
  img?: string;
  fallback?: string;
}

interface AvatarCSS {
  root?: React.CSSProperties;
  img?: React.CSSProperties;
  fallback?: React.CSSProperties;
}

export interface AvatarProps {
  /* The source of the image */
  src?: string;
  /* The alt text for the image */
  alt: string;
  /**
   * @deprecated
   * This prop is deprecated use `styleClasses` instead
   */
  avatarStyle?: AvatarStyle;
  styleClasses?: AvatarStyle;
  avatarCSS?: AvatarCSS;
  dataTestId?: string;
  /* The fallback text or component */
  fallback?: string | React.ReactNode;
}

const firstCharacters = (alt: string) => {
  const words = alt?.split(' ');

  if (words.length > 1) {
    return words[0][0] + words[1][0];
  }

  return alt[0] + alt[1];
};

const Avatar = ({ src, alt = '', avatarStyle, styleClasses, avatarCSS, dataTestId = 'avatar', fallback = '' }: AvatarProps) => {
  const fallBackCharacters = fallback || firstCharacters(alt) || 'AN';

  return (
    <ShadcnAvatar
      className={cn(avatarStyle?.root, styleClasses?.root) ?? ''}
      data-testid={dataTestId}
      style={avatarCSS?.root}
    >
      <AvatarImage
        className={cn('max-h-28 max-w-28', avatarStyle?.img, styleClasses?.img)}
        style={avatarCSS?.img}
        src={src}
        alt={alt}
      />
      <AvatarFallback
        className={cn(avatarStyle?.fallback, styleClasses?.fallback) ?? ''}
        style={avatarCSS?.fallback}
      >
        {fallBackCharacters}
      </AvatarFallback>
    </ShadcnAvatar>
  );
};

export default Avatar;
