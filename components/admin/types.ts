export type Lead = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  country?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

export const statusStyles: Record<string, string> = {
  new: "bg-primary-500/20 text-primary-400 border-primary-500/40",
  contacted: "bg-amber-500/20 text-amber-400 border-amber-500/40",
  closed: "bg-secondary-500/20 text-secondary-400 border-secondary-500/40",
};
