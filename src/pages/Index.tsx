import { useState } from "react";
import {
  Shield,
  Zap,
  Eye,
  ArrowRight,
  Hash,
  Users,
  Mic,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  BookOpen,
  ShoppingCart,
  Star,
  Lock,
  Percent,
  Megaphone,
  Plus,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronRight,
  MapPin,
  School,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SUBJECTS = [
  "Математика", "Алгебра", "Геометрия", "Физика", "Химия",
  "Биология", "История", "Обществознание", "География", "Русский язык",
  "Литература", "Английский язык", "Немецкий язык", "Французский язык",
  "Информатика", "ОБЖ", "Физкультура", "Музыка", "ИЗО",
  "Технология", "Экономика", "Право", "Астрономия",
];

const CLASSES = Array.from({ length: 11 }, (_, i) => `${i + 1} класс`);

const CITIES: Record<string, string[]> = {
  "Москва": ["СОШ №1", "СОШ №45", "СОШ №179", "Гимназия №1567", "Лицей №1502", "СОШ №2007", "Гимназия №45", "Лицей №57"],
  "Санкт-Петербург": ["СОШ №1", "Гимназия №56", "Лицей №239", "СОШ №347", "Гимназия №278", "СОШ №619"],
  "Новосибирск": ["СОШ №1", "СОШ №112", "Гимназия №1", "Лицей №22", "СОШ №54"],
  "Екатеринбург": ["СОШ №1", "Лицей №110", "Гимназия №9", "СОШ №76", "СОШ №200"],
  "Казань": ["СОШ №1", "Гимназия №122", "Лицей №131", "СОШ №49", "Гимназия №7"],
  "Нижний Новгород": ["СОШ №1", "Лицей №40", "Гимназия №13", "СОШ №155"],
  "Челябинск": ["СОШ №1", "Лицей №11", "Гимназия №48", "СОШ №130"],
  "Омск": ["СОШ №1", "Лицей №64", "Гимназия №19", "СОШ №145"],
  "Самара": ["СОШ №1", "Лицей №1", "Гимназия №1", "СОШ №124"],
  "Ростов-на-Дону": ["СОШ №1", "Лицей №27", "Гимназия №36", "СОШ №80"],
  "Уфа": ["СОШ №1", "Гимназия №39", "Лицей №83", "СОШ №158"],
  "Красноярск": ["СОШ №1", "Лицей №7", "Гимназия №13", "СОШ №144"],
  "Воронеж": ["СОШ №1", "Лицей №2", "Гимназия №9", "СОШ №96"],
  "Пермь": ["СОШ №1", "Лицей №2", "Гимназия №4", "СОШ №135"],
  "Волгоград": ["СОШ №1", "Лицей №5", "Гимназия №11", "СОШ №72"],
};

const RECOMMENDATIONS = [
  { type: "service", icon: "📝", title: "Решу домашку по математике", price: "от 100 ₽", rating: 4.9, reviews: 128, badge: "Топ" },
  { type: "tutor", icon: "👩‍🏫", title: "Репетитор по физике", price: "от 300 ₽/час", rating: 5.0, reviews: 45, badge: "Репетитор" },
  { type: "service", icon: "📖", title: "Помогу с сочинением по литературе", price: "от 150 ₽", rating: 4.8, reviews: 67, badge: null },
  { type: "tutor", icon: "🧑‍💻", title: "Репетитор по информатике и Python", price: "от 400 ₽/час", rating: 4.9, reviews: 33, badge: "Репетитор" },
  { type: "service", icon: "🧪", title: "Лабораторная по химии под ключ", price: "от 200 ₽", rating: 4.7, reviews: 22, badge: null },
  { type: "tutor", icon: "👨‍🏫", title: "Репетитор по русскому языку и ЕГЭ", price: "от 350 ₽/час", rating: 5.0, reviews: 89, badge: "Топ" },
];

type Tab = "feed" | "recommendations";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [subjectsOpen, setSubjectsOpen] = useState(true);
  const [classesOpen, setClassesOpen] = useState(false);
  const [showCityModal, setShowCityModal] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [step, setStep] = useState<"city" | "school">("city");

  const filteredCities = Object.keys(CITIES).filter(c =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );
  const filteredSchools = selectedCity
    ? CITIES[selectedCity].filter(s => s.toLowerCase().includes(schoolSearch.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">

      {/* Модальное окно выбора города и школы */}
      {showCityModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#2f3136] rounded-2xl w-full max-w-md shadow-2xl border border-[#202225]">
            <div className="p-6">
              {/* Заголовок */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#5865f2] rounded-xl flex items-center justify-center flex-shrink-0">
                  {step === "city" ? <MapPin className="w-5 h-5 text-white" /> : <School className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">
                    {step === "city" ? "Выбери свой город" : "Выбери школу"}
                  </h2>
                  <p className="text-[#b9bbbe] text-sm">
                    {step === "city"
                      ? "Чтобы видеть решения из твоего города"
                      : `Город: ${selectedCity}`}
                  </p>
                </div>
              </div>

              {/* Шаги */}
              <div className="flex gap-2 mb-5">
                <div className={`flex-1 h-1 rounded-full ${step === "city" ? "bg-[#5865f2]" : "bg-[#3ba55c]"}`}></div>
                <div className={`flex-1 h-1 rounded-full ${step === "school" ? "bg-[#5865f2]" : "bg-[#40444b]"}`}></div>
              </div>

              {/* Поиск */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e9297]" />
                <input
                  type="text"
                  placeholder={step === "city" ? "Поиск города..." : "Поиск школы..."}
                  className="w-full bg-[#40444b] text-white placeholder-[#72767d] text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5865f2]"
                  value={step === "city" ? citySearch : schoolSearch}
                  onChange={e => step === "city" ? setCitySearch(e.target.value) : setSchoolSearch(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Список городов */}
              {step === "city" && (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {filteredCities.map(city => (
                    <button
                      key={city}
                      onClick={() => { setSelectedCity(city); setStep("school"); setSchoolSearch(""); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-[#40444b] transition-colors group"
                    >
                      <MapPin className="w-4 h-4 text-[#5865f2] flex-shrink-0" />
                      <span className="text-[#dcddde] text-sm group-hover:text-white">{city}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Список школ */}
              {step === "school" && (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {filteredSchools.map(school => (
                    <button
                      key={school}
                      onClick={() => { setSelectedSchool(school); setShowCityModal(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-[#40444b] transition-colors group"
                    >
                      <School className="w-4 h-4 text-[#3ba55c] flex-shrink-0" />
                      <span className="text-[#dcddde] text-sm group-hover:text-white">{school}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => { setSelectedSchool("Другая школа"); setShowCityModal(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-[#40444b] transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#8e9297] flex-shrink-0" />
                    <span className="text-[#8e9297] text-sm">Моей школы нет в списке</span>
                  </button>
                </div>
              )}

              {/* Назад */}
              {step === "school" && (
                <button
                  onClick={() => { setStep("city"); setSelectedCity(""); }}
                  className="mt-4 text-[#8e9297] text-sm hover:text-[#dcddde] flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Сменить город
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Навигация */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">ДомашкаМаркет</h1>
              <p className="text-xs text-[#b9bbbe] hidden sm:block">Анонимный маркетплейс для школьников</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Button
              className="bg-[#3ba55c] hover:bg-[#2d8049] text-white px-5 py-2 rounded text-sm font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Разместить объявление
            </Button>
            <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]">
              Войти
            </Button>
            <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
              Начать
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#202225]">
            <div className="flex flex-col gap-3">
              <Button className="bg-[#3ba55c] hover:bg-[#2d8049] text-white rounded justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Разместить объявление
              </Button>
              <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                Войти
              </Button>
              <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white rounded">
                Начать
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Макет в стиле Discord */}
      <div className="flex min-h-screen">
        {/* Боковая панель серверов */}
        <div className="hidden lg:flex w-[72px] bg-[#202225] flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#36393f] rounded-full"></div>
          {["М", "Ф", "А", "Г", "Х", "Б"].map((letter, i) => (
            <div
              key={i}
              className="w-12 h-12 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2]"
            >
              <span className="text-[#dcddde] text-sm font-medium">{letter}</span>
            </div>
          ))}
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Боковая панель каналов */}
          <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-64 bg-[#2f3136] flex flex-col`}>
            <div className="p-4 border-b border-[#202225] flex items-center justify-between">
              <h2 className="text-white font-semibold text-base">ДомашкаМаркет</h2>
              <Button
                variant="ghost"
                className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 p-2 overflow-y-auto">

              {/* Кнопка разместить объявление */}
              <div className="mb-3">
                <Button className="w-full bg-[#3ba55c] hover:bg-[#2d8049] text-white text-sm rounded flex items-center gap-2 justify-center py-2">
                  <Plus className="w-4 h-4" />
                  Разместить объявление
                </Button>
              </div>

              {/* Город и школа */}
              <div className="mb-3 bg-[#36393f] rounded-lg p-2.5 space-y-2">
                <button
                  onClick={() => { setShowCityModal(true); setStep("city"); setSelectedCity(""); setSelectedSchool(""); setCitySearch(""); }}
                  className="w-full flex items-center gap-2 group hover:opacity-80 transition-opacity"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#5865f2] flex-shrink-0" />
                  <span className="text-xs text-[#8e9297] truncate flex-1 text-left">
                    {selectedCity || <span className="text-[#5865f2]">Выбрать город</span>}
                  </span>
                  {selectedCity && <ChevronRight className="w-3 h-3 text-[#8e9297]" />}
                </button>
                {selectedCity && (
                  <button
                    onClick={() => { setShowCityModal(true); setStep("school"); setSchoolSearch(""); }}
                    className="w-full flex items-center gap-2 group hover:opacity-80 transition-opacity"
                  >
                    <School className="w-3.5 h-3.5 text-[#3ba55c] flex-shrink-0" />
                    <span className="text-xs text-[#8e9297] truncate flex-1 text-left">
                      {selectedSchool || <span className="text-[#3ba55c]">Выбрать школу</span>}
                    </span>
                    {selectedSchool && <ChevronRight className="w-3 h-3 text-[#8e9297]" />}
                  </button>
                )}
              </div>

              {/* Предметы */}
              <div className="mb-2">
                <button
                  className="flex items-center gap-1 w-full px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide hover:text-[#dcddde]"
                  onClick={() => setSubjectsOpen(!subjectsOpen)}
                >
                  {subjectsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  <span>Предметы</span>
                </button>
                {subjectsOpen && (
                  <div className="mt-1 space-y-0.5 max-h-52 overflow-y-auto">
                    {SUBJECTS.map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                      >
                        <Hash className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm truncate">{subject.toLowerCase()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Контрольные по классам */}
              <div className="mb-2">
                <button
                  className="flex items-center gap-1 w-full px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide hover:text-[#dcddde]"
                  onClick={() => setClassesOpen(!classesOpen)}
                >
                  {classesOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  <span>Контрольные</span>
                </button>
                {classesOpen && (
                  <div className="mt-1 space-y-0.5">
                    {CLASSES.map((cls) => (
                      <div
                        key={cls}
                        className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                      >
                        <GraduationCap className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{cls}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Аноним */}
            <div className="p-2 bg-[#292b2f] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">Аноним</div>
                <div className="text-[#b9bbbe] text-xs truncate">100% анонимно</div>
              </div>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
                <Settings className="w-4 h-4 text-[#b9bbbe]" />
              </Button>
            </div>
          </div>

          {/* Область чата */}
          <div className="flex-1 flex flex-col">
            {/* Заголовок чата */}
            <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2">
              <Button
                variant="ghost"
                className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-2"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Hash className="w-5 h-5 text-[#8e9297]" />
              <span className="text-white font-semibold">математика</span>
              <div className="w-px h-6 bg-[#40444b] mx-2 hidden sm:block"></div>
              <span className="text-[#8e9297] text-sm hidden sm:block">Покупай и продавай решения анонимно</span>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              </div>
            </div>

            {/* Вкладки */}
            <div className="bg-[#2f3136] border-b border-[#202225] flex">
              <button
                onClick={() => setActiveTab("feed")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "feed"
                    ? "border-[#5865f2] text-white"
                    : "border-transparent text-[#8e9297] hover:text-[#dcddde]"
                }`}
              >
                <Hash className="w-4 h-4" />
                Лента
              </button>
              <button
                onClick={() => setActiveTab("recommendations")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "recommendations"
                    ? "border-[#5865f2] text-white"
                    : "border-transparent text-[#8e9297] hover:text-[#dcddde]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Рекомендации
              </button>
            </div>

            {/* Контент вкладок */}
            <div className="flex-1 p-2 sm:p-4 overflow-y-auto">

              {/* === ЛЕНТА === */}
              {activeTab === "feed" && (
                <div className="space-y-4 sm:space-y-6">

                  {/* Приветственное сообщение бота */}
                  <div className="flex gap-2 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-white font-medium text-sm sm:text-base">ДомашкаБот</span>
                        <span className="bg-[#5865f2] text-white text-xs px-1.5 py-0.5 rounded font-medium">БОТ</span>
                        <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 09:00</span>
                      </div>
                      <div className="text-[#dcddde] text-sm sm:text-base">
                        <p className="mb-3">
                          <strong>Добро пожаловать в ДомашкаМаркет!</strong> Анонимная биржа готовых решений для школьников.
                        </p>
                        <div className="bg-[#2f3136] border-l-4 border-[#5865f2] p-3 sm:p-4 rounded">
                          <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Как это работает:</h3>
                          <ul className="space-y-1 text-xs sm:text-sm text-[#b9bbbe]">
                            <li>📚 Выбери свою школу и класс</li>
                            <li>🛒 Найди нужный предмет и купи готовое решение</li>
                            <li>💰 Продавай свои решения — устанавливай любую цену</li>
                            <li>🔒 Полная анонимность — никто не узнает</li>
                            <li>⚡ Комиссия платформы — всего 5% с продажи</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Пример объявления */}
                  <div className="flex gap-2 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm font-medium">А</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-white font-medium text-sm sm:text-base">Аноним#7731</span>
                        <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 10:22</span>
                      </div>
                      <div className="text-[#dcddde] mb-3 text-sm sm:text-base">
                        Сделаю домашку по математике за 100 рублей, быстро и правильно 🔥
                      </div>
                      <div className="bg-[#2f3136] border border-[#202225] rounded-lg overflow-hidden w-full max-w-sm">
                        <div className="h-2 bg-gradient-to-r from-[#5865f2] to-[#7c3aed]"></div>
                        <div className="p-3 sm:p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5865f2] to-[#7c3aed] rounded-lg flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-xs sm:text-sm">Домашка по математике</div>
                              <div className="text-[#dcddde] text-xs sm:text-sm">9 класс · Алгебра</div>
                              <div className="text-[#b9bbbe] text-xs">ГОУ СОШ №45, Москва</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-[#faa61a] fill-[#faa61a]" />
                              <span className="text-[#faa61a] text-xs font-medium">4.9 (32 отзыва)</span>
                            </div>
                            <div className="text-[#3ba55c] font-bold text-base sm:text-lg">100 ₽</div>
                          </div>
                          <Button className="w-full mt-3 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs sm:text-sm rounded">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Купить решение
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Второй пример */}
                  <div className="flex gap-2 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm font-medium">К</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-white font-medium text-sm sm:text-base">Аноним#2290</span>
                        <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 10:35</span>
                      </div>
                      <div className="text-[#dcddde] text-sm sm:text-base">
                        Купил, всё верно — пять! Спасибо 🙏
                      </div>
                    </div>
                  </div>

                  {/* Рекламный блок */}
                  <div className="flex gap-2 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#faa61a] rounded-full flex items-center justify-center flex-shrink-0">
                      <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-white font-medium text-sm sm:text-base">РекламаБот</span>
                        <span className="bg-[#faa61a] text-white text-xs px-1.5 py-0.5 rounded font-medium">РЕКЛАМА</span>
                        <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 11:00</span>
                      </div>
                      <div className="bg-[#2f3136] border border-[#faa61a]/30 rounded-lg p-3 sm:p-4 max-w-sm">
                        <div className="text-[#faa61a] text-xs font-semibold uppercase tracking-wide mb-1">Спонсорское место</div>
                        <div className="text-white font-semibold text-sm mb-1">Разместить рекламу — 79 ₽</div>
                        <div className="text-[#b9bbbe] text-xs">Цена растёт вместе с аудиторией. Успей разместиться дёшево!</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* === РЕКОМЕНДАЦИИ === */}
              {activeTab === "recommendations" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#faa61a]" />
                    <h2 className="text-white font-semibold text-base">Популярные услуги и репетиторы</h2>
                  </div>

                  {/* Фильтры */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {["Все", "Услуги", "Репетиторы"].map((f) => (
                      <button
                        key={f}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#40444b] text-[#dcddde] hover:bg-[#5865f2] hover:text-white transition-colors"
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {RECOMMENDATIONS.map((item, i) => (
                      <div key={i} className="bg-[#2f3136] border border-[#202225] rounded-xl p-4 hover:border-[#5865f2]/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-[#40444b] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="text-white font-medium text-sm leading-tight">{item.title}</div>
                              {item.badge && (
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                                  item.badge === "Репетитор"
                                    ? "bg-[#7c3aed]/30 text-[#a78bfa]"
                                    : "bg-[#faa61a]/20 text-[#faa61a]"
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="w-3 h-3 text-[#faa61a] fill-[#faa61a]" />
                              <span className="text-[#faa61a] text-xs">{item.rating}</span>
                              <span className="text-[#72767d] text-xs">({item.reviews} отзывов)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[#3ba55c] font-bold text-sm">{item.price}</span>
                              <Button size="sm" className="bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs rounded px-3 h-7">
                                Заказать
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Стать репетитором */}
                  <div className="mt-6 bg-gradient-to-r from-[#5865f2]/20 to-[#7c3aed]/20 border border-[#5865f2]/30 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-[#5865f2]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-[#818cf8]" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="text-white font-semibold mb-1">Хочешь стать репетитором?</div>
                      <div className="text-[#b9bbbe] text-sm">Размести своё объявление и зарабатывай. Комиссия всего 5%.</div>
                    </div>
                    <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white rounded px-5 flex-shrink-0">
                      <Plus className="w-4 h-4 mr-2" />
                      Разместить
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Поле ввода */}
            <div className="p-2 sm:p-4 bg-[#36393f]">
              <div className="bg-[#40444b] rounded-lg flex items-center px-3 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-3">
                <div className="flex-1 text-[#72767d] text-sm">Поиск по предметам, школам, заданиям...</div>
                <Search className="w-5 h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              </div>
            </div>
          </div>

          {/* Правая панель */}
          <div className="hidden xl:block w-60 bg-[#2f3136] p-4">
            <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-3">Топ продавцов</h3>
            <div className="space-y-3">
              {[
                { name: "Аноним#7731", rating: "4.9", sales: "128 продаж", color: "from-purple-500 to-pink-500" },
                { name: "Аноним#4402", rating: "4.8", sales: "95 продаж", color: "from-blue-500 to-cyan-500" },
                { name: "Аноним#9913", rating: "4.7", sales: "67 продаж", color: "from-green-500 to-teal-500" },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{user.name}</div>
                    <div className="text-[#b9bbbe] text-xs">⭐ {user.rating} · {user.sales}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#202225]">
              <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-3">Популярные предметы</h3>
              <div className="flex flex-wrap gap-2">
                {["Математика", "Физика", "История", "Химия", "Биология", "Информатика"].map((subj) => (
                  <span key={subj} className="text-xs bg-[#40444b] text-[#dcddde] px-2 py-1 rounded cursor-pointer hover:bg-[#5865f2] transition-colors">
                    {subj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Секция возможностей */}
      <div className="bg-[#2f3136] py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Почему выбирают ДомашкаМаркет?
            </h2>
            <p className="text-[#b9bbbe] text-base sm:text-lg max-w-2xl mx-auto">
              Анонимная платформа, где каждый школьник может купить или продать готовое решение
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: <Lock className="w-6 h-6 text-[#5865f2]" />, title: "Полная анонимность", desc: "Никаких имён, номеров телефонов или личных данных. Ты просто Аноним#XXXX." },
              { icon: <BookOpen className="w-6 h-6 text-[#5865f2]" />, title: "Выбор своей школы", desc: "Решения подобраны под конкретную школу и программу — ответы будут правильными." },
              { icon: <Zap className="w-6 h-6 text-[#5865f2]" />, title: "Свои цены", desc: "Продавец сам устанавливает цену. Платформа берёт только 5% комиссии с каждой сделки." },
              { icon: <Shield className="w-6 h-6 text-[#5865f2]" />, title: "Безопасные сделки", desc: "Деньги хранятся на платформе до подтверждения получения. Никаких мошенников." },
              { icon: <Eye className="w-6 h-6 text-[#5865f2]" />, title: "Любые запросы", desc: "Домашние задания, контрольные, рефераты, ЕГЭ — любые учебные задачи." },
              { icon: <Percent className="w-6 h-6 text-[#5865f2]" />, title: "Честная комиссия 5%", desc: "Минимальная комиссия — 5% только с продавца. Покупатель платит ровно столько, сколько указано." },
            ].map((feature, i) => (
              <div key={i} className="bg-[#36393f] rounded-xl p-4 sm:p-6 hover:bg-[#393c43] transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2]/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-[#b9bbbe] text-xs sm:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Реклама и спонсорство */}
      <div className="bg-[#202225] py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 bg-[#faa61a]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Megaphone className="w-7 h-7 text-[#faa61a]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Реклама и спонсорство</h2>
          <p className="text-[#b9bbbe] text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Сейчас разместить рекламу можно всего за <span className="text-[#faa61a] font-bold">79 ₽</span>. Цена растёт по мере роста аудитории — успей зайти первым!
          </p>
          <div className="bg-[#2f3136] border border-[#faa61a]/30 rounded-2xl p-6 sm:p-8 max-w-sm mx-auto">
            <div className="text-[#faa61a] text-4xl font-bold mb-2">79 ₽</div>
            <div className="text-[#8e9297] text-sm mb-6">за размещение рекламы · цена растёт</div>
            <ul className="text-[#b9bbbe] text-sm space-y-2 mb-6 text-left">
              <li>✅ Баннер в ленте всех пользователей</li>
              <li>✅ Ссылка на ваш ресурс</li>
              <li>✅ Целевая аудитория — школьники</li>
              <li>✅ Рост охватов каждую неделю</li>
            </ul>
            <Button className="w-full bg-[#faa61a] hover:bg-[#e8960f] text-[#202225] font-bold rounded">
              Разместить рекламу
            </Button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#5865f2] to-[#7c3aed] py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Начни зарабатывать или учиться прямо сейчас
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Зарегистрируйся анонимно — никаких личных данных. Тысячи школьников уже на платформе.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#5865f2] hover:bg-gray-100 font-bold px-8 py-3 rounded-lg text-base">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Купить решение
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-lg text-base">
              <Zap className="w-5 h-5 mr-2" />
              Стать продавцом
            </Button>
          </div>
        </div>
      </div>

      {/* Футер */}
      <div className="bg-[#202225] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">ДомашкаМаркет</span>
          </div>
          <div className="text-[#8e9297] text-sm text-center">
            Комиссия платформы — 5% · Реклама от 79 ₽ · Полная анонимность
          </div>
          <div className="text-[#8e9297] text-xs">© 2024 ДомашкаМаркет</div>
        </div>
      </div>
    </div>
  );
};

export default Index;