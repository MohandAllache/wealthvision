import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ChartData {
  year: number;
  principal: number;
  totalValue: number;
}

interface InvestmentChartProps {
  data: ChartData[];
}

export default function InvestmentChart({ data }: InvestmentChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-purple-200">
          <p className="font-bold text-gray-900 mb-2">After {label} {label === 1 ? 'Year' : 'Years'}</p>
          <div className="space-y-1">
            <p className="text-sm text-violet-600 font-semibold">
              💰 Total Value: {formatCurrency(payload[1].value)}
            </p>
            <p className="text-sm text-emerald-600 font-medium">
              📊 Your Contributions: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-sm text-fuchsia-600 font-medium">
              ✨ Interest Earned: {formatCurrency(payload[1].value - payload[0].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl">Your Wealth Growth Journey</CardTitle>
        <p className="text-sm text-muted-foreground">
          Watch your money grow year by year
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="year"
              label={{ value: "Years", position: "insideBottom", offset: -5 }}
              stroke="#6b7280"
            />
            <YAxis
              tickFormatter={formatCurrency}
              label={{ value: "Value ($)", angle: -90, position: "insideLeft" }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
            />
            <Area
              type="monotone"
              dataKey="principal"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorPrincipal)"
              name="Your Contributions"
            />
            <Area
              type="monotone"
              dataKey="totalValue"
              stroke="#a855f7"
              strokeWidth={3}
              fill="url(#colorTotal)"
              name="Total Value"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-lg border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
            <div>
              <p className="text-sm font-semibold text-gray-900">💡 How It Works</p>
              <p className="text-xs text-gray-600 mt-1">
                The <span className="font-semibold text-purple-600">purple area</span> shows your total wealth including compound interest. 
                The <span className="font-semibold text-emerald-600">green area</span> shows what you actually put in. 
                The gap between them is the <span className="font-semibold text-fuchsia-600">magic of compound interest</span> working for you! 🚀
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}