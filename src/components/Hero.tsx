import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroProps {
  onScrollToCatalog: () => void;
}

export default function Hero({ onScrollToCatalog }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-secondary/30 via-accent/20 to-primary/10 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl animate-bounce-gentle">🎪</div>
        <div className="absolute top-20 right-20 text-6xl animate-bounce-gentle" style={{animationDelay: '0.5s'}}>🎨</div>
        <div className="absolute bottom-10 left-1/4 text-7xl animate-bounce-gentle" style={{animationDelay: '1s'}}>🎡</div>
        <div className="absolute bottom-20 right-1/3 text-5xl animate-bounce-gentle" style={{animationDelay: '1.5s'}}>🎠</div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="font-heading text-5xl md:text-7xl text-foreground leading-tight">
            Детские Площадки
            <br />
            <span className="text-primary">Мечты!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-semibold">
            Создаём радость и веселье для ваших детей! 
            Безопасные, яркие и невероятно интересные игровые комплексы.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              onClick={onScrollToCatalog}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Icon name="Sparkles" size={24} className="mr-2" />
              Смотреть каталог
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg h-14 px-8 rounded-full transition-all hover:scale-105"
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Связаться с нами
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-secondary hover:border-primary transition-all hover:scale-105 animate-scale-in">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-heading text-xl mb-2 text-foreground">Безопасность</h3>
              <p className="text-muted-foreground">Сертифицированные материалы</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-secondary hover:border-primary transition-all hover:scale-105 animate-scale-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-heading text-xl mb-2 text-foreground">Яркий дизайн</h3>
              <p className="text-muted-foreground">Красочные и современные</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-secondary hover:border-primary transition-all hover:scale-105 animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-heading text-xl mb-2 text-foreground">Быстрая доставка</h3>
              <p className="text-muted-foreground">По всей России</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
