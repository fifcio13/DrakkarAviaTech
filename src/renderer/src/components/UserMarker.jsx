import { AdvancedMarker } from '@vis.gl/react-google-maps'
import airplaneImage from '../assets/airplane3.png'

const UserMarker = ({ lat, lng, direction }) => {
  return (
    <AdvancedMarker position={{ lat: lat, lng: lng }}>
      <img
        src={airplaneImage}
        alt="Airplane"
        width={48}
        height={48}
        style={{ transform: `rotate(${direction}deg)` }}
      />
    </AdvancedMarker>
  )
}

export default UserMarker
