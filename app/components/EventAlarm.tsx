'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './ClientLayout';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  _id: string;
  title: {
    en: string;
    fa: string;
  };
  message: {
    en: string;
    fa: string;
  };
  type: 'info' | 'warning' | 'success' | 'error';
  startDate: string;
  endDate: string;
  isActive: boolean;
  link?: string;
  icon?: string;
  priority: number;
  image?: string;
  clickCount?: number;
}

export default function EventAlarm() {
  const { language } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch active events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        
        // Filter to only show active events that are within date range
        const now = new Date();
        const activeEvents = data.filter((event: Event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          return event.isActive && startDate <= now && endDate >= now;
        });
        
        // Sort by priority (highest first)
        activeEvents.sort((a: Event, b: Event) => b.priority - a.priority);
        
        setEvents(activeEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Set up rotation interval when events are loaded
  useEffect(() => {
    if (events.length <= 1) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set up a new rotation interval
    intervalRef.current = setInterval(() => {
      if (!expanded) { // Only rotate when not expanded
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentEventIndex(prevIndex => (prevIndex + 1) % events.length);
          setIsAnimating(false);
        }, 300); // Matches animation duration
      }
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [events.length, expanded]);

  // Handle click on event link for analytics
  const handleEventClick = async (eventId: string) => {
    try {
      await fetch('/api/events/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      });
    } catch (error) {
      console.error('Error logging event click:', error);
    }
  };

  // If no active events, don't render anything
  if (events.length === 0) {
    return null;
  }

  const currentEvent = events[currentEventIndex];
  
  // Define the icon and background color based on event type
  const getEventStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          icon: <FaExclamationTriangle />,
          bgColor: 'bg-yellow-500',
          textColor: 'text-yellow-900'
        };
      case 'success':
        return {
          icon: <FaCheckCircle />,
          bgColor: 'bg-green-500',
          textColor: 'text-green-900'
        };
      case 'error':
        return {
          icon: <FaTimesCircle />,
          bgColor: 'bg-red-500',
          textColor: 'text-red-900'
        };
      case 'info':
      default:
        return {
          icon: <FaInfoCircle />,
          bgColor: 'bg-blue-500',
          textColor: 'text-blue-900'
        };
    }
  };

  const eventStyle = getEventStyle(currentEvent.type);

  return (
    <AnimatePresence>
      <motion.div 
        className={`${eventStyle.bgColor} text-white w-full shadow-md`}
        initial={{ height: 'auto' }}
        animate={{ 
          height: 'auto',
          transition: { duration: 0.3 }
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center justify-between py-3"
            initial={{ opacity: 1 }}
            animate={{ opacity: isAnimating ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center flex-1">
              {currentEvent.image ? (
                <div className="mr-3 h-8 w-8 relative">
                  <Image 
                    src={currentEvent.image} 
                    alt=""
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="mr-3 text-xl animate-pulse">
                  {eventStyle.icon}
                </div>
              )}
              <div className={`flex-1 ${expanded ? '' : 'truncate'}`}>
                <motion.h3 
                  className="font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentEvent.title[language]}
                </motion.h3>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-1 text-sm">
                      {currentEvent.message[language]}
                    </p>
                    
                    {currentEvent.image && !expanded && (
                      <div className="mt-2">
                        <Image 
                          src={currentEvent.image} 
                          alt=""
                          width={120}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              {events.length > 1 && (
                <motion.div 
                  className="mr-4 text-sm flex space-x-1"
                  whileHover={{ scale: 1.1 }}
                >
                  {events.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`w-2 h-2 rounded-full ${idx === currentEventIndex ? 'bg-white' : 'bg-white/50'}`}
                      onClick={() => setCurrentEventIndex(idx)}
                    />
                  ))}
                </motion.div>
              )}
              
              <motion.button 
                onClick={() => setExpanded(!expanded)}
                className="text-white mr-2 p-1 hover:bg-white/20 rounded"
                aria-label={expanded ? "Collapse" : "Expand"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {expanded ? <FaAngleUp /> : <FaAngleDown />}
              </motion.button>
              
              {currentEvent.link && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={currentEvent.link}
                    className="text-sm underline mx-4 hover:text-white/80"
                    onClick={() => handleEventClick(currentEvent._id)}
                  >
                    {language === 'en' ? 'Learn More' : 'بیشتر'}
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 