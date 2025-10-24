import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Cart from '@/components/Cart';
import type { Product } from '@/components/ProductCard';
import Icon from '@/components/ui/icon';
import { PRODUCTS } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const catalogRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast({
          title: 'Количество обновлено!',
          description: `${product.name} уже в корзине. Увеличили количество.`,
        });
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast({
        title: 'Добавлено в корзину!',
        description: `${product.name} добавлен в вашу корзину.`,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: 'Удалено из корзины',
      description: 'Товар удален из вашей корзины.',
      variant: 'destructive',
    });
  };

  const handleClear = () => {
    setCartItems([]);
    toast({
      title: 'Корзина очищена',
      description: 'Все товары удалены из корзины.',
    });
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎡</div>
              <div>
                <h1 className="font-heading text-2xl text-primary">
                  КидсПлей
                </h1>
                <p className="text-xs text-muted-foreground">Детские площадки</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={scrollToCatalog}
                className="font-bold text-foreground hover:text-primary transition-colors"
              >
                Каталог
              </button>
              <button className="font-bold text-foreground hover:text-primary transition-colors">
                О нас
              </button>
              <a 
                href="tel:89185636222"
                className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Icon name="Phone" size={18} />
                8 (918) 563-62-22
              </a>
            </nav>

            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
              onClear={handleClear}
            />
          </div>
        </div>
      </header>

      <main>
        <Hero onScrollToCatalog={scrollToCatalog} />
        
        <div ref={catalogRef}>
          <Catalog products={PRODUCTS} onAddToCart={handleAddToCart} />
        </div>

        <section className="bg-gradient-to-br from-primary/10 to-secondary/20 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl text-foreground mb-6">
              Готовы заказать?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Свяжитесь с нами для консультации и расчета стоимости
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:89185636222"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Icon name="Phone" size={24} />
                8 (918) 563-62-22
              </a>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg h-14 px-8 rounded-full transition-all hover:scale-105">
                <Icon name="MessageCircle" size={24} />
                Написать в WhatsApp
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading text-2xl mb-4 text-primary">КидсПлей</h3>
              <p className="text-background/80">
                Создаём радость и веселье для ваших детей с 2010 года
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-background/80">
                <p>📞 8 (918) 563-62-22</p>
                <p>📧 info@kidsplay.ru</p>
                <p>📍 Москва, ул. Детская, 1</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Режим работы</h4>
              <div className="space-y-2 text-background/80">
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб: 10:00 - 16:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-6 text-center text-background/60">
            <p>© 2024 КидсПлей. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}