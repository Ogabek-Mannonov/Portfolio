import { motion } from 'framer-motion';
import { Send, Mail, Code2, Briefcase } from 'lucide-react';

export default function Contact() {
  const contactLinks = [
    {
      name: "Telegram",
      value: "@ogabekdev",
      link: "https://t.me/ogabekdev",
      icon: <Send size={24} className="text-blue-400" />
    },
    {
      name: "Email",
      value: "hello@ogabek.dev",
      link: "mailto:hello@ogabek.dev",
      icon: <Mail size={24} className="text-pink-400" />
    },
    {
      name: "Upwork",
      value: "Hire Me",
      link: "#",
      icon: <Briefcase size={24} className="text-green-400" />
    },
    {
      name: "GitHub",
      value: "github.com/ogabekdev",
      link: "https://github.com/ogabekdev",
      icon: <Code2 size={24} className="text-slate-300" />
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto glass p-10 md:p-16 rounded-3xl border border-white/10 text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Ready to bring your next big idea to life? I'm currently available for freelance projects and full-time opportunities.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {contactLinks.map((contact, idx) => (
              <motion.a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center p-6 glass rounded-2xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="mb-4 bg-slate-800 p-4 rounded-full border border-white/5">
                  {contact.icon}
                </div>
                <h4 className="text-slate-300 font-medium mb-1">{contact.name}</h4>
                <span className="text-sm text-slate-500">{contact.value}</span>
              </motion.a>
            ))}
          </div>

          <a 
            href="https://t.me/ogabekdev"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105"
          >
            <Send size={20} />
            Message me on Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
