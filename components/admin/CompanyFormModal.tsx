"use client";

import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  RiCloseLine,
  RiAddLine,
  RiDeleteBinLine,
  RiImageLine,
  RiBuildingLine,
  RiFileTextLine,
  RiGlobalLine,
  RiPaletteLine,
  RiCheckboxCircleLine,
  RiImageAddLine,
  RiStackLine,
  RiListOrdered,
  RiBriefcaseLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLink,
  RiUploadCloudLine,
  RiPictureInPictureLine,
  RiFlagLine,
  RiPhoneLine,
  RiMailLine,
  RiUserLine,
  RiTeamLine,
  RiBarChartLine,
  RiLinkedinLine,
  RiFacebookLine,
  RiYoutubeLine,
  RiTwitterLine,
  RiInstagramLine,
  RiTiktokLine,
  RiSnapchatLine,
  RiTelegramLine,
  RiSearchLine,
} from "react-icons/ri";
import { Company, FocusArea, GalleryImage } from "@/stores/adminStore";
import { IconPicker } from "./IconPicker";
import { iconComponents } from "./iconData";

// Country flags data
const COUNTRIES = [
  { code: "EG", name: "Egypt", flag: "EG" },
  { code: "AE", name: "United Arab Emirates", flag: "AE" },
  { code: "SA", name: "Saudi Arabia", flag: "SA" },
  { code: "QA", name: "Qatar", flag: "QA" },
  { code: "KW", name: "Kuwait", flag: "KW" },
  { code: "BH", name: "Bahrain", flag: "BH" },
  { code: "OM", name: "Oman", flag: "OM" },
  { code: "IQ", name: "Iraq", flag: "IQ" },
  { code: "JO", name: "Jordan", flag: "JO" },
  { code: "LB", name: "Lebanon", flag: "LB" },
  { code: "SY", name: "Syria", flag: "SY" },
  { code: "YE", name: "Yemen", flag: "YE" },
  { code: "LY", name: "Libya", flag: "LY" },
  { code: "TN", name: "Tunisia", flag: "TN" },
  { code: "DZ", name: "Algeria", flag: "DZ" },
  { code: "MA", name: "Morocco", flag: "MA" },
  { code: "SD", name: "Sudan", flag: "SD" },
  { code: "US", name: "United States", flag: "US" },
  { code: "GB", name: "United Kingdom", flag: "GB" },
  { code: "DE", name: "Germany", flag: "DE" },
  { code: "FR", name: "France", flag: "FR" },
  { code: "IT", name: "Italy", flag: "IT" },
  { code: "ES", name: "Spain", flag: "ES" },
  { code: "TR", name: "Turkey", flag: "TR" },
  { code: "CN", name: "China", flag: "CN" },
  { code: "JP", name: "Japan", flag: "JP" },
  { code: "IN", name: "India", flag: "IN" },
  { code: "RU", name: "Russia", flag: "RU" },
  { code: "BR", name: "Brazil", flag: "BR" },
  { code: "CA", name: "Canada", flag: "CA" },
  { code: "AU", name: "Australia", flag: "AU" },
  { code: "ZA", name: "South Africa", flag: "ZA" },
  { code: "NG", name: "Nigeria", flag: "NG" },
  { code: "KE", name: "Kenya", flag: "KE" },
  { code: "GH", name: "Ghana", flag: "GH" },
  { code: "ET", name: "Ethiopia", flag: "ET" },
  { code: "UG", name: "Uganda", flag: "UG" },
  { code: "TZ", name: "Tanzania", flag: "TZ" },
  { code: "ZW", name: "Zimbabwe", flag: "ZW" },
  { code: "SG", name: "Singapore", flag: "SG" },
  { code: "MY", name: "Malaysia", flag: "MY" },
  { code: "ID", name: "Indonesia", flag: "ID" },
  { code: "TH", name: "Thailand", flag: "TH" },
  { code: "VN", name: "Vietnam", flag: "VN" },
  { code: "PH", name: "Philippines", flag: "PH" },
  { code: "KR", name: "South Korea", flag: "KR" },
  { code: "MX", name: "Mexico", flag: "MX" },
  { code: "AR", name: "Argentina", flag: "AR" },
  { code: "CL", name: "Chile", flag: "CL" },
  { code: "CO", name: "Colombia", flag: "CO" },
  { code: "PE", name: "Peru", flag: "PE" },
  { code: "VE", name: "Venezuela", flag: "VE" },
  { code: "PK", name: "Pakistan", flag: "PK" },
  { code: "BD", name: "Bangladesh", flag: "BD" },
  { code: "LK", name: "Sri Lanka", flag: "LK" },
  { code: "NP", name: "Nepal", flag: "NP" },
  { code: "AF", name: "Afghanistan", flag: "AF" },
  { code: "IR", name: "Iran", flag: "IR" },
  { code: "IL", name: "Israel", flag: "IL" },
  { code: "PS", name: "Palestine", flag: "PS" },
  { code: "CY", name: "Cyprus", flag: "CY" },
  { code: "MT", name: "Malta", flag: "MT" },
  { code: "GR", name: "Greece", flag: "GR" },
  { code: "NL", name: "Netherlands", flag: "NL" },
  { code: "BE", name: "Belgium", flag: "BE" },
  { code: "CH", name: "Switzerland", flag: "CH" },
  { code: "AT", name: "Austria", flag: "AT" },
  { code: "SE", name: "Sweden", flag: "SE" },
  { code: "NO", name: "Norway", flag: "NO" },
  { code: "DK", name: "Denmark", flag: "DK" },
  { code: "FI", name: "Finland", flag: "FI" },
  { code: "PL", name: "Poland", flag: "PL" },
  { code: "CZ", name: "Czech Republic", flag: "CZ" },
  { code: "HU", name: "Hungary", flag: "HU" },
  { code: "RO", name: "Romania", flag: "RO" },
  { code: "BG", name: "Bulgaria", flag: "BG" },
  { code: "HR", name: "Croatia", flag: "HR" },
  { code: "SI", name: "Slovenia", flag: "SI" },
  { code: "SK", name: "Slovakia", flag: "SK" },
  { code: "LT", name: "Lithuania", flag: "LT" },
  { code: "LV", name: "Latvia", flag: "LV" },
  { code: "EE", name: "Estonia", flag: "EE" },
  { code: "UA", name: "Ukraine", flag: "UA" },
  { code: "BY", name: "Belarus", flag: "BY" },
  { code: "MD", name: "Moldova", flag: "MD" },
  { code: "GE", name: "Georgia", flag: "GE" },
  { code: "AM", name: "Armenia", flag: "AM" },
  { code: "AZ", name: "Azerbaijan", flag: "AZ" },
  { code: "KZ", name: "Kazakhstan", flag: "KZ" },
  { code: "UZ", name: "Uzbekistan", flag: "UZ" },
  { code: "TM", name: "Turkmenistan", flag: "TM" },
  { code: "KG", name: "Kyrgyzstan", flag: "KG" },
  { code: "TJ", name: "Tajikistan", flag: "TJ" },
  { code: "MN", name: "Mongolia", flag: "MN" },
  { code: "KP", name: "North Korea", flag: "KP" },
  { code: "LA", name: "Laos", flag: "LA" },
  { code: "KH", name: "Cambodia", flag: "KH" },
  { code: "MM", name: "Myanmar", flag: "MM" },
  { code: "BN", name: "Brunei", flag: "BN" },
  { code: "BT", name: "Bhutan", flag: "BT" },
  { code: "MV", name: "Maldives", flag: "MV" },
  { code: "FJ", name: "Fiji", flag: "FJ" },
  { code: "PG", name: "Papua New Guinea", flag: "PG" },
  { code: "NZ", name: "New Zealand", flag: "NZ" },
  { code: "WS", name: "Samoa", flag: "WS" },
  { code: "TO", name: "Tonga", flag: "TO" },
  { code: "VU", name: "Vanuatu", flag: "VU" },
  { code: "SB", name: "Solomon Islands", flag: "SB" },
  { code: "KI", name: "Kiribati", flag: "KI" },
  { code: "NR", name: "Nauru", flag: "NR" },
  { code: "TV", name: "Tuvalu", flag: "TV" },
  { code: "PW", name: "Palau", flag: "PW" },
  { code: "FM", name: "Micronesia", flag: "FM" },
  { code: "MH", code3: "MHL", name: "Marshall Islands", flag: "MH" },
  { code: "NR", name: "Nauru", flag: "NR" },
  { code: "CU", name: "Cuba", flag: "CU" },
  { code: "DO", name: "Dominican Republic", flag: "DO" },
  { code: "HT", name: "Haiti", flag: "HT" },
  { code: "JM", name: "Jamaica", flag: "JM" },
  { code: "TT", name: "Trinidad and Tobago", flag: "TT" },
  { code: "BB", name: "Barbados", flag: "BB" },
  { code: "GD", name: "Grenada", flag: "GD" },
  { code: "LC", name: "Saint Lucia", flag: "LC" },
  { code: "VC", name: "Saint Vincent and the Grenadines", flag: "VC" },
  { code: "AG", name: "Antigua and Barbuda", flag: "AG" },
  { code: "DM", name: "Dominica", flag: "DM" },
  { code: "KN", name: "Saint Kitts and Nevis", flag: "KN" },
  { code: "BS", name: "Bahamas", flag: "BS" },
  { code: "BZ", name: "Belize", flag: "BZ" },
  { code: "CR", name: "Costa Rica", flag: "CR" },
  { code: "SV", name: "El Salvador", flag: "SV" },
  { code: "GT", name: "Guatemala", flag: "GT" },
  { code: "HN", name: "Honduras", flag: "HN" },
  { code: "NI", name: "Nicaragua", flag: "NI" },
  { code: "PA", name: "Panama", flag: "PA" },
  { code: "EC", name: "Ecuador", flag: "EC" },
  { code: "BO", name: "Bolivia", flag: "BO" },
  { code: "PY", name: "Paraguay", flag: "PY" },
  { code: "UY", name: "Uruguay", flag: "UY" },
  { code: "GY", name: "Guyana", flag: "GY" },
  { code: "SR", name: "Suriname", flag: "SR" },
  { code: "GF", name: "French Guiana", flag: "GF" },
  { code: "FK", name: "Falkland Islands", flag: "FK" },
  { code: "IS", name: "Iceland", flag: "IS" },
  { code: "IE", name: "Ireland", flag: "IE" },
  { code: "PT", name: "Portugal", flag: "PT" },
  { code: "LU", name: "Luxembourg", flag: "LU" },
  { code: "AD", name: "Andorra", flag: "AD" },
  { code: "MC", name: "Monaco", flag: "MC" },
  { code: "LI", name: "Liechtenstein", flag: "LI" },
  { code: "SM", name: "San Marino", flag: "SM" },
  { code: "VA", name: "Vatican City", flag: "VA" },
  { code: "ME", name: "Montenegro", flag: "ME" },
  { code: "MK", name: "North Macedonia", flag: "MK" },
  { code: "AL", name: "Albania", flag: "AL" },
  { code: "BA", name: "Bosnia and Herzegovina", flag: "BA" },
  { code: "RS", name: "Serbia", flag: "RS" },
  { code: "XK", name: "Kosovo", flag: "XK" },
  { code: "MW", name: "Malawi", flag: "MW" },
  { code: "MZ", name: "Mozambique", flag: "MZ" },
  { code: "ZM", name: "Zambia", flag: "ZM" },
  { code: "BW", name: "Botswana", flag: "BW" },
  { code: "NA", name: "Namibia", flag: "NA" },
  { code: "AO", name: "Angola", flag: "AO" },
  { code: "CD", name: "DR Congo", flag: "CD" },
  { code: "CG", name: "Republic of the Congo", flag: "CG" },
  { code: "GA", name: "Gabon", flag: "GA" },
  { code: "GQ", name: "Equatorial Guinea", flag: "GQ" },
  { code: "CM", name: "Cameroon", flag: "CM" },
  { code: "CF", name: "Central African Republic", flag: "CF" },
  { code: "TD", name: "Chad", flag: "TD" },
  { code: "NE", name: "Niger", flag: "NE" },
  { code: "ML", name: "Mali", flag: "ML" },
  { code: "BF", name: "Burkina Faso", flag: "BF" },
  { code: "SN", name: "Senegal", flag: "SN" },
  { code: "GM", name: "Gambia", flag: "GM" },
  { code: "GW", name: "Guinea-Bissau", flag: "GW" },
  { code: "GN", name: "Guinea", flag: "GN" },
  { code: "SL", name: "Sierra Leone", flag: "SL" },
  { code: "LR", name: "Liberia", flag: "LR" },
  { code: "CI", name: "Ivory Coast", flag: "CI" },
  { code: "TG", name: "Togo", flag: "TG" },
  { code: "BJ", name: "Benin", flag: "BJ" },
  { code: "MR", name: "Mauritania", flag: "MR" },
  { code: "EH", name: "Western Sahara", flag: "EH" },
  { code: "SC", name: "Seychelles", flag: "SC" },
  { code: "MU", name: "Mauritius", flag: "MU" },
  { code: "KM", name: "Comoros", flag: "KM" },
  { code: "MG", name: "Madagascar", flag: "MG" },
  { code: "RE", name: "Reunion", flag: "RE" },
  { code: "YT", name: "Mayotte", flag: "YT" },
  { code: "SH", name: "Saint Helena", flag: "SH" },
  { code: "AC", name: "Ascension Island", flag: "AC" },
  { code: "ST", name: "Sao Tome and Principe", flag: "ST" },
  { code: "CV", name: "Cape Verde", flag: "CV" },
  { code: "GW", name: "Guinea-Bissau", flag: "GW" },
  { code: "BJ", name: "Benin", flag: "BJ" },
  { code: "NE", name: "Niger", flag: "NE" },
  { code: "TD", name: "Chad", flag: "TD" },
  { code: "ER", name: "Eritrea", flag: "ER" },
  { code: "DJ", name: "Djibouti", flag: "DJ" },
  { code: "SO", name: "Somalia", flag: "SO" },
  { code: "RW", name: "Rwanda", flag: "RW" },
  { code: "BI", name: "Burundi", flag: "BI" },
  { code: "SS", name: "South Sudan", flag: "SS" },
];

interface CompanyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  editingCompany: Company | null;
  formData: Partial<Company>;
  setFormData: (data: Partial<Company>) => void;
  isLoading: boolean;
}

export function CompanyFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingCompany,
  formData,
  setFormData,
  isLoading,
}: CompanyFormModalProps) {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedFocusAreaIndex, setSelectedFocusAreaIndex] = useState<number | null>(null);
  const [iconPickerMode, setIconPickerMode] = useState<"company" | "focusArea">("company");
  const [showFlagPicker, setShowFlagPicker] = useState(false);
  const [flagSearch, setFlagSearch] = useState("");

  const inputCls =
    "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";

  const sectionCls = "space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-border-dark";
  const sectionHeaderCls = "flex items-center gap-2 text-sm font-semibold text-text-dark mb-4";
  const labelCls = "text-xs text-muted-dark uppercase tracking-wider mb-2 block flex items-center gap-1.5";

  const addFocusArea = () => {
    setFormData({
      ...formData,
      focusAreas: [...(formData.focusAreas || []), { icon: "", label: "", description: "" }],
    });
  };

  const updateFocusArea = (index: number, field: keyof FocusArea, value: string) => {
    const updated = [...(formData.focusAreas || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, focusAreas: updated });
  };

  const removeFocusArea = (index: number) => {
    const updated = (formData.focusAreas || []).filter((_, i) => i !== index);
    setFormData({ ...formData, focusAreas: updated });
  };

  const addGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [...(formData.gallery || []), { src: "", title: "", category: "" }],
    });
  };

  const updateGalleryImage = (index: number, field: keyof GalleryImage, value: string) => {
    const updated = [...(formData.gallery || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, gallery: updated });
  };

  const removeGalleryImage = (index: number) => {
    const updated = (formData.gallery || []).filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: updated });
  };

  // Social Media Helpers
  const updateSocialMedia = (platform: string, value: string) => {
    setFormData({
      ...formData,
      socialMedia: { ...(formData.socialMedia || {}), [platform]: value },
    });
  };

  // Stats Helpers
  const updateStats = (field: "employees" | "projects" | "clients", value: number) => {
    setFormData({
      ...formData,
      stats: { ...(formData.stats || { employees: 0, projects: 0, clients: 0 }), [field]: value },
    });
  };

  // Employees Helpers
  const addEmployee = () => {
    setFormData({
      ...formData,
      employees: [...(formData.employees || []), { name: "", position: "", image: "", department: "" }],
    });
  };

  const updateEmployee = (index: number, field: string, value: string) => {
    const updated = [...(formData.employees || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, employees: updated });
  };

  const removeEmployee = (index: number) => {
    const updated = (formData.employees || []).filter((_, i) => i !== index);
    setFormData({ ...formData, employees: updated });
  };

  const openIconPicker = (index?: number) => {
    if (index !== undefined) {
      setSelectedFocusAreaIndex(index);
      setIconPickerMode("focusArea");
    } else {
      setIconPickerMode("company");
    }
    setShowIconPicker(true);
  };

  const selectIcon = (iconName: string) => {
    if (iconPickerMode === "focusArea" && selectedFocusAreaIndex !== null) {
      updateFocusArea(selectedFocusAreaIndex, "icon", iconName);
    } else if (iconPickerMode === "company") {
      setFormData({ ...formData, icon: iconName });
    }
    setShowIconPicker(false);
    setSelectedFocusAreaIndex(null);
  };

  const isValid =
    formData.name &&
    formData.slug &&
    formData.tagline &&
    formData.year &&
    formData.country &&
    formData.flag &&
    formData.description;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-bg-dark rounded-3xl w-full max-w-3xl max-h-[90vh] border border-border-dark flex flex-col overflow-hidden shadow-2xl">
          {/* Header - Solid Background */}
          <div className="flex-none bg-bg-dark border-b border-border-dark p-6 flex items-center justify-between z-10">
            <h3 className="font-display font-bold text-xl text-text-dark">
              {editingCompany ? "Edit Company" : "Add New Company"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
            >
              <RiCloseLine size={24} />
            </button>
          </div>

          {/* Form Content - Scrollable Area with Custom Scrollbar */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* Company Identity Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <RiBuildingLine className="text-primary-400" size={18} />
                </div>
                Company Identity
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    <RiBriefcaseLine size={14} />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Marvel Group"
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    <RiLink size={14} />
                    Slug * (unique identifier)
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    placeholder="e.g., marvel-group"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>
                    <RiFileTextLine size={14} />
                    Tagline *
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.tagline || ""}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g., Where Medicine Meets Mastery"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>
                    <RiFileTextLine size={14} />
                    Description *
                  </label>
                  <textarea
                    className={`${inputCls} min-h-[100px] resize-none`}
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this company does..."
                  />
                </div>
              </div>
            </div>

            {/* Location & Year Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                  <RiGlobalLine className="text-secondary-400" size={18} />
                </div>
                Location & Establishment
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>
                    <RiBuildingLine size={14} />
                    Country *
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g., Egypt"
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    <RiFlagLine size={14} />
                    Flag Code *
                  </label>
                  <button
                    onClick={() => setShowFlagPicker(true)}
                    className={`${inputCls} flex items-center gap-3 text-left`}
                  >
                    {formData.flag ? (
                      <>
                        <ReactCountryFlag
                          countryCode={formData.flag}
                          svg
                          style={{ width: "24px", height: "18px" }}
                        />
                        <span className="text-text-dark">{formData.flag}</span>
                        <span className="text-muted-dark text-xs">
                          ({COUNTRIES.find((c) => c.code === formData.flag)?.name || "Unknown"})
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-dark">Click to select country flag...</span>
                    )}
                  </button>
                </div>
                <div>
                  <label className={labelCls}>
                    <RiListOrdered size={14} />
                    Year Established *
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.year || ""}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g., 2013"
                  />
                </div>
              </div>
            </div>

            {/* Branding Section with Logo Preview */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <RiPaletteLine className="text-purple-400" size={18} />
                </div>
                Branding & Visual Identity
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Logo Preview Card */}
                <div className="lg:col-span-1">
                  <label className={labelCls}>
                    <RiImageLine size={14} />
                    Logo Preview
                  </label>
                  <div className="aspect-square rounded-xl bg-white/5 border border-border-dark overflow-hidden flex items-center justify-center relative group">
                    {formData.logo ? (
                      <img
                        src={formData.logo}
                        alt="Company Logo"
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${formData.color || "from-primary-500 to-secondary-400"} flex items-center justify-center mx-auto mb-2`}>
                          <span className="text-white text-2xl font-bold">
                            {formData.icon || formData.name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-dark">No logo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className={labelCls}>
                      <RiUploadCloudLine size={14} />
                      Logo URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className={inputCls}
                        value={formData.logo || ""}
                        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                        placeholder="https://example.com/logo.png"
                      />
                      {formData.logo && (
                        <button
                          onClick={() => setFormData({ ...formData, logo: "" })}
                          className="px-3 py-2 rounded-lg border border-border-dark text-muted-dark hover:text-red-400 hover:border-red-500/30 transition-all"
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-dark mt-1">Paste an image URL to see preview</p>
                  </div>

                  {/* Gradient Color Picker */}
                  <div>
                    <label className={labelCls}>
                      <RiPaletteLine size={14} />
                      Gradient Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "from-primary-500 to-secondary-400", from: "#127A8A", to: "#E1B15E", label: "Primary" },
                        { value: "from-primary-500 to-primary-600", from: "#127A8A", to: "#0d5c6b", label: "Teal Dark" },
                        { value: "from-secondary-400 to-secondary-600", from: "#E1B15E", to: "#c99a4e", label: "Gold" },
                        { value: "from-blue-500 to-cyan-500", from: "#3b82f6", to: "#06b6d4", label: "Cyan" },
                        { value: "from-purple-500 to-pink-500", from: "#a855f7", to: "#ec4899", label: "Pink" },
                        { value: "from-green-500 to-emerald-500", from: "#22c55e", to: "#10b981", label: "Green" },
                        { value: "from-amber-500 to-orange-500", from: "#f59e0b", to: "#f97316", label: "Orange" },
                        { value: "from-red-500 to-rose-500", from: "#ef4444", to: "#f43f5e", label: "Red" },
                      ].map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setFormData({ ...formData, color: color.value })}
                          className={`group relative w-12 h-12 rounded-xl border-2 transition-all overflow-hidden ${
                            formData.color === color.value
                              ? "border-white ring-2 ring-primary-500"
                              : "border-transparent hover:border-white/50"
                          }`}
                          title={color.label}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                            }}
                          />
                          {formData.color === color.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <RiCheckboxCircleLine className="text-white drop-shadow-lg" size={20} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Company Icon Picker */}
                  <div>
                    <label className={labelCls}>
                      <RiBuildingLine size={14} />
                      Company Icon
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowIconPicker(true)}
                        className="w-14 h-14 rounded-xl bg-white/10 border border-border-dark hover:border-primary-500/50 flex items-center justify-center transition-all"
                        title="Click to select icon"
                      >
                        {formData.icon && iconComponents[formData.icon] ? (
                          (() => {
                            const IconComp = iconComponents[formData.icon];
                            return <IconComp size={28} className="text-primary-400" />;
                          })()
                        ) : (
                          <span className="text-2xl">{formData.icon || "✦"}</span>
                        )}
                      </button>
                      <div className="flex-1">
                        <input
                          type="text"
                          className={inputCls}
                          value={formData.icon || ""}
                          readOnly
                          onClick={() => setShowIconPicker(true)}
                          placeholder="Click to select an icon"
                        />
                      </div>
                      {formData.icon && (
                        <button
                          onClick={() => setFormData({ ...formData, icon: "" })}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-muted-dark hover:text-red-400 transition-all"
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-dark mt-1">Click the icon to browse all available icons</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <RiCheckboxCircleLine className="text-green-400" size={18} />
                </div>
                Company Status
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.isMain || false}
                    onChange={(e) => setFormData({ ...formData, isMain: e.target.checked })}
                    className="w-5 h-5 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-dark block">Main Company</span>
                    <span className="text-xs text-muted-dark">Marvel Group headquarters</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-dark block">Active</span>
                    <span className="text-xs text-muted-dark">Visible to public</span>
                  </div>
                </label>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border-dark">
                  <RiListOrdered size={18} className="text-muted-dark" />
                  <div>
                    <label className="text-sm font-medium text-text-dark block">Display Order</label>
                    <input
                      type="number"
                      className="w-20 bg-transparent text-sm text-text-dark focus:outline-none"
                      value={formData.order || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                      }
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <RiStackLine className="text-amber-400" size={18} />
                </div>
                Focus Areas
                <span className="ml-auto text-xs text-muted-dark font-normal">
                  {formData.focusAreas?.length || 0} areas
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-dark">Add key focus areas with icons and descriptions</p>
                <button
                  onClick={addFocusArea}
                  className="text-xs flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/40 transition-all"
                >
                  <RiAddLine size={16} /> Add Focus Area
                </button>
              </div>
              <div className="space-y-3">
                {(formData.focusAreas || []).map((area, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-white/5 border border-border-dark"
                  >
                    {/* Row 1: Icon + Label */}
                    <div className="flex items-start gap-2 mb-3">
                      {/* Icon Picker Button */}
                      <button
                        onClick={() => openIconPicker(index)}
                        className="w-12 h-12 rounded-xl bg-white/10 border border-border-dark hover:border-primary-500/50 flex items-center justify-center transition-all shrink-0"
                        title="Click to select icon"
                      >
                        {area.icon && iconComponents[area.icon] ? (
                          (() => {
                            const IconComp = iconComponents[area.icon];
                            return <IconComp size={22} className="text-primary-400" />;
                          })()
                        ) : (
                          <RiImageLine size={20} className="text-muted-dark" />
                        )}
                      </button>
                      {/* Label Input - Takes remaining space */}
                      <input
                        type="text"
                        className={`${inputCls} flex-1`}
                        placeholder="Label (e.g., Healthcare)"
                        value={area.label}
                        onChange={(e) => updateFocusArea(index, "label", e.target.value)}
                      />
                    </div>
                    {/* Row 2: Description Textarea - Full width */}
                    <textarea
                      className={`${inputCls} min-h-[80px] resize-none w-full`}
                      placeholder="Short description..."
                      value={area.description}
                      onChange={(e) => updateFocusArea(index, "description", e.target.value)}
                    />
                  </div>
                ))}
                {(formData.focusAreas || []).length === 0 && (
                  <p className="text-sm text-muted-dark italic">No focus areas added yet.</p>
                )}
              </div>
            </div>

            {/* Gallery Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <RiImageAddLine className="text-pink-400" size={18} />
                </div>
                Work Gallery
                <span className="ml-auto text-xs text-muted-dark font-normal">
                  {formData.gallery?.length || 0} images
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-dark">Add showcase images with titles and categories</p>
                <button
                  onClick={addGalleryImage}
                  className="text-xs flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/40 transition-all"
                >
                  <RiAddLine size={16} /> Add Image
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.gallery || []).map((img, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all group"
                  >
                    {/* Image Preview */}
                    <div className="aspect-video rounded-lg bg-black/20 mb-3 overflow-hidden relative">
                      {img.src ? (
                        <img
                          src={img.src}
                          alt={img.title || "Gallery image"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-dark">
                          <RiPictureInPictureLine size={32} className="mb-2 opacity-50" />
                          <span className="text-xs">Paste image URL to preview</span>
                        </div>
                      )}
                    </div>

                    {/* Inputs - Stacked with proper borders */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-1.5 block">
                          Image URL
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-border-dark flex items-center justify-center shrink-0">
                            <RiLink size={16} className="text-muted-dark" />
                          </div>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="https://example.com/image.jpg"
                            value={img.src}
                            onChange={(e) => updateGalleryImage(index, "src", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-1.5 block">
                          Title
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-border-dark flex items-center justify-center shrink-0">
                            <RiFileTextLine size={16} className="text-muted-dark" />
                          </div>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="e.g., Marvel Hospital Project"
                            value={img.title}
                            onChange={(e) => updateGalleryImage(index, "title", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-1.5 block">
                          Category
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-border-dark flex items-center justify-center shrink-0">
                            <RiPaletteLine size={16} className="text-muted-dark" />
                          </div>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="e.g., Healthcare, Infrastructure"
                            value={img.category}
                            onChange={(e) => updateGalleryImage(index, "category", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeGalleryImage(index)}
                      className="mt-3 w-full py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all text-xs flex items-center justify-center gap-1"
                    >
                      <RiDeleteBinLine size={14} /> Remove Image
                    </button>
                  </div>
                ))}
                {(formData.gallery || []).length === 0 && (
                  <div className="md:col-span-2 p-8 rounded-xl bg-white/5 border border-border-dark border-dashed text-center">
                    <RiImageAddLine size={48} className="mx-auto mb-3 text-muted-dark opacity-30" />
                    <p className="text-sm text-muted-dark">No gallery images added yet</p>
                    <p className="text-xs text-muted-dark mt-1">Add images to showcase the company&apos;s work</p>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center">
                  <RiGlobalLine className="text-white" size={18} />
                </div>
                Social Media Links
                <span className="ml-auto text-xs text-muted-dark font-normal">
                  Connect with your audience
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "whatsapp", label: "WhatsApp", icon: RiPhoneLine },
                  { key: "email", label: "Email", icon: RiMailLine },
                  { key: "linkedin", label: "LinkedIn", icon: RiLinkedinLine },
                  { key: "facebook", label: "Facebook", icon: RiFacebookLine },
                  { key: "youtube", label: "YouTube", icon: RiYoutubeLine },
                  { key: "x", label: "X (Twitter)", icon: RiTwitterLine },
                  { key: "instagram", label: "Instagram", icon: RiInstagramLine },
                  { key: "tiktok", label: "TikTok", icon: RiTiktokLine },
                  { key: "snapchat", label: "Snapchat", icon: RiSnapchatLine },
                  { key: "telegram", label: "Telegram", icon: RiTelegramLine },
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-400 border border-primary-500/30 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder={`${label} URL`}
                      value={formData.socialMedia?.[key as keyof typeof formData.socialMedia] || ""}
                      onChange={(e) => updateSocialMedia(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Overview Stats Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <RiBarChartLine className="text-amber-400" size={18} />
                </div>
                Overview Statistics
                <span className="ml-auto text-xs text-muted-dark font-normal">
                  Company achievements
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { key: "employees", label: "Employees", suffix: "+" },
                  { key: "projects", label: "Projects", suffix: "+" },
                  { key: "clients", label: "Clients", suffix: "+" },
                ].map(({ key, label, suffix }) => (
                  <div key={key}>
                    <label className={labelCls}>
                      <RiUserLine size={14} />
                      {label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className={inputCls}
                        placeholder="0"
                        value={formData.stats?.[key as keyof typeof formData.stats] || 0}
                        onChange={(e) => updateStats(key as "employees" | "projects" | "clients", parseInt(e.target.value) || 0)}
                      />
                      <span className="text-muted-dark font-semibold">{suffix}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team/Employees Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <RiTeamLine className="text-teal-400" size={18} />
                </div>
                Team Members
                <span className="ml-auto text-xs text-muted-dark font-normal">
                  {formData.employees?.length || 0} members
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-dark">Add team members with their positions</p>
                <button
                  onClick={addEmployee}
                  className="text-xs flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/40 transition-all"
                >
                  <RiAddLine size={16} /> Add Member
                </button>
              </div>

              <div className="space-y-3">
                {(formData.employees || []).map((emp, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      {/* Employee Image Preview */}
                      <div className="sm:col-span-1">
                        <div className="aspect-square rounded-lg bg-black/20 overflow-hidden relative">
                          {emp.image ? (
                            <img
                              src={emp.image}
                              alt={emp.name || "Team member"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-dark">
                              <RiUserLine size={32} className="opacity-30" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-3 space-y-2">
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="Full Name"
                          value={emp.name}
                          onChange={(e) => updateEmployee(index, "name", e.target.value)}
                        />
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="Position/Title"
                          value={emp.position}
                          onChange={(e) => updateEmployee(index, "position", e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Image URL"
                            value={emp.image}
                            onChange={(e) => updateEmployee(index, "image", e.target.value)}
                          />
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Department"
                            value={emp.department}
                            onChange={(e) => updateEmployee(index, "department", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeEmployee(index)}
                      className="mt-3 w-full py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all text-xs flex items-center justify-center gap-1"
                    >
                      <RiDeleteBinLine size={14} /> Remove Member
                    </button>
                  </div>
                ))}
                {(formData.employees || []).length === 0 && (
                  <div className="p-8 rounded-xl bg-white/5 border border-border-dark border-dashed text-center">
                    <RiTeamLine size={48} className="mx-auto mb-3 text-muted-dark opacity-30" />
                    <p className="text-sm text-muted-dark">No team members added yet</p>
                    <p className="text-xs text-muted-dark mt-1">Add key team members to showcase your leadership</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex-none bg-bg-dark border-t border-border-dark p-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-border-dark text-muted-dark hover:text-text-dark transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!isValid || isLoading}
                className="px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all"
              >
                {isLoading
                  ? "Loading..."
                  : editingCompany
                  ? "Update Company"
                  : "Create Company"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Picker */}
      <IconPicker
        isOpen={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        onSelect={selectIcon}
      />

      {/* Flag Picker Modal */}
      {showFlagPicker && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-dark rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-border-dark flex flex-col">
            {/* Header */}
            <div className="flex-none bg-bg-dark border-b border-border-dark p-6 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-text-dark">Select Country Flag</h3>
                <p className="text-sm text-muted-dark mt-1">Choose a country for the company flag</p>
              </div>
              <button
                onClick={() => {
                  setShowFlagPicker(false);
                  setFlagSearch("");
                }}
                className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="flex-none p-4 border-b border-border-dark">
              <div className="relative">
                <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark" size={18} />
                <input
                  type="text"
                  className="w-full bg-white/5 border border-border-dark rounded-xl pl-11 pr-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all"
                  placeholder="Search countries..."
                  value={flagSearch}
                  onChange={(e) => setFlagSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Flags Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {COUNTRIES.filter((country) =>
                  flagSearch
                    ? country.name.toLowerCase().includes(flagSearch.toLowerCase()) ||
                      country.code.toLowerCase().includes(flagSearch.toLowerCase())
                    : true
                ).map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setFormData({ ...formData, flag: country.code });
                      setShowFlagPicker(false);
                      setFlagSearch("");
                    }}
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      formData.flag === country.code
                        ? "bg-primary-500/20 border-primary-500/50"
                        : "bg-white/5 border-border-dark hover:border-primary-500/30 hover:bg-white/10"
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{ width: "32px", height: "24px" }}
                    />
                    <span className="text-xs text-text-dark text-center truncate w-full">{country.name}</span>
                    <span className="text-xs text-muted-dark">{country.code}</span>
                  </button>
                ))}
              </div>
              {flagSearch &&
                COUNTRIES.filter(
                  (country) =>
                    country.name.toLowerCase().includes(flagSearch.toLowerCase()) ||
                    country.code.toLowerCase().includes(flagSearch.toLowerCase())
                ).length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-sm text-muted-dark">No countries found</p>
                    <p className="text-xs text-muted-dark mt-1">Try a different search term</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
