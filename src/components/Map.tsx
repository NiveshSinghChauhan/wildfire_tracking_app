import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { LocationMarker } from './LocationMarker';
import { nanoid } from 'nanoid';
import EventInfo from './EventInfo';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IEventInfo {
  id: string;
  title: string;
  source: {
    id: string;
    url: string;
  };
  coordinates: ICoordinates;
  date: string;
}

export interface IMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  eventData: any[];
}

export default function Map(props: IMapProps) {
  const [eventInfo, setEventInfo] = useState<IEventInfo | null>(null);

  const onMarkerClick = (eventInfo: IEventInfo) => (e: any) => {
    e.preventDefault();
    setEventInfo(eventInfo);
  };

  const markers: IEventInfo[] = props.eventData
    .filter(events => {
      if (events.categories[0].id === 8) {
        return true;
      }
      return false;
    })
    .map(wildfireEvent => ({
      id: wildfireEvent.id,
      title: wildfireEvent.title,
      source: wildfireEvent.sources[0],
      date: wildfireEvent.geometries[0].date,
      coordinates: {
        lng: wildfireEvent.geometries[0].coordinates[0],
        lat: wildfireEvent.geometries[0].coordinates[1],
      },
    }));

  const markerElem = (event: IEventInfo) => {
    const keyId = nanoid(10);

    return (
      <LocationMarker
        key={keyId}
        eventId={event.id}
        lat={event.coordinates.lat}
        lng={event.coordinates.lng}
        onClick={onMarkerClick(event)}
      />
    );
  };

  return (
    <div className='map-container'>
      <GoogleMapReact
        options={{
          fullscreenControl: false,
        }}
        bootstrapURLKeys={{
          key: 'AIzaSyAc50DYL8aXkVnn1mJotnURhhfSfKNHeog',
        }}
        defaultZoom={props.zoom || 5}
        defaultCenter={{
          lat: props.lat || 37.537,
          lng: props.lng || -110.701,
        }}>
        {markers.map(markerElem)}
      </GoogleMapReact>
      {eventInfo && (
        <EventInfo info={eventInfo} onClose={() => setEventInfo(null)} />
      )}
    </div>
  );
}
