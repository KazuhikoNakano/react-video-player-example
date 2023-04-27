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
  const [isVolume, setIsVolume] = useState([0, 0, 0]);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      origin: "center",
      perView: 2,
      spacing: 20,
    },
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

      // 一定時間で次のスライドへ
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
    "https://www.youtube.com/shorts/_6__aznO-CQ",
    "https://www.youtube.com/shorts/rLTPLEdJnRM",
  ];

  const handlePrevSlide = (): void => {
    instanceRef.current && instanceRef.current.prev();
  };

  const handleNextSlide = (): void => {
    instanceRef.current && instanceRef.current.next();
  };

  const handlePlay = (index: number) => () => {
    setIsPlaying(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setIsMuted(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    setIsVolume(prevState => {
      const newState = [...prevState];
      newState[index] = 0.2;
      return newState;
    });
  };

  const handlePause = (index: number) => () => {
    console.log(`handlePause: ${index}`);
    setIsPlaying(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const handleMute = (index: number) => () => {
    console.log(`handleMute: ${index}`);
    setIsMuted(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    setIsVolume(prevState => {
      const newState = [...prevState];
      newState[index] = newState[index] === 0 ? 0.2 : 0;
      return newState;
    });
  };

  return (
    <main className='flex justify-center'>
      <div>
        <div ref={sliderRef} className="keen-slider w-full h-full">
        {videoUrls.map((url, index) => (
          <div key={index} className="keen-slider__slide relative w-[200px] h-[400px] !min-w-0 !max-w-full">
            <div className='w-[200px] h-[400px] max-h-[100vh]'>
              <ReactPlayer
                url={url}
                playing={isPlaying[index]}
                volume={isVolume[index]}
                muted={isMuted[index]}
                controls
                width={'100%'}
                height={'100%'}
                onPause={handlePause(index)}
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
          </div>
        ))}
        </div>
      </div>
    </main>
  );
};

export default VideosPage;
