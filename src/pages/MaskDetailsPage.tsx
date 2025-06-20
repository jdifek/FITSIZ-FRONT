import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MaskDetails = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <ArrowLeft onClick={() =>navigate('/catalog')} className="w-6 h-6 text-gray-600" />
        <p className="text-[22px] font-medium text-gray-900 ml-4">Helmet Details</p>
      </div>

      {/* Helmet Image */}
          <img 
            src=  "https://www.tuttosaldatura.it/3376-large_default/maschera-automatica-esab-sentinel-a60-0700600860.jpg"
            alt="ArcShield Pro Welding Helmet"
            className="w-1/2 h-1/2 object-contain mx-auto"
          />

      <div className="px-4 pb-6">
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">ArcShield Pro</h2>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          The ArcShield Pro is designed for both beginners and experienced welders, offering superior protection and comfort.
        </p>

        {/* Specifications */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-3">Specifications</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weight</span>
              <span className="text-sm text-gray-900">1.2 lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Viewing Area</span>
              <span className="text-sm text-gray-900">3.94" x 3.25"</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sensors</span>
              <span className="text-sm text-gray-900">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Power Source</span>
              <span className="text-sm text-gray-900">Solar/Battery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Shade Range</span>
              <span className="text-sm text-gray-900">DIN 9-13</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Material</span>
              <span className="text-sm text-gray-900">Nylon</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-3">Features</h3>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-700">Auto-Darkening Filter</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-700">Adjustable Sensitivity</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-700">Grinding Mode</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-3">Reviews</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900 mr-2">4.7</span>
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
          </div>

          {/* Rating bars */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center text-xs">
              <span className="w-2 text-gray-600">5</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-gray-800 h-2 rounded-full" style={{width: '70%'}}></div>
              </div>
              <span className="text-gray-600">70%</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-2 text-gray-600">4</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-gray-800 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
              <span className="text-gray-600">20%</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-2 text-gray-600">3</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-gray-800 h-2 rounded-full" style={{width: '5%'}}></div>
              </div>
              <span className="text-gray-600">5%</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-2 text-gray-600">2</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-gray-800 h-2 rounded-full" style={{width: '3%'}}></div>
              </div>
              <span className="text-gray-600">3%</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-2 text-gray-600">1</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-gray-800 h-2 rounded-full" style={{width: '2%'}}></div>
              </div>
              <span className="text-gray-600">2%</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-4">125 reviews</p>

          {/* Sample Review */}
          <div className="flex items-start">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
              E
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Ethan Carter</p>
              <p className="text-xs text-gray-500 mb-1">2 months ago</p>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-700">
                This helmet is fantastic! The auto-darkening
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaskDetails;