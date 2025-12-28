'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../components/ClientLayout'

export default function BedCloths() {
  const { language } = useLanguage()
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const content = {
    hero: {
      title: {
        en: 'Bed Cloths Products',
        fa: 'محصولات لوازم خواب'
      },
      description: {
        en: 'High-quality thermofuse pads for various bedding and clothing applications',
        fa: 'لایی‌های ترموفیوز با کیفیت بالا برای کاربردهای مختلف لوازم خواب و پوشاک'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-laeisaz-title">
          <div className="absolute inset-0 bg-[url('/images/optimized/background2.webp')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {content.hero.title[language]}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {content.hero.description[language]}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Middle Section - Thermofuse Pads Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-laeisaz-title mb-6">
                {language === 'en' ? 'Thermofuse Pads Applications' : 'کاربردهای لایی ترموفیوز'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'en' 
                  ? 'Thermofuse pads are produced from 100 to 800 grams per square meter, and up to a width of 2400 mm. These products are employed in the making of duvets and sleeping bags, cotton embroidery industrial filters, etc.'
                  : 'لایی‌های ترموفیوز با وزن 100 تا 800 گرم در متر مربع و عرض تا 2400 میلی‌متر تولید می‌شوند. این محصولات در ساخت لحاف و کیسه خواب، فیلترهای صنعتی گلدوزی پنبه و غیره استفاده می‌شوند.'}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-32">
            {/* Swan Thermofuse */}
            <AnimateOnScroll className="delay-200">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/swan-thermofuse.jpg"
                      alt={language === 'en' ? 'Swan Thermofuse' : 'ترموفیوز قو'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Swan Thermofuse' : 'ترموفیوز قو'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'In the production of this product, first, special fibers (soft and with high elasticity) enter the machine and are battered in several stages. Following in stages again, these fibers are battered and formed into a swan thermofuse. Swam thermofuse is employed in the making of sleeping goods, furniture, and clothing.'
                      : 'در تولید این محصول، ابتدا الیاف مخصوص (نرم و با کشسانی بالا) وارد دستگاه می‌شوند و در چند مرحله کوبیده می‌شوند. سپس در مراحل بعدی، این الیاف دوباره کوبیده شده و به شکل ترموفیوز قو در می‌آیند. ترموفیوز قو در ساخت لوازم خواب، مبلمان و پوشاک استفاده می‌شود.'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Royal Thermofuse */}
            <AnimateOnScroll className="delay-300">
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/royal-thermofuse.jpg"
                      alt={language === 'en' ? 'Royal Thermofuse' : 'ترموفیوز رویال'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Royal Thermofuse' : 'ترموفیوز رویال'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'The production technology of this pad is similar to that of a swan thermofuse, with the difference being that the royal thermofuse\' fibers are drier and less elastic in comparison to the prior. This pad is similarly employed in the making of sleeping goods and clothing items.'
                      : 'تکنولوژی تولید این لایی مشابه ترموفیوز قو است، با این تفاوت که الیاف ترموفیوز رویال خشک‌تر و کم‌کش‌تر از قبلی هستند. این لایی نیز در ساخت لوازم خواب و اقلام پوشاک استفاده می‌شود.'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Star Thermofuse */}
            <AnimateOnScroll className="delay-400">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/star-thermofuse.jpg"
                      alt={language === 'en' ? 'Star Thermofuse' : 'ترموفیوز استار'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Star Thermofuse' : 'ترموفیوز استار'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'This pad is also produced like Royal and Asa thermofuses, respectively. The difference is that the star thermofuse maintains a denser texture, and is usually produced at lower temperatures. Star thermofuse is employed in the making of clothing items, kitchen hood filters, and filtration in general.'
                      : 'این لایی نیز مانند ترموفیوزهای رویال و آسا تولید می‌شود. تفاوت در این است که ترموفیوز استار بافت متراکم‌تری دارد و معمولاً در دمای پایین‌تری تولید می‌شود. ترموفیوز استار در ساخت اقلام پوشاک، فیلترهای هود آشپزخانه و فیلتراسیون عمومی استفاده می‌شود.'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Asa Thermofuse */}
            <AnimateOnScroll className="delay-500">
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/asa-thermofuse.jpg"
                      alt={language === 'en' ? 'Asa Thermofuse' : 'ترموفیوز آسا'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-laeisaz-title mb-6">
                    {language === 'en' ? 'Asa Thermofuse' : 'ترموفیوز آسا'}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {language === 'en'
                      ? 'The production technology used in the making of this pad is the same as Royal thermofuse. With the difference being that Asa thermofuse pas has a more compact texture and less flexibility. Asa thermofuse is employed in the making of sleeping goods (mattresses) and furniture.'
                      : 'تکنولوژی تولید استفاده شده در ساخت این لایی همانند ترموفیوز رویال است. با این تفاوت که لایی ترموفیوز آسا بافت فشرده‌تر و انعطاف‌پذیری کمتری دارد. ترموفیوز آسا در ساخت لوازم خواب (تشک) و مبلمان استفاده می‌شود.'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Features Section */}
            <AnimateOnScroll className="delay-600">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-3xl font-bold text-laeisaz-title mb-6 text-center">
                  {language === 'en' ? 'Features of Thermofuse Pads' : 'ویژگی‌های لایی‌های ترموفیوز'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(language === 'en' ? [
                    'Affordable',
                    'Eco-friendly',
                    'Homogeneity with surface materials',
                    'Can be produced from recycled fibers',
                    'Has elasticity and reversibility',
                    'Reduces air particles and unwanted odors'
                  ] : [
                    'مقرون به صرفه',
                    'دوستدار محیط زیست',
                    'همگنی با مواد سطحی',
                    'قابل تولید از الیاف بازیافتی',
                    'دارای کشسانی و برگشت‌پذیری',
                    'کاهش ذرات هوا و بوی نامطلوب'
                  ]).map((feature, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-laeisaz-title text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold mb-8">
              {language === 'en' ? 'Interested in Our Bed Cloths Products?' : 'علاقه‌مند به محصولات لوازم خواب ما هستید؟'}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-200">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {language === 'en' ? 'Contact our sales team for detailed specifications and pricing' : 'برای دریافت مشخصات فنی و قیمت‌ها با تیم فروش ما تماس بگیرید'}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll className="delay-300">
            <Link
              href="/contact"
              className="bg-white text-laeisaz-title px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              {language === 'en' ? 'Contact Sales' : 'تماس با فروش'}
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
} 