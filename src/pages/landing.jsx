// landing page of the website
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faqs from "../data/faq.json";
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center ">
      <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4"> 
      <span className="flex items-center gap-1 sm:gap-1">
       <img src="logo.png" 
       className="h-14 sm:h-24 lg:h-32"
       />
      -factor for the entrepreneur
      </span>
      within you
      </h1>
      <p className="text-gray-50 sm:mt-4 text-xs sm:text-xl">
          Kickstart you Startup growth with investors from all acorss the globe.
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to='/startups'>
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