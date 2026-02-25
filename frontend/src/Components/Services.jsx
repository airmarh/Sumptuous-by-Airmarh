import React from 'react'
import image1 from '../assets/breakfast.jpg'
import image2 from '../assets/serv3.jpg'
import image3 from '../assets/appetizer.jpg'
import line from '../assets/line2.png'

const Services = () => {
  return (
    <section className="bg3 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <img src={line} alt="" className="mx-auto mb-4 w-32 opacity-80" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          Our Special Offerings
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Crafted with passion, served with elegance — experience flavors that delight every moment.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto">

        <div className="group bg-black/40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
          <img
            src={image1}
            alt="Breakfast"
            className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="p-8 text-center">
            <h3 className="text-3xl font-bold text-amber-400 mb-4">Breakfast</h3>
            <p className="text-gray-300 leading-relaxed">
              Start your day with warmth and flavor. From freshly baked pastries
              to hearty classics and nourishing delights, our breakfast menu is
              designed to energize your mornings and set the perfect tone for the day.
            </p>
          </div>
        </div>

        <div className="group bg-black/40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
          <img
            src={image2}
            alt="Drinks"
            className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="p-8 text-center">
            <h3 className="text-3xl font-bold text-amber-400 mb-4">Drinks</h3>
            <p className="text-gray-300 leading-relaxed">
              Sip and unwind with our carefully curated selection of beverages.
              From refreshing mocktails and freshly brewed coffees to signature
              drinks, every sip is crafted to complement your dining experience.
            </p>
          </div>
        </div>

        <div className="group bg-black/40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
          <img
            src={image3}
            alt="Appetizers"
            className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="p-8 text-center">
            <h3 className="text-3xl font-bold text-amber-400 mb-4">Appetizers</h3>
            <p className="text-gray-300 leading-relaxed">
              Awaken your appetite with bold flavors and elegant bites.
              Our appetizers are perfect for sharing — thoughtfully prepared
              to tease your taste buds before the main course arrives.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Services