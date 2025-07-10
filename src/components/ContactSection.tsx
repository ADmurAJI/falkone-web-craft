import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useInView } from '@/hooks/useInView.ts'
import { CheckCircle, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'

export const ContactSection = () => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15);
  
  const [formData, setFormData] = useState({
    name: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    setFormErrors(prevErrors => {
      const newErrors = [...prevErrors];
      
      switch (name) {
        case 'name':
          return value.trim()
            ? newErrors.filter(err => err !== 'Имя')
            : newErrors;
        case 'projectType':
          return value
            ? newErrors.filter(err => err !== 'Тип проекта')
            : newErrors;
        case 'budget':
          return value
            ? newErrors.filter(err => err !== 'Бюджет')
            : newErrors;
        case 'message':
          return value.trim().length >= 10
            ? newErrors.filter(err => !err.startsWith('Подробности задачи'))
            : newErrors;
        default:
          return newErrors;
      }
    });
  };
  
  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('Имя');
    if (!formData.projectType) errors.push('Тип проекта');
    if (!formData.budget) errors.push('Бюджет');
    if (formData.message.trim().length < 10) errors.push('Подробности задачи (минимум 10 символов)');
    
    return errors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Ошибка при отправке сообщения');
      }
      
      setFormData({
        name: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      setFormErrors(['Ошибка при отправке. Попробуйте ещё раз.']);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div
        ref={ref}
        className="transition-all duration-700 ease-out transform"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(60px)',
        }}
      >
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Обсудим проект?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Опишите задачу — и я предложу лучшее решение
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <MessageSquare className="w-6 h-6 mr-3 text-primary" />
                Написать сообщение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate  className='space-y-6'>
             
                <div className='space-y-2'>
                  <Label htmlFor='name'>Имя *</Label>
                  <Input id='name' name='name' value={formData.name} onChange={handleInputChange} required />
                </div>
                
                <div className='space-y-2'>
                  <Label htmlFor='projectType'>Тип проекта *</Label>
                  <select
                    id='projectType'
                    name='projectType'
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className='w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:border-primary'
                    required
                  >
                    <option value=''>Выберите тип</option>
                    <option value='landing'>Лендинг / сайт</option>
                    <option value='saas'>SaaS / SPA / приложение</option>
                    <option value='crm'>CRM / админка</option>
                    <option value='bot'>Telegram-бот</option>
                    <option value='ecommerce'>E-commerce</option>
                    <option value='other'>Другое</option>
                  </select>
                </div>
                
                <div className='space-y-2'>
                  <Label htmlFor='budget'>Бюджет *</Label>
                  <select
                    id='budget'
                    name='budget'
                    value={formData.budget}
                    onChange={handleInputChange}
                    className='w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:border-primary'
                    required
                  >
                    <option value=''>Ориентировочно</option>
                    <option value='lt100k'>до 100 000</option>
                    <option value='100-300k'>100 000 – 300 000</option>
                    <option value='300-500k'>300 000 – 500 000</option>
                    <option value='gt500k'>500 000 и выше</option>
                  </select>
                </div>
                
                <div className='space-y-2'>
                  <Label htmlFor='timeline'>Когда планируете начать?</Label>
                  <Input
                    id='timeline'
                    name='timeline'
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder='Например: через 2 недели'
                  />
                </div>
                
                <div className='space-y-2'>
                  <Label htmlFor='message'>Подробности задачи *</Label>
                  <Textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    minLength={10}
                    placeholder='Что нужно сделать?'
                    required
                  />
                </div>
                
                <Button
                  type='submit'
                  size='lg'
                  disabled={isSubmitting}
                  className='w-full gradient-primary text-primary-foreground hover:glow-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className='w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2'></div>
                      Отправляю...
                    </>
                  ) : (
                    <>
                      <Send className='w-4 h-4 mr-2' />
                      Отправить сообщение
                    </>
                  )}
                </Button>
                {formErrors.length > 0 && (
                  <div className="mt-4 px-4 py-3 bg-destructive/10 border border-destructive rounded-md text-destructive text-sm animate-fade-in">
                    <div className="font-semibold flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 fill-destructive" viewBox="0 0 24 24">
                        <path d="M11.001 10h2v5h-2zm0 6h2v2h-2z" />
                        <path d="M12 2C6.477 2 2 6.478 2 12s4.477 10 10 10 10-4.478 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.589-8-8s3.59-8 8-8 8 3.589 8 8-3.59 8-8 8z" />
                      </svg>
                      Заполните обязательные поля:
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {formErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          
          <div className='space-y-8'>
            <Card className='bg-card/50 backdrop-blur-sm border-border'>
              <CardHeader>
                <CardTitle className='text-xl'>Прямая связь</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <a
                  href='https://vk.com/dr.falkone'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors group'
                >
                  <div>
                    <div className='font-medium text-foreground'>VKontakte</div>
                    <div className='text-sm text-muted-foreground'>@dr.falkone</div>
                  </div>
                  <div className='text-primary group-hover:translate-x-1 transition-transform'>
                    →
                  </div>
                </a>
                
                <a
                  href='https://t.me/dr_falkone'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors group'
                >
                  <div>
                    <div className='font-medium text-foreground'>Telegram</div>
                    <div className='text-sm text-muted-foreground'>@dr_falkone</div>
                  </div>
                  <div className='text-primary group-hover:translate-x-1 transition-transform'>
                    →
                  </div>
                </a>
              </CardContent>
            </Card>
            
            <Card className='bg-card/50 backdrop-blur-sm border-border'>
              <CardContent className='pt-6'>
                <div className='flex items-center mb-4'>
                  <CheckCircle className='w-5 h-5 text-green-500 mr-2' />
                  <span className='font-medium text-foreground'>Быстрый ответ</span>
                </div>
                <p className='text-sm text-muted-foreground mb-4'>
                  Отвечаю на сообщения в течение 2-4 часов в рабочие дни
                </p>
                <div className='text-xs text-muted-foreground'>
                  🕒 Рабочие часы: ПН-ПТ, 10:00-19:00 (МСК)
                </div>
              </CardContent>
            </Card>
            
            <Card className='bg-card/50 backdrop-blur-sm border-border'>
              <CardHeader>
                <CardTitle className='text-xl'>Как мы работаем</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3 text-sm'>
                  <div className='flex items-start'>
                    <div
                      className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Обсуждение</div>
                      <div className="text-muted-foreground">Анализируем задачи и требования</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div
                      className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Планирование</div>
                      <div className="text-muted-foreground">Составляем техническое задание</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div
                      className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Разработка</div>
                      <div className="text-muted-foreground">Создаем решение с обратной связью</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};