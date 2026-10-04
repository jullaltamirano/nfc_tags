'use client';

import { useEffect, useRef, useState } from 'react';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';

export type SelectedGooglePlace = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

type GooglePlaceIdFinderProps = {
  /** Called after the user selects a place and its details load. */
  onPlaceSelected?: (place: SelectedGooglePlace) => void;
  /** Initial map center. Defaults to Lima, Peru. */
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  className?: string;
};

const DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
let mapsApiConfigured = false;

function configureMapsApi() {
  if (mapsApiConfigured) return;

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) {
    throw new Error('Falta NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en las variables de entorno.');
  }

  setOptions({
    key,
    v: 'weekly',
    // AdvancedMarkerElement requiere un Map ID. Configúralo en .env.local.
    mapIds: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID
      ? [process.env.NEXT_PUBLIC_GOOGLE_MAP_ID]
      : [],
  });
  mapsApiConfigured = true;
}

export default function GooglePlaceIdFinder({
  onPlaceSelected,
  initialCenter = DEFAULT_CENTER,
  initialZoom = 12,
  className,
}: GooglePlaceIdFinderProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const onPlaceSelectedRef = useRef(onPlaceSelected);

  useEffect(() => {
    onPlaceSelectedRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  useEffect(() => {
    let disposed = false;
    let map: google.maps.Map | undefined;
    let marker: google.maps.marker.AdvancedMarkerElement | undefined;
    let infoWindow: google.maps.InfoWindow | undefined;
    let autocomplete: google.maps.places.PlaceAutocompleteElement | undefined;
    let boundsListener: google.maps.MapsEventListener | undefined;

    async function initialize() {
      try {
        configureMapsApi();
        const [{ Map, InfoWindow }, { AdvancedMarkerElement }, { PlaceAutocompleteElement }] =
          await Promise.all([
            importLibrary('maps') as Promise<google.maps.MapsLibrary>,
            importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
            importLibrary('places') as Promise<google.maps.PlacesLibrary>,
          ]);

        if (disposed || !mapElementRef.current || !autocompleteContainerRef.current) return;

        map = new Map(mapElementRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          clickableIcons: false,
          mapTypeControl: false,
          streetViewControl: false,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || undefined,
        });
        infoWindow = new InfoWindow();
        autocomplete = new PlaceAutocompleteElement();
        autocomplete.setAttribute('aria-label', 'Buscar un negocio o lugar');
        autocomplete.setAttribute('placeholder', 'Buscar un negocio o lugar');
        // Google expone el host del widget como un elemento estilizable.
        // Estas propiedades también dan estilo al input interno del componente.
        Object.assign(autocomplete.style, {
          display: 'block',
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#111827',
          colorScheme: 'light',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 8px rgb(0 0 0 / 18%)',
        });
        autocompleteContainerRef.current.appendChild(autocomplete);

        // Prioriza sugerencias que están dentro del área visible del mapa.
        boundsListener = map.addListener('bounds_changed', () => {
          const bounds = map?.getBounds();
          if (bounds && autocomplete) autocomplete.locationBias = bounds;
        });

        autocomplete.addEventListener('gmp-select', async (event) => {
          const { placePrediction } = event as google.maps.places.PlacePredictionSelectEvent;
          const place = placePrediction.toPlace();

          await place.fetchFields({
            fields: ['displayName', 'formattedAddress', 'location', 'id'],
          });
          if (disposed || !place.location || !place.id) return;

          const position = place.location;
          if (place.viewport) map?.fitBounds(place.viewport);
          else {
            map?.setCenter(position);
            map?.setZoom(17);
          }

          if (marker) marker.map = null;
          marker = new AdvancedMarkerElement({
            map,
            position,
            title: place.displayName || place.formattedAddress || 'Lugar seleccionado',
          });

          const content = document.createElement('div');
          const name = document.createElement('strong');
          name.textContent = place.displayName || 'Lugar seleccionado';
          const address = document.createElement('p');
          address.textContent = place.formattedAddress || '';
          const id = document.createElement('p');
          id.textContent = `Place ID: ${place.id}`;
          content.append(name, address, id);
          infoWindow?.setContent(content);
          infoWindow?.open({ map, anchor: marker });

          onPlaceSelectedRef.current?.({
            id: place.id,
            name: place.displayName || '',
            address: place.formattedAddress || '',
            latitude: position.lat(),
            longitude: position.lng(),
          });
        });

        setIsLoading(false);
      } catch (cause) {
        if (disposed) return;
        setError(cause instanceof Error ? cause.message : 'No se pudo cargar Google Maps.');
        setIsLoading(false);
      }
    }

    void initialize();
    return () => {
      disposed = true;
      boundsListener?.remove();
      infoWindow?.close();
      if (marker) marker.map = null;
      if (autocomplete) autocomplete.remove();
    };
  }, [initialCenter, initialZoom]);

  return (
    <section className={`relative h-[520px] min-h-[420px] w-full ${className ?? ''}`}>
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div ref={mapElementRef} className="h-full w-full" aria-label="Mapa de Google" />
      </div>
      <div ref={autocompleteContainerRef} className="absolute left-3 right-3 top-3 z-10" />
      {isLoading && (
        <p className="absolute left-3 top-3 z-20 m-0 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow">
          Cargando mapa…
        </p>
      )}
      {error && (
        <p className="absolute bottom-3 left-3 right-3 z-20 m-0 rounded-lg bg-white px-3 py-2 text-sm text-red-700 shadow" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

