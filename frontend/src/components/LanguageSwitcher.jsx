function LanguageSwitcher({ language, onLanguageChange }) {
  const languages = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "hi", label: "हिं", flag: "🇮🇳" },
    { code: "te", label: "తె", flag: "🇮🇳" },
  ];

  return (
    <div className="lang-switcher" id="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`lang-btn ${language === lang.code ? "active" : ""}`}
          onClick={() => onLanguageChange(lang.code)}
          title={lang.code === "en" ? "English" : lang.code === "hi" ? "हिन्दी" : "తెలుగు"}
        >
          <span className="lang-flag">{lang.flag}</span>
          <span className="lang-label">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
