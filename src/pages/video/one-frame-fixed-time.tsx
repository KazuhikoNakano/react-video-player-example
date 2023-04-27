import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const VideosPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVolume, setIsVolume] = useState<number>(0);

  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const videoUrls = [
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
    "https://www.youtube.com/shorts/_6__aznO-CQ",
    "https://www.youtube.com/shorts/rLTPLEdJnRM",
  ];

  const handleProgress = (progress: { playedSeconds: number }) => {
    console.log(`handleProgress: ${progress.playedSeconds}`);
    if (progress.playedSeconds >= 10) {
      handleNextVideo();
    }
  };

  const handlePrevVideo = (): void => {
    setCurrentVideoIndex(currentVideoIndex === 0 ? videoUrls.length - 1 : currentVideoIndex - 1);
    setIsPlaying(true);
  };

  const handleNextVideo = (): void => {
    setCurrentVideoIndex(currentVideoIndex === videoUrls.length - 1 ? 0 : currentVideoIndex + 1);
    setIsPlaying(true);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsMuted(false);
    setIsVolume(0.2);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    setIsVolume(isVolume === 0 ? 0.2 : 0);
  };

  return (
    <main className='flex justify-center'>
      <div className="w-full h-[100vh]">
        <div className="relative w-full h-[100vh]">
          <button
            type='button'
            className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-20 text-white disabled:text-gray-500"
            disabled={currentVideoIndex === 0}
            onClick={() => {handlePrevVideo()}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type='button'
            className="absolute top-1/2 right-0 transform translate-y-[-50%] flex flex-col items-center justify-center cursor-pointer z-20 text-white disabled:text-gray-500"
            disabled={currentVideoIndex === videoUrls.length - 1}
            onClick={() => {handleNextVideo()}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          {!isPlaying && (
            <>
              <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center" onClick={handlePlay}>
                <div className="bg-red-500 w-36 h-36 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
              </div>
            </>
          )}
          {isPlaying && (
            //サウンド操作のボタン
            <div className="absolute bg-red-500 w-10 h-10 rounded-full right-4 bottom-28 flex items-center justify-center" onClick={handleMute}>
              {isMuted && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
              {!isMuted && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
            </div>
          )}
          <div className='w-[100%] min-w-[300px] h-[95vh]'>
            <ReactPlayer
              url={videoUrls[currentVideoIndex]}
              playing={isPlaying}
              volume={isVolume}
              muted={isMuted}
              controls
              width={'100%'}
              height={'100%'}
              onProgress={handleProgress}
              onPause={handlePause}
              playsinline={true}
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
          >
          </div>
        </div>
      </div>
    </main>
  );
};

export default VideosPage;
