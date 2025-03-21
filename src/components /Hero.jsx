import React, { useRef, useState } from 'react'
import Button from './Button'

const Hero = () => {

  const [ currentIndex, setCurrentIndex ] = useState( 1 )
  const [ hasClicked, setHasClicked ] = useState( false )
  const [ isLoanding, setIsLoanding ] = useState( true )
  const [ loadedVideos, setLoadedVideos ] = useState( 0 )

  const totalVideos = 3; 
  const nextVideoRef = useRef( null)


  const handleVIdeoLoad = () => { 
    setLoadedVideos((prevIndex) => prevIndex + 1 )
  }

  const upcomingVideoIndex = (currentIndex % totalVideos ) + 1; 

  const handleMiniClick = () => {
    setHasClicked(true)
    setCurrentIndex( upcomingVideoIndex )
  }

  const getVideoSrc = (index) => `public/videos/hero-${index}.mp4`

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'> 
        <div id='video-frame' className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <div>
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-xl">
                    <div onClick={handleMiniClick} className="origin-center  scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                      <video muted loop id='current-video' className='size-64 origin-center scale-150 object-cover object-center' onLoadedData={handleVIdeoLoad}  ref={nextVideoRef} src={getVideoSrc( upcomingVideoIndex )}  />
                    </div>
                </div>
                <video ref={nextVideoRef} src={getVideoSrc(currentIndex)} loop muted id='next-video' className='absolute-center invisible absolute z-20 size-64 object-cover object-center '  />
                {/* auto play */}
                <video src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} autoPlay loop muted className='absolute left-0 top-0 size-full object-cover object-center' onLoadedData={handleVIdeoLoad}  />
                
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                  <div className="mt-24 px-5 sm:px-10">
                    <h1 className='special-font hero-heading text-blue-100' >redefi<b>n</b>e</h1>
                    <p className='mb-5 max-w-64 font-robert-regular text-blue-100' > Enter The Metagame Layer <br /> Unleash The Play Economy </p>
                    <Button/>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero