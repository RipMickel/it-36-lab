import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

const Feed: React.FC = () => {
  const youtubeLinks = [
    'https://www.youtube.com/embed/6oV3WGrLLbQ?autoplay=1&loop=1&playlist=6oV3WGrLLbQ',
    'https://www.youtube.com/embed/cHSRG1mGaAo?autoplay=1&loop=1&playlist=cHSRG1mGaAo',
    'https://www.youtube.com/embed/SSgHXYeoRqA?autoplay=1&loop=1&playlist=SSgHXYeoRqA',
    'https://www.youtube.com/embed/3MFMBC2P8Oc?autoplay=1&loop=1&playlist=3MFMBC2P8Oc',
    'https://www.youtube.com/embed/Rht8rS4cR1s?autoplay=1&loop=1&playlist=Rht8rS4cR1s',



  ];

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
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
          }}
        >
          {youtubeLinks.map((link, index) => (
            <iframe
              key={index}
              width="80%"
              height="315"
              src={link}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`YouTube Video ${index + 1}`}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
