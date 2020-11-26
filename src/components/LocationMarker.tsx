import Icon from '@iconify/react';
import FireAlertIcon from '@iconify/icons-mdi/fire-alert';
import { Theme, Tooltip, withStyles, makeStyles } from '@material-ui/core';

export interface ILocationMarkerProps {
  lat: number;
  lng: number;
  eventId: string;
  onClick: (e: any) => void;
}

const MarkerTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: theme.palette.getContrastText('#fff'),
    boxShadow: theme.shadows[3],
  },
}))(Tooltip);

const MarkerStyles = makeStyles((theme: Theme) => ({
  locationMarker: {
    color: 'red',
    fontSize: '24px',
    transition: 'all 100ms ease-in-out',
    background: 'none',
    border: 'none',
    transform: 'scale(1)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.5)',
      color: 'orange',
      position: 'fixed',
      zIndex: 1,
    },
  },

  locationMarker__icon: {
    filter:
      'drop-shadow(0px 2px 1px rgba(0,0,0,0.2)) drop-shadow( 0px 1px 1px rgba(0,0,0,0.14)) drop-shadow( 0px 1px 3px rgba(0,0,0,0.12))',
  },
}));

export function LocationMarker(props: ILocationMarkerProps) {
  const style = MarkerStyles();

  return (
    <MarkerTooltip title={props.eventId}>
      <button onClick={props.onClick} className={style.locationMarker}>
        <Icon
          icon={FireAlertIcon}
          className={style.locationMarker__icon}></Icon>
      </button>
    </MarkerTooltip>
  );
}
