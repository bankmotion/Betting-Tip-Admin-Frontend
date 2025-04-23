import React, { useEffect, useRef, useState } from 'react';

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, '0')
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0')
);

function TimePicker({
  setSelectedHour,
  setSelectedMinute,
  selectedHour,
  selectedMinute
}: {
  setSelectedHour: (hour: string) => void;
  setSelectedMinute: (minute: string) => void;
  selectedHour: string;
  selectedMinute: string;
}) {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const scrollToCenter = (
    ref: React.RefObject<HTMLDivElement>,
    value: string
  ) => {
    if (ref.current) {
      const children = Array.from(ref.current.children) as HTMLDivElement[];
      const target = children.find((child) => child.dataset.value === value);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleHourClick = (value: string) => {
    setSelectedHour(value);
    scrollToCenter(hourRef, value);
  };

  const handleMinuteClick = (value: string) => {
    setSelectedMinute(value);
    scrollToCenter(minuteRef, value);
  };

  useEffect(() => {
    scrollToCenter(hourRef, selectedHour);
    scrollToCenter(minuteRef, selectedMinute);
  }, [selectedHour, selectedMinute]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      {/* Hour Picker */}
      <div
        ref={hourRef}
        style={{
          width: '80px',
          height: '150px',
          overflowY: 'scroll',
          textAlign: 'center',
          border: '1px solid lightgray',
          borderRadius: '8px'
        }}
      >
        {hours.map((hour) => (
          <div
            key={hour}
            data-value={hour}
            onClick={() => handleHourClick(hour)}
            style={{
              padding: '10px 0',
              cursor: 'pointer',
              fontWeight: hour === selectedHour ? 'bold' : 'normal',
              color: hour === selectedHour ? 'blue' : 'black'
            }}
          >
            {hour}
          </div>
        ))}
      </div>

      <span>:</span>

      {/* Minute Picker */}
      <div
        ref={minuteRef}
        style={{
          width: '80px',
          height: '150px',
          overflowY: 'scroll',
          textAlign: 'center',
          border: '1px solid lightgray',
          borderRadius: '8px'
        }}
      >
        {minutes.map((minute) => (
          <div
            key={minute}
            data-value={minute}
            onClick={() => handleMinuteClick(minute)}
            style={{
              padding: '10px 0',
              cursor: 'pointer',
              fontWeight: minute === selectedMinute ? 'bold' : 'normal',
              color: minute === selectedMinute ? 'blue' : 'black'
            }}
          >
            {minute}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimePicker;
