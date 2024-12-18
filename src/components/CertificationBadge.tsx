import { Award } from 'lucide-react';

export default function CertificationBadge() {
  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
          Certifications
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
        </h2>

        <div className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white max-w-sm mx-auto rounded-xl shadow-lg">
          <div className="p-6">
            <div className="flex flex-col items-center">
              {/* Badge Container */}
              <a 
                href="https://www.credly.com/badges/9bdd36b9-9d66-49f8-b6c8-07bd174daa7d/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
            {/* Badge Image */}
            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dzqt3usfp/image/upload/v1734452246/it-specialist-networking_oyudxe.png"
                alt="Credly Certification Badge"
                className="w-40 h-40 rounded-lg shadow-xl"
              />
            </div>
              </a>
          {/* Badge Details */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Networking
            </h3>
            <p className="mt-2 text-blue-200 text-sm">
            IT Specialist
            </p>
            <p className="mt-4 text-emerald-200 text-sm">
              Verified on Credly
            </p>
          </div>
              {/* View Button */}
              <a
                href="https://www.credly.com/badges/9bdd36b9-9d66-49f8-b6c8-07bd174daa7d/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 px-6 py-2 bg-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-emerald-400 text-blue-600 hover:text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Award className="w-4 h-4" />
                <span>View Certificate</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}