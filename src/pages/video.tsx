import React from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const VideosPage = () => {
  return (
    <div>
      <h1>Videos</h1>
      <div>
        <ReactPlayer
          url="https://youtube.com/shorts/XXX?feature=share" // 動画のURLは変更してください
          playing
          controls
          muted
          width={159}
          height={283}
        />
      </div>
    </div>
  );
};

export default VideosPage;
