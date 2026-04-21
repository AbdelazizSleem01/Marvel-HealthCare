export interface Company {
  id: string;
  name: string;
  tagline: string;
  year: string;
  country: string;
  flag: string;
  description: string;
  color: string;
  icon: string;
}

export interface Project {
  _id?: string;
  title: string;
  category: string;
  description: string;
  type: "video" | "image" | "link" | "gallery";
  thumbnail?: string;
  media?: string[];
  link?: string;
  client?: string;
  year?: string;
  tags?: string[];
  featured?: boolean;
  createdAt?: Date;
}

export interface Product {
  _id?: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  color: string;
  icon?: string;
  link?: string;
  status: "live" | "beta" | "coming-soon";
}

export interface Testimonial {
  _id?: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  review: string;
  rating: number;
  country?: string;
}

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  company?: string;
  country?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt?: Date;
}

export interface PartnerLogo {
  _id?: string;
  name: string;
  logo: string;
  category: "pharma" | "vendor" | "society";
  website?: string;
}

export interface Accreditation {
  name: string;
  shortName: string;
  country: string;
  flag: string;
  description: string;
  color: string;
  logo?: string;
}

export interface TherapeuticArea {
  name: string;
  icon: string;
  color: string;
}

export interface Branch {
  country: string;
  city: string;
  flag: string;
  companyName: string;
  address?: string;
  phone?: string;
  established?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface SiteSettings {
  _id?: string;
  key: string;
  value: string | number | boolean | object;
}
