import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import InvestmentChart from "./InvestmentChart";
import ResultsSummary from "./ResultsSummary";

interface CalculationResult {
  yearlyData: Array<{
    year: number;
    principal: number;
    totalValue: number;
  }>;
  totalContributions: number;
  totalInterest: number;
  finalValue: number;
}

type ContributionFrequency = "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly";

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("10000");
  const [annualRate, setAnnualRate] = useState<string>("7");
  const [years, setYears] = useState<string>("10");
  const [contributionAmount, setContributionAmount] = useState<string>("500");
  const [contributionFrequency, setContributionFrequency] = useState<ContributionFrequency>("monthly");
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    const initial = parseFloat(initialInvestment);
    if (isNaN(initial) || initial < 0) {
      newErrors.initialInvestment = "Must be a positive number";
    }
    
    const rate = parseFloat(annualRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      newErrors.annualRate = "Must be between 0 and 100";
    }
    
    const yearsNum = parseInt(years);
    if (isNaN(yearsNum) || yearsNum <= 0 || !Number.isInteger(yearsNum)) {
      newErrors.years = "Must be a positive integer";
    }
    
    const contribution = parseFloat(contributionAmount || "0");
    if (isNaN(contribution) || contribution < 0) {
      newErrors.contributionAmount = "Must be a non-negative number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getContributionsPerYear = () => {
    const frequencyMap = {
      weekly: 52,
      biweekly: 26,
      monthly: 12,
      quarterly: 4,
      yearly: 1,
    };
    return frequencyMap[contributionFrequency];
  };

  const calculateFutureValue = () => {
    if (!validateInputs()) return;

    const P = parseFloat(initialInvestment);
    const r = parseFloat(annualRate) / 100;
    const n = parseInt(years);
    const contributionPerPeriod = parseFloat(contributionAmount || "0");
    const periodsPerYear = getContributionsPerYear();
    const totalPeriodsPerYear = periodsPerYear;

    const yearlyData = [];
    let totalContributions = P;

    for (let year = 0; year <= n; year++) {
      const t = year;
      
      // Future value of initial investment
      const futureValueInitial = P * Math.pow(1 + r, t);
      
      // Future value of periodic contributions
      let futureValueContributions = 0;
      if (contributionPerPeriod > 0 && t > 0) {
        const periodRate = r / periodsPerYear;
        const totalPeriods = t * periodsPerYear;
        futureValueContributions = contributionPerPeriod * ((Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate) * (1 + periodRate);
      }
      
      const totalValue = futureValueInitial + futureValueContributions;
      const principal = P + (contributionPerPeriod * periodsPerYear * t);
      
      yearlyData.push({
        year,
        principal: Math.round(principal * 100) / 100,
        totalValue: Math.round(totalValue * 100) / 100,
      });
      
      if (year > 0) {
        totalContributions += contributionPerPeriod * periodsPerYear;
      }
    }

    const finalValue = yearlyData[yearlyData.length - 1].totalValue;
    const totalInterest = finalValue - totalContributions;

    setResult({
      yearlyData,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      finalValue: Math.round(finalValue * 100) / 100,
    });
  };

  useEffect(() => {
    calculateFutureValue();
  }, [initialInvestment, annualRate, years, contributionAmount, contributionFrequency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3 py-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            WealthVision
          </h1>
          <p className="text-muted-foreground text-xl">
            See your financial future, today
          </p>
        </div>

        {result && (
          <div className="text-center py-4">
            <div className="inline-block bg-white/90 backdrop-blur rounded-2xl px-8 py-6 shadow-xl border border-purple-100">
              <p className="text-lg text-gray-600 mb-2">
                In <span className="font-bold text-purple-600">{years} years</span>, you will have
              </p>
              <p className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {formatCurrency(result.finalValue)}
              </p>
              <p className="text-sm text-gray-500 mt-3">
                That's <span className="font-semibold text-emerald-600">{formatCurrency(result.totalInterest)}</span> in interest earnings! 🎉
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Your Investment Plan</CardTitle>
              <CardDescription>Tell us about your financial goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initial" className="text-sm font-medium">
                  Starting Amount ($)
                </Label>
                <Input
                  id="initial"
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  className={`text-lg ${errors.initialInvestment ? "border-red-500" : ""}`}
                  placeholder="10000"
                />
                {errors.initialInvestment && (
                  <p className="text-sm text-red-500">{errors.initialInvestment}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate" className="text-sm font-medium">
                  Expected Annual Return (%)
                </Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className={`text-lg ${errors.annualRate ? "border-red-500" : ""}`}
                  placeholder="7"
                />
                {errors.annualRate && (
                  <p className="text-sm text-red-500">{errors.annualRate}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Historical stock market average: ~10%
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="years" className="text-sm font-medium">
                  Time Horizon (Years)
                </Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className={`text-lg ${errors.years ? "border-red-500" : ""}`}
                  placeholder="10"
                />
                {errors.years && (
                  <p className="text-sm text-red-500">{errors.years}</p>
                )}
              </div>

              <div className="space-y-3 pt-2 border-t">
                <Label className="text-sm font-medium">
                  Regular Contributions
                  <span className="text-muted-foreground ml-1">(Optional)</span>
                </Label>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="contribution" className="text-xs text-muted-foreground">
                      Amount ($)
                    </Label>
                    <Input
                      id="contribution"
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      className={`text-lg ${errors.contributionAmount ? "border-red-500" : ""}`}
                      placeholder="500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="frequency" className="text-xs text-muted-foreground">
                      Frequency
                    </Label>
                    <Select value={contributionFrequency} onValueChange={(value: ContributionFrequency) => setContributionFrequency(value)}>
                      <SelectTrigger className="text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {errors.contributionAmount && (
                  <p className="text-sm text-red-500">{errors.contributionAmount}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {result && (
              <>
                <ResultsSummary
                  finalValue={result.finalValue}
                  totalContributions={result.totalContributions}
                  totalInterest={result.totalInterest}
                  years={parseInt(years)}
                />
                <InvestmentChart data={result.yearlyData} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}