import { useEffect } from 'react';

export const useBotpress = () => {
  useEffect(() => {
    // Function to initialize Botpress
    const initBotpress = () => {
      if (window && (window as any).botpressWebChat) {
        const botpress = (window as any).botpressWebChat;
        
        botpress.init({
          botId: '7O97JNSK', 
          hostUrl: 'https://cdn.botpress.cloud/webchat/v2.2',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: '7O97JNSK',
          webhookId: '7O97JNSK',
          lazySocket: true,
          themeName: 'prism',
          frontendVersion: 'v2.2',
          showPoweredBy: false,
          theme: {
            style: {
              background: 'linear-gradient(to right, #2563eb, #10b981)',
              headerBackground: 'linear-gradient(to right, #2563eb, #10b981)',
              headerTextColor: '#ffffff',
              botMessageBackground: '#f3f4f6',
              botMessageColor: '#1f2937',
              userMessageBackground: 'linear-gradient(to right, #2563eb, #10b981)',
              userMessageColor: '#ffffff',
              buttonBackground: 'linear-gradient(to right, #2563eb, #10b981)',
              buttonHoverBackground: 'linear-gradient(to right, #1d4ed8, #059669)',
              buttonTextColor: '#ffffff'
            }
          },
          stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/d39e0a87-a694-4445-8547-b5ecf96b0e4e/v31918/style.css',
          useSessionStorage: true,
          enableTranscriptDownload: false,
          className: 'webchat-iframe',
          containerWidth: '100%',
          layoutWidth: '100%',
          hideWidget: false,
          showCloseButton: false,
          disableAnimations: false,
          closeOnEscape: false,
          showConversationsButton: true,
          enableReset: true,
          phoneNumber: '+254721990244',
          emailAddress: 'nickstech707@gmail.com',
          website: 'https://nickstech.vercel.app',
          prefix: 'bp-web-widget'
        });
      }
    };

    // Try to initialize immediately if scripts are already loaded
    initBotpress();

    // If not loaded, wait for scripts to load
    const checkInterval = setInterval(() => {
      if ((window as any).botpressWebChat) {
        initBotpress();
        clearInterval(checkInterval);
      }
    }, 500);

    // Cleanup
    return () => clearInterval(checkInterval);
  }, []);
}; 