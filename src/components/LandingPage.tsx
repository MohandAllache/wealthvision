import { Link } from "react-router-dom";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            WealthVision
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Plan your financial future with powerful, easy-to-use calculators
          </p>
          <p className="text-gray-400 max-w-xl mx-auto">
            Make informed decisions about your investments and mortgages with our comprehensive financial planning tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur hover:border-cyan-500 transition-all group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-100">Compound Calculator</CardTitle>
              </div>
              <CardDescription className="text-gray-400">
                Calculate your investment growth over time with compound returns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Project future wealth with regular contributions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Flexible contribution frequencies
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Interactive growth visualization
                </li>
              </ul>
              <Link to="/compound">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                  Start Calculating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur hover:border-emerald-500 transition-all group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-100">Mortgage Calculator</CardTitle>
              </div>
              <CardDescription className="text-gray-400">
                Plan your home purchase with detailed mortgage calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Calculate monthly payments and total cost
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Multiple payment frequency options
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Visualize payment breakdown over time
                </li>
              </ul>
              <Link to="/mortgage">
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all">
                  Start Calculating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold text-gray-100">Why WealthVision?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl">📊</div>
              <h3 className="text-lg font-semibold text-gray-200">Visual Insights</h3>
              <p className="text-sm text-gray-400">
                Interactive charts help you understand your financial trajectory
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">⚡</div>
              <h3 className="text-lg font-semibold text-gray-200">Real-Time Results</h3>
              <p className="text-sm text-gray-400">
                See calculations update instantly as you adjust your inputs
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🎯</div>
              <h3 className="text-lg font-semibold text-gray-200">Accurate Planning</h3>
              <p className="text-sm text-gray-400">
                Make informed decisions with precise financial projections
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
