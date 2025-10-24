import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import type { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onClear }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.discount 
      ? item.price - (item.price * item.discount / 100)
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="relative border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold"
        >
          <Icon name="ShoppingCart" size={24} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground h-6 w-6 flex items-center justify-center rounded-full p-0 font-bold">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-heading text-3xl text-primary">
            Корзина
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Icon name="ShoppingBag" size={80} className="text-muted mb-4" />
            <p className="text-xl text-muted-foreground">Корзина пуста</p>
            <p className="text-sm text-muted-foreground mt-2">Добавьте игровые площадки!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 my-6">
              {items.map((item) => {
                const price = item.discount 
                  ? item.price - (item.price * item.discount / 100)
                  : item.price;
                
                return (
                  <div key={item.id} className="flex gap-4 p-4 border-2 border-border rounded-xl hover:border-primary transition-colors">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-foreground truncate">
                          {item.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemove(item.id)}
                          className="hover:bg-destructive hover:text-destructive-foreground -mt-2"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-primary font-bold mb-3">
                        {price.toLocaleString('ru-RU')} ₽
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8 rounded-full border-2"
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        
                        <span className="w-8 text-center font-bold">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full border-2"
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold">Итого:</span>
                <span className="font-heading text-2xl text-primary">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-14 rounded-xl"
                size="lg"
              >
                <Icon name="CheckCircle" size={24} className="mr-2" />
                Оформить заказ
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-2"
                onClick={onClear}
              >
                Очистить корзину
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
