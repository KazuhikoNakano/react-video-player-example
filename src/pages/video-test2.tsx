import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});


const VideosPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState([true]);
  const [isMuted, setIsMuted] = useState([true]);
  const [isVolume, setIsVolume] = useState([0.2]);

  const videoUrls = [
    "https://www.youtube.com/shorts/ZnlCbv9-d9M",
  ];

  return (
    <main className='flex justify-center'>
      <div>
        <div>
          <ReactPlayer
          url={videoUrls[0]}
          playing={isPlaying[0]}
          volume={isVolume[0]}
          muted={isMuted[0]}
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
      </div>
    </main>
  );
};

export default VideosPage;
