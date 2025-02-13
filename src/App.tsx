import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng, toSvg, toJpeg } from 'html-to-image';
import { 
  Globe, FileText, FileImage, FileVideo, CreditCard, 
  Mail, Phone, MapPin, Wifi, Download, Settings2,
  Palette, QrCode, Frame, Image as ImageIcon,
  FileType2, Camera, Languages
} from 'lucide-react';
import { translations, Language } from './translations';

type QRType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'vcard';
type DownloadFormat = 'png' | 'svg' | 'jpeg';

function App() {
  const [language, setLanguage] = useState<Language>('uz');
  const [qrType, setQRType] = useState<QRType>('url');
  const [qrValue, setQRValue] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('L');
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('png');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const qrRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const downloadQR = async () => {
    if (!qrRef.current) return;
    
    setIsGenerating(true);
    try {
      let dataUrl;
      switch (downloadFormat) {
        case 'svg':
          dataUrl = await toSvg(qrRef.current);
          break;
        case 'jpeg':
          dataUrl = await toJpeg(qrRef.current, { quality: 0.95 });
          break;
        default:
          dataUrl = await toPng(qrRef.current);
      }
      
      const link = document.createElement('a');
      link.download = `qrcode.${downloadFormat}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
    setIsGenerating(false);
  };

  const getQRValue = () => {
    switch (qrType) {
      case 'wifi':
        const { ssid, password, encryption } = JSON.parse(qrValue || '{"ssid":"","password":"","encryption":"WPA"}');
        return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      case 'location':
        const { lat, lng } = JSON.parse(qrValue || '{"lat":"","lng":""}');
        return `geo:${lat},${lng}`;
      case 'vcard':
        const { name, phone, email, org } = JSON.parse(qrValue || '{"name":"","phone":"","email":"","org":""}');
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${org}\nEND:VCARD`;
      default:
        return qrValue;
    }
  };

  const renderInput = () => {
    switch (qrType) {
      case 'wifi':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t.wifi.ssid}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"ssid":"","password":"","encryption":"WPA"}'),
                ssid: e.target.value
              }))}
            />
            <input
              type="password"
              placeholder={t.wifi.password}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"ssid":"","password":"","encryption":"WPA"}'),
                password: e.target.value
              }))}
            />
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"ssid":"","password":"","encryption":"WPA"}'),
                encryption: e.target.value
              }))}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">{t.wifi.noPassword}</option>
            </select>
          </div>
        );
      case 'location':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t.location.latitude}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"lat":"","lng":""}'),
                lat: e.target.value
              }))}
            />
            <input
              type="text"
              placeholder={t.location.longitude}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"lat":"","lng":""}'),
                lng: e.target.value
              }))}
            />
          </div>
        );
      case 'vcard':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t.vcard.name}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"name":"","phone":"","email":"","org":""}'),
                name: e.target.value
              }))}
            />
            <input
              type="tel"
              placeholder={t.vcard.phone}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"name":"","phone":"","email":"","org":""}'),
                phone: e.target.value
              }))}
            />
            <input
              type="email"
              placeholder={t.vcard.email}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"name":"","phone":"","email":"","org":""}'),
                email: e.target.value
              }))}
            />
            <input
              type="text"
              placeholder={t.vcard.org}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setQRValue(JSON.stringify({
                ...JSON.parse(qrValue || '{"name":"","phone":"","email":"","org":""}'),
                org: e.target.value
              }))}
            />
          </div>
        );
      default:
        return (
          <input
            type={qrType === 'phone' ? 'tel' : qrType === 'email' ? 'email' : 'text'}
            placeholder={`${t.types[qrType]}`}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={qrValue}
            onChange={(e) => setQRValue(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-2 flex gap-2">
            {(['uz', 'en', 'ru'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-md transition-all duration-300 ${
                  language === lang
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-5xl font-bold text-center mb-2 text-indigo-900 animate-fade-in">
          {t.title}
        </h1>
        <p className="text-center text-indigo-600 mb-8 animate-fade-in-delay">
          {t.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg animate-slide-in">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-900">
              <QrCode className="w-5 h-5" />
              {t.selectType}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { type: 'url', icon: Globe },
                { type: 'text', icon: FileText },
                { type: 'email', icon: Mail },
                { type: 'phone', icon: Phone },
                { type: 'wifi', icon: Wifi },
                { type: 'location', icon: MapPin },
                { type: 'vcard', icon: CreditCard },
              ].map(({ type, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => setQRType(type as QRType)}
                  className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                    qrType === type 
                      ? 'bg-indigo-100 text-indigo-700 shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span>{t.types[type as keyof typeof t.types]}</span>
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {renderInput()}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-900">
                  <Settings2 className="w-5 h-5" />
                  {t.customization}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.qrColor}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span className="text-sm">{qrColor}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.background}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span className="text-sm">{bgColor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t.size}</label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-sm">{size}px</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t.errorLevel}</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                    {(['L', 'M', 'Q', 'H'] as const).map((l) => (
                      <option key={l} value={l}>
                        {t.errorLevels[l]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg animate-slide-in-delay">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-900">
              <Frame className="w-5 h-5" />
              {t.preview}
            </h2>
            
            <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
              <div
                ref={qrRef}
                className="bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeCanvas
                  value={getQRValue()}
                  size={size}
                  level={level}
                  fgColor={qrColor}
                  bgColor={bgColor}
                />
              </div>
              
              <div className="mt-6 space-y-4 w-full">
                <div className="flex justify-center gap-4">
                  {[
                    { format: 'png', icon: ImageIcon },
                    { format: 'svg', icon: FileType2 },
                    { format: 'jpeg', icon: Camera },
                  ].map(({ format, icon: Icon }) => (
                    <button
                      key={format}
                      onClick={() => setDownloadFormat(format as DownloadFormat)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        downloadFormat === format
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={downloadQR}
                  disabled={!qrValue || isGenerating}
                  className={`w-full px-6 py-3 bg-indigo-600 text-white rounded-lg transition-all duration-300
                    ${!qrValue || isGenerating
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1'
                    }
                    flex items-center justify-center gap-2`}
                >
                  <Download className={`w-5 h-5 ${isGenerating ? 'animate-bounce' : ''}`} />
                  {isGenerating ? t.generating : `${t.download} ${downloadFormat.toUpperCase()}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;