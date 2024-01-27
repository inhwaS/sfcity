import React, { useState } from 'react';
import './AnotherPage.css';

type Task = {
  id: number;
  text: string;
};

type TimeSlot = {
  time: string;
  tasks: Task[];
};

type DaySchedule = {
  day: string;
  date: string;
  slots: TimeSlot[];
};

const getFormattedDate = (offset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

const generateEmptySlots = (): TimeSlot[] => {
  return Array.from({ length: 24 }, (_, i) => ({ time: `${i}:00`, tasks: [] }));
};

const initialSchedule: DaySchedule[] = Array.from({ length: 3 }, (_, i) => ({
  day: getFormattedDate(i),
  date: getFormattedDate(i),
  slots: generateEmptySlots(),
}));

const AnotherPage: React.FC = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
  const [newTask, setNewTask] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>(initialSchedule[0].day);
  const [selectedTime, setSelectedTime] = useState<string>('0:00');

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task');
      return;
    }

    setSchedule(
      schedule.map(daySchedule => 
        daySchedule.day === selectedDay
          ? {
              ...daySchedule,
              slots: daySchedule.slots.map(slot =>
                slot.time === selectedTime
                  ? {
                      ...slot,
                      tasks: [...slot.tasks, { id: Date.now(), text: newTask }],
                    }
                  : slot
              ),
            }
          : daySchedule
      )
    );

    setNewTask('');
  };

  const handleSlotClick = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
  };

  return (
    <div className="App">
      <h1>Weekly Scheduler</h1>
      <div className="scheduler">
        <div className="time-column">
          {Array.from({ length: 24 }, (_, i) => i).map(hour => (
            <div key={hour} className="hour">
              {`${hour}:00`}
            </div>
          ))}
        </div>
        <div className="days-grid">
          {schedule.map(daySchedule => (
            <div key={daySchedule.day} className="day-column">
              <h3>{daySchedule.day}</h3>
              {daySchedule.slots.map(slot => (
                <div 
                  key={slot.time} 
                  className="time-slot" 
                  onClick={() => handleSlotClick(daySchedule.day, slot.time)}
                >
                  {slot.tasks.map(task => (
                    <div key={task.id}>{task.text}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnotherPage;
