import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, DollarSign, PiggyBank, Sparkles } from "lucide-react";

interface ResultsSummaryProps {
  finalValue: number;
  totalContributions: number;
  totalInterest: number;
  years: number;
}

export default function ResultsSummary({
  finalValue,
  totalContributions,
  totalInterest,
  years,
}: ResultsSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const returnPercentage = ((totalInterest / totalContributions) * 100).toFixed(1);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium opacity-90">
              Your Future Wealth
            </CardTitle>
            <Sparkles className="h-5 w-5 opacity-80" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold">{formatCurrency(finalValue)}</div>
          <p className="text-xs mt-2 opacity-90">
            What you'll have in {years} {years === 1 ? 'year' : 'years'}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium opacity-90">
              You'll Invest
            </CardTitle>
            <PiggyBank className="h-5 w-5 opacity-80" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold">{formatCurrency(totalContributions)}</div>
          <p className="text-xs mt-2 opacity-90">
            Total money you put in
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium opacity-90">
              You'll Earn
            </CardTitle>
            <TrendingUp className="h-5 w-5 opacity-80" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold">{formatCurrency(totalInterest)}</div>
          <p className="text-xs mt-2 opacity-90">
            {returnPercentage}% growth from compound interest
          </p>
        </CardContent>
      </Card>
    </div>
  );
}