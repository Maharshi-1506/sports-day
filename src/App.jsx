import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Calendar,
  Clock,
  ExternalLink,
  Flame,
  MapPin,
  Medal,
  Phone,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// --- 📂 DATA (STRICTLY FROM BattleBuzz 2026.pdf) ---
const EVENTS_DATA = [
  {
    id: 1,
    name: "Badminton",
    format: "Solo, Duo (a girl and a boy)",
    venue: "Badminton Court, E-Block",
    details: "One should bring their own raquets.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/072/504/732/small/badminton-game-ready-to-serve-shuttlecock-with-racket-on-court-photo.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeNctZ_ZqAG-l-ejAPrs7-lfouRdLBtIpebbvJxuIHI4JnKwg/viewform?usp=publish-editor",
  },
  {
    id: 2,
    name: "Chess",
    format: "Solo",
    venue: "Sports Area, E-Block",
    details: "Mental strategy and focused rapid play.",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeFO0QEgIwEoDN6OEzTXOIzyx_O_3QUUdldd04Na61AW5rMQQ/viewform?usp=publish-editor",
  },
  {
    id: 3,
    name: "Carrom",
    format: "Team of two",
    venue: "Sports Area, E-Block",
    details: "Classic indoor precision sport.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrG2E5rCYGfK3WxEVf_E10XGc5ZkLZBEBTM3VjVNGy&s",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSexRZhlzzGBIMrEzT_jjZlzCbQJ68ItZzcpDKcySnW2GmgIDg/viewform?usp=publish-editor",
  },
  {
    id: 4,
    name: "Volleyball",
    format: "Team (Max 6, Min 4 players)",
    venue: "Volleyball Ground near E-Block",
    details: "Team coordination and net dominance.",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=800",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdsqH5S2e-7USyk4B8it7KjOxS169EwhIj_cP_Tlcwohl9jKQ/viewform?usp=dialog",
  },
  {
    id: 5,
    name: "Race (100m)",
    format: "Individual",
    venue: "GTU Ground",
    details: "Explosive speed test.",
    image: "https://media.istockphoto.com/id/1169738885/photo/athlete-woman-preparing-and-runs-hurdles-for-track-and-field.jpg?s=612x612&w=0&k=20&c=UlRMJZ7J5NGHpeYnyOr5VNhWgdgFTDzGGF7GRC8Maw0=",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSch2kvCrICo_jXHyyav2u88brutOGCEclB-4ZqIjpr7gRQkHg/viewform?usp=publish-editor",
  },
  {
    id: 6,
    name: "Relay Race (400m)",
    format: "Team of 4 players (Mandatory)",
    venue: "GTU Ground",
    details: "Synchronization and baton passing.",
    image: "https://t4.ftcdn.net/jpg/03/04/60/19/360_F_304601962_RkROHk9D5r6EDdVLO2NCh9zirmiVcyAu.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSch2kvCrICo_jXHyyav2u88brutOGCEclB-4ZqIjpr7gRQkHg/viewform?usp=publish-editor",
  },
  {
    id: 7,
    name: "Cricket",
    format: "Team of 11 members (Compulsory)",
    venue: "GTU Ground",
    details: "The ultimate team sport battle.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfw10A6QO8DDjoBYDRnSagTt6aK4YCZy-uPdEDJlut89O8jmA/viewform?usp=publish-editor"
  }
];

const COMMON_RULES = [
  "Participants must carry a valid college/school ID.",
  "Each participant can register for a maximum of three sports.",
  "Reporting time is 30 minutes before the event.",
  "Unsportsmanlike behavior will lead to disqualification.",
  "The decision of referees and organizers will be final.",
  "Absence of any individual or team member will lead to disqualification.",
  "Strict adherence to eligibility (DS & CE students only)."
];

// --- 🧩 ANIMATED BACKGROUND ---
const FloatingIcon = ({ delay, x, y, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.05, 0.2, 0.05],
      y: [y, y - 60, y],
      x: [x, x + 30, x]
    }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none z-0 text-[#002b36]"
  >
    {children}
  </motion.div>
);

// --- 🧱 COMPONENTS ---

