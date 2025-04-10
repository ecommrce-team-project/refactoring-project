import React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react"
import "../css/FAQ.css"

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "HOW MUCH IS A FURNISHED RENTAL IN MEDELLIN?",
      answer:
        "It all depends: Views? Rooftop pool? AC? Location? 50-250 meters? While we have many sub-$1000 USD apartment rentals in Laureles, most of our Poblado inventory falls within $1250-$2000 per month. Luxury penthouse rentals can range from $2000-$6000. Daily rentals can range from $50 all the way up to $350/night in some outstanding units in the Energy Living Medellin building!",
    },
    {
      question: "DO I HAVE TO SIGN AN APARTMENT RENTAL CONTRACT?",
      answer:
        "Yes, most property prices in our marketplace are negotiable. Click 'Contact Agent' on any listing to discuss offers. For rental properties, prices are typically fixed unless stated otherwise.",
    },
    {
      question: "WHAT IS THE CASACOL GUEST POLICY?",
      answer:
        "We support bank transfers, certified checks, and mortgage facilitation through partner banks. For rentals, we accept credit cards (3% fee) or direct bank transfers.",
    },
    {
      question: "WHAT IS YOUR REFUND AND DEPOSIT POLICY?",
      answer:
        "No fees for buyers/renters! Sellers pay a 2% commission upon successful transaction. Rental contracts have a one-time admin fee of 5% of annual rent.",
    },
    {
      question: "HOW SAFE IS IT FOR FOREIGNERS IN MEDELLIN?",
      answer:
        "All listings include verified ownership documents. We recommend additional due diligence through our partner legal services (available upon request).",
    },
    {
      question: "WHAT RENTAL LOCATIONS DO YOU OFFER IN MEDELLIN?",
      answer:
        "Yes! Click 'Virtual Tour' on any listing for 3D walkthroughs. Live video tours with agents can be booked via the 'Schedule Viewing' button.",
    },
    {
      question: "DO YOU OFFER UNFURNISHED RENTALS?",
      answer:
        "Our agent will contact you within 24 hours to discuss next steps: negotiation, paperwork, and payment processing. You'll receive a transaction timeline via email.",
    },
  ]

  return (
    <div className="faqs-container">
      <h1>FAQS WHEN BUYING WITH DARNA</h1>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h2>
                {index + 1} {faq.question}
              </h2>
              <div className="faq-icon">{activeIndex === index ? <ChevronUp /> : <ChevronDown />}</div>
            </div>
            <div className={`faq-answer ${activeIndex === index ? "show" : ""}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

