import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import Versions from './components/Versions'

function App() {
  return (
    <>
      <APIProvider apiKey={'AIzaSyC6683MhH9u4L1iAdQX6JM-axhi6yB6X3k'}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          <Marker position={{ lat: 53.54992, lng: 10.00678 }} />
        </Map>
      </APIProvider>
      <Versions></Versions>
    </>
  )
}

export default App
