import projectCrm from '@/assets/project-crm.jpg'
import projectEcommerce from '@/assets/project-ecommerce.jpg'
import projectFintech from '@/assets/project-fintech.jpg'
import projectRealestate from '@/assets/project-realestate.jpg'
import projectSaas from '@/assets/project-saas.jpg'
import projectTourism from '@/assets/project-tourism.jpg'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BarChart3, CreditCard, Database, ExternalLink, Github, Home, Lock, Map, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const PortfolioSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'CRM для логистической компании',
      description: 'Удобный интерфейс управления заказами и клиентами с аналитикой и отчетностью',
      image: projectCrm,
      technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Node.js', 'PostgreSQL'],
      features: ['Управление заказами', 'CRM клиентов', 'Аналитика', 'Отчеты'],
      icon: Database,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'SaaS-платформа для аналитики',
      description: 'Дашборды, графики, подписки и полная аналитика бизнес-процессов',
      image: projectSaas,
      technologies: ['Next.js', 'TypeScript', 'Recharts', 'Stripe', 'Prisma'],
      features: ['Дашборды', 'Подписки', 'API интеграция', 'Экспорт данных'],
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Туристический сайт с картой',
      description: 'SEO-оптимизированный сайт с интерактивной картой и системой фильтров',
      image: projectTourism,
      technologies: ['Next.js', 'TypeScript', 'Mapbox', 'Tailwind CSS', 'SEO'],
      features: ['Интерактивная карта', 'SEO-оптимизация', 'Фильтры', 'Бронирование'],
      icon: Map,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 4,
      title: 'E-commerce платформа',
      description: 'Полнофункциональный интернет-магазин с корзиной, оплатой и админ-панелью',
      image: projectEcommerce,
      technologies: ['React', 'TypeScript', 'Redux', 'Stripe', 'Node.js'],
      features: ['Каталог товаров', 'Корзина покупок', 'Оплата онлайн', 'Админ-панель'],
      icon: ShoppingCart,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 5,
      title: 'Fintech банковское приложение',
      description: 'Мобильный банк с переводами, инвестициями и аналитикой расходов',
      image: projectFintech,
      technologies: ['React Native', 'TypeScript', 'Redux', 'WebRTC', 'Chart.js'],
      features: ['P2P переводы', 'Инвестиции', 'Аналитика', 'Бюджетирование'],
      icon: CreditCard,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 6,
      title: 'Платформа недвижимости',
      description: 'Сайт для поиска и продажи недвижимости с интерактивными картами',
      image: projectRealestate,
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'MapBox', 'Cloudinary'],
      features: ['Поиск объектов', 'Карта районов', 'Калькулятор ипотеки', 'Виртуальные туры'],
      icon: Home,
      color: 'from-orange-500 to-red-600'
    }
  ];
  
  return (
    <section id="portfolio" className="py-18 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Портфолио
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Реальные проекты, которые решают бизнес-задачи
          </p>
        </div>
        
        <div className="space-y-16 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-700 ${
                hoveredProject === index ? 'glow-primary' : ''
              }`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`group grid lg:grid-cols-2 gap-8 ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className="relative group/image overflow-hidden">
                  <div className="transition-transform duration-700 group-hover:scale-110">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Вынесенная иконка */}
                  <div
                    className={`absolute top-4 right-4 lg:top-6 lg:right-6 w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  } p-6`}
                >
                  <div>
                    <h3
                      className="text-2xl lg:text-3xl font-bold text-foreground mb-3 transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Ключевые возможности
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Технологии
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="border-border hover:border-primary/50 font-mono text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Демо
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary transition-colors group/btn"
                      onClick={() =>
                        toast.error('Приватный проект. Доступ к коду только для клиента проекта', {
                          icon: <Lock className="text-destructive w-5 h-5" />,
                          duration: 3000,
                          style: {
                            backgroundColor: 'hsl(var(--background))',
                            color: 'hsl(var(--foreground))',
                            border: '1px solid hsl(var(--border))',
                          },
                        })
                      }
                    >
                      <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Код
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6 text-lg">
            Хотите создать нечто подобное для своего бизнеса?
          </p>
          <Button
            size="lg"
            className="gradient-primary text-primary-foreground hover:glow-primary transition-all duration-300"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Обсудить проект
          </Button>
        </div>
      
      </div>
    </section>
  );
};