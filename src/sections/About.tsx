import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Lightbulb, Rocket, Heart, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'iOS Development', level: 95 },
  { name: 'Backend Development', level: 90 },
  { name: 'AI Integration & Workflows', level: 88 },
  { name: 'Homepage & Web Development', level: 85 },
  { name: 'UI/UX Design', level: 80 },
{ name: 'Shop integration', level: 75 }
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge technology and creative solutions.'
  },
  {
    icon: Heart,
    title: 'User-Centric',
    description: 'Every app is crafted with the user experience as the top priority.'
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Lightning-fast, smooth, and optimized for all devices.'
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Maintainable, scalable, and well-architected codebases.'
  },
  {
    icon: Zap,
    title: 'Rapid Iteration',
    description: 'Quick prototyping and continuous improvement based on feedback.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Apps designed for international audiences with localization in mind.'
  }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skill bars animation
      gsap.fromTo('.skill-bar',
        { width: 0 },
        {
          width: (_, el) => el.dataset.level + '%',
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-6">
            The <span className="gradient-text">Developer</span>
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-md mx-auto" />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-foreground leading-relaxed mb-6">
                Hi, I&apos;m the creator behind <span className="text-primary font-medium">AWEN28</span>. 
                I&apos;m an independent developer passionate about building digital experiences 
                that make a real difference in people&apos;s lives.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With 10+ years of experience in development, I&apos;ve had the privilege 
                of creating apps and websites across various domains—from wellness and spirituality to 
                productivity and lifestyle. Each project is a labor of love, combining 
                technical excellence with thoughtful design.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                My philosophy is simple: great apps and websites should feel intuitive, look beautiful, 
                and solve real problems. I believe in the power of technology to enhance 
                human experiences, not complicate them.
              </p>
            </div>

            {/* Skills */}
            <div className="skills-container">
              <h3 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="skill-bar h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        data-level={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-secondary/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <blockquote className="relative">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-primary/20 font-serif">
              &ldquo;
            </span>
            <p className="text-2xl md:text-3xl font-light text-foreground italic max-w-3xl mx-auto relative z-10">
              Technology is best when it brings people together and 
              <span className="text-primary"> empowers them</span> to live better lives.
            </p>
            <footer className="mt-6 text-muted-foreground">
              — My development philosophy
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
