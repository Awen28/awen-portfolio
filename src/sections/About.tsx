import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Users, Award, Clock, Palette, Globe, ArrowRight } from 'lucide-react';

const stats = [
  { icon: Code2, value: '15', suffix: '+', label: 'Apps Shipped', color: '#B29F86' },
  { icon: Globe, value: '30', suffix: '+', label: 'Websites Built', color: '#E9CFB9' },
  { icon: Users, value: '50', suffix: '+', label: 'Happy Clients', color: '#525048' },
  { icon: Palette, value: '40', suffix: '+', label: 'Brand Identities', color: '#B29F86' },
  { icon: Award, value: '4', suffix: '', label: 'Years Experience', color: '#E9CFB9' },
  { icon: Clock, value: '100', suffix: '%', label: 'In-House Team', color: '#525048' },
];

const values = [
  {
    title: 'Craftsmanship',
    description: 'We treat every project as a work of art. No shortcuts, no templates—just meticulously crafted digital experiences.',
  },
  {
    title: 'Partnership',
    description: 'You are not just a client. We embed ourselves in your vision, working alongside you from concept to launch.',
  },
  {
    title: 'Innovation',
    description: 'We stay ahead of the curve so you do not have to. Cutting-edge technology meets timeless design.',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-8"
      style={{ background: '#FAF9F7' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-24 mb-32">
          {/* Left: Text */}
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#B29F86' }}
            >
              About Us
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl leading-tight mb-8"
              style={{ color: '#525048' }}
            >
              Not just developers.
              <br />
              <span 
                className="italic"
                style={{ color: '#B29F86' }}
              >
                Digital craftsmen.
              </span>
            </motion.h2>
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl leading-relaxed"
                style={{ color: 'rgba(82, 80, 72, 0.8)' }}
              >
                AWEN28 is a full-service digital studio based in Tirol, Austria. We specialize in 
                creating exceptional digital products—from award-winning iOS apps to conversion-focused 
                websites and comprehensive brand identities.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg leading-relaxed"
                style={{ color: 'rgba(82, 80, 72, 0.6)' }}
              >
                Our team combines technical excellence with artistic sensibility. We do not just write code; 
                we architect experiences. Every pixel, every line of code, every interaction is considered.
              </motion.p>
            </div>
          </div>

          {/* Right: Values */}
          <div className="space-y-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="p-8 rounded-3xl cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 249, 247, 0.6) 100%)',
                  border: '1px solid rgba(82, 80, 72, 0.08)',
                  boxShadow: '0 20px 40px rgba(82, 80, 72, 0.05)',
                }}
              >
                <div className="flex items-start gap-6">
                  <span 
                    className="text-5xl font-serif"
                    style={{ color: 'rgba(178, 159, 134, 0.3)' }}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 
                      className="font-serif text-2xl mb-3"
                      style={{ color: '#525048' }}
                    >
                      {value.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ color: 'rgba(82, 80, 72, 0.6)' }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-16 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 207, 185, 0.15) 0%, rgba(178, 159, 134, 0.1) 100%)',
            border: '1px solid rgba(82, 80, 72, 0.06)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}25 0%, ${stat.color}10 100%)`,
                    border: `1px solid ${stat.color}35`,
                  }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div 
                  className="font-serif text-4xl mb-1"
                  style={{ color: '#525048' }}
                >
                  {stat.value}{stat.suffix}
                </div>
                <div 
                  className="text-xs tracking-widest uppercase"
                  style={{ color: 'rgba(82, 80, 72, 0.5)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-24"
        >
          <p 
            className="text-xl mb-8"
            style={{ color: 'rgba(82, 80, 72, 0.6)' }}
          >
            Ready to build something extraordinary?
          </p>
          <motion.a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-wider uppercase"
            style={{
              background: '#525048',
              color: '#FAF9F7',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(82, 80, 72, 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
