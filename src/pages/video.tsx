import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const VideosPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleProgress = (progress: { playedSeconds: number }) => {
    console.log(progress.playedSeconds);
    if (progress.playedSeconds >= 3) {
      console.log('stop');
      setIsPlaying(false);
    }
  };

  return (
    <main className='flex justify-center'>
      <div>
        <h1 className='text-3xl font-bold underline my-3'>Videos</h1>
        <div className='[&_iframe]:rounded-md'>
          <ReactPlayer
            url="https://youtube.com/shorts/ShadyfN8w1U?feature=share" // 動画のURLは変更してください
            playing={isPlaying}
            controls
            muted
            width={159}
            height={283}
            onProgress={handleProgress}
          />
        </div>
      </div>
    </main>
  );
};

export default VideosPage;
