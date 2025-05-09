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
  IonInput,
  IonText
} from '@ionic/react';

interface Task {
  name: string;
  section?: string;
  completed: boolean;
  time: number;
  timerId?: number | null;
  completedAt?: string;
}

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const PCAssembly: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newSection, setNewSection] = useState('');
  const [username, setUsername] = useState('');
  const [section, setSection] = useState('');
  const [instructor, setInstructor] = useState('');

  const isUserInfoComplete = username && section && instructor;

  const defaultTasks = [
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
    setTasks(defaultTasks);
  }, []);

  const toggleTask = (index: number) => {
    if (!isUserInfoComplete) return;

    const updated = [...tasks];
    const task = updated[index];

    if (!task.completed) {
      task.completed = true;
      task.completedAt = new Date().toLocaleString();
      if (task.timerId !== null) clearInterval(task.timerId);
      task.timerId = null;
    } else {
      task.completed = false;
      task.time = 0;
      task.completedAt = undefined;
    }

    setTasks(updated);
  };

  const startTimer = (index: number) => {
    if (!isUserInfoComplete) return;

    const updated = [...tasks];
    const task = updated[index];

    if (task.completed) return;
    if (task.timerId !== null) clearInterval(task.timerId);

    const intervalId = setInterval(() => {
      setTasks(prev => {
        const update = [...prev];
        update[index].time += 1;
        return update;
      });
    }, 1000);

    task.timerId = intervalId as unknown as number;
    setTasks(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { name: newTask, section: newSection, completed: false, time: 0 }]);
    setNewTask('');
    setNewSection('');
  };

  const resetAll = () => {
    setUsername('');
    setSection('');
    setInstructor('');
    setTasks(defaultTasks);
  };

  const allCompleted = tasks.every(t => t.completed);
  const totalConsumed = tasks.reduce((sum, task) => sum + task.time, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PC Assembly Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Required User Info */}
        <IonInput
          placeholder="Name (required)"
          value={username}
          onIonChange={e => setUsername(e.detail.value!)}
        />
        <IonInput
          placeholder="Section (required)"
          value={section}
          onIonChange={e => setSection(e.detail.value!)}
        />
        <IonInput
          placeholder="Instructor (required)"
          value={instructor}
          onIonChange={e => setInstructor(e.detail.value!)}
        />

        {/* Task List */}
        <IonList>
          {tasks.map((task, i) => (
            <IonItem key={i} className={task.completed ? 'ion-text-decoration-line-through' : ''}>
              <IonCheckbox
                checked={task.completed}
                onIonChange={() => toggleTask(i)}
                disabled={!isUserInfoComplete || task.completed}
              />
              <IonLabel className="ion-margin-start">{task.name}</IonLabel>
              <IonButton
                size="small"
                onClick={() => startTimer(i)}
                disabled={!isUserInfoComplete || task.completed}
              >
                Start
              </IonButton>
              <IonText className="ion-margin-start" color="danger">
                {formatTime(task.time)}
              </IonText>
            </IonItem>
          ))}
        </IonList>

        {/* Add Task */}
        <IonInput
          placeholder="New Task Name"
          value={newTask}
          onIonChange={e => setNewTask(e.detail.value!)}
        />
     


        {/* Reset */}
        <IonButton expand="block" color="medium" onClick={resetAll} className="ion-margin-top">
          Reset All
        </IonButton>

        {/* Report */}
        {allCompleted && (
          <IonText color="success" className="ion-margin-top">
            <h2>📋 Task Completion Report</h2>
            <p><strong>Name:</strong> {username}</p>
            <p><strong>Section:</strong> {section}</p>
            <p><strong>Instructor:</strong> {instructor}</p>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  ✅ {task.name} - {formatTime(task.time)} (Completed at: {task.completedAt})
                </li>
              ))}
            </ul>
            <p><strong>Total Time Consumed:</strong> {formatTime(totalConsumed)}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PCAssembly;
