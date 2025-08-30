import { Link } from 'react-router-dom'
import Logo from '../Logo'
function Footer() {

  return (
  <footer className="bg-gradient-to-r from-blue-100 to-purple-100 py-12 border-t-4 border-blue-600">
  <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
    
    {/* <!-- BlogSpace Logo --> */}
    <div className="text-4xl font-extrabold text-blue-600">
      <Logo />
    </div>
    
    {/* <!-- Footer Links Sections --> */}
    <div className="flex flex-wrap justify-between space-x-8 space-y-8 md:space-y-0">
      
      {/* <!-- Company Links --> */}
      <div className="space-y-2 text-gray-700">
        <h3 className="text-lg font-semibold text-blue-800">Company</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Features</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Pricing</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Affiliate Program</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Press Kit</a></li>
        </ul>
      </div>

      {/* <!-- Support Links --> */}
      <div className="space-y-2 text-gray-700">
        <h3 className="text-lg font-semibold text-blue-800">Support</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Account</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Help</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Contact Us</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Customer Support</a></li>
        </ul>
      </div>

      {/* <!-- Legal Links --> */}
      <div className="space-y-2 text-gray-700">
        <h3 className="text-lg font-semibold text-blue-800">Legals</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Terms & Conditions</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Licensing</a></li>
        </ul>
      </div>
    </div>

    {/* <!-- Copyright Section --> */}
    <div className="text-center text-sm text-gray-600 mt-8">
      © Copyright 2025. All Rights Reserved by Yash Agarwal.
    </div>
  </div>
</footer>
  )
}

export default Footer