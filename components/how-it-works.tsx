import { Camera, Shirt, CheckCircle } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="container py-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Our virtual try-on process is simple and intuitive.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">1. Upload Your Photo</h3>
            <p className="text-muted-foreground">Upload a full-body photo of yourself to get started.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Shirt className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">2. Choose Clothing</h3>
            <p className="text-muted-foreground">Browse our extensive collection and select items to try on.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">3. See It On You</h3>
            <p className="text-muted-foreground">
              Our AI will render the clothing on your photo, showing you the perfect fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
