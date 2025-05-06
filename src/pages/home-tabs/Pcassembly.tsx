import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonTextarea,
  IonInput,
  IonText
} from '@ionic/react';

interface Task {
  name: string;
  completed: boolean;
  time: number;
  timerId?: number | null; 
}

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const PCAssembly: React.FC = () => {
  const [pcTasks, setPcTasks] = useState<Task[]>([]);
  const [pcNotes, setPcNotes] = useState('');
  const [newTask, setNewTask] = useState('');
  const [username, setUsername] = useState('');

  const defaultPcTasks = [
    'Install Motherboard',
    'Install CPU',
    'Apply Thermal Paste',
    'Install CPU Cooler',
    'Insert RAM',
    'Mount PSU',
    'Connect Cables',
    'Install GPU',
    'Connect Storage',
    'Close Case',
    'Power On Test',
  ].map(name => ({ name, completed: false, time: 0 }));

  useEffect(() => {
    const savedPcTasks = localStorage.getItem('pcTasks');
    const savedPcNotes = localStorage.getItem('pcNotes');
    const savedUsername = localStorage.getItem('Username'); 

    const parsedPcTasks = savedPcTasks ? JSON.parse(savedPcTasks) : [];
    setPcTasks(parsedPcTasks.length > 0 ? parsedPcTasks : defaultPcTasks);
    if (savedPcNotes) setPcNotes(savedPcNotes);
    if (savedUsername) setUsername(savedUsername); 
  }, []);

  useEffect(() => {
    localStorage.setItem('pcTasks', JSON.stringify(pcTasks));
  }, [pcTasks]);

  useEffect(() => {
    localStorage.setItem('pcNotes', pcNotes);
  }, [pcNotes]);

  useEffect(() => {
    localStorage.setItem('Username', username);  // Corrected here (username with lowercase 'u')
  }, [username]);  // Corrected here (username with lowercase 'u')

  const toggleTask = (index: number) => {
    const updated = [...pcTasks];
    const task = updated[index];

    if (!task.completed) {
      task.completed = true;
      if (task.timerId !== null) clearInterval(task.timerId); // Clear the timer if it exists
      task.timerId = null;
    } else {
      task.completed = false;
      task.time = 0;
    }

    setPcTasks(updated);
  };

  const startTimer = (index: number) => {
    const updated = [...pcTasks];
    const task = updated[index];

    if (task.completed) return;
    if (task.timerId !== null) clearInterval(task.timerId); // Clear the previous timer if it exists

    const intervalId = setInterval(() => {
      setPcTasks(prev => {
        const update = [...prev];
        update[index].time += 1;
        return update;
      });
    }, 1000);

    task.timerId = intervalId as unknown as number; // Type cast the intervalId to number
    setPcTasks(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setPcTasks([...pcTasks, { name: newTask, completed: false, time: 0 }]);
    setNewTask('');
  };

  const resetTasks = () => {
    localStorage.removeItem('pcTasks');
    localStorage.removeItem('pcNotes');
    setPcTasks(defaultPcTasks);
    setPcNotes('');
  };

  const progress = Math.round((pcTasks.filter(t => t.completed).length / pcTasks.length) * 100);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PC Assembly Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Display the username */}
        <IonText className="ion-margin-bottom">
          <p>{username ? `Welcome, ${username}!` : 'Welcome, Guest!'}</p>
        </IonText>

        <IonList>
          {pcTasks.map((task, i) => (
            <IonItem key={i} className={task.completed ? 'ion-text-decoration-line-through' : ''}>
              <IonCheckbox
                checked={task.completed}
                onIonChange={() => toggleTask(i)}
                disabled={task.completed}
              />
              <IonLabel className="ion-margin-start">{task.name}</IonLabel>
              <IonButton
                size="small"
                onClick={() => startTimer(i)}
                disabled={task.completed}
              >
                Start
              </IonButton>
              <IonText color="danger" className="ion-margin-start">
                {formatTime(task.time)}
              </IonText>
            </IonItem>
          ))}
        </IonList>

        <div className="ion-margin-top">
          <IonInput
            placeholder="Add custom task"
            value={newTask}
            onIonChange={e => setNewTask(e.detail.value!)}
          />
          <IonButton expand="block" onClick={addTask} className="ion-margin-top">
            Add Task
          </IonButton>
        </div>

        <IonText className="ion-margin-top">
          <p>{`Progress: ${pcTasks.filter(t => t.completed).length}/${pcTasks.length} tasks completed (${progress}%)`}</p>
        </IonText>

        <IonTextarea
          placeholder="Add your Username here"
          value={username}
          onIonChange={e => setUsername(e.detail.value!)}
        />

        <IonTextarea
          placeholder="Add notes here..."
          value={pcNotes}
          onIonChange={e => setPcNotes(e.detail.value!)}
        />

        <IonButton expand="block" color="medium" onClick={resetTasks} className="ion-margin-top">
          Reset Tasks & Notes
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PCAssembly;
