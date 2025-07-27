import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function AdminSubscriptionPage() {
  const currentPlan = {
    name: "Pro Plan",
    price: "$99/month",
    features: [
      "Unlimited Product Uploads",
      "Advanced Analytics",
      "Priority Support",
      "Virtual Try-On Integration",
      "Brand Profile Customization",
    ],
    isCurrent: true,
  }

  const availablePlans = [
    {
      name: "Basic Plan",
      price: "$29/month",
      features: ["100 Product Uploads", "Basic Analytics", "Email Support", "Virtual Try-On Integration"],
      isCurrent: false,
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      features: [
        "All Pro Plan Features",
        "Dedicated Account Manager",
        "Custom Integrations",
        "On-site Training",
        "SLA Guarantee",
      ],
      isCurrent: false,
    },
  ]

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Current Plan</CardTitle>
          <CardDescription>Details of your active subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
            <span className="text-xl font-semibold">{currentPlan.price}</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full">Manage Subscription</Button>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availablePlans.map((plan, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full bg-transparent">
                {plan.name === "Enterprise Plan" ? "Contact Sales" : "Upgrade Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
