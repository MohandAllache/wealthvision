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
  totalPaid: number;
}

interface MortgageChartProps {
  data: ChartData[];
  housePrice: number;
}

export default function MortgageChart({ data, housePrice }: MortgageChartProps) {
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
        <div className="bg-slate-800 p-4 rounded-lg shadow-xl border-2 border-slate-600">
          <p className="font-bold text-gray-100 mb-2">After {label} {label === 1 ? 'Year' : 'Years'}</p>
          <div className="space-y-1">
            <p className="text-sm text-cyan-400 font-semibold">
              Total Paid: {formatCurrency(payload[1].value)}
            </p>
            <p className="text-sm text-emerald-400 font-medium">
              Principal Paid: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-sm text-purple-400 font-medium">
              Return Paid: {formatCurrency(payload[1].value - payload[0].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-slate-700 bg-slate-800/90 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-100">Payment Breakdown Over Time</CardTitle>
        <p className="text-sm text-gray-400">
          See how your payments reduce the principal over the years
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
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis
              dataKey="year"
              label={{ value: "Years", position: "insideBottom", offset: -5 }}
              stroke="#94a3b8"
            />
            <YAxis
              tickFormatter={formatCurrency}
              label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
              stroke="#94a3b8"
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
              name="Principal Paid"
            />
            <Area
              type="monotone"
              dataKey="totalPaid"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#colorTotal)"
              name="Total Paid"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
            <div>
              <p className="text-sm font-semibold text-gray-100">Understanding Your Mortgage</p>
              <p className="text-xs text-gray-400 mt-1">
                The <span className="font-semibold text-cyan-400">cyan area</span> shows your total payments including return. 
                The <span className="font-semibold text-emerald-400">green area</span> shows the principal amount you've paid down. 
                The gap between them represents the <span className="font-semibold text-purple-400">return portion</span> of your payments.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
