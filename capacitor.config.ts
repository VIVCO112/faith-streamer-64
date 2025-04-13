
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.257e189dd10e4734a3b0dfed6384ef88',
  appName: 'faith-streamer-64',
  webDir: 'dist',
  server: {
    url: 'https://257e189d-d10e-4734-a3b0-dfed6384ef88.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
    },
  },
};

export default config;
