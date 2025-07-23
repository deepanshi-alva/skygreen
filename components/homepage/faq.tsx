import { faqData } from '@/lib/faqData';

export default function Faqs() {
  return (
    <section className="bg-black text-white px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Got a Question?
          </h2>
          <h3 className="text-3xl font-semibold text-green-500">We have solutions</h3>

          <div className="bg-zinc-900 p-5 rounded-xl shadow-md max-w-sm space-y-4">
            <div className="text-lg font-semibold flex items-center gap-2 text-green-500">
              📄 Download Presentation
            </div>
            <img
              src="/images/logo/logo-bg-remove.png"
              alt="Company Profile"
              className="rounded"
            />
            <p className="text-sm text-zinc-400">
              <strong>German brand</strong> in the renewable energy industry, providing high-quality products and services <strong>since 2003</strong>
            </p>
          </div>
        </div>

        {/* Right Column - Fully Expanded FAQs */}
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border-b border-zinc-700 pb-4"
            >
              <h4 className="text-xl md:text-2xl font-medium text-white">
                {faq.question}
              </h4>
              <p className="mt-2 text-base text-zinc-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
