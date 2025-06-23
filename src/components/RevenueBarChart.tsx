
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Product {
  name: string;
  revenue: number;
}

interface MonthlyData {
  month: number;
  year: number;
  products: Product[];
}

interface RevenueBarChartProps {
  data: MonthlyData[];
}

const RevenueBarChart = ({ data }: RevenueBarChartProps) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const chartData = data.map(monthData => {
    const totalRevenue = monthData.products.reduce((sum, product) => sum + product.revenue, 0);
    return {
      month: monthNames[monthData.month - 1],
      totalRevenue,
      productCount: monthData.products.length,
      avgRevenue: Math.round(totalRevenue / monthData.products.length),
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === 'totalRevenue' && `Total Revenue: $${entry.value.toLocaleString()}`}
              {entry.dataKey === 'avgRevenue' && `Avg Revenue: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="totalRevenue" 
            fill="#3B82F6" 
            name="Total Revenue"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
          <Bar 
            dataKey="avgRevenue" 
            fill="#10B981" 
            name="Avg Revenue"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueBarChart;
