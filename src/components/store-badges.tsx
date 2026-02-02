import { motion } from 'framer-motion';
import { Apple, Smartphone } from 'lucide-react';

interface StoreBadgeProps {
  platform: 'ios' | 'android';
  url?: string;
  className?: string;
}

export const StoreBadge = ({ platform, url, className = '' }: StoreBadgeProps) => {
  const isIOS = platform === 'ios';

  const badge = (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {isIOS ? (
        <Apple className="w-4 h-4" />
      ) : (
        <Smartphone className="w-4 h-4" />
      )}
      <div className="flex flex-col items-start">
        <span className="text-[8px] text-muted-foreground leading-none">
          {isIOS ? 'Download on the' : 'GET IT ON'}
        </span>
        <span className="text-xs font-medium leading-none mt-0.5">
          {isIOS ? 'App Store' : 'Google Play'}
        </span>
      </div>
    </motion.div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {badge}
      </a>
    );
  }

  return badge;
};

interface StoreBadgesProps {
  platforms: Array<'ios' | 'android'>;
  iosUrl?: string;
  androidUrl?: string;
  className?: string;
}

export const StoreBadges = ({ platforms, iosUrl, androidUrl, className = '' }: StoreBadgesProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {platforms.includes('ios') && <StoreBadge platform="ios" url={iosUrl} />}
      {platforms.includes('android') && <StoreBadge platform="android" url={androidUrl} />}
    </div>
  );
};
