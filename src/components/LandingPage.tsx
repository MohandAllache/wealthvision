import { Link } from "react-router-dom";
import { Calculator, TrendingUp, ArrowRight, DollarSign, Target, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            WealthVision
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-semibold">
            Your Financial Future, Crystal Clear
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Start planning. Make confident financial decisions with powerful calculators 
            that show you exactly where your money will take you.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We believe everyone deserves to understand their financial future. WealthVision empowers you 
              with transparent, easy-to-use tools that demystify complex calculations and help you make 
              informed decisions about your wealth, investments, and major purchases.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <div className="flex items-center gap-2 text-cyan-400">
                <Target className="h-5 w-5" />
                <span className="font-semibold">Clear Goals</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">Instant Results</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">Smart Decisions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-100 text-center mb-8">
            Choose Your Tool
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur hover:border-cyan-500 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-100">Compound Calculator</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Watch your investments grow with the power of compound returns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Project future wealth
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Flexible contributions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Visual growth charts
                  </li>
                </ul>
                <Link to="/compound">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                    Start Planning
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
                  <CardTitle className="text-xl text-gray-100">Mortgage Calculator</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Plan your home purchase with detailed payment breakdowns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Monthly payments
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Early payoff scenarios
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Total cost breakdown
                  </li>
                </ul>
                <Link to="/mortgage">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all">
                    Calculate Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur hover:border-amber-500 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-orange-600 to-amber-600">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-100">Inflation Adjuster</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Understand the real value of your money over time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Future purchasing power
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Historical data insights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Detailed explanations
                  </li>
                </ul>
                <Link to="/inflation">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 group-hover:shadow-lg group-hover:shadow-amber-500/50 transition-all">
                    Check Value
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center space-y-8 py-8">
          <h2 className="text-3xl font-bold text-gray-100">Why Choose WealthVision?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200">Clear & Simple</h3>
              <p className="text-sm text-gray-400">
                No confusing jargon. Just straightforward tools that give you the answers you need.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200">Instant Results</h3>
              <p className="text-sm text-gray-400">
                See your financial future update in real-time as you adjust your plans.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200">Make Smart Choices</h3>
              <p className="text-sm text-gray-400">
                Armed with accurate projections, you can make confident financial decisions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to See Your Financial Future?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands who've taken control of their financial planning with WealthVision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/compound">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold">
                Start with Investments
              </Button>
            </Link>
            <Link to="/mortgage">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                Plan Your Mortgage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}