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
    const youtubeLink = 'https://www.youtube.com/embed/n8Q9rNdhkWQ?autoplay=1&loop=1&playlist=n8Q9rNdhkWQ';
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            {/* Embed YouTube Video */}
            <iframe
              width="80%" // Adjust width to fit better
              height="80%" // Adjust height
              src={youtubeLink}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Feed;
  