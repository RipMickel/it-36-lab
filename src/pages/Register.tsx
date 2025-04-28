import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';
import './Register.css';

// GIF URL (Replace this with your own if needed)
const GIF_URL = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHp0YzVzenBwN3MzODd0NzN6Nmk2aTBlNmp0a2RicHJkaTNqa2tjZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6afAyZFRgF1e0fc4HC/giphy.gif";

// Reusable Alert Component
const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith("@gmail.com")) {
      setAlertMessage("Only @gmail.com emails are allowed to register.");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);
  
    try {
      // Sign up in Supabase authentication
      const { data, error } = await supabase.auth.signUp({ email, password });
  
      if (error) {
        throw new Error("Account creation failed: " + error.message);
      }
  
      // Hash password before storing in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Insert user data into 'users' table
      const { error: insertError } = await supabase.from("users").insert([
        {
          username,
          user_email: email,
          user_firstname: firstName,
          user_lastname: lastName,
          user_password: hashedPassword,
        },
      ]);
  
      if (insertError) {
        throw new Error("Failed to save user data: " + insertError.message);
      }
  
      setShowSuccessModal(true);
    } catch (err) {
      if (err instanceof Error) {
        setAlertMessage(err.message);
      } else {
        setAlertMessage("An unknown error occurred.");
      }
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="register-container">
          <div className="register-card">
            {/* Circular GIF at the top */}
            <div className="gif-container">
              <img 
                src={GIF_URL} 
                alt="Register Animation" 
                className="register-icon"
              />
            </div>

            <h2>Create Your Account</h2>

            <IonInput
              label="Username"
              labelPlacement="stacked"
              fill="outline"
              type="text"
              placeholder="Enter a unique username"
              value={username}
              onIonChange={e => setUsername(e.detail.value!)}
              className="input-field"
            />
            <IonInput
              label="First Name"
              labelPlacement="stacked"
              fill="outline"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onIonChange={e => setFirstName(e.detail.value!)}
              className="input-field"
            />
            <IonInput
              label="Last Name"
              labelPlacement="stacked"
              fill="outline"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onIonChange={e => setLastName(e.detail.value!)}
              className="input-field"
            />
            <IonInput
              label="Email"
              labelPlacement="stacked"
              fill="outline"
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              className="input-field"
            />
            <IonInput
              label="Password"
              labelPlacement="stacked"
              fill="outline"
              type="password"
              placeholder="Enter password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              className="input-field"
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
            <IonInput
              label="Confirm Password"
              labelPlacement="stacked"
              fill="outline"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onIonChange={e => setConfirmPassword(e.detail.value!)}
              className="input-field"
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonButton onClick={handleOpenVerificationModal} expand="full" className="register-button">
              Register
            </IonButton>
            <IonButton routerLink="/it-36-lab" expand="full" fill="clear" className="register-already-button">
              Already have an account? Sign in
            </IonButton>
          </div>
        </div>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding">
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>
                <IonCardSubtitle>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent></IonCardContent>
              <div className="modal-buttons">
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{ textAlign: 'center'}}>
            <IonTitle>Registration Successful ðŸŽ‰</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email address.</p>
            </IonText>
            <IonButton routerLink="/it-36-lab" routerDirection="back" color="primary">
              Go to Login
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Reusable AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;