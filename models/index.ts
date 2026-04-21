import mongoose, { Schema, model, models } from "mongoose";

// Lead model
const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: String,
    country: String,
    service: String,
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

// Project model
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    type: { type: String, enum: ["video", "image", "link", "gallery"], default: "image" },
    thumbnail: String,
    media: [String],
    link: String,
    client: String,
    year: String,
    tags: [String],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Testimonial model
const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    title: String,
    company: String,
    avatar: String,
    review: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    country: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Product model
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    tagline: String,
    description: String,
    features: [String],
    color: String,
    icon: String,
    link: String,
    status: { type: String, enum: ["live", "beta", "coming-soon"], default: "live" },
  },
  { timestamps: true }
);

// PartnerLogo model
const PartnerLogoSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: String,
    category: { type: String, enum: ["pharma", "vendor", "society"], required: true },
    website: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Settings model
const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: Schema.Types.Mixed,
  },
  { timestamps: true }
);

// User (admin) model
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model("Lead", LeadSchema);
export const Project = models.Project || model("Project", ProjectSchema);
export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export const Product = models.Product || model("Product", ProductSchema);
export const PartnerLogo = models.PartnerLogo || model("PartnerLogo", PartnerLogoSchema);
export const Settings = models.Settings || model("Settings", SettingsSchema);
export const User = models.User || model("User", UserSchema);
