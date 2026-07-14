import ProfileSettings from "./settings/ProfileSettings.jsx";
import FixedTemplateSettings from "./settings/FixedTemplateSettings.jsx";
import CategorySettings from "./settings/CategorySettings.jsx";
import { DEFAULT_RATE } from "../lib/exchange.js";

export default function SettingsPage({ uid, profile, saveProfile, onBack, showToast }) {
  const rate = profile.exchangeRate || DEFAULT_RATE;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <header className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl border border-line bg-white text-ink2 hover:bg-bg2 text-lg leading-none"
          aria-label="Volver"
        >
          ‹
        </button>
        <h1 className="text-lg font-extrabold text-ink">Ajustes</h1>
      </header>

      <div className="space-y-4">
        <ProfileSettings profile={profile} saveProfile={saveProfile} showToast={showToast} />
        <FixedTemplateSettings uid={uid} profile={profile} showToast={showToast} rate={rate} />
        <CategorySettings profile={profile} saveProfile={saveProfile} showToast={showToast} />
      </div>
    </div>
  );
}
