import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  ageRange: string;
  isNew?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {product.isNew && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground font-bold">
            НОВИНКА
          </Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold">
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <Badge variant="secondary" className="ml-2 whitespace-nowrap">
            {product.ageRange}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {discountedPrice.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-sm line-through text-muted-foreground">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
          
          <Button 
            onClick={() => onAddToCart(product)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all hover:scale-105"
            size="lg"
          >
            <Icon name="ShoppingCart" size={20} className="mr-2" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
