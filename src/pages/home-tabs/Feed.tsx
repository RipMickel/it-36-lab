import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

const Feed: React.FC = () => {
  const youtubeLinks = [
    '6oV3WGrLLbQ',
    'cHSRG1mGaAo',
    'SSgHXYeoRqA',
    '3MFMBC2P8Oc',
    'Rht8rS4cR1s',
    'eOAEpMOo-pA',
    'fu9yk7gCTbc',
  ];

  const playerRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load YouTube Iframe API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    // Define global function for API callback
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('player', {
        height: '315',
        width: '80%',
        videoId: youtubeLinks[currentIndex],
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    return () => {
      // Cleanup
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const onPlayerStateChange = (event: any) => {
    // 0 = ended
    if (event.data === 0) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < youtubeLinks.length) {
        setCurrentIndex(nextIndex);
        playerRef.current.loadVideoById(youtubeLinks[nextIndex]);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Music</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div id="player" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
