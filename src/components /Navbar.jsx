import React, { useRef, useState, useEffect} from 'react'
import Button from './Button' 
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'

const Navbar = () => {

  // variables
  const navContainerRef = useRef(null)
  const audioElementRef = useRef(null)

  // states
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isIndicatorActive, setIsIndicatorActive] = useState(false)
  const [lastScrollY, setLastScrollY] = useState( 0 )
  const [isNavVisible, setIsNavVisible] = useState(true)
  

  // play audio
  const toggleAudioIndicator = () => {
    setIsAudioPlaying( (prev) => !prev)
    setIsIndicatorActive( (prev) => !prev)
  }

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play()
    }else { 
      audioElementRef.current.pause()
    }
  
  }, [isAudioPlaying])
  
  // elements nav or sections at nav  
  const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];  

  // nav Visible when scroll down 
  const { y : currentScrollY } = useWindowScroll()

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6" ref={navContainerRef}>
      <header className='absolute top-1/2 w-full -translate-y-1/2' >
        <nav className='flex size-full items-center justify-between p-4' >
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className='w-10' />

            <Button id="product-button" title="Products" rightIcon={<TiLocationArrow/>} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1" />
          </div>
        
          <div className="flex h-full items-center ">
            <div className="hidden md:block">
              {navItems.map((items) => ( 
                <a className='nav-hover-btn'  href={`#${items.toLowerCase()}`}> {items} </a>
              ))}
            </div>

            <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>

              <audio ref={audioElementRef} className='hidden' src='public/audio/loop.mp3' loop /> 
              {[1,2,3,4].map((bar) => (
                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay : `${bar * 0.1}s`}}></div>
              ))} 

            </button>

          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
