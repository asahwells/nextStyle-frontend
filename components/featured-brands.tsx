import Image from "next/image"

export function FeaturedBrands() {
  const brands = [
    { name: "Nike", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Adidas", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Zara", logo: "/placeholder.svg?height=60&width=120" },
    { name: "H&M", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Uniqlo", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section className="container py-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Brands</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Discover top brands offering the latest fashion trends.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center h-20 w-32">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} Logo`}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
