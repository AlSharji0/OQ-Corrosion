import CorrosionGraph from './corrosiongraph';

const GraphPage = () => {
  const measuredData = [
    { day: 1, rate: 0.008 },
    { day: 2, rate: 0.01 },
    { day: 3, rate: 0.02 },
    { day: 4, rate: 0.03 },
    { day: 5, rate: 0.36 },
    { day: 6, rate: 0.04 },
    { day: 7, rate: 0.041 },
    { day: 8, rate: 0.048 },
  ];
  
  const predictedData = [
    { day: 9, rate: 0.35, upperBound: 0.4, lowerBound: 0.3 },
  ];
  
  return (
    <CorrosionGraph 
      measuredData={measuredData}
      predictedData={predictedData}
    />
  );
  
};


export default GraphPage;
