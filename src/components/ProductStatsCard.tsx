
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Product {
  name: string;
  revenue: number;
}

interface ProductStatsCardProps {
  product: Product;
  totalRevenue: number;
  rank: number;
}

const ProductStatsCard = ({ product, totalRevenue, rank }: ProductStatsCardProps) => {
  const percentage = ((product.revenue / totalRevenue) * 100).toFixed(1);
  const isTopPerformer = rank <= 2;

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 ${
      isTopPerformer 
        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500' 
        : 'bg-white hover:bg-gray-50'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1">
              <span className={`text-xs px-2 py-1 rounded-full ${
                isTopPerformer 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                Rank #{rank}
              </span>
            </div>
          </div>
          <div className="text-right">
            {isTopPerformer ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Revenue</span>
            <span className="font-semibold text-gray-800">
              ${product.revenue.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Market Share</span>
            <span className="font-semibold text-blue-600">
              {percentage}%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                isTopPerformer 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-gray-400'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductStatsCard;
