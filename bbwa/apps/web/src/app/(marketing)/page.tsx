"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"
import Link from "next/link"
import Image from "next/image"
import { useCallback, useEffect, useState, useRef } from "react"
import { 
  ArrowRightIcon, 
  CheckIcon, 
  StarIcon,
  ChevronDownIcon,
  Building2Icon,
  ShowerHeadIcon,
  HomeIcon,
  ShieldCheckIcon,
  UsersIcon,
  ClockIcon,
  AwardIcon
} from "lucide-react"
import { servicesData } from "@/lib/services-data"
import type { LucideIcon } from "lucide-react"

// Import whimsical components
import EnhancedHero from "@/components/whimsy/EnhancedHero"
import InteractiveServiceCard from "@/components/whimsy/InteractiveServiceCard"
import AnimatedTestimonial from "@/components/whimsy/AnimatedTestimonial"
import AnimatedCounter from "@/components/whimsy/AnimatedCounter"
import BuildingProgressBar from "@/components/whimsy/BuildingProgressBar"
import FloatingSparkles from "@/components/whimsy/FloatingSparkles"
import ConstructionCursor from "@/components/whimsy/ConstructionCursor"
import { useInView } from "@/lib/animation-utils"

// Define types for better type safety
interface Testimonial {
  name: string
  location: string
  quote: string
  avatar: string
}

interface CoreValue {
  icon: LucideIcon
  title: string
  description: string
}

// Extract data to constants for better maintainability
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    location: "Cottesloe",
    quote: "Bayside Builders transformed our heritage home with absolute care and professionalism. The attention to detail was extraordinary, and they maintained the original character while modernizing everything perfectly.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Mark Thompson",
    location: "Fremantle", 
    quote: "From concept to completion, the communication was outstanding. They navigated all the heritage council requirements seamlessly and delivered our dream extension on time and budget.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Jessica Chen",
    location: "Scarborough",
    quote: "Our new home build was stress-free thanks to their project management. Quality workmanship, fair pricing, and genuine Perth locals who understand our climate and building requirements.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "David & Emma Wilson",
    location: "Joondalup",
    quote: "The commercial fit-out for our café exceeded expectations. They understood our business needs and created a space that our customers love. Highly professional Perth builders.",
    avatar: "https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Linda Rodriguez",
    location: "Rockingham",
    quote: "15 years in Perth construction really shows. They knew exactly how to handle our coastal location challenges and delivered a beautiful, durable home that stands up to our weather.",
    avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Michael Stevens",
    location: "Ellenbrook",
    quote: "Best decision we made was choosing Bayside Builders for our extension. Licensed professionals who take pride in their work. The whole process was smooth and the results are phenomenal.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
  }
]

const CORE_VALUES: CoreValue[] = [
  {
    icon: ShieldCheckIcon,
    title: "Quality First",
    description: "We deliver workmanship that stands the test of time with attention to every detail."
  },
  {
    icon: ClockIcon,
    title: "On-Time Delivery",
    description: "Clear schedules and dependable delivery. Your time is valuable to us."
  },
  {
    icon: UsersIcon,
    title: "Expert Team",
    description: "Licensed professionals with years of experience in residential construction."
  },
  {
    icon: AwardIcon,
    title: "Trusted Service",
    description: "Open communication, fair pricing, and complete transparency throughout your project."
  }
]

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  'new-home-construction': HomeIcon,
  'home-renovations': ShowerHeadIcon,
  'extensions-additions': Building2Icon
}

