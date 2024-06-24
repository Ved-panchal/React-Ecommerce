import { ring } from 'ldrs'

const Loader = () => {
    ring.register()
  return (
    <l-ring
  size="40"
  stroke="5"
  bg-opacity="0"
  speed="2" 
  color="black" 
></l-ring>
  )
}

export default Loader
