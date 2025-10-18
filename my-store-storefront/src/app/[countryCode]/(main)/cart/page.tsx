'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import {
  models,
  paintColors,
  wheels,
  interiors,
  autopilotOptions,
  chargingOptions,
  insuranceOptions,
  type CarModel,
  type PaintColor,
  type Wheel,
  type Interior,
  type AutopilotOption,
  type ChargingOption,
  type InsuranceOption,
} from '@/data/carOptions';
import { getConfiguration, updateConfiguration } from '../../../../../../frontend/src/services/configurationService';
import { getDiscount, applyDiscount, getDiscountAmount, type Discount } from '../../../../../../frontend/src/services/discountService';

interface Config {
  model: string;
  paint: string;
  wheels: string;
  interior: string;
  autopilot: string;
  charging: string;
  insurance: string;
}

interface OptionCardProps {
  option: {
    id: string;
    name: string;
    price: number;
    description?: string;
  };
  selectedId: string;
  onSelect: (id: string) => void;
  showPrice?: boolean;
}

const OptionCard = ({ option, selectedId, onSelect, showPrice = true }: OptionCardProps) => {
  const isSelected = option.id === selectedId;
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`relative w-full p-4 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? 'border-black bg-gray-50'
          : 'border-gray-200 hover:border-gray-400'
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-black rounded-full flex items-center justify-center">
          <Check size={16} className="text-white" />
        </div>
      )}
      <div className="pr-8">
        <h3 className="font-semibold text-lg">{option.name}</h3>
        {option.description && (
          <p className="text-sm text-gray-600 mt-1">{option.description}</p>
        )}
        {showPrice && (
          <p className="text-sm font-medium mt-2">
            {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
          </p>
        )}
      </div>
    </button>
  );
};

export default function ConfiguratorPage() {
  const [config, setConfig] = useState<Config>({
    model: models[0].id,
    paint: paintColors[0].id,
    wheels: wheels[0].id,
    interior: interiors[0].id,
    autopilot: autopilotOptions[0].id,
    charging: chargingOptions[0].id,
    insurance: insuranceOptions[0].id,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [activeDiscount, setActiveDiscount] = useState<Discount | null>(null);
  const [finalPrice, setFinalPrice] = useState(0);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedConfig = getConfiguration();
    setConfig({
      model: savedConfig.model || models[0].id,
      paint: savedConfig.paint || paintColors[0].id,
      wheels: savedConfig.wheels || wheels[0].id,
      interior: savedConfig.interior || interiors[0].id,
      autopilot: savedConfig.autopilot || autopilotOptions[0].id,
      charging: savedConfig.charging || chargingOptions[0].id,
      insurance: savedConfig.insurance || insuranceOptions[0].id,
    });
    console.log('[Configurator] Loaded config from localStorage:', savedConfig);
  }, []);

  // Load discount from localStorage on mount
  useEffect(() => {
    const discount = getDiscount();
    setActiveDiscount(discount);
    if (discount) {
      console.log('[Configurator] Loaded active discount:', discount);
    }
  }, []);

  // Listen for localStorage changes (from ElevenLabs agent)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'car_configuration' && e.newValue) {
        try {
          const newConfig = JSON.parse(e.newValue);
          console.log('[Configurator] Config updated via localStorage:', newConfig);
          setConfig({
            model: newConfig.model || models[0].id,
            paint: newConfig.paint || paintColors[0].id,
            wheels: newConfig.wheels || wheels[0].id,
            interior: newConfig.interior || interiors[0].id,
            autopilot: newConfig.autopilot || autopilotOptions[0].id,
            charging: newConfig.charging || chargingOptions[0].id,
            insurance: newConfig.insurance || insuranceOptions[0].id,
          });
        } catch (error) {
          console.error('[Configurator] Error parsing storage event:', error);
        }
      }

      // Listen for discount changes
      if (e.key === 'active_discount') {
        const discount = getDiscount();
        setActiveDiscount(discount);
        console.log('[Configurator] Discount updated via localStorage:', discount);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom event for same-window updates
    const handleCustomUpdate = ((e: CustomEvent) => {
      console.log('[Configurator] Config updated via custom event:', e.detail);
      const savedConfig = getConfiguration();
      setConfig({
        model: savedConfig.model || models[0].id,
        paint: savedConfig.paint || paintColors[0].id,
        wheels: savedConfig.wheels || wheels[0].id,
        interior: savedConfig.interior || interiors[0].id,
        autopilot: savedConfig.autopilot || autopilotOptions[0].id,
        charging: savedConfig.charging || chargingOptions[0].id,
        insurance: savedConfig.insurance || insuranceOptions[0].id,
      });
    }) as EventListener;

    window.addEventListener('configurationUpdated', handleCustomUpdate);

    // Listen for discount update events
    const handleDiscountUpdate = (() => {
      const discount = getDiscount();
      setActiveDiscount(discount);
      console.log('[Configurator] Discount updated via custom event:', discount);
    }) as EventListener;

    window.addEventListener('discountUpdated', handleDiscountUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('configurationUpdated', handleCustomUpdate);
      window.removeEventListener('discountUpdated', handleDiscountUpdate);
    };
  }, []);

  useEffect(() => {
    const selectedModel = models.find(m => m.id === config.model);
    const selectedPaint = paintColors.find(p => p.id === config.paint);
    const selectedWheels = wheels.find(w => w.id === config.wheels);
    const selectedInterior = interiors.find(i => i.id === config.interior);
    const selectedAutopilot = autopilotOptions.find(a => a.id === config.autopilot);
    const selectedCharging = chargingOptions.find(c => c.id === config.charging);
    const selectedInsurance = insuranceOptions.find(i => i.id === config.insurance);

    const total =
      (selectedModel?.price || 0) +
      (selectedPaint?.price || 0) +
      (selectedWheels?.price || 0) +
      (selectedInterior?.price || 0) +
      (selectedAutopilot?.price || 0) +
      (selectedCharging?.price || 0) +
      (selectedInsurance?.price || 0);

    setTotalPrice(total);

    // Apply discount if active
    const final = activeDiscount
      ? applyDiscount(total, activeDiscount.percentage)
      : total;
    setFinalPrice(final);
  }, [config, activeDiscount]);

  const updateConfig = (key: keyof Config, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    // Save to localStorage so it persists
    updateConfiguration({ [key]: value });
    console.log('[Configurator] Manual update:', key, value);
  };

  const selectedModel = models.find(m => m.id === config.model);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-semibold mb-2">Design Your Edison</h1>
        <p className="text-gray-600 mb-12">
          Configure your Model S with your preferred options
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Configuration Options */}
          <div className="lg:col-span-2 space-y-12">
            {/* Model Selection */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Model</h2>
              <div className="grid grid-cols-1 gap-4">
                {models.map(model => (
                  <OptionCard
                    key={model.id}
                    option={model}
                    selectedId={config.model}
                    onSelect={(id) => updateConfig('model', id)}
                  />
                ))}
              </div>
            </section>

            {/* Paint Colors */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Paint</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paintColors.map(paint => (
                  <OptionCard
                    key={paint.id}
                    option={paint}
                    selectedId={config.paint}
                    onSelect={(id) => updateConfig('paint', id)}
                  />
                ))}
              </div>
            </section>

            {/* Wheels */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Wheels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wheels.map(wheel => (
                  <OptionCard
                    key={wheel.id}
                    option={wheel}
                    selectedId={config.wheels}
                    onSelect={(id) => updateConfig('wheels', id)}
                  />
                ))}
              </div>
            </section>

            {/* Interior */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Interior</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interiors.map(interior => (
                  <OptionCard
                    key={interior.id}
                    option={interior}
                    selectedId={config.interior}
                    onSelect={(id) => updateConfig('interior', id)}
                  />
                ))}
              </div>
            </section>

            {/* Autopilot */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Autopilot</h2>
              <div className="grid grid-cols-1 gap-4">
                {autopilotOptions.map(autopilot => (
                  <OptionCard
                    key={autopilot.id}
                    option={autopilot}
                    selectedId={config.autopilot}
                    onSelect={(id) => updateConfig('autopilot', id)}
                  />
                ))}
              </div>
            </section>

            {/* Charging */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Charging</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chargingOptions.map(charging => (
                  <OptionCard
                    key={charging.id}
                    option={charging}
                    selectedId={config.charging}
                    onSelect={(id) => updateConfig('charging', id)}
                  />
                ))}
              </div>
            </section>

            {/* Insurance */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Insurance</h2>
              <div className="grid grid-cols-1 gap-4">
                {insuranceOptions.map(insurance => (
                  <OptionCard
                    key={insurance.id}
                    option={insurance}
                    selectedId={config.insurance}
                    onSelect={(id) => updateConfig('insurance', id)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Price Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-lg p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{selectedModel?.name}</h2>
                <p className="text-gray-600">{selectedModel?.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium">${selectedModel?.price.toLocaleString()}</span>
                </div>

                {paintColors.find(p => p.id === config.paint)?.price !== undefined && paintColors.find(p => p.id === config.paint)!.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {paintColors.find(p => p.id === config.paint)?.name}
                    </span>
                    <span className="font-medium">
                      +${paintColors.find(p => p.id === config.paint)?.price.toLocaleString()}
                    </span>
                  </div>
                )}

                {wheels.find(w => w.id === config.wheels)?.price !== undefined && wheels.find(w => w.id === config.wheels)!.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {wheels.find(w => w.id === config.wheels)?.name}
                    </span>
                    <span className="font-medium">
                      +${wheels.find(w => w.id === config.wheels)?.price.toLocaleString()}
                    </span>
                  </div>
                )}

                {interiors.find(i => i.id === config.interior)?.price !== undefined && interiors.find(i => i.id === config.interior)!.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {interiors.find(i => i.id === config.interior)?.name}
                    </span>
                    <span className="font-medium">
                      +${interiors.find(i => i.id === config.interior)?.price.toLocaleString()}
                    </span>
                  </div>
                )}

                {autopilotOptions.find(a => a.id === config.autopilot)?.price !== undefined && autopilotOptions.find(a => a.id === config.autopilot)!.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {autopilotOptions.find(a => a.id === config.autopilot)?.name}
                    </span>
                    <span className="font-medium">
                      +${autopilotOptions.find(a => a.id === config.autopilot)?.price.toLocaleString()}
                    </span>
                  </div>
                )}

                {chargingOptions.find(c => c.id === config.charging)?.price !== undefined && chargingOptions.find(c => c.id === config.charging)!.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {chargingOptions.find(c => c.id === config.charging)?.name}
                    </span>
                    <span className="font-medium">
                      +${chargingOptions.find(c => c.id === config.charging)?.price.toLocaleString()}
                    </span>
                  </div>
                )}

                {insuranceOptions.find(i => i.id === config.insurance)?.price !== undefined && insuranceOptions.find(i => i.id === config.insurance)!.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {insuranceOptions.find(i => i.id === config.insurance)?.name}
                    </span>
                    <span className="font-medium">
                      +${insuranceOptions.find(i => i.id === config.insurance)?.price.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Discount Section */}
              {activeDiscount && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-700 font-semibold">
                        🎉 {activeDiscount.percentage}% Discount Applied!
                      </span>
                    </div>
                    {activeDiscount.reason && (
                      <p className="text-xs text-gray-600">{activeDiscount.reason}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t-2 border-gray-300">
                {activeDiscount ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm text-gray-600">${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-green-600 font-medium">
                        Discount ({activeDiscount.percentage}%)
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        -${getDiscountAmount(totalPrice, activeDiscount.percentage).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-6 pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold">Total Price</span>
                      <span className="text-2xl font-bold">${finalPrice.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Total Price</span>
                    <span className="text-2xl font-bold">${totalPrice.toLocaleString()}</span>
                  </div>
                )}

                <button className="w-full cta-button cta-primary pt-4">
                  Order Now
                </button>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>* Price excludes taxes and fees</p>
                <p>Est. Delivery: 4-8 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
