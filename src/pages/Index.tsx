
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RevenuePieChart from "@/components/RevenuePieChart";
import RevenueBarChart from "@/components/RevenueBarChart";
import ProductStatsCard from "@/components/ProductStatsCard";
import { mockRevenueData } from "@/data/mockData";

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState("11");
  const [selectedYear, setSelectedYear] = useState("2024");

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = ["2022", "2023", "2024"];

  const currentData = mockRevenueData.find(
    data => data.month === parseInt(selectedMonth) && data.year === parseInt(selectedYear)
  ) || mockRevenueData[0];

  const totalRevenue = currentData.products.reduce((sum, product) => sum + product.revenue, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Revenue Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Track your product performance and revenue trends
          </p>
        </div>

        {/* Controls */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Filter Data
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Month
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Year
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-blue-100 text-sm mt-1">
                {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Products Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {currentData.products.length}
              </div>
              <p className="text-green-100 text-sm mt-1">
                Active products
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Avg. Product Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${Math.round(totalRevenue / currentData.products.length).toLocaleString()}
              </div>
              <p className="text-purple-100 text-sm mt-1">
                Per product
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Revenue Distribution
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Product-wise revenue breakdown
              </p>
            </CardHeader>
            <CardContent>
              <RevenuePieChart data={currentData.products} />
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Revenue Trends
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Monthly performance comparison
              </p>
            </CardHeader>
            <CardContent>
              <RevenueBarChart data={mockRevenueData} />
            </CardContent>
          </Card>
        </div>

        {/* Product Statistics */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Product Performance Details
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Detailed breakdown of each product's contribution
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentData.products.map((product, index) => (
                <ProductStatsCard
                  key={product.name}
                  product={product}
                  totalRevenue={totalRevenue}
                  rank={index + 1}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
