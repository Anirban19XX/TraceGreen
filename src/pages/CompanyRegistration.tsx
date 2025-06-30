import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, Mail, Phone, Globe, Users, ChevronRight, ChevronLeft, FileText, Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import Header from '../components/Header';

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    website: '',
    employeeCount: '',
    description: '',
    licenses: {},
    uploadedFiles: {}
  });

  const industries = [
    'Apparel & Fashion',
    'Electronics & Technology',
    'Food & Beverage',
    'Automotive',
    'Cosmetics & Personal Care',
    'Home & Garden',
    'Sports & Recreation',
    'Healthcare & Pharmaceuticals'
  ];

  const industryLicenses = {
    'Apparel & Fashion': [
      { key: 'factoryLicense', label: 'Factory License No.', required: true },
      { key: 'gstin', label: 'GSTIN', required: true },
      { key: 'tradeLicense', label: 'Trade License No.', required: true }
    ],
    'Electronics & Technology': [
      { key: 'gstin', label: 'GSTIN', required: true },
      { key: 'bisCrs', label: 'BIS CRS No.', required: true },
      { key: 'wpcLicense', label: 'WPC License No.', required: false },
      { key: 'pollutionControl', label: 'Pollution Control Auth. No.', required: true }
    ],
    'Food & Beverage': [
      { key: 'fssai', label: 'FSSAI No.', required: true },
      { key: 'gstin', label: 'GSTIN', required: true },
      { key: 'factoryLicense', label: 'Factory License No.', required: true }
    ],
    'Automotive': [
      { key: 'gstin', label: 'GSTIN', required: true },
      { key: 'typeApproval', label: 'Type Approval No.', required: true },
      { key: 'bisCode', label: 'BIS Code', required: true },
      { key: 'pollutionNoc', label: 'Pollution Control NOC', required: true }
    ],
    'Cosmetics & Personal Care': [
      { key: 'cdscoLicense', label: 'Drug & Cosmetics License No.', required: true },
      { key: 'gstin', label: 'GSTIN', required: true },
      { key: 'gmpCert', label: 'GMP Cert No.', required: true }
    ],
    'Home & Garden': [
      { key: 'factoryLicense', label: 'Factory License No.', required: true },
      { key: 'gstin', label: 'GSTIN', required: true }
    ],
    'Sports & Recreation': [
      { key: 'gstin', label: 'GSTIN', required: true },
      { key: 'factoryLicense', label: 'Factory License No.', required: true },
      { key: 'bisNo', label: 'BIS No.', required: false }
    ],
    'Healthcare & Pharmaceuticals': [
      { key: 'drugLicense', label: 'Drug License No.', required: true },
      { key: 'cdscoReg', label: 'CDSCO Reg No.', required: true },
      { key: 'gmpCert', label: 'GMP Cert No.', required: true },
      { key: 'gstin', label: 'GSTIN', required: true }
    ]
  };

  const stepTitles = [
    'Industry Selection',
    'License Information',
    'Upload Certificates',
    'Review & Submit'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLicenseChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      licenses: {
        ...formData.licenses,
        [key]: value
      }
    });
  };

  const handleFileUpload = (key: string, file: File) => {
    setFormData({
      ...formData,
      uploadedFiles: {
        ...formData.uploadedFiles,
        [key]: file
      }
    });
  };

  const removeFile = (key: string) => {
    const newFiles = { ...formData.uploadedFiles };
    delete newFiles[key];
    setFormData({
      ...formData,
      uploadedFiles: newFiles
    });
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.industry !== '';
      case 2:
        const requiredLicenses = industryLicenses[formData.industry]?.filter(l => l.required) || [];
        return requiredLicenses.every(license => formData.licenses[license.key]?.trim());
      case 3:
        const requiredFiles = industryLicenses[formData.industry]?.filter(l => l.required) || [];
        return requiredFiles.every(license => formData.uploadedFiles[license.key]);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 4) {
      navigate('/manufacturer/dashboard');
    }
  };

  const currentLicenses = industryLicenses[formData.industry] || [];

  return (
    <div className="min-h-screen">
      <Header isManufacturer={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Company Registration</h1>
          <p className="text-gray-400">Complete your company profile to start certifying products</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index + 1 < currentStep 
                    ? 'bg-neon-green text-black' 
                    : index + 1 === currentStep
                    ? 'bg-electric-lime text-black'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {index + 1 < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="ml-3 hidden md:block">
                  <span className={`text-sm font-medium ${
                    index + 1 <= currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {title}
                  </span>
                </div>
                {index < stepTitles.length - 1 && (
                  <div className={`w-12 md:w-20 h-0.5 mx-4 transition-all duration-300 ${
                    index + 1 < currentStep ? 'bg-neon-green' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-neon-green/20 p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Industry Selection */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <Building className="h-16 w-16 text-neon-green mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Select Your Industry</h2>
                  <p className="text-gray-400">Choose the industry that best describes your business</p>
                </div>

                <div className="max-w-md mx-auto">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-black/40 border border-gray-600 rounded-lg text-white text-lg focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                {formData.industry && (
                  <div className="mt-8 p-6 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Required Licenses for {formData.industry}:</h3>
                    <ul className="space-y-2">
                      {currentLicenses.map((license, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className={`w-2 h-2 rounded-full mr-3 ${license.required ? 'bg-neon-green' : 'bg-yellow-400'}`}></div>
                          {license.label} {license.required ? '(Required)' : '(Optional)'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: License Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <FileText className="h-16 w-16 text-electric-lime mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">License Information</h2>
                  <p className="text-gray-400">Enter your license numbers for {formData.industry}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {currentLicenses.map((license, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {license.label} {license.required && <span className="text-neon-green">*</span>}
                      </label>
                      <input
                        type="text"
                        required={license.required}
                        value={formData.licenses[license.key] || ''}
                        onChange={(e) => handleLicenseChange(license.key, e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                        placeholder={`Enter ${license.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Upload Certificates */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Upload className="h-16 w-16 text-neon-green mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Upload Certificates</h2>
                  <p className="text-gray-400">Upload official certificates for each license</p>
                </div>

                <div className="space-y-6">
                  {currentLicenses.map((license, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">
                          {license.label} {license.required && <span className="text-neon-green">*</span>}
                        </h3>
                        {formData.uploadedFiles[license.key] && (
                          <CheckCircle className="h-5 w-5 text-neon-green" />
                        )}
                      </div>

                      {formData.uploadedFiles[license.key] ? (
                        <div className="flex items-center justify-between bg-neon-green/10 border border-neon-green/30 rounded-lg p-4">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-neon-green mr-3" />
                            <span className="text-white">{formData.uploadedFiles[license.key].name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(license.key)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-neon-green/50 transition-colors">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-400 mb-2">Upload certificate for {license.label}</p>
                          <p className="text-sm text-gray-500 mb-4">PDF, JPG, PNG (Max 10MB)</p>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(license.key, file);
                            }}
                            className="hidden"
                            id={`file-${license.key}`}
                          />
                          <label
                            htmlFor={`file-${license.key}`}
                            className="inline-flex items-center px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors cursor-pointer"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <CheckCircle className="h-16 w-16 text-neon-green mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
                  <p className="text-gray-400">Please review your information before submitting</p>
                </div>

                <div className="space-y-6">
                  {/* Industry Summary */}
                  <div className="bg-black/20 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Selected Industry</h3>
                    <p className="text-neon-green font-medium">{formData.industry}</p>
                  </div>

                  {/* License Summary */}
                  <div className="bg-black/20 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">License Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentLicenses.map((license, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-400">{license.label}:</span>
                          <span className="text-white font-medium">
                            {formData.licenses[license.key] || 'Not provided'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Files Summary */}
                  <div className="bg-black/20 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Uploaded Certificates</h3>
                    <div className="space-y-2">
                      {currentLicenses.map((license, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-400">{license.label}:</span>
                          <div className="flex items-center">
                            {formData.uploadedFiles[license.key] ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-neon-green mr-2" />
                                <span className="text-neon-green text-sm">Uploaded</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                                <span className="text-yellow-400 text-sm">Missing</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-700 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!validateStep(currentStep)}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Registration
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;