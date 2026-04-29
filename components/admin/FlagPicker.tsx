"use client";

import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const COUNTRIES: Country[] = [
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
  { code: "MH", name: "Marshall Islands", flag: "MH" },
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
  { code: "ST", name: "Sao Tome and Principe", flag: "ST" },
  { code: "CV", name: "Cape Verde", flag: "CV" },
  { code: "ER", name: "Eritrea", flag: "ER" },
  { code: "DJ", name: "Djibouti", flag: "DJ" },
  { code: "SO", name: "Somalia", flag: "SO" },
  { code: "RW", name: "Rwanda", flag: "RW" },
  { code: "BI", name: "Burundi", flag: "BI" },
  { code: "SS", name: "South Sudan", flag: "SS" },
];

interface FlagPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (countryCode: string) => void;
  selectedCode?: string;
}

export function FlagPicker({ isOpen, onClose, onSelect, selectedCode }: FlagPickerProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredCountries = search
    ? COUNTRIES.filter(
        (country) =>
          country.name.toLowerCase().includes(search.toLowerCase()) ||
          country.code.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRIES;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-dark rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-border-dark flex flex-col">
        {/* Header */}
        <div className="flex-none bg-bg-dark border-b border-border-dark p-6 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-text-dark">Select Country Flag</h3>
            <p className="text-sm text-muted-dark mt-1">Choose a country for the company flag</p>
          </div>
          <button
            onClick={onClose}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Flags Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  onSelect(country.code);
                  setSearch("");
                }}
                className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  selectedCode === country.code
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
          {filteredCountries.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-dark">No countries found</p>
              <p className="text-xs text-muted-dark mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { COUNTRIES };
export type { Country };
