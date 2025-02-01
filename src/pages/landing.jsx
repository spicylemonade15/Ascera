// landing page of the website
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faqs from "../data/faq.json";
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
  <section className="text-center px-4 sm:px-8 lg:px-16 py-6 sm:py-12">
    <div>
      {/* Title Section */}
      <h1 className="flex flex-col items-center justify-center text-white gradient-title font-extrabold text-3xl sm:text-5xl lg:text-7xl tracking-tight leading-tight gap-y-3 sm:gap-y-5">
        {/* Logo + Title Wrapper */}
        <span className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4">
          <img 
            src="logo.png" 
            className="h-12 sm:h-20 lg:h-28 max-w-full"
            alt="Logo"
          />
          <span className="whitespace-nowrap text-center">-factor for the </span>
        </span>
        <span>entrepreneur in you</span>
      </h1>
    </div>

    {/* Subtitle Section */}
    <p className="text-gray-300 mt-3 sm:mt-5 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed text-wrap">
      Kickstart your startup growth with investors from all across the globe.
    </p>
  </section>


      <div className="flex gap-6 justify-center">
        <Link to='/profile'>
        <Button variant='blue' size='xl'>Invest</Button>
        </Link>

        <Link to='/investors'>
        <Button variant='destructive' size='xl'>Find Investor</Button>
        </Link>
      </div>
    <img src="/banner.png" className="w-full" />

    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Startups</CardTitle>
          </CardHeader>
          <CardContent>
            Pitch your Startup and get Investors.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Investors</CardTitle>
          </CardHeader>
          <CardContent>
            Browse among the startups and Invest.
          </CardContent>
        </Card>
      </section>
    
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}
export default LandingPage

 