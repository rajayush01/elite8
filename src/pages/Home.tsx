import HeroSection from '@/components/home/HeroSection'
import Services from '@/components/home/Services'
import Clients from '@/components/home/Clients'
import ProcessSection from '@/components/home/ProcessSection'
import FAQSection from '@/components/home/FAQSection'
import TestimonialScroll from '@/components/home/Testimonials'
import ProjectTimeline from '@/components/home/ProjectTimeline'
import UsVsOthers from '@/components/home/UsVsOthers'

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <HeroSection />
      <div className="flex justify-center items-center py-16">
        <Clients />
      </div>
      <Services />
      <ProjectTimeline/>
      <UsVsOthers/>
      <TestimonialScroll />
      <FAQSection />
      {/* <ProcessSection /> */}
    </div>
  )
}

export default Home