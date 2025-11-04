import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InflationResult {
  futureValue: number;
  purchasingPowerLoss: number;
  inflationRate: number;
}

export default function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState<string>("1000");
  const [years, setYears] = useState<string>("10");
  const [inflationRate, setInflationRate] = useState<string>("2.5");
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [result, setResult] = useState<InflationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    const amount = parseFloat(currentAmount);
    if (isNaN(amount) || amount <= 0) {
      newErrors.currentAmount = "Must be a positive number";
    }
    
    const yearsNum = parseInt(years);
    if (isNaN(yearsNum) || yearsNum <= 0 || !Number.isInteger(yearsNum)) {
      newErrors.years = "Must be a positive integer";
    }
    
    const rate = parseFloat(inflationRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      newErrors.inflationRate = "Must be between 0 and 100";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateInflation = () => {
    if (!validateInputs()) return;

    const amount = parseFloat(currentAmount);
    const n = parseInt(years);
    const r = parseFloat(inflationRate) / 100;

    // Future value adjusted for inflation
    const futureValue = amount / Math.pow(1 + r, n);
    const purchasingPowerLoss = amount - futureValue;

    setResult({
      futureValue: Math.round(futureValue * 100) / 100,
      purchasingPowerLoss: Math.round(purchasingPowerLoss * 100) / 100,
      inflationRate: parseFloat(inflationRate),
    });
  };

  useEffect(() => {
    calculateInflation();
  }, [currentAmount, years, inflationRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-3 py-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Inflation Adjuster
          </h1>
          <p className="text-gray-400 text-xl">
            Understand the real value of your money over time
          </p>
        </div>

        {result && (
          <div className="text-center py-4">
            <div className="inline-block bg-slate-800/90 backdrop-blur rounded-2xl px-8 py-6 shadow-xl border border-slate-700">
              <p className="text-lg text-gray-300 mb-2">
                {formatCurrency(parseFloat(currentAmount))} today will be worth
              </p>
              <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {formatCurrency(result.futureValue)}
              </p>
              <p className="text-sm text-gray-400 mt-3">
                in <span className="font-bold text-amber-400">{years} years</span> at {inflationRate}% inflation
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-100">Inflation Details</CardTitle>
              <CardDescription className="text-gray-400">Enter your currency information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-gray-200">
                  Current Amount ($)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.currentAmount ? "border-red-500" : ""}`}
                  placeholder="1000"
                />
                {errors.currentAmount && (
                  <p className="text-sm text-red-400">{errors.currentAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="years" className="text-sm font-medium text-gray-200">
                  Time Period (Years)
                </Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.years ? "border-red-500" : ""}`}
                  placeholder="10"
                />
                {errors.years && (
                  <p className="text-sm text-red-400">{errors.years}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="inflation" className="text-sm font-medium text-gray-200">
                  Annual Inflation Rate (%)
                </Label>
                <Input
                  id="inflation"
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.inflationRate ? "border-red-500" : ""}`}
                  placeholder="2.5"
                />
                {errors.inflationRate && (
                  <p className="text-sm text-red-400">{errors.inflationRate}</p>
                )}
                <p className="text-xs text-gray-500">
                  US average (2014-2024): ~2.5% | Historical average: ~3.3%
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {result && (
              <>
                <div className="grid gap-4">
                  <Card className="shadow-xl border-slate-700 bg-gradient-to-br from-orange-600 to-amber-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium opacity-90">
                        Future Purchasing Power
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {formatCurrency(result.futureValue)}
                      </div>
                      <p className="text-xs mt-2 opacity-90">
                        What your money will buy in {years} years
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-xl border-slate-700 bg-gradient-to-br from-red-600 to-rose-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium opacity-90">
                        Purchasing Power Loss
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{formatCurrency(result.purchasingPowerLoss)}</div>
                      <p className="text-xs mt-2 opacity-90">
                        {((result.purchasingPowerLoss / parseFloat(currentAmount)) * 100).toFixed(1)}% decrease in value
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur">
                  <CardHeader>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between text-gray-100 hover:bg-slate-700"
                      onClick={() => setShowExplanation(!showExplanation)}
                    >
                      <span className="text-lg font-semibold">How did we get this number?</span>
                      {showExplanation ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                  </CardHeader>
                  {showExplanation && (
                    <CardContent className="space-y-4 text-gray-300">
                      <div>
                        <h4 className="font-semibold text-amber-400 mb-2">The Calculation</h4>
                        <p className="text-sm">
                          We use the formula: <span className="font-mono bg-slate-900 px-2 py-1 rounded">Future Value = Present Value / (1 + inflation rate)^years</span>
                        </p>
                        <p className="text-sm mt-2">
                          For your inputs: {formatCurrency(parseFloat(currentAmount))} / (1 + {(parseFloat(inflationRate) / 100).toFixed(3)})^{years} = {formatCurrency(result.futureValue)}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-amber-400 mb-2">What This Means</h4>
                        <p className="text-sm">
                          If you keep {formatCurrency(parseFloat(currentAmount))} under your mattress for {years} years, 
                          it will only buy what {formatCurrency(result.futureValue)} can buy today. You'll lose {formatCurrency(result.purchasingPowerLoss)} in purchasing power.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-amber-400 mb-2">Historical Context</h4>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>US inflation averaged 2.5% from 2014-2024</li>
                          <li>Long-term historical average is around 3.3%</li>
                          <li>2022 saw unusually high inflation at 8%</li>
                          <li>The Federal Reserve targets 2% inflation</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-amber-400 mb-2">Why This Matters</h4>
                        <p className="text-sm">
                          Inflation erodes the value of cash over time. To maintain purchasing power, your investments 
                          need to grow faster than inflation. This is why keeping all your money in low-return savings 
                          accounts can actually cause you to lose wealth over time.
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
