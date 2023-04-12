import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});


const VideosPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState([true, false, false, false]);
  const [isMuted, setIsMuted] = useState([true, true, true, true]);
  const [sliderRef, instanceRef] = useKeenSlider({
    vertical: true,
    loop: true,
  });

  const videoUrls = [
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
    "https://vimeo.com/816127333",
    "https://vimeo.com/816127333"
  ];

  const handleProgress = (index: number) => (progress: { playedSeconds: number }) => {
    console.log(progress.playedSeconds);
    // 一定秒数後に停止
    // if (progress.playedSeconds >= 10) {
    //   console.log('stop');
    //   setIsPlaying(prevState => {
    //     const newState = [...prevState];
    //     newState[index] = false;
    //     return newState;
    //   });
    // }
  };

  const resolveNextIndex = (index: number) => {
    if (index === videoUrls.length - 1) {
      return 0;
    }
    return index + 1;
  };

  const handlePlayVideo = (index: number) => {
    console.log('play');
    console.log(index);
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
  };

  const handleNextSlide = (index: number): void => {
    console.log('next');
    setIsPlaying(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      newState[resolveNextIndex(index)] = true;
      return newState;
    });
    // setIsMuted(prevState => {
    //   const newState = [...prevState];
    //   newState[resolveNextIndex(index)] = false;
    //   return newState;
    // });
    instanceRef.current && instanceRef.current.next();
  };

  return (
    <main className='flex justify-center'>
      <div>
        <div ref={sliderRef} className="keen-slider w-screen h-[100dvh]">
        {videoUrls.map((url, index) => (
          <div key={index} className="keen-slider__slide relative">
            <div className='w-full h-[95dvh]'>
              <ReactPlayer
                url={url}
                playing={isPlaying[index]}
                muted={isMuted[index]}
                controls={true}
                width={'100%'}
                height={'100%'}
                onProgress={handleProgress(index)}
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
                      transparent: 0,
                    },
                  },
                }}
              />
            </div>
            {/* 下部操作部分 */}
            <div
              className="bg-black w-full h-10 flex items-center justify-center absolute bottom-0 cursor-pointer z-10"
              onClick={() => {handleNextSlide(index)}}
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
