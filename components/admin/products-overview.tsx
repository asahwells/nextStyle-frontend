"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", "Active Products": 100, "New Products": 10 },
  { month: "Feb", "Active Products": 120, "New Products": 15 },
  { month: "Mar", "Active Products": 150, "New Products": 20 },
  { month: "Apr", "Active Products": 140, "New Products": 12 },
  { month: "May", "Active Products": 160, "New Products": 18 },
  { month: "Jun", "Active Products": 180, "New Products": 25 },
  { month: "Jul", "Active Products": 200, "New Products": 30 },
]

export function ProductsOverview() {
  return (
    <ChartContainer
      config={{
        "Active Products": {
          label: "Active Products",
          color: "hsl(var(--primary))",
        },
        "New Products": {
          label: "New Products",
          color: "hsl(var(--secondary))",
        },
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="Active Products" stroke="var(--color-Active-Products)" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="New Products" stroke="var(--color-New-Products)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
