import HeroSection from '@/components/home/HeroSection'
import Services from '@/components/home/Services'
import ServicesMobile from '@/components/home/ServicesMobile'
import Clients from '@/components/home/Clients'
//import ProcessSection from '@/components/home/ProcessSection'
import FAQSection from '@/components/home/FAQSection'
import TestimonialScroll from '@/components/home/Testimonials'
//import ProjectTimeline from '@/components/home/ProjectTimeline'
import HowWeWork from '@/components/home/HowWeWork'
import UsVsOthers from '@/components/home/UsVsOthers'
import LetsWork from '@/components/home/LatestWork'
import LetsWorkMob from '@/components/home/LatestWorkMob'

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <HeroSection />
      <div className='flex flex-row justify-center items-center text-center mb-8 sm:mb-0 text-white font-serif text-5xl font-bold mt-20 md:mt-0'>LATEST WORK</div>
      <div className="md:hidden">
        <LetsWorkMob />
      </div>
      <div className="hidden md:block">
      <LetsWork />
      </div>
      <div className="flex justify-center items-center py-16">
        <Clients />
      </div>
      
      {/* Show ServicesMobile on small screens, Services on md and above */}
      <div className="md:hidden">
        <ServicesMobile />
      </div>
      <div className="hidden md:block">
        <Services />
      </div>
      {/* <ProjectTimeline/> */}
      <HowWeWork />
      <UsVsOthers/>
      <TestimonialScroll />
      <FAQSection />
      {/* <ProcessSection /> */}
    </div>
  )
}

export default Home