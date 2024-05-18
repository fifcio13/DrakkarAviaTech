import { AdvancedMarker } from '@vis.gl/react-google-maps'
import airplaneImage from '../assets/airplane2.png'

const UserMarker = ({ lat, lng, direction }) => {
  return (
    <AdvancedMarker position={{ lat: lat, lng: lng }}>
      <img src={airplaneImage} alt="Airplane" width={48} height={48} />
    </AdvancedMarker>
  )
}

export default UserMarker
