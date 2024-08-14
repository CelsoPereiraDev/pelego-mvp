"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

interface RadarGraphicProps {
  title: string
  description: string
  footer?: React.ReactNode
  chartData: Array<{ stat: string, valor: number }>
  chartConfig: ChartConfig
}

export function RadarGraphic({ title, description, footer, chartData, chartConfig }: RadarGraphicProps) {
  return (
    <Card className="w-auto">
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-[hsl(var(--foreground))]">{title}</CardTitle>
        <CardDescription className="text-[hsl(var(--muted-foreground))]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="stat" stroke="hsl(var(--foreground))" />
            <PolarGrid stroke="hsl(var(--muted-foreground))" />
            <Radar
              dataKey="valor"
              fill={chartConfig.desktop.color}
              fillOpacity={0.6}
              stroke={chartConfig.desktop.color}
              
            />
          </RadarChart>
        </ChartContainer>
        <CardFooter>
          {footer}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
