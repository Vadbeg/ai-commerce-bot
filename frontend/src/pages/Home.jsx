import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section - Model S */}
      <section className="section-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white pt-20">
        <div className="text-center space-y-4 mb-8 mt-16">
          <h1 className="text-5xl font-semibold tracking-tight">Model S</h1>
          <div className="flex gap-8 justify-center text-sm mt-6">
            <div>
              <p className="text-2xl font-semibold">396mi</p>
              <p className="text-gray-600">Range (EPA est.)</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">1.99s</p>
              <p className="text-gray-600">0-60 mph*</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">200mph</p>
              <p className="text-gray-600">Top Speed†</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">1,020hp</p>
              <p className="text-gray-600">Peak Power</p>
            </div>
          </div>
        </div>

        {/* Car Image Placeholder */}
        <div className="w-full h-[600px] flex items-center justify-center">
          <img
            src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Main-Hero-Desktop-LHD.jpg"
            alt="Edison Model S"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex gap-6 mt-8 mb-8">
          <Link to="/cart" className="cta-button cta-primary">
            Order Now
          </Link>
          <button className="cta-button cta-secondary">
            Demo Drive
          </button>
        </div>

        {/* <ChevronDown className="absolute bottom-8 animate-bounce" size={32} /> */}
      </section>

      {/* Interior Section */}
      <section className="section-full flex items-center justify-center bg-black text-white">
        <div className="grid grid-cols-2 gap-0 w-full">
          <div className="flex flex-col justify-center space-y-6 px-16">
            <h2 className="text-4xl font-semibold">Interior of the Future</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              A distinctive new look sets Model S apart. The interior is equally
              impressive, with a 17-inch cinematic display, wireless gaming, and
              yoke steering for an experience unlike any other.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-semibold">17"</p>
                <p className="text-gray-400">Cinematic Display</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">22</p>
                <p className="text-gray-400">Speakers</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pr-16">
            <img
              src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-New-Interior-Desktop-NA.png"
              alt="Edison Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="section-full flex items-center justify-center bg-white">
        <div className="grid grid-cols-2 gap-0 w-full">
          <div className="flex items-center justify-center h-full pl-16">
            <img
              src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Performance-Hero-Desktop-LHD.jpg"
              alt="Performance"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 px-16">
            <h2 className="text-4xl font-semibold">Powertrain</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Model S has the quickest acceleration of any vehicle in
              production. Updated battery architecture enables both record
              performance and maximum range.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-semibold">1,020hp</p>
                <p className="text-gray-500">Peak Power</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">9.23s</p>
                <p className="text-gray-500">@155mph 1/4 mile</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">1.99s</p>
                <p className="text-gray-500">0-60 mph</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">200mph</p>
                <p className="text-gray-500">Top Speed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autopilot Section */}
      <section className="section-full flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-3xl space-y-6 mb-12 px-8">
          <h2 className="text-4xl font-semibold">Autopilot</h2>
          <p className="text-gray-600 text-lg">
            Autopilot enables your car to steer, accelerate and brake
            automatically within its lane. Full Self-Driving Capability
            introduces additional features and improves existing functionality.
          </p>
        </div>
        <div className="w-full">
          <img
            src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-New-FSD-Desktop-NA-v2.png"
            alt="Autopilot"
            className="w-full h-auto"
          />
        </div>
        <div className="mt-12">
          <Link to="/cart" className="cta-button cta-primary">
            Configure Your Model S
          </Link>
        </div>
      </section>

      {/* Specs Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white py-20 px-8">
        <h2 className="text-4xl font-semibold mb-12 text-center">Model S Specs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Range</h3>
              <p className="text-gray-600">396 miles (EPA est.)</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Acceleration</h3>
              <p className="text-gray-600">1.99s 0-60 mph with rollout</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Top Speed</h3>
              <p className="text-gray-600">200 mph</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Peak Power</h3>
              <p className="text-gray-600">1,020 hp</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Wheels</h3>
              <p className="text-gray-600">19" or 21"</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Cargo</h3>
              <p className="text-gray-600">28 cu ft</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Displays</h3>
              <p className="text-gray-600">17" Touchscreen</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Supercharging Max</h3>
              <p className="text-gray-600">250 kW</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold mb-2">Warranty</h3>
              <p className="text-gray-600">Basic Vehicle - 4 years</p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Link to="/cart" className="cta-button cta-primary">
            Order Model S
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
