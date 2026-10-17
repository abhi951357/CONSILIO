import React from 'react';
import {
  Compass,
  TrendingUp,
  BarChart3,
  Users,
  Zap,
  Shield,
  ArrowRight,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Compass,
  TrendingUp,
  BarChart3,
  Users,
  Zap,
  Shield,
  ArrowRight,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className = '', size = 20 }: DynamicIconProps) {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
}

