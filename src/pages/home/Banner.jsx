
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid max-w-screen-xl mx-auto lg:gap-12 xl:gap-16 lg:grid-cols-12 items-center">
          <div className="mr-auto place-self-center lg:col-span-7 space-y-8">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-100 bg-blue-800/50 rounded-full backdrop-blur-sm border border-blue-700/50">
              <Sparkles className="w-4 h-4 mr-2" />
              Latest Tech Collection
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight leading-tight md:text-6xl xl:text-7xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              All Tech
              <span className="block text-blue-300">Accessories</span>
            </h1>

            <p className="max-w-2xl text-lg text-blue-100 lg:text-xl leading-relaxed">
              Discover Innovation: Explore Our Latest Tech Marvels! Shop Now for Cutting-Edge Gadgets and Electronics at
              Unbeatable Prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/login">
                <Button
                  size="lg"
                  className="group bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-300 text-blue-100 hover:bg-blue-800/50 font-semibold px-8 py-6 text-lg rounded-xl backdrop-blur-sm bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="lg:mt-0 lg:col-span-5 lg:flex">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="Tech Device Mockup"
                className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
