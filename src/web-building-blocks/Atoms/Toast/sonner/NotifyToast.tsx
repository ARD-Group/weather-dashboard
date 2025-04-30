import { toast } from 'sonner';

import { cn } from '../../../shadcnUI/lib/utils';
import Avatar from '../../Avatar';
import Typography from '../../Typography';
import { getS3Path } from '../../../utils';
import IconButton from '../../IconButton';

const NotifyToast = (details: { toastIdx: string | number; title: string; subtitle: string; icon?: string }) => {
  return (
    <div className="flex w-full gap-3">
      {details?.icon && (
        <Avatar
          alt={details?.title}
          src={details?.icon}
          styleClasses={{
            root: cn('bg-neutral1 p-3'),
          }}
        />
      )}
      <div className="flex-grow">
        <div className="flex items-center gap-1">
          <Typography
            variant="subtitle1"
            typographyStyle={cn('truncate')}
            title={details?.title}
          >
            {details?.title}
          </Typography>
          <img
            className={cn('mt-1 h-5 w-5')}
            src={getS3Path('/icons/chevron-right.svg')}
            alt="notifications-icon"
          />
        </div>
        <Typography
          variant="body1-strong"
          typographyStyle={cn('text-neutral5 truncate')}
        >
          {details?.subtitle}
        </Typography>
      </div>
      <IconButton
        size="sm"
        variant="link"
        iconButtonStyle={'min-w-10'}
        onClick={() => toast.dismiss(details.toastIdx)}
      >
        <img
          className={cn('h-4 w-4')}
          src={getS3Path('/icons/x-01.svg')}
          alt="notifications-icon"
        />
      </IconButton>
    </div>
  );
};

export default NotifyToast;
