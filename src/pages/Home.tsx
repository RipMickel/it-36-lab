import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { bookOutline, musicalNote, search, star } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import Feed from './home-tabs/Feed';
import { laptopOutline } from 'ionicons/icons';
import Pcassembly from './home-tabs/Pcassembly';



const Home: React.FC = () => {
  const tabs = [
    {name:'Music', tab:'feed',url: '/it-36-lab/app/home/feed', icon: musicalNote},
    {name: 'PC Assembly', tab: 'PC', url: '/it-36-lab/app/home/pcassembly', icon: laptopOutline},
    {name:'Favorites',tab:'favorites', url: '/it-36-lab/app/home/favorites', icon: star},
  ]
  return (
    <IonReactRouter>
    <IonTabs>
      <IonTabBar slot="bottom">

        {tabs.map((item, index) => (
          <IonTabButton key={index} tab={item.tab} href={item.url}>
            <IonIcon icon={item.icon} />
            <IonLabel>{item.name}</IonLabel>
          </IonTabButton>
        ))}
        
      </IonTabBar>
    <IonRouterOutlet>

    <Route exact path="/it-36-lab/app/home/feed" render={() => <Feed />} />
    <Route exact path="/it-36-lab/app/home/pcassembly" render={() => <Pcassembly />} />


      <Route exact path="/it-36-lab/app/home">  
        <Redirect to="/it-36-lab/app/home/feed" />
      </Route>

    </IonRouterOutlet>
    </IonTabs>
  </IonReactRouter>
  );
};

export default Home;