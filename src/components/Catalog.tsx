import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Catalog() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
            Наш каталог
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Выберите идеальную площадку для ваших детей
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl border-2 border-primary/20 shadow-xl">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="font-heading text-3xl text-foreground mb-4">
              Полный каталог товаров
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Скачайте наш каталог с детальными описаниями всех площадок, ценами и характеристиками
            </p>
            
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl h-16 px-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://cdn.poehali.dev/files/7f446190-8757-44d1-8d8d-08bd727895de.png';
                link.download = 'Детские площадки 2025.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Icon name="Download" size={28} className="mr-3" />
              Посмотреть каталог
            </Button>
            
            <p className="text-sm text-muted-foreground mt-6">
              PDF файл, 5 МБ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}