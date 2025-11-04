import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import MortgageChart from "./MortgageChart";

interface MortgageResult {
  yearlyData: Array<{
    year: number;
    principal: number;
    totalPaid: number;
  }>;
  regularPayment: number;
  monthlyPayment: number;
  totalPaid: number;
  totalFinancingCost: number;
  downPayment: number;
  yearsToPayoff: number;
  monthsSaved: number;
}

type PaymentFrequency = "weekly" | "biweekly" | "monthly" | "accelerated-biweekly";

export default function MortgageCalculator() {
  const [housePrice, setHousePrice] = useState<string>("400000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [annualRate, setAnnualRate] = useState<string>("5");
  const [years, setYears] = useState<string>("25");
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>("monthly");
  const [annualExtraPayment, setAnnualExtraPayment] = useState<string>("0");
  
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    const price = parseFloat(housePrice);
    if (isNaN(price) || price <= 0) {
      newErrors.housePrice = "Must be a positive number";
    }
    
    const downPmt = parseFloat(downPaymentPercent);
    if (isNaN(downPmt) || downPmt < 0 || downPmt > 100) {
      newErrors.downPaymentPercent = "Must be between 0 and 100";
    }
    
    const rate = parseFloat(annualRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      newErrors.annualRate = "Must be between 0 and 100";
    }
    
    const yearsNum = parseInt(years);
    if (isNaN(yearsNum) || yearsNum <= 0 || !Number.isInteger(yearsNum)) {
      newErrors.years = "Must be a positive integer";
    }

    const extraPayment = parseFloat(annualExtraPayment || "0");
    if (isNaN(extraPayment) || extraPayment < 0) {
      newErrors.annualExtraPayment = "Must be a non-negative number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPaymentsPerYear = () => {
    const frequencyMap = {
      weekly: 52,
      biweekly: 26,
      monthly: 12,
      "accelerated-biweekly": 26,
    };
    return frequencyMap[paymentFrequency];
  };

  const calculateMortgage = () => {
    if (!validateInputs()) return;

    const price = parseFloat(housePrice);
    const downPmt = (parseFloat(downPaymentPercent) / 100) * price;
    const principal = price - downPmt;
    const r = parseFloat(annualRate) / 100;
    const n = parseInt(years);
    const paymentsPerYear = getPaymentsPerYear();
    const extraPayment = parseFloat(annualExtraPayment || "0");

    // Calculate regular payment based on frequency
    let payment: number;
    let monthlyPayment: number;
    
    if (paymentFrequency === "accelerated-biweekly") {
      const monthlyRate = r / 12;
      const monthlyPayments = n * 12;
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, monthlyPayments)) / 
                            (Math.pow(1 + monthlyRate, monthlyPayments) - 1);
      payment = monthlyPayment / 2;
    } else {
      const periodRate = r / paymentsPerYear;
      const totalPayments = n * paymentsPerYear;
      payment = (principal * periodRate * Math.pow(1 + periodRate, totalPayments)) / 
                (Math.pow(1 + periodRate, totalPayments) - 1);
      
      // Calculate equivalent monthly payment
      const monthlyRate = r / 12;
      const monthlyPayments = n * 12;
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, monthlyPayments)) / 
                       (Math.pow(1 + monthlyRate, monthlyPayments) - 1);
    }

    // Calculate year-by-year breakdown with extra payments
    const yearlyData = [];
    let remainingPrincipal = principal;
    const periodRate = r / paymentsPerYear;
    let totalPaidAmount = downPmt;
    let actualYears = 0;

    for (let year = 0; year <= n; year++) {
      if (remainingPrincipal <= 0) {
        actualYears = year;
        break;
      }

      const principalPaid = principal - remainingPrincipal;
      
      yearlyData.push({
        year,
        principal: Math.round((downPmt + principalPaid) * 100) / 100,
        totalPaid: Math.round(totalPaidAmount * 100) / 100,
      });

      // Calculate remaining principal for next year
      if (year < n && remainingPrincipal > 0) {
        for (let i = 0; i < paymentsPerYear; i++) {
          if (remainingPrincipal <= 0) break;
          
          const returnPayment = remainingPrincipal * periodRate;
          const principalPayment = payment - returnPayment;
          remainingPrincipal -= principalPayment;
          totalPaidAmount += payment;
          
          if (remainingPrincipal < 0) remainingPrincipal = 0;
        }
        
        // Apply annual extra payment at end of year
        if (extraPayment > 0 && remainingPrincipal > 0) {
          const extraApplied = Math.min(extraPayment, remainingPrincipal);
          remainingPrincipal -= extraApplied;
          totalPaidAmount += extraApplied;
        }
      }
      
      actualYears = year + 1;
    }

    // Add final data point if paid off early
    if (remainingPrincipal <= 0 && actualYears < n) {
      yearlyData.push({
        year: actualYears,
        principal: Math.round((downPmt + principal) * 100) / 100,
        totalPaid: Math.round(totalPaidAmount * 100) / 100,
      });
    }

    const totalFinancingCost = totalPaidAmount - downPmt - principal;
    const originalMonths = n * 12;
    const actualMonths = actualYears * 12;
    const monthsSaved = originalMonths - actualMonths;

    setResult({
      yearlyData,
      regularPayment: Math.round(payment * 100) / 100,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPaid: Math.round(totalPaidAmount * 100) / 100,
      totalFinancingCost: Math.round(totalFinancingCost * 100) / 100,
      downPayment: Math.round(downPmt * 100) / 100,
      yearsToPayoff: actualYears,
      monthsSaved: monthsSaved,
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [housePrice, downPaymentPercent, annualRate, years, paymentFrequency, annualExtraPayment]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getFrequencyLabel = () => {
    const labels = {
      weekly: "Weekly",
      biweekly: "Bi-weekly",
      monthly: "Monthly",
      "accelerated-biweekly": "Accelerated Bi-weekly",
    };
    return labels[paymentFrequency];
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3 py-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Mortgage Calculator
          </h1>
          <p className="text-gray-400 text-xl">
            Plan your home purchase with confidence
          </p>
        </div>

        {result && (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center py-4">
            <div className="bg-slate-800/90 backdrop-blur rounded-2xl px-6 py-5 shadow-xl border border-slate-700">
              <p className="text-sm text-gray-400 mb-1">Monthly Payment</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {formatCurrency(result.monthlyPayment)}
              </p>
            </div>

            <div className="bg-slate-800/90 backdrop-blur rounded-2xl px-6 py-5 shadow-xl border border-slate-700">
              <p className="text-sm text-gray-400 mb-1">{getFrequencyLabel()} Payment</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {formatCurrency(result.regularPayment)}
              </p>
            </div>

            {parseFloat(annualExtraPayment || "0") > 0 && result.monthsSaved > 0 && (
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl px-6 py-5 shadow-xl border border-purple-500">
                <p className="text-sm text-white/90 mb-1">You'll Pay Off Early</p>
                <p className="text-3xl font-bold text-white">
                  {Math.floor(result.monthsSaved / 12)}y {result.monthsSaved % 12}m
                </p>
                <p className="text-xs text-white/80 mt-1">
                  Finish in {result.yearsToPayoff} years
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-100">Mortgage Details</CardTitle>
              <CardDescription className="text-gray-400">Enter your home purchase information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-200">
                  House Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={housePrice}
                  onChange={(e) => setHousePrice(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.housePrice ? "border-red-500" : ""}`}
                  placeholder="400000"
                />
                {errors.housePrice && (
                  <p className="text-sm text-red-400">{errors.housePrice}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="downpayment" className="text-sm font-medium text-gray-200">
                  Down Payment (%)
                </Label>
                <Input
                  id="downpayment"
                  type="number"
                  step="0.1"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.downPaymentPercent ? "border-red-500" : ""}`}
                  placeholder="20"
                />
                {errors.downPaymentPercent && (
                  <p className="text-sm text-red-400">{errors.downPaymentPercent}</p>
                )}
                {result && (
                  <p className="text-xs text-gray-500">
                    Down payment amount: {formatCurrency(result.downPayment)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate" className="text-sm font-medium text-gray-200">
                  Annual Rate (%)
                </Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.annualRate ? "border-red-500" : ""}`}
                  placeholder="5"
                />
                {errors.annualRate && (
                  <p className="text-sm text-red-400">{errors.annualRate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="years" className="text-sm font-medium text-gray-200">
                  Amortization Period (Years)
                </Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.years ? "border-red-500" : ""}`}
                  placeholder="25"
                />
                {errors.years && (
                  <p className="text-sm text-red-400">{errors.years}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-sm font-medium text-gray-200">
                  Payment Frequency
                </Label>
                <Select value={paymentFrequency} onValueChange={(value: PaymentFrequency) => setPaymentFrequency(value)}>
                  <SelectTrigger className="text-base bg-slate-900 border-slate-600 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="accelerated-biweekly">Accelerated Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700">
                <Label htmlFor="extraPayment" className="text-sm font-medium text-gray-200">
                  Annual Extra Payment ($)
                  <span className="text-gray-500 ml-1">(Optional)</span>
                </Label>
                <Input
                  id="extraPayment"
                  type="number"
                  value={annualExtraPayment}
                  onChange={(e) => setAnnualExtraPayment(e.target.value)}
                  className={`text-lg bg-slate-900 border-slate-600 text-gray-100 ${errors.annualExtraPayment ? "border-red-500" : ""}`}
                  placeholder="0"
                />
                {errors.annualExtraPayment && (
                  <p className="text-sm text-red-400">{errors.annualExtraPayment}</p>
                )}
                <p className="text-xs text-gray-500">
                  Make an extra payment once per year to pay off faster
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {result && (
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="shadow-xl border-slate-700 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium opacity-90">
                        Loan Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {formatCurrency(parseFloat(housePrice) - result.downPayment)}
                      </div>
                      <p className="text-xs mt-2 opacity-90">
                        Amount borrowed
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-xl border-slate-700 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium opacity-90">
                        Total Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{formatCurrency(result.totalPaid)}</div>
                      <p className="text-xs mt-2 opacity-90">
                        Including down payment
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-xl border-slate-700 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium opacity-90">
                        Financing Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{formatCurrency(result.totalFinancingCost)}</div>
                      <p className="text-xs mt-2 opacity-90">
                        Over {result.yearsToPayoff} years
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <MortgageChart data={result.yearlyData} housePrice={parseFloat(housePrice)} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}