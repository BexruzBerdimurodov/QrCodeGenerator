export const translations = {
  en: {
    title: "QR Code Generator",
    subtitle: "Create beautiful QR codes for any purpose",
    selectType: "Select QR Type",
    customization: "Customization",
    preview: "Preview",
    qrColor: "QR Color",
    background: "Background",
    size: "Size",
    errorLevel: "Error Correction Level",
    download: "Download",
    generating: "Generating...",
    types: {
      url: "URL",
      text: "Text",
      email: "Email",
      phone: "Phone",
      wifi: "WiFi",
      location: "Location",
      vcard: "vCard"
    },
    wifi: {
      ssid: "Network Name (SSID)",
      password: "Password",
      encryption: "Encryption",
      noPassword: "No Password"
    },
    location: {
      latitude: "Latitude",
      longitude: "Longitude"
    },
    vcard: {
      name: "Full Name",
      phone: "Phone",
      email: "Email",
      org: "Organization"
    },
    errorLevels: {
      L: "Low (7%)",
      M: "Medium (15%)",
      Q: "Quartile (25%)",
      H: "High (30%)"
    }
  },
  uz: {
    title: "QR Kod Generatori",
    subtitle: "Har qanday maqsad uchun chiroyli QR kodlar yarating",
    selectType: "QR Turini Tanlang",
    customization: "Sozlamalar",
    preview: "Ko'rish",
    qrColor: "QR Rangi",
    background: "Fon",
    size: "O'lcham",
    errorLevel: "Xatoni Tuzatish Darajasi",
    download: "Yuklab olish",
    generating: "Yaratilmoqda...",
    types: {
      url: "URL",
      text: "Matn",
      email: "Email",
      phone: "Telefon",
      wifi: "Wi-Fi",
      location: "Manzil",
      vcard: "Kontakt"
    },
    wifi: {
      ssid: "Tarmoq nomi (SSID)",
      password: "Parol",
      encryption: "Shifrlash",
      noPassword: "Parolsiz"
    },
    location: {
      latitude: "Kenglik",
      longitude: "Uzunlik"
    },
    vcard: {
      name: "To'liq ism",
      phone: "Telefon",
      email: "Email",
      org: "Tashkilot"
    },
    errorLevels: {
      L: "Past (7%)",
      M: "O'rta (15%)",
      Q: "Yuqori (25%)",
      H: "Maksimal (30%)"
    }
  },
  ru: {
    title: "Генератор QR-кодов",
    subtitle: "Создавайте красивые QR-коды для любых целей",
    selectType: "Выберите тип QR",
    customization: "Настройка",
    preview: "Предпросмотр",
    qrColor: "Цвет QR",
    background: "Фон",
    size: "Размер",
    errorLevel: "Уровень коррекции ошибок",
    download: "Скачать",
    generating: "Создание...",
    types: {
      url: "URL",
      text: "Текст",
      email: "Email",
      phone: "Телефон",
      wifi: "Wi-Fi",
      location: "Локация",
      vcard: "Контакт"
    },
    wifi: {
      ssid: "Имя сети (SSID)",
      password: "Пароль",
      encryption: "Шифрование",
      noPassword: "Без пароля"
    },
    location: {
      latitude: "Широта",
      longitude: "Долгота"
    },
    vcard: {
      name: "Полное имя",
      phone: "Телефон",
      email: "Email",
      org: "Организация"
    },
    errorLevels: {
      L: "Низкий (7%)",
      M: "Средний (15%)",
      Q: "Высокий (25%)",
      H: "Максимальный (30%)"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;