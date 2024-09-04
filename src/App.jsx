
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/Card";
import { Badge } from "./components/Card";
import { ChevronDownIcon, TruckIcon, PackageIcon, ScaleIcon, RefreshCwIcon, AwardIcon } from "lucide-react";
import { motion } from "framer-motion";

const layersData = {
  coverage_area_filtered_vendors: [
    "UPS", "FedEx", "USPS", "DHL Express", "OnTrac", "LaserShip", "Eastern Connection",
    "Prestige Delivery Systems", "Courier Express", "Eastern Connection", "Pitt Ohio",
    "Reddaway", "Averitt Express", "Dayton Freight", "Central Transport"
  ],
  carrier_attributes_evaluated_vendors: [
    { "UPS": 0.5 }, { "FedEx": 0.4 }, { "USPS": 0.3 }, { "DHL Express": 0.6 }, { "OnTrac": 0.2 },
    { "LaserShip": 0.3 }, { "Eastern Connection": 0.4 }, { "Prestige Delivery Systems": 0.4 },
    { "Courier Express": 0.4 }, { "Pitt Ohio": 0.5 }, { "Reddaway": 0.4 }, { "Averitt Express": 0.5 },
    { "Dayton Freight": 0.4 }, { "Central Transport": 0.3 }
  ],
  weight_range_in_lbs_analyzed_vendors_: [
    { "UPS": 1.0 }, { "FedEx": 1.0 }, { "USPS": 0.0 }, { "DHL Express": 0.0 }, { "OnTrac": 1.0 },
    { "LaserShip": 0.0 }, { "Eastern Connection": 0.0 }, { "Prestige Delivery Systems": 1.0 },
    { "Courier Express": 1.0 }, { "Pitt Ohio": 1.0 }, { "Reddaway": 1.0 }, { "Averitt Express": 1.0 },
    { "Dayton Freight": 1.0 }, { "Central Transport": 1.0 }
  ],
  return_needed_assessed_vendors: [
    { "UPS": 1.0 }, { "FedEx": 1.0 }, { "USPS": 1.0 }, { "DHL Express": 1.0 }, { "OnTrac": 1.0 },
    { "LaserShip": 0.0 }, { "Eastern Connection": 0.0 }, { "Prestige Delivery Systems": 0.0 },
    { "Courier Express": 0.0 }, { "Eastern Connection": 0.0 }, { "Pitt Ohio": 1.0 }, { "Reddaway": 1.0 },
    { "Averitt Express": 1.0 }, { "Dayton Freight": 1.0 }, { "Central Transport": 1.0 }
  ],
  ranked_vendors: [
    {
      first_ranked_carrier: "UPS",
      explanation: "UPS scores highly in terms of weight support and has a good sustainability rating. Its fast onboarding process makes it an ideal choice for your shipping needs across New York and California."
    },
    {
      second_ranked_carrier: "FedEx",
      explanation: "FedEx offers excellent support for your weight range and benefits from a decent sustainability score. Although its tracking capabilities are limited, it is a reliable option for your shipping."
    },
    {
      third_ranked_carrier: "OnTrac",
      explanation: "OnTrac is a strong contender due to its complete support for the desired weight range. It also provides a quick onboarding process, making it suitable for your shipping requirements without the need for returns."
    },
    {
      fourth_ranked_carrier: "Pitt Ohio",
      explanation: "Pitt Ohio delivers solid weight support and scores well in sustainability. Its reputation for fast onboarding makes it a worthwhile option for shipping between New York and California."
    }
  ]
};

const CarrierIcon = ({ score }) => {
  const color = `rgb(0, ${Math.floor(score * 255)}, 0)`;
  return (
    <TruckIcon className="h-6 w-6" style={{ color }} />
  );
};

const Layer = ({ title, icon, children }) => (
  <Card className="w-full mb-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const AIThinking = () => (
  <motion.div
  className="flex justify-center items-center my-6 p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-lg"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  {/* Icon with pulse animation */}
  <motion.div
    className="flex justify-center items-center"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{
      repeat: Infinity,
      duration: 1.2,
      ease: 'easeInOut',
    }}
  >
    {/* <ChevronDownIcon className="h-10 w-10 text-white drop-shadow-lg" /> */}
  </motion.div>

  {/* Text with subtle color shift */}
  <motion.span
    className="ml-3 text-xl font-semibold text-white"
    initial={{ opacity: 0.7 }}
    animate={{ opacity: [0.7, 1, 0.7] }}
    transition={{
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut',
    }}
  >
    AI Thinking...
  </motion.span>
</motion.div>
);


