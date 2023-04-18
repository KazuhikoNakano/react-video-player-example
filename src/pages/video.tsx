import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});


const VideosPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState([true, false, false]);
  const [isMuted, setIsMuted] = useState([false, false, false]);
  const [isVolume, setIsVolume] = useState([0.2, 0.2, 0.2]);
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

      // 一定時間で次のスライドへ
      // slider.on("created", () => {
      //   nextTimeout()
      // })
      // slider.on("dragStarted", clearNextTimeout)
      // slider.on("animationEnded", nextTimeout)
      // slider.on("updated", nextTimeout)

      slider.on("slideChanged", (s) => {
        changedSlide(s.track.details.rel);
      })
    },
  ]);

  const videoUrls = [
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
    "https://www.youtube.com/shorts/_6__aznO-CQ",
    "https://www.youtube.com/shorts/rLTPLEdJnRM",
    // "https://vimeo.com/816127333",
    // "https://vimeo.com/816127333",
    // "https://vimeo.com/816127333",
  ];

  const handleProgress = (index: number) => (progress: { playedSeconds: number }) => {
    // console.log(progress.playedSeconds);
    // console.log(index);
    // if (progress.playedSeconds >= 1) {
    //   console.log('one second passed');
    //   setIsVolume(prevState => {
    //     const newState = [0, 0, 0];
    //     newState[index] = 0.2;
    //     return newState;
    //   });
    // }
  };

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
        <div ref={sliderRef} className="keen-slider w-full h-[100dvh]">
        {videoUrls.map((url, index) => (
          <div key={index} className="keen-slider__slide relative">
            <div
              className="w-full h-10 flex items-center justify-center absolute top-0 cursor-pointer z-20"
              onClick={() => {handlePrevSlide()}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            {/* {console.log(`isPlaying[index] = ${index} : ${isPlaying[index]}`)} */}
            {!isPlaying[index] && (
              <>
                {/* <div className="absolute top-0 left-0 w-full h-full z-10 bg-black opacity-50"></div> */}
                <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center" onClick={handlePlay(index)}>
                  <div className="bg-red-500 w-36 h-36 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
            {isPlaying[index] && (
              //サウンド操作のボタン
              <div className="absolute bg-red-500 w-10 h-10 rounded-full right-4 bottom-28 flex items-center justify-center" onClick={handleMute(index)}>
                {isMuted[index] && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                )}
                {!isMuted[index] && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                )}
              </div>
            )}
            <div className='w-[100%] min-w-[300px] h-[95dvh]'>
              <ReactPlayer
                url={url}
                playing={isPlaying[index]}
                volume={isVolume[index]}
                //muted={isMuted[index]}
                muted={false}
                controls
                width={'100%'}
                height={'100%'}
                onProgress={handleProgress(index)}
                //onPlay={handlePlay(index)}
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
            <div
              className="bg-black w-full h-10 flex items-center justify-center absolute bottom-0 cursor-pointer z-20"
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
