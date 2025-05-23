import Link from "next/link"
import { ChefHat } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 dark:bg-zinc-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-orange-600 dark:text-orange-400">
            ハングリーなあなたのためのハングリル
          </h1>
          <p className="text-2xl text-zinc-700 dark:text-zinc-300">
            身近な美味しいレストランを手軽に探そう
          </p>
          <div className="relative w-full max-w-md mx-auto h-64 my-12">
            <div className="absolute inset-0 bg-orange-200 dark:bg-orange-900 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative flex items-center justify-center h-full">
              <ChefHat className="h-40 w-40" />
            </div>
          </div>
          <Link href="/search">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-full"
            >
              スタート！ <ArrowRight className="h-6 w-6 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
