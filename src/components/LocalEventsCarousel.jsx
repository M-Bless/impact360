import React, { useState, useEffect } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();
const defaultEvents = [
  {
    id: 1,
    title: "Nakuru Builders Meetup",
    location: "Nakuru",
    displayDate: "6th June",
    date: new Date(`${currentYear}-06-06T10:00:00Z`).toISOString(),
    image: "/events/Nakuru.jpg",
    description: "Hands-on session: Pitching, fundraising, product thinking — we pick a topic and go deep."
  },
  {
    id: 2,
    title: "Nairobi Founder Mixer",
    location: "Nairobi",
    displayDate: "23rd June",
    date: new Date(`${currentYear}-06-23T10:00:00Z`).toISOString(),
    image: "/events/Nairobi.jpg",
    description: "A casual evening of drinks, networking, and raw founder stories."
  }
];

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex space-x-2 md:space-x-4 text-white font-mono mt-4">
      {[
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HRS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEC', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-lg p-2 min-w-[50px] md:min-w-[60px] border border-white/20 shadow-xl">
          <span className="text-xl md:text-2xl font-bold leading-none">{String(item.value).padStart(2, '0')}</span>
          <span className="text-[9px] md:text-[10px] mt-1 text-white/70 tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const LocalEventsCarousel = ({ events = defaultEvents, darkMode = true }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="relative w-full py-16 md:py-20 overflow-hidden rounded-3xl mb-20 bg-black/90">
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-full max-w-[450px] transform-gpu group"
          >
            <div className={`
              relative h-[500px] w-full rounded-2xl overflow-hidden
              border border-white/10 hover:border-[#306CEC]/50 hover:shadow-[0_0_50px_rgba(48,108,236,0.3)]
              bg-black/40 backdrop-blur-xl flex flex-col
              transition-all duration-500
            `}>
              {/* Card Image */}
              <div className="relative h-[45%] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                  <div className="text-center flex flex-col items-center">
                    <Link to="/subscription" className="px-6 py-2 bg-[#306CEC] text-white rounded-lg font-semibold hover:bg-[#4A80FF] transition-colors duration-300">
                      Get Ticket
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="relative h-[55%] p-6 flex flex-col justify-between z-20 bg-gradient-to-b from-transparent to-black/80 -mt-10 pt-12">
                <div>
                  <h3 
                    className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight drop-shadow-md"
                    style={{ fontFamily: "'League Spartan', sans-serif" }}
                  >
                    {event.title}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm mb-1">
                    <Calendar className="w-4 h-4 mr-1 text-[#306CEC]" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.displayDate || new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-white/80 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-[#306CEC]" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.location}</span>
                  </div>
                  
                  <p 
                    className="text-white/60 text-sm line-clamp-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {event.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/10">
                  <CountdownTimer targetDate={event.date} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalEventsCarousel;
