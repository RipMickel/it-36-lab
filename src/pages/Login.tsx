import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import './Login.css'; // Import the CSS file

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading screen visibility

  // Apply background on the Login page
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      ion-content {
        --background: transparent;
        background-image: url('https://img.freepik.com/free-photo/galaxy-nature-aesthetic-background-starry-sky-mountain-remixed-media_53876-126761.jpg?t=st=1745818411~exp=1745822011~hmac=da57517a476eb7aa23c4b5689935e72b190eef38899488df0d7bbc76a89b75a1&w=1060');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    `;
    document.head.appendChild(style);


    setTimeout(() => {
      setIsLoading(false); 
    }, 3000); 


    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it-36-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        {isLoading ? (
          // Show loading screen (can be a GIF, Video, or Spinner)
          <div className="loading-screen">
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXlsejZjdzZ4b2VtbXFiNGx5Mndoc2p1c3VzMWJqbDgxNGhwN2VkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C3brYLms1bhv2/giphy.gif" // Replace with your GIF or video URL
              alt="Loading..."
              style={{ width: '100%', height: '100%' }} // Adjust size as needed
            />
          </div>
        ) : (
          // Show the login form after loading
          <div className="login-container">
            <div className="login-card">
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXRhcGUwbmVsb3VzbGNiamRwc3Vsdms1d2Z3bnAzaHZzOGdxMHV5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6utNxL2fGvEL5tFBZr/giphy.gif"
                alt="Login Animation"
                className="login-icon"
              />
              <h2>Login</h2>
              <IonInput
                placeholder="Email"
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                fill="outline"
                className="input-field"
              />
              <IonInput
                placeholder="Password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                fill="outline"
                className="input-field"
              />
              <IonButton onClick={doLogin} expand="block" className="login-button">
                Login
              </IonButton>
              <IonButton
                routerLink="/it-36-lab/register"
                expand="block"
                fill="clear"
                className="login-register-button"
              >
                Register
              </IonButton>
            </div>
          </div>
        )}

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={alertMessage}
          buttons={['OK']}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