export default function LandingPage() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const testimonialRef = useRef<HTMLDivElement>(null)
  
  // Enhanced animation refs
  const [servicesRef, isServicesInView] = useInView(0.2)
  const [statsRef, isStatsInView] = useInView(0.3)
  const [valuesRef, isValuesInView] = useInView(0.3)

  // Intersection observer for testimonials section
  useEffect(() => {
    if (!testimonialRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(testimonialRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!api || !isInView) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    // Auto-play carousel only when in view
    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [api, isInView])


  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById('services-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Enhanced Hero Section with Whimsical Animations */}
      <EnhancedHero onScrollToNext={scrollToNext} />

      {/* Enhanced Services Section with Interactive Cards */}
      <section ref={servicesRef} id="services-section" className="py-20 bg-background">
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isServicesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <FloatingSparkles count={2}>
              <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20 hover-perth-glow">
                <Building2Icon className="mr-2 h-3.5 w-3.5 animate-tool-bounce" />
                Our Construction Services
              </Badge>
            </FloatingSparkles>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-construction-entrance">
              Building Excellence Across Perth 🏗️
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From Fremantle to Ellenbrook, Scarborough to Rockingham - we deliver quality construction services on time and within budget across all Perth suburbs.
            </p>

            {/* Construction Progress Bar */}
            <div className="mt-8">
              <BuildingProgressBar
                steps={['Planning', 'Design', 'Construction', 'Completion']}
                currentStep={3}
                animated={isServicesInView}
              />
            </div>
          </div>
          
          {/* Enhanced Perth Suburbs Section */}
          <div className={`bg-muted/30 rounded-xl p-6 mb-12 transition-all duration-1000 delay-300 hover-perth-glow ${
            isServicesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-4">
              <ConstructionCursor tool="wrench">
                <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                  <span className="animate-aussie-wave">🇦🇺</span>
                  Proudly Serving Perth Suburbs
                  <span className="animate-aussie-wave">🏠</span>
                </h3>
              </ConstructionCursor>
              
              <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground stagger-children">
                {['Cottesloe', 'Fremantle', 'Scarborough', 'Joondalup', 'Rockingham', 'Ellenbrook', 'Mandurah', '& More'].map((suburb, index) => (
                  <span 
                    key={suburb}
                    className={`px-3 py-1 bg-primary/10 text-primary rounded-full hover-construction cursor-pointer transition-all duration-300 animate-construction-entrance`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Interactive Service Cards */}
          <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-500 ${
            isServicesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {servicesData.slice(0, 3).map((service, index) => (
              <InteractiveServiceCard 
                key={service.slug} 
                service={service} 
                index={index}
              />
            ))}
          </div>
          
          <div className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            isServicesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <FloatingSparkles count={3}>
              <Button size="lg" variant="outline" className="group hover-construction" asChild>
                <Link href="/services">
                  <span className="animate-tool-bounce mr-2">🔧</span>
                  View All Construction Services
                  <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </FloatingSparkles>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section ref={testimonialRef} className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Floating Construction Elements */}
        <div className="absolute top-10 left-10 text-4xl animate-float opacity-10">
          <span className="animate-tool-bounce">🏗️</span>
        </div>
        <div className="absolute bottom-10 right-10 text-3xl animate-float-delayed opacity-10">
          <span className="animate-wiggle">🔨</span>
        </div>
        
        <div className="container">
          <div className="text-center mb-16">
            <FloatingSparkles count={3}>
              <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20 hover-perth-glow">
                <StarIcon className="mr-2 h-3.5 w-3.5 fill-current animate-perth-sparkle" />
                Perth Client Reviews
              </Badge>
            </FloatingSparkles>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-construction-entrance">
              What Perth Locals Say About Us 💬
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from real Perth families and businesses. See why we&apos;re the trusted choice across all Perth suburbs.
            </p>
            
            {/* Enhanced Trust Indicators with Animations */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 mb-8 stagger-children">
              <div className="flex items-center gap-2 text-sm hover-construction animate-construction-entrance">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className="h-4 w-4 fill-primary text-primary animate-perth-sparkle" 
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
                <span className="font-medium">4.9/5 Average Rating</span>
              </div>
              <div className="text-sm text-muted-foreground animate-construction-entrance">|</div>
              <ConstructionCursor tool="hammer">
                <div className="text-sm font-medium hover-construction animate-construction-entrance">
                  <AnimatedCounter value={500} suffix="+ Happy Clients" shouldStart={isInView} />
                </div>
              </ConstructionCursor>
              <div className="text-sm text-muted-foreground animate-construction-entrance">|</div>
              <div className="text-sm font-medium hover-construction animate-construction-entrance">
                <AnimatedCounter value={98} suffix="% Would Recommend" shouldStart={isInView} />
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <AnimatedTestimonial testimonial={testimonial} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 border-primary/20 hover:bg-primary hover:text-white hover-construction" />
              <CarouselNext className="hidden md:flex -right-12 border-primary/20 hover:bg-primary hover:text-white hover-construction" />
            </Carousel>
            
            {/* Enhanced Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: count }, (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 hover-construction ${
                    index === current - 1 ? 'bg-primary scale-110 animate-perth-sparkle' : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Enhanced Google Reviews CTA */}
          <div className="text-center mt-12">
            <ConstructionCursor tool="wrench">
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border hover-perth-glow cursor-pointer transition-all duration-300 hover:scale-105">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png" 
                  alt="Google" 
                  className="w-6 h-6 animate-perth-sun-rays"
                />
                <span className="text-sm font-medium">Read more reviews on Google</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-primary text-primary animate-perth-sparkle" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                  <span className="text-sm ml-1 font-bold">4.9</span>
                </div>
                <span className="animate-aussie-wave">👍</span>
              </div>
            </ConstructionCursor>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Indicators Section */}
      <section ref={statsRef} className="py-20 bg-background relative overflow-hidden">
        {/* Background Construction Elements */}
        <div className="absolute top-1/4 right-10 text-6xl animate-float opacity-5">
          <span className="animate-tool-bounce">⚒️</span>
        </div>
        <div className="absolute bottom-1/4 left-10 text-5xl animate-float-delayed opacity-5">
          <span className="animate-wiggle">🏗️</span>
        </div>
        
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isStatsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <FloatingSparkles count={2}>
              <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20 hover-perth-glow">
                <ShieldCheckIcon className="mr-2 h-3.5 w-3.5 animate-perth-sparkle" />
                Licensed & Certified
              </Badge>
            </FloatingSparkles>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-construction-entrance">
              Why Perth Trusts Us 🛡️
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fully licensed, insured, and certified professionals with a proven track record across Perth&apos;s construction industry.
            </p>
          </div>
          
          {/* Enhanced Certifications and Licenses */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 stagger-children transition-all duration-1000 delay-300 ${
            isStatsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {[
              {
                icon: ShieldCheckIcon,
                title: 'Licensed Builder',
                details: ['Registration #BC12345', 'Building Commission WA'],
                tool: 'hammer' as const
              },
              {
                icon: AwardIcon,
                title: 'Master Builders WA',
                details: ['Member Since 2009', 'Excellence Awards Winner'],
                tool: 'wrench' as const
              },
              {
                icon: ShieldCheckIcon,
                title: 'Fully Insured',
                details: ['$20M Public Liability', 'Contract Works Coverage'],
                tool: 'drill' as const
              },
              {
                icon: AwardIcon,
                title: 'Quality Certified',
                details: ['ISO 9001:2015', 'Safety Standards Compliant'],
                tool: 'saw' as const
              }
            ].map((cert, index) => (
              <ConstructionCursor key={cert.title} tool={cert.tool}>
                <div className="text-center group hover-construction animate-construction-entrance" style={{ animationDelay: `${index * 100}ms` }}>
                  <FloatingSparkles count={1}>
                    <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <cert.icon className="h-10 w-10 text-primary group-hover:text-white animate-tool-bounce" />
                    </div>
                  </FloatingSparkles>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                  {cert.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                </div>
              </ConstructionCursor>
            ))}
          </div>
          
          {/* Enhanced Project Statistics with Animated Counters */}
          <div className={`bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 hover-perth-glow transition-all duration-1000 delay-500 ${
            isStatsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <ConstructionCursor tool="hammer">
                <div className="group hover-construction">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter 
                      value={500} 
                      suffix="+" 
                      shouldStart={isStatsInView} 
                      className="group-hover:text-primary"
                    />
                  </div>
                  <div className="text-lg font-semibold mb-1">Projects Completed</div>
                  <div className="text-sm text-muted-foreground">Across Perth & Surrounds 🏘️</div>
                </div>
              </ConstructionCursor>
              
              <ConstructionCursor tool="wrench">
                <div className="group hover-construction">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter 
                      value={15} 
                      suffix="+" 
                      shouldStart={isStatsInView} 
                      duration={1500}
                      className="group-hover:text-primary"
                    />
                  </div>
                  <div className="text-lg font-semibold mb-1">Years Experience</div>
                  <div className="text-sm text-muted-foreground">Perth Construction Industry 🏗️</div>
                </div>
              </ConstructionCursor>
              
              <ConstructionCursor tool="drill">
                <div className="group hover-construction">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter 
                      value={98} 
                      suffix="%" 
                      shouldStart={isStatsInView} 
                      duration={2000}
                      className="group-hover:text-primary"
                    />
                  </div>
                  <div className="text-lg font-semibold mb-1">Client Satisfaction</div>
                  <div className="text-sm text-muted-foreground">Would Recommend Us ⭐</div>
                </div>
              </ConstructionCursor>
              
              <ConstructionCursor tool="saw">
                <div className="group hover-construction">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    <span className="animate-shimmer">$50M+</span>
                  </div>
                  <div className="text-lg font-semibold mb-1">Projects Value</div>
                  <div className="text-sm text-muted-foreground">Successfully Delivered 💰</div>
                </div>
              </ConstructionCursor>
            </div>

            {/* Construction Achievement Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {['🏆 Excellence Award 2023', '🌟 5-Star Rated', '🇦🇺 Perth Local Champions', '⚡ On-Time Delivery'].map((achievement, index) => (
                <Badge 
                  key={achievement}
                  variant="outline" 
                  className={`bg-white/50 hover-construction animate-construction-entrance`}
                  style={{ animationDelay: `${index * 200 + 1000}ms` }}
                >
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Enhanced Perth Local Expertise */}
          <div className={`mt-16 bg-white rounded-2xl p-8 border hover-perth-glow transition-all duration-1000 delay-700 ${
            isStatsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="animate-aussie-wave">🇦🇺</span>
                  Perth Local Expertise
                  <span className="animate-tool-bounce">🔧</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  As long-term Perth residents and construction professionals, we understand the unique challenges of building in Western Australia&apos;s climate and conditions.
                </p>
                <div className="space-y-3 stagger-children">
                  {[
                    'Heritage council and council approvals expertise',
                    'Perth climate-optimized construction methods', 
                    'Local supplier and trade relationships',
                    'Understanding of Perth soil and foundation requirements'
                  ].map((feature, index) => (
                    <div key={feature} className="flex items-center gap-3 animate-construction-entrance" style={{ animationDelay: `${index * 100}ms` }}>
                      <CheckIcon className="h-5 w-5 text-primary flex-shrink-0 animate-perth-sparkle" />
                      <span className="hover-construction cursor-pointer">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 hover-construction">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                    <span className="animate-float">🗺️</span>
                    Our Service Areas
                  </h4>
                  <p className="text-sm text-muted-foreground">Professional construction services across Perth metropolitan area</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm stagger-children">
                  {['Perth CBD', 'Cottesloe', 'Fremantle', 'Scarborough', 'Joondalup', 'Rockingham', 'Mandurah', 'Ellenbrook', 'Subiaco', '& Surrounding Areas'].map((area, index) => (
                    <div key={area} className="flex items-center gap-2 animate-construction-entrance" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="w-2 h-2 bg-primary rounded-full animate-perth-sparkle"></div>
                      <span className="hover-construction cursor-pointer">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values Section */}
      <section ref={valuesRef} className="py-20 bg-muted/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 right-20 text-5xl animate-float opacity-5">
          <span className="animate-perth-sparkle">✨</span>
        </div>
        <div className="absolute bottom-20 left-20 text-4xl animate-float-delayed opacity-5">
          <span className="animate-tool-bounce">🏆</span>
        </div>
        
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isValuesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <FloatingSparkles count={2}>
              <Badge variant="outline" className="mb-4 hover-perth-glow">
                <span className="animate-perth-sparkle mr-2">⭐</span>
                Why Choose Us
              </Badge>
            </FloatingSparkles>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-construction-entrance">
              Built on Strong Values 🏗️
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality, reliability, and customer satisfaction drives everything we do in Perth.
            </p>
          </div>
          
          <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4 transition-all duration-1000 delay-300 ${
            isValuesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {CORE_VALUES.map((value, index) => {
              const tools = ['hammer', 'wrench', 'drill', 'saw'] as const
              return (
                <ConstructionCursor key={index} tool={tools[index % tools.length]}>
                  <div className="text-center group hover-construction animate-construction-entrance" style={{ animationDelay: `${index * 150}ms` }}>
                    <FloatingSparkles count={1}>
                      <div className="mb-6 p-4 w-fit mx-auto rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <value.icon className="h-8 w-8 animate-tool-bounce" />
                      </div>
                    </FloatingSparkles>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      {value.description}
                    </p>
                    
                    {/* Perth-specific enhancement */}
                    {index === 0 && (
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          🏆 Perth Quality Standards
                        </Badge>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          ⚡ Perth Weather Optimized
                        </Badge>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          🇦🇺 Local Perth Tradies
                        </Badge>
                      </div>
                    )}
                    {index === 3 && (
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          💬 Perth Local Support
                        </Badge>
                      </div>
                    )}
                  </div>
                </ConstructionCursor>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Whimsical Elements */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Floating Construction Elements */}
        <div className="absolute top-10 left-10 text-5xl animate-float opacity-10">
          <span className="animate-tool-bounce">🏗️</span>
        </div>
        <div className="absolute top-20 right-20 text-4xl animate-float-delayed opacity-10">
          <span className="animate-wiggle">🔨</span>
        </div>
        <div className="absolute bottom-20 left-1/4 text-6xl animate-float opacity-10">
          <span className="animate-perth-sparkle">⚒️</span>
        </div>
        
        <div className="container">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/95 to-primary text-primary-foreground hover-perth-glow transition-all duration-500 group">
            {/* Enhanced Construction Pattern Background */}
            <div 
              className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='construction' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23construction)'/%3E%3C/svg%3E")`
              }}
            />
            
            {/* Animated Sparkles */}
            <FloatingSparkles count={8} color="#ffffff">
              <div className="absolute inset-0" />
            </FloatingSparkles>
            
            <CardContent className="relative p-8 md:p-12 text-center z-10">
              <FloatingSparkles count={2}>
                <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:scale-110 transition-transform duration-300">
                  <Building2Icon className="mr-2 h-4 w-4 animate-tool-bounce" />
                  Ready to Start Building?
                </Badge>
              </FloatingSparkles>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-construction-entrance">
                <span className="animate-hammer-strike mr-3">🏗️</span>
                Your Dream Project Starts With A Free Consultation
                <span className="animate-aussie-wave ml-3">🇦🇺</span>
              </h2>
              
              <p className="text-lg mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
                Join <AnimatedCounter value={500} suffix="+ satisfied Perth families" shouldStart={true} className="font-bold" /> and businesses who chose Bayside Builders WA. 
                Get your free on-site consultation, detailed quote, and project timeline today.
              </p>
              
              {/* Enhanced Key Benefits with Animations */}
              <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm opacity-90 stagger-children">
                {[
                  '🏠 Free On-Site Consultation',
                  '📋 Detailed Written Quote', 
                  '✨ No Obligation',
                  '⚡ Fast Response Time'
                ].map((benefit, index) => (
                  <div key={benefit} className="flex items-center gap-2 hover-construction animate-construction-entrance" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckIcon className="h-4 w-4 animate-perth-sparkle" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <ConstructionCursor tool="hammer">
                  <FloatingSparkles count={3}>
                    <Button size="lg" variant="secondary" className="group bg-white text-primary hover:bg-white/90 font-semibold hover-construction relative overflow-hidden" asChild>
                      <Link href="/contact">
                        <span className="relative z-10">Get Your Free Quote Today</span>
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </Link>
                    </Button>
                  </FloatingSparkles>
                </ConstructionCursor>
                
                <ConstructionCursor tool="wrench">
                  <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white hover-construction" asChild>
                    <Link href="/projects">
                      <Building2Icon className="mr-2 h-4 w-4 animate-wiggle" />
                      View Perth Projects
                      <span className="ml-2 animate-aussie-wave">🏘️</span>
                    </Link>
                  </Button>
                </ConstructionCursor>
              </div>
              
              {/* Enhanced Contact Info with Perth Personality */}
              <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80 stagger-children">
                <ConstructionCursor tool="drill">
                  <div className="flex items-center gap-2 hover-construction animate-construction-entrance">
                    <div className="w-2 h-2 bg-white rounded-full animate-perth-sparkle"></div>
                    <span>📞 Call: (08) 1234 5678</span>
                  </div>
                </ConstructionCursor>
                
                <ConstructionCursor tool="saw">
                  <div className="flex items-center gap-2 hover-construction animate-construction-entrance">
                    <div className="w-2 h-2 bg-white rounded-full animate-perth-sparkle"></div>
                    <span>📧 Email: info@baysidebuilderswa.com.au</span>
                  </div>
                </ConstructionCursor>
                
                <div className="flex items-center gap-2 hover-construction animate-construction-entrance">
                  <div className="w-2 h-2 bg-white rounded-full animate-perth-sparkle"></div>
                  <span>🇦🇺 Servicing All Perth Metro</span>
                </div>
              </div>

              {/* Perth-Specific Final Touch */}
              <div className="mt-8 flex justify-center">
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white animate-construction-entrance">
                  <span className="animate-aussie-wave mr-2">🌅</span>
                  Proudly Perth Born & Bred
                  <span className="animate-tool-bounce ml-2">🔨</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
