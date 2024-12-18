import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

type NotificationType = {
  message: string;
  type: 'success' | 'error' | 'warning';
};

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');

  // Rate limiting logic
  const [emailsSentThisHour, setEmailsSentThisHour] = useState<number>(0);
  const maxEmailsPerHour = Number(import.meta.env.VITE_MAX_EMAILS_PER_HOUR) || 5;

  // Notification state
  const [notification, setNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    const lastEmailTime = localStorage.getItem('lastEmailTime');
    const emailCount = localStorage.getItem('emailCount');

    if (lastEmailTime) {
      const hourAgo = new Date().getTime() - 60 * 60 * 1000;
      if (Number(lastEmailTime) < hourAgo) {
        localStorage.setItem('emailCount', '0');
        setEmailsSentThisHour(0);
      } else {
        setEmailsSentThisHour(Number(emailCount || 0));
      }
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const stateKey = name === 'user_name' ? 'name' : 
                     name === 'user_email' ? 'email' : 'message';
    
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailsSentThisHour >= maxEmailsPerHour) {
      setNotification({
        message: 'Too many messages sent. Please try again later.',
        type: 'warning'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://contact-server-jet.vercel.app/api/contact', formData);

      if (response.status === 200) {
        const newCount = emailsSentThisHour + 1;
        localStorage.setItem('emailCount', String(newCount));
        localStorage.setItem('lastEmailTime', String(new Date().getTime()));
        setEmailsSentThisHour(newCount);

        setFormData({ name: '', email: '', message: '' });
        setNotification({
          message: 'Message sent successfully! I\'ll get back to you soon.',
          type: 'success'
        });
      } else {
        setNotification({
          message: 'Oops! Something went wrong. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Email send error:', error);
      setNotification({
        message: 'Oops! Something went wrong. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {notification && (
        <div
          className={`
            fixed top-0 left-1/2 transform -translate-x-1/2 z-50
            ${notification.type === 'success' ? 'bg-green-500' : 
              notification.type === 'error' ? 'bg-red-500' : 
              'bg-amber-500'
            }
            text-white px-6 py-3 rounded-b-lg shadow-lg
            animate-slide-down
          `}
        >
          <div className="flex items-center space-x-2">
            {notification.type === 'success' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {notification.type === 'error' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {notification.type === 'warning' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="bg-gray-50  py-16 px-4 sm:px-6 lg:px-8" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
                Let's Connect
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
              </h2>
              <p className="text-lg text-gray-600">Have a project in mind? I'd love to hear about it.</p>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="peer w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border-2 border-gray-200 
                    focus:border-blue-500 focus:outline-none transition-all duration-300
                    placeholder-transparent"
                    placeholder="John Doe"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 
                    transition-all duration-300 transform origin-[0]"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="peer w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border-2 border-gray-200 
                    focus:border-blue-500 focus:outline-none transition-all duration-300
                    placeholder-transparent"
                    placeholder="email@example.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 
                    transition-all duration-300 transform origin-[0]"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="peer w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border-2 border-gray-200 
                  focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none
                  placeholder-transparent"
                  placeholder="Tell me about your project..."
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 
                  transition-all duration-300 transform origin-[0]"
                >
                  Your Message
                </label>
              </div>

              <div className="space-y-4">
                {emailsSentThisHour >= maxEmailsPerHour && (
                  <div className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50/50 
                    backdrop-blur-sm p-4 rounded-lg border border-amber-200">
                    <AlertCircle className="w-5 h-5" />
                    <span>Email limit reached. Please try again in an hour.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || emailsSentThisHour >= maxEmailsPerHour}
                  className={`
                    group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 
                    px-8 py-4 text-white transition-all duration-300
                    ${isSubmitting || emailsSentThisHour >= maxEmailsPerHour 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:-translate-y-1'}
                  `}
                >
                  <div className="relative flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 
                    transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 