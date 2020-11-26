import Icon from '@iconify/react';
import FireAlertIcon from '@iconify/icons-mdi/fire-alert';
import CloseIcon from '@iconify/icons-mdi/close';
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { IEventInfo } from './Map';

export interface IEventInfoProps {
  info: IEventInfo;
  onClose: (e?: any) => void;
}

const spaceBetweenContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
export default function EventInfo({ info, onClose }: IEventInfoProps) {
  return (
    <Card className='eventInfo'>
      <CardContent>
        <div style={spaceBetweenContainer}>
          <Typography color='textSecondary'>{info.id}</Typography>
          <Tooltip title='Close'>
            <IconButton onClick={onClose} size='small'>
              <Icon icon={CloseIcon}></Icon>
            </IconButton>
          </Tooltip>
        </div>
        <Typography style={{ margin: '10px 0' }} variant='h5' component='h2'>
          {info.title}
        </Typography>

        <div style={spaceBetweenContainer}>
          <Typography
            style={{ display: 'flex', columnGap: '5px', alignItems: 'center' }}
            color='textSecondary'>
            <Icon icon={FireAlertIcon} />
            Wildfire
          </Typography>
          <Typography variant='body2' color='textSecondary' component='span'>
            {new Date(info.date).toLocaleString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
