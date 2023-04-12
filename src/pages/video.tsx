import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});


const VideosPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState([true, false, false]);
  const [isMuted, setIsMuted] = useState([true, true, true]);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    vertical: true,
    loop: true,
  },
  [
    (slider) => {
      let timeout: ReturnType<typeof setTimeout>
      const clearNextTimeout = () => {
        clearTimeout(timeout)
      }
      const nextTimeout = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          slider.next()
        }, 10000)
      }
      const changedSlide = (index: number) => {
        setIsPlaying(prevState => {
          const newState = [false, false, false];
          newState[index] = true;
          return newState;
        });
      }

      slider.on("created", () => {
        nextTimeout()
      })
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
      slider.on("slideChanged", (s) => {
        changedSlide(s.track.details.rel);
      })
    },
  ]);

  const videoUrls = [
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
    // "https://vimeo.com/816127333",
    // "https://vimeo.com/816127333",
    // "https://vimeo.com/816127333",
  ];

  const handleNextSlide = (): void => {
    instanceRef.current && instanceRef.current.next();
  };

  return (
    <main className='flex justify-center'>
      <div>
        <div ref={sliderRef} className="keen-slider w-full h-[100dvh]">
        {videoUrls.map((url, index) => (
          <div key={index} className="keen-slider__slide relative">
            <div className='w-[100%] min-w-[300px] h-[95dvh]'>
              <ReactPlayer
                url={url}
                playing={isPlaying[index]}
                muted
                controls
                width={'100%'}
                height={'100%'}
                config={{
                  youtube: {
                    playerVars: {
                      disablekb: 1,
                      fs: 0,
                      modestbranding: 1,
                      rel: 0,
                      iv_load_policy: 3,
                      playsinline: 1,
                    },
                  },
                  vimeo: {
                    playerOptions: {
                      byline: false,
                      portrait: false,
                      title: false,
                      transparent: true,
                    },
                  },
                }}
              />
            </div>
            <div
              className="bg-black w-full h-10 flex items-center justify-center absolute bottom-0 cursor-pointer z-10"
              onClick={() => {handleNextSlide()}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        ))}
        </div>
      </div>
    </main>
  );
};

export default VideosPage;