const Countdown = () => {
  const targetDate = useMemo(() => new Date("2026-02-11T09:00:00").getTime(), []);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = targetDate - new Date().getTime();
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 md:gap-4 justify-center mt-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="bg-[#eee8d5] border-2 border-[#b58900] p-2 md:p-3 rounded-xl min-w-[65px] md:min-w-[80px] shadow-lg">
          <div className="text-xl md:text-3xl font-black text-[#002b36] leading-none">{Math.max(0, value)}</div>
          <div className="text-[10px] uppercase tracking-widest text-[#cb4b16] font-bold mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
};

const EventCard = ({ event }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-[#eee8d5] rounded-[2rem] overflow-hidden shadow-xl border border-[#d3cbb7] group flex flex-col relative"
  >
    <div className="h-52 overflow-hidden relative">
      <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#002b36] to-transparent opacity-70" />
      <div className="absolute bottom-4 left-6">
        <h3 className="text-3xl font-black text-[#fdf6e3] italic uppercase tracking-tighter">{event.name}</h3>
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex items-center gap-2 text-[#cb4b16] font-black text-xs uppercase tracking-widest mb-3">
        <Users size={14} /> {event.format}
      </div>
      <div className="flex items-start gap-2 text-[#586e75] text-sm mb-4">
        <MapPin size={16} className="text-[#b58900] shrink-0" />
        <span className="font-bold">{event.venue}</span>
      </div>
      <p className="text-[#657b83] text-sm mb-6 leading-relaxed italic border-l-2 border-[#b58900] pl-3">
        "{event.details}"
      </p>
      <a
        href={event.link || "https://docs.google.com/forms/d/e/1FAIpQLSdYSYRGMQ_toniUfEQ1JEZidyaOSDyZtlU-L7ZA9CMHesTuQA/viewform?usp=dialog"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full py-4 bg-[#002b36] group-hover:bg-[#cb4b16] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
      >
        Register Now <ExternalLink size={14} />
      </a>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#fdf6e3] text-[#657b83] overflow-x-hidden selection:bg-[#cb4b16] selection:text-white">

      {/* 🧭 NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 py-4 px-6 bg-[#fdf6e3]/80 backdrop-blur-lg border-b border-[#eee8d5]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="text-[#cb4b16] fill-[#cb4b16]" size={32} />
            <span className="text-2xl font-black text-[#002b36] italic tracking-tighter uppercase">Battle Buzz <span className="text-[#b58900]">26</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-[#586e75]">
            <a href="#about" className="hover:text-[#cb4b16]">About</a>
            <a href="#events" className="hover:text-[#cb4b16]">Sports</a>
            <a href="#rules" className="hover:text-[#cb4b16]">Rules</a>
            <a href="#contact" className="hover:text-[#cb4b16]">Contact</a>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <FloatingIcon x={100} y={300} delay={0}><Trophy size={120} /></FloatingIcon>
        <FloatingIcon x={1100} y={200} delay={1}><Activity size={100} /></FloatingIcon>
        <FloatingIcon x={500} y={600} delay={2}><Users size={80} /></FloatingIcon>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-block bg-[#002b36] text-white px-6 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px]"
          >
            One-Day Sports Festival
          </motion.div>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-[11rem] font-black text-[#002b36] leading-[0.85] tracking-tighter uppercase italic mb-6"
          >
            BATTLE<br /><span className="text-[#cb4b16] not-italic">BUZZ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl text-[#586e75] font-bold max-w-3xl mx-auto leading-tight"
          >
            Where <span className="text-[#b58900]">Fun, Fitness, & Friendship</span> ignite for Data Science & CE Students.
          </motion.p>

          <Countdown />

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex items-center gap-3 bg-[#eee8d5] px-6 py-4 rounded-2xl border-2 border-[#d3cbb7]">
              <Calendar className="text-[#cb4b16]" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-[#b58900]">Save the Date</p>
                <p className="text-[#002b36] font-bold">11th Feb 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#eee8d5] px-6 py-4 rounded-2xl border-2 border-[#d3cbb7]">
              <Clock className="text-[#cb4b16]" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-[#b58900]">Event Timing</p>
                <p className="text-[#002b36] font-bold">9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 ABOUT & RECOGNITION */}
      <section id="about" className="py-24 bg-[#eee8d5] px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-black text-[#002b36] mb-8 uppercase italic leading-none">The <span className="text-[#cb4b16]">Break</span> You Need.</h2>
            <p className="text-lg text-[#657b83] leading-relaxed mb-8">
              Take a break from lectures! Connect with students from both branches through exciting games.
              It's not just about winning – it's about team spirit and making awesome memories!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-[#fdf6e3] p-5 rounded-3xl shadow-lg border-2 border-white">
                <div className="p-3 bg-[#b58900]/10 rounded-2xl text-[#b58900]"><Trophy /></div>
                <div>
                  <h4 className="font-black text-[#002b36] uppercase text-sm">GTU 100 Point Activity</h4>
                  <p className="text-xs">Earn official credits for participating and winning.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#fdf6e3] p-5 rounded-3xl shadow-lg border-2 border-white">
                <div className="p-3 bg-[#cb4b16]/10 rounded-2xl text-[#cb4b16]"><Medal /></div>
                <div>
                  <h4 className="font-black text-[#002b36] uppercase text-sm">E-Certificates</h4>
                  <p className="text-xs">Provided to all participants and winners.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?semt=ais_hybrid&w=740&q=80" className="rounded-[3rem] shadow-2xl rotate-3 h-64 object-cover" alt="sports" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc01FzUIdgtCtVr0k3ODm3aZGuRyVUjkmDMboYlfSmLg&s" className="rounded-[3rem] shadow-2xl -rotate-3 mt-12 h-64 object-cover" alt="sports" />
          </div>
        </div>
      </section>

      {/* ⚡ ACTIVITIES ROSTER */}
      <section id="events" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black text-[#002b36] uppercase italic tracking-tighter">The <span className="text-[#b58900]">Battle</span> List</h2>
          <div className="h-1.5 w-24 bg-[#cb4b16] mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS_DATA.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </section>

      {/* 📋 STRICT RULES */}
      <section id="rules" className="py-24 bg-[#002b36] text-[#839496] relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <AlertTriangle className="text-[#cb4b16]" size={40} />
            <h2 className="text-4xl font-black text-[#fdf6e3] uppercase italic">Strict Common Rules</h2>
          </div>
          <div className="grid gap-4">
            {COMMON_RULES.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-[#073642] p-5 rounded-2xl border-l-4 border-[#cb4b16] flex items-center gap-4 group hover:bg-[#0b4b5c] transition-colors"
              >
                <span className="text-[#cb4b16] font-black text-xl">0{idx + 1}</span>
                <p className="text-sm md:text-base font-bold text-[#fdf6e3]/80 group-hover:text-white">{rule}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏁 CONTACT & FOOTER */}
      <footer id="contact" className="py-20 px-6 bg-[#fdf6e3] border-t-2 border-[#eee8d5]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="text-[#cb4b16]" size={32} />
              <h2 className="text-3xl font-black text-[#002b36] uppercase italic">Battle Buzz</h2>
            </div>
            <p className="text-sm font-bold text-[#586e75] mb-8">
              Organized by Computer Science Engineering (Data Science) and Computer Engineering Department.
            </p>
          </div>

          <div className="bg-[#eee8d5] p-8 rounded-[2rem] border-2 border-[#d3cbb7] shadow-xl md:col-span-2">
            <h3 className="text-[#b58900] font-black uppercase text-xs tracking-widest mb-4">Query / Support</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#fdf6e3] rounded-2xl text-[#cb4b16] shadow-md"><Phone size={24} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-[#586e75]">Contact Head</p>
                  <p className="text-xl font-black text-[#002b36]">Harsh Patel</p>
                  <p className="text-lg font-mono font-bold text-[#cb4b16]">8799115435</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#fdf6e3] rounded-2xl text-[#cb4b16] shadow-md"><Phone size={24} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-[#586e75]">Contact Co-Head</p>
                  <p className="text-xl font-black text-[#002b36]">Deep Chaudhary</p>
                  <p className="text-lg font-mono font-bold text-[#cb4b16]">9998884258</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-[#002b36] font-black uppercase text-xs tracking-widest mb-4">Venue</h3>
            <div className="flex items-center gap-3 mb-2">
              <MapPin size={18} className="text-[#cb4b16]" />
              <span className="font-bold text-sm">VGEC, Ahmedabad</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[#cb4b16]" />
              <span className="font-bold text-sm">E-Block & GTU Ground</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-[#eee8d5] text-[10px] font-black uppercase tracking-[0.4em] text-[#93a1a1]">
          © 2026 Battle Buzz • Data Science & CE • VGEC
        </div>
      </footer>
    </div>
  );
}
