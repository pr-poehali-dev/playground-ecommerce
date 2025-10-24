import { useState } from 'react';
import ProductCard, { type Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

type FilterType = 'all' | 'new' | 'sale';

export default function Catalog({ products, onAddToCart }: CatalogProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filteredProducts = products.filter(product => {
    if (filter === 'new') return product.isNew;
    if (filter === 'sale') return product.discount;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            Наш каталог
          </h2>
          <p className="text-xl text-muted-foreground">
            Выберите идеальную площадку для ваших детей
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 h-12 bg-white border-2">
              <TabsTrigger value="all" className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Grid3x3" size={18} className="mr-2" />
                Все
              </TabsTrigger>
              <TabsTrigger value="new" className="font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Icon name="Sparkles" size={18} className="mr-2" />
                Новинки
              </TabsTrigger>
              <TabsTrigger value="sale" className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Tag" size={18} className="mr-2" />
                Акции
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button
              variant={sortBy === 'default' ? 'default' : 'outline'}
              onClick={() => setSortBy('default')}
              className="font-bold"
            >
              По умолчанию
            </Button>
            <Button
              variant={sortBy === 'price-asc' ? 'default' : 'outline'}
              onClick={() => setSortBy('price-asc')}
              className="font-bold"
            >
              <Icon name="ArrowUp" size={18} className="mr-1" />
              Цена
            </Button>
            <Button
              variant={sortBy === 'price-desc' ? 'default' : 'outline'}
              onClick={() => setSortBy('price-desc')}
              className="font-bold"
            >
              <Icon name="ArrowDown" size={18} className="mr-1" />
              Цена
            </Button>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">Товары не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