function CoverageAreaLayer({ data }) {
  return (
    <Layer title="Based on the coverage area below vendors supports shipping" icon={<PackageIcon className="h-6 w-6" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((carrier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-secondary">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-semibold">{carrier}</span>
                <CarrierIcon score={1 - (index * 0.05)} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Layer>
  );
}

function CarrierAttributesLayer({ data }) {
  return (
    <Layer title="Based on the carrier attributes the filtered vendors with the score from 0 to 1 " icon={<ScaleIcon className="h-6 w-6" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((carrier, index) => {
          const [name, score] = Object.entries(carrier)[0];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-secondary">
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="font-semibold mb-2">{name}</span>
                  <CarrierIcon score={score} />
                  <Badge className="mt-2">{score.toFixed(2)}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Layer>
  );
}

function WeightAnalysisLayer({ data }) {
  return (
    <Layer title="Based on the weight analysis listed vendors" icon={<ScaleIcon className="h-6 w-6" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((carrier, index) => {
          const [name, score] = Object.entries(carrier)[0];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-secondary">
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="font-semibold mb-2">{name}</span>
                  <CarrierIcon score={score} />
                  <Badge className="mt-2">{score.toFixed(2) === '0.00' 
          ? "Doesn't support given weight" 
          : score.toFixed(2) === '1.00' 
          ? 'Supports given weight' 
          : score.toFixed(2)}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Layer>
  );
}

function ReturnAnalysisLayer({ data }) {
  return (
    <Layer title="Based on the return analysis listed vendors" icon={<RefreshCwIcon className="h-6 w-6" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((carrier, index) => {
          const [name, score] = Object.entries(carrier)[0];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-secondary">
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="font-semibold mb-2">{name}</span>
                  <CarrierIcon score={score} />
                  <Badge className="mt-2">{score.toFixed(2) === '0.00' 
          ? "Doesn't support returns" 
          : score.toFixed(2) === '1.00' 
          ? 'Supports returns' 
          : score.toFixed(2)}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Layer>
  );
}

function RankedVendorsLayer({ data }) {
  return (
    <Layer title="Based on the users requirements listed filtered vendors with their description:" icon={<AwardIcon className="h-6 w-6" />}>
      <div className="space-y-4">
        {data.map((vendor, index) => {
          const [rank, carrier] = Object.entries(vendor)[0];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <CarrierIcon score={1 - (index * 0.25)} />
                    <span className="font-semibold ml-2 text-lg">{carrier}</span>
                    <Badge className="ml-auto">{rank
    .split('_')[0]
    .replace(/^\w/, (c) => c.toUpperCase())}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{vendor.explanation}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Layer>
  );
}

function AgenticSystemPage() {
  const [visibleLayer, setVisibleLayer] = useState(1);
  const totalLayers = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLayer((prev) => (prev < totalLayers ? prev + 1 : prev));
      // Smooth scroll to the next layer
      // document.getElementById(`layer-${visibleLayer}`)?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);

    return () => clearInterval(interval);
  }, [visibleLayer]);

  return (
    <div className="container mx-auto p-6 space-y-10 bg-slate-200  min-h-screen">
      <h1 className="text-3xl font-bold text-center tracking-wide">Agentic System Demonstration</h1>

      {/* Conditionally render layers and AIThinking */}
      {visibleLayer >= 1 && (
        <motion.div
          id={`layer-${visibleLayer}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CoverageAreaLayer data={layersData.coverage_area_filtered_vendors} />
        </motion.div>
      )}

      {visibleLayer > 1 && visibleLayer < 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AIThinking />
        </motion.div>
      )}

      {visibleLayer >= 3 && (
        <motion.div
          id={`layer-${visibleLayer}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CarrierAttributesLayer data={layersData.carrier_attributes_evaluated_vendors} />
        </motion.div>
      )}

      {visibleLayer > 3 && visibleLayer < 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AIThinking />
        </motion.div>
      )}

      {visibleLayer >= 5 && (
        <motion.div
          id={`layer-${visibleLayer}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WeightAnalysisLayer data={layersData.weight_range_in_lbs_analyzed_vendors_} />
        </motion.div>
      )}

      {visibleLayer > 5 && visibleLayer < 7 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AIThinking />
        </motion.div>
      )}

      {visibleLayer >= 7 && (
        <motion.div
          id={`layer-${visibleLayer}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ReturnAnalysisLayer data={layersData.return_needed_assessed_vendors} />
        </motion.div>
      )}

      {visibleLayer > 7 && visibleLayer < 9 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AIThinking />
        </motion.div>
      )}

      {visibleLayer >= 9 && (
        <motion.div
          id={`layer-${visibleLayer}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <RankedVendorsLayer data={layersData.ranked_vendors} />
        </motion.div>
      )}

     
    </div>
  );
}

export default AgenticSystemPage;
