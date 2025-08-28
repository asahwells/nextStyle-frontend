import Button from "@/components/Button"

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
        <div className="container relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Try On Clothes Virtually</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience the future of online shopping with AI-powered virtual try-on
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Trying On
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Browse Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="/product1.jpg" alt="Product 1" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-4">Product description goes here.</p>
                <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                  Add to Cart
                </Button>
              </div>
            </div>
            {/* More Product Cards */}
            {/* ... */}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-black text-white text-center">
        <div className="container">
          <p>&copy; 2023 NextStyle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Page
