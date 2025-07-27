import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah J.",
      avatar: "/placeholder.svg?height=50&width=50",
      quote: "This virtual try-on is a game-changer! I can finally see how clothes fit before buying.",
    },
    {
      name: "John D.",
      avatar: "/placeholder.svg?height=50&width=50",
      quote: "No more guessing games. NextStyle saved me so much time and hassle with returns.",
    },
    {
      name: "Emily R.",
      avatar: "/placeholder.svg?height=50&width=50",
      quote: "The AI is incredibly accurate. It's like having a personal stylist at home.",
    },
  ]

  return (
    <section className="container py-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Hear from our satisfied customers who have transformed their shopping experience.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-lg font-semibold">{testimonial.name}</p>
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
