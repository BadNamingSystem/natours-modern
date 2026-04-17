import type { TourLocation } from "../../../types/types.ts"
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const pinIcon = L.icon({
    iconUrl: "/pin.png",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -35],
})

function Map({ locations }: { locations: TourLocation[] }) {
    const center: [number, number] = [locations[0].coordinates[1], locations[0].coordinates[0]]
    const lineCoordinates: [number, number][] = locations.map(loc => [loc.coordinates[1], loc.coordinates[0]])

    return (
        <section className="relative mt-0 h-80 bg-gray-50 md:mt-[-8vw] md:h-260 md:bg-transparent [clip-path:polygon(0_8vw,100%_0,100%_calc(100%-8vw),0_100%)]">
            <MapContainer
                center={center}
                doubleClickZoom={false}
                zoomControl={false}
                zoom={8}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Connecting lines between locations */}
                <Polyline positions={lineCoordinates} color="#39B24C" weight={4} opacity={0.7} />

                {locations.map((location, i) => (
                    <Marker
                        icon={pinIcon}
                        position={[location.coordinates[1], location.coordinates[0]]}
                        key={location.id || i}
                    >
                        <Popup>
                            <div className="p-1 font-sans text-2xl font-light">
                                <p className="mx-6 my-4 text-neutral-600">
                                    <span className="font-semibold">Day {location.day}:</span> {location.description}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    )
}

export default Map
