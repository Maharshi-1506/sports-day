import { motion, useScroll, useTransform } from "framer-motion";
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
  Users,
  Zap,
  ArrowRight,
  Star
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// --- 📂 DATA ---
const EVENTS_DATA = [
  {
    id: 1,
    name: "Badminton",
    format: "Solo/Duo",
    venue: "E-Block Court",
    details: "Smash it! Bring racquets.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/072/504/732/small/badminton-game-ready-to-serve-shuttlecock-with-racket-on-court-photo.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeNctZ_ZqAG-l-ejAPrs7-lfouRdLBtIpebbvJxuIHI4JnKwg/viewform?usp=publish-editor",
    bg: "bg-funky-pink"
  },
  {
    id: 2,
    name: "Chess",
    format: "Solo",
    venue: "Sports Area",
    details: "Big brain energy only.",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeFO0QEgIwEoDN6OEzTXOIzyx_O_3QUUdldd04Na61AW5rMQQ/viewform?usp=publish-editor",
    bg: "bg-funky-cyan"
  },
  {
    id: 3,
    name: "Carrom",
    format: "Duo",
    venue: "Sports Area",
    details: "Strike and pocket!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrG2E5rCYGfK3WxEVf_E10XGc5ZkLZBEBTM3VjVNGy&s",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSexRZhlzzGBIMrEzT_jjZlzCbQJ68ItZzcpDKcySnW2GmgIDg/viewform?usp=publish-editor",
    bg: "bg-funky-purple text-white"
  },
  {
    id: 4,
    name: "Volleyball",
    format: "Team (4-6)",
    venue: "VB Ground",
    details: "Spike like you mean it.",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=800",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdsqH5S2e-7USyk4B8it7KjOxS169EwhIj_cP_Tlcwohl9jKQ/viewform?usp=dialog",
    bg: "bg-funky-yellow"
  },
  {
    id: 5,
    name: "Race (100m)",
    format: "Solo",
    venue: "GTU Ground",
    details: "Run fast. Very fast.",
    image: "https://media.istockphoto.com/id/1169738885/photo/athlete-woman-preparing-and-runs-hurdles-for-track-and-field.jpg?s=612x612&w=0&k=20&c=UlRMJZ7J5NGHpeYnyOr5VNhWgdgFTDzGGF7GRC8Maw0=",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSch2kvCrICo_jXHyyav2u88brutOGCEclB-4ZqIjpr7gRQkHg/viewform?usp=publish-editor",
    bg: "bg-funky-orange"
  },
  {
    id: 6,
    name: "Relay",
    format: "Team (4)",
    venue: "GTU Ground",
    details: "Don't drop the baton!",
    image: "https://t4.ftcdn.net/jpg/03/04/60/19/360_F_304601962_RkROHk9D5r6EDdVLO2NCh9zirmiVcyAu.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSch2kvCrICo_jXHyyav2u88brutOGCEclB-4ZqIjpr7gRQkHg/viewform?usp=publish-editor",
    bg: "bg-funky-lime"
  },
  {
    id: 7,
    name: "Cricket",
    format: "Team (11)",
    venue: "GTU Ground",
    details: "Howzat!!",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfw10A6QO8DDjoBYDRnSagTt6aK4YCZy-uPdEDJlut89O8jmA/viewform?usp=publish-editor",
    bg: "bg-white border-4 border-black"
  }
];

const PROTOCOL_DATA = [
  { id: "01", text: "Must carry valid College/School ID." },
  { id: "02", text: "Maximum 3 sports per participant." },
  { id: "03", text: "Reporting time: 30 minutes prior." },
  { id: "04", text: "Maintain highest sportsmanship." },
  { id: "05", text: "Referee's decision is final." },
  { id: "06", text: "Full team attendance mandatory." },
  { id: "07", text: "Exclusive to DS & CE Students." }
];

// --- 🧩 COMPONENTS ---

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
    <div className="flex gap-4 justify-center mt-12 flex-wrap">
      {Object.entries(timeLeft).map(([label, value]) => (
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          key={label}
          className="bg-white border-[3px] border-black p-4 rounded-xl min-w-[80px] shadow-brutal"
        >
          <div className="text-3xl font-black text-black font-cartoon">{Math.max(0, value)}</div>
          <div className="text-xs uppercase font-bold bg-funky-yellow px-2 py-1 border border-black rounded-full inline-block mt-2">{label}</div>
        </motion.div>
      ))}
    </div>
  );
};

