"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Women", sales: 4000 },
  { name: "Men", sales: 3000 },
  { name: "Kids", sales: 2000 },
  { name: "Accessories", sales: 2780 },
  { name: "Shoes", sales: 1890 },
]

export function SalesByCategory() {
  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
