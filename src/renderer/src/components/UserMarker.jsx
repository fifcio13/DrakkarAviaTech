import { AdvancedMarker } from '@vis.gl/react-google-maps'
import airplaneImage from '../assets/airplane3.png'

const UserMarker = ({ lat, lng, course }) => {
  return (
    <AdvancedMarker position={{ lat: lat, lng: lng }} zIndex={9999}>
      <img
        src={airplaneImage}
        alt="Airplane"
        width={48}
        height={48}
        style={{ transform: `rotate(${course}deg)` }}
      />
    </AdvancedMarker>
  )
}

export default UserMarker