const EventCard = ({ event, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, rotate: 2 }}
    className={`relative rounded-3xl overflow-hidden border-[3px] border-black shadow-brutal transition-all flex flex-col h-full bg-white`}
  >
    <div className="h-48 overflow-hidden relative border-b-[3px] border-black">
      <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
      <div className="absolute top-3 right-3 bg-white border-2 border-black px-3 py-1 rounded-full font-bold text-xs shadow-brutal">
        {event.format}
      </div>
    </div>

    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-2xl font-black font-cartoon uppercase mb-2 flex items-center gap-2">
        {event.name}
        {index % 2 === 0 && <Star className="fill-funky-yellow text-black" size={24} />}
      </h3>

      <div className="bg-funky-bg border-2 border-black p-2 rounded-lg text-sm font-bold mb-4 flex items-center gap-2 w-fit">
        <MapPin size={16} /> {event.venue}
      </div>

      <p className="text-black font-medium mb-6 leading-tigher">
        {event.details}
      </p>

      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto w-full py-4 ${event.bg} border-[3px] border-black text-black rounded-xl font-black uppercase tracking-widest text-sm hover:shadow-brutal-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2`}
      >
        Play This! <Zap size={18} className="fill-black" />
      </a>
    </div>
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-funky-bg text-funky-text font-cartoon selection:bg-funky-pink selection:text-white overflow-x-hidden">

      {/* 🔮 SCROLL BAR */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-[100] border-b-2 border-white" />

      {/* 🧭 NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 py-4 px-6 bg-funky-bg/95 backdrop-blur border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-funky-pink border-2 border-black p-2 rounded-lg shadow-brutal">
              <Flame className="text-white fill-white" size={24} />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase font-heading text-outline-black drop-shadow-[2px_2px_0_#000] text-white">
              BattleBuzz
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 text-sm font-bold uppercase tracking-widest">
            {['About', 'Events', 'Rules', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 hover:bg-funky-cyan hover:shadow-brutal border-2 border-transparent hover:border-black rounded-lg transition-all">
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden bg-white text-black p-2 rounded-lg border-2 border-black shadow-brutal active:translate-y-1 active:shadow-none transition-all"
          >
            {isMobileMenuOpen ? <ExternalLink className="rotate-180" size={24} /> : <div className="space-y-1"><div className="w-6 h-0.5 bg-black"></div><div className="w-6 h-0.5 bg-black"></div><div className="w-6 h-0.5 bg-black"></div></div>}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-funky-bg border-b-[3px] border-black border-t-[3px] p-6 shadow-brutal-lg"
          >
            <div className="flex flex-col gap-4 text-center font-black uppercase text-xl">
              {['About', 'Events', 'Rules', 'Contact'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 border-2 border-black rounded-xl hover:bg-funky-yellow shadow-brutal transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 bg-dots [background-size:20px_20px]">
        {/* Floating Stickers */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-32 left-10 md:left-32 bg-funky-yellow border-[3px] border-black px-6 py-3 rounded-full shadow-brutal-lg rotate-[-12deg] z-10 hidden md:block"
        >
          <span className="font-black text-xl">WOW!</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-32 right-10 md:right-32 bg-funky-cyan border-[3px] border-black px-6 py-6 rounded-full shadow-brutal-lg z-10 hidden md:block"
        >
          <Trophy size={48} className="fill-white" />
        </motion.div>

        <div className="text-center max-w-5xl relative z-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block bg-white border-[3px] border-black px-6 py-2 rounded-xl font-black uppercase tracking-widest mb-8 shadow-brutal -rotate-3"
          >
            VGEC Sports Fest 2026
          </motion.div>

          <h1 className="text-5xl md:text-[8rem] font-black leading-[0.9] text-funky-pink drop-shadow-[3px_3px_0_#000] md:drop-shadow-[4px_4px_0_#000] font-heading mb-6 -skew-x-6">
            BATTLE<br />
            <span className="text-funky-yellow text-outline-black">BUZZ</span>
          </h1>

          <p className="text-2xl font-bold bg-white inline-block px-4 py-2 border-2 border-black shadow-brutal rotate-1">
            Data Science <span className="text-funky-pink">VS</span> Computer Engineering
          </p>

          <Countdown />

          <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center">
            <a href="#events" className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase text-xl border-[3px] border-black hover:bg-funky-pink hover:text-black transition-colors shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              Join The Chaos
            </a>
          </div>
        </div>
      </section>

      {/* 🎮 EVENTS */}
      <section id="events" className="py-24 px-6 bg-funky-purple border-y-[3px] border-black relative">
        <div className="absolute inset-0 bg-stripes opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-[4px_4px_0_#000] uppercase font-cartoon transform -rotate-2">
              Game Time!
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS_DATA.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ⚠️ RULES (Checklist Style) */}
      <section id="rules" className="py-24 bg-funky-yellow relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border-[4px] border-black p-8 md:p-12 rounded-3xl shadow-brutal-lg relative">
            {/* Spiral Binding Effect */}
            <div className="absolute top-0 left-8 w-4 h-8 bg-black rounded-full -mt-4"></div>
            <div className="absolute top-0 left-20 w-4 h-8 bg-black rounded-full -mt-4"></div>
            <div className="absolute top-0 right-8 w-4 h-8 bg-black rounded-full -mt-4"></div>

            <h2 className="text-4xl font-black text-center mb-10 underline decoration-wavy decoration-funky-pink decoration-4">
              The Rule Book
            </h2>

            <ul className="space-y-4">
              {PROTOCOL_DATA.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-4 text-xl font-bold border-b-2 border-dashed border-gray-300 pb-3">
                  <span className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 text-sm">
                    {idx + 1}
                  </span>
                  {rule.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center rotate-2">
              <span className="bg-funky-pink text-white px-4 py-2 font-black border-2 border-black shadow-brutal inline-block transform rotate-1">
                IMPORTANT!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 📡 FOOTER */}
      <footer id="contact" className="py-20 px-6 bg-funky-bg border-t-[4px] border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center md:items-start relative z-10">

          {/* LEFT: INFO & VENUE */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start md:mr-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Flame className="text-funky-orange fill-funky-orange animate-pulse" size={40} />
                <h2 className="text-4xl font-black italic uppercase font-heading text-outline-black drop-shadow-[2px_2px_0_#000] text-black">
                  BATTLE BUZZ
                </h2>
              </div>

              <p className="text-lg font-bold text-gray-700 leading-relaxed mb-10 max-w-md">
                Organized by <span className="bg-funky-cyan px-1 border-2 border-black rounded shadow-[2px_2px_0_#000]">Computer Science Engineering (Data Science)</span> and <span className="bg-funky-pink px-1 border-2 border-black rounded shadow-[2px_2px_0_#000]">Computer Engineering Department</span>.
              </p>

              <div className="space-y-4">
                <h3 className="font-black uppercase tracking-widest text-sm border-b-2 border-dashed border-black pb-2 inline-block">Venue Details</h3>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="flex items-center gap-3 group hover:translate-x-2 transition-transform cursor-pointer"
                >
                  <div className="bg-funky-purple text-white p-2 rounded-lg border-2 border-black group-hover:rotate-12 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <span className="font-bold text-lg decoration-wavy group-hover:underline">VGEC, Ahmedabad</span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="bg-funky-yellow text-black p-2 rounded-lg border-2 border-black">
                    <Sparkles size={20} />
                  </div>
                  <span className="font-bold text-lg">E-Block & GTU Ground</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: CONTACT PILL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: 2 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 1, scale: 1.02 }}
            className="flex-1 w-full md:w-auto"
          >
            <div className="bg-[#f0e6d2] border-[4px] border-black rounded-[3rem] p-8 md:p-12 shadow-brutal-lg relative isolate">
              {/* Decoration */}
              <div className="absolute -top-6 -right-6 bg-funky-pink text-white font-black px-6 py-2 rounded-full border-[3px] border-black shadow-brutal transform rotate-12 z-20">
                GET HELP!
              </div>

              <h3 className="font-black text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 border-l-4 border-funky-orange pl-3">
                Query / Support
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact 1 */}
                <div className="flex items-start gap-4 group">
                  <motion.div
                    whileHover={{ rotate: [0, -20, 20, 0] }}
                    className="bg-white p-4 rounded-2xl border-[3px] border-black shadow-brutal text-funky-orange group-hover:bg-funky-orange group-hover:text-white transition-colors"
                  >
                    <Phone size={32} />
                  </motion.div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Contact Head</p>
                    <p className="text-2xl font-black font-cartoon leading-none my-1">Harsh Patel</p>
                    <p className="text-lg font-bold font-mono text-funky-orange group-hover:underline decoration-wavy">8799115435</p>
                  </div>
                </div>

                {/* Contact 2 */}
                <div className="flex items-start gap-4 group">
                  <motion.div
                    whileHover={{ rotate: [0, -20, 20, 0] }}
                    className="bg-white p-4 rounded-2xl border-[3px] border-black shadow-brutal text-funky-orange group-hover:bg-funky-orange group-hover:text-white transition-colors"
                  >
                    <Phone size={32} />
                  </motion.div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Contact Co-Head</p>
                    <p className="text-2xl font-black font-cartoon leading-none my-1">Deep Chaudhary</p>
                    <p className="text-lg font-bold font-mono text-funky-orange group-hover:underline decoration-wavy">9998884258</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        <div className="mt-20 pt-8 border-t-[3px] border-black border-dashed flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black uppercase tracking-[0.2em] opacity-60">
          <p>© 2026 Battle Buzz • Data Science & CE • VGEC</p>
          <p>Made with ⚡ and ☕</p>
        </div>
      </footer>
    </div>
  );
}
