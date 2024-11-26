export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
    github: string;
    details: {
      challenge: string;
      solution: string;
      impact: string;
    };
  }
  
  export interface Skill {
    category: string;
    icon: JSX.Element;
    description: string;
    technologies: {
      name: string;
      proficiency: number;
      logo: string;
      description: string;
    }[];
  }
  
  export interface PricingPlan {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }
  
  export interface ContactForm {
    name: string;
    email: string;
    message: string;
  }
  
  export interface MPesaPayment {
    phoneNumber: string;
    amount: number;
    reference: string;
  }