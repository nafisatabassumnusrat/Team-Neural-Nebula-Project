import { Forest, Topic } from '../types';

export const generateFindings = (forest: Forest, topic: Topic): string => {
  const findingsMap: Record<string, Record<string, string>> = {
    'sundarbans': {
      'changes-over-time': 'The Sundarbans has experienced significant coastal erosion and mangrove loss due to rising sea levels and cyclones. Satellite data shows a 2% annual decrease in mangrove coverage over the past decade.',
      'high-carbon-areas': 'Mangrove forests in the Sundarbans store approximately 1,000 tonnes of carbon per hectare, making them among the most carbon-dense ecosystems globally.',
      'forest-density': 'The Sundarbans shows varying density patterns with denser mangroves in protected areas and reduced density near human settlements.',
      'climate-monitoring': 'Rising temperatures and changing precipitation patterns are affecting mangrove species composition and distribution in the Sundarbans.',
      'biodiversity-health': 'The Sundarbans supports 260 bird species and the endangered Bengal tiger, but faces threats from habitat fragmentation and climate change.'
    },
    'amazon': {
      'changes-over-time': 'The Amazon has lost over 800,000 km² of forest since the 1970s, with deforestation rates fluctuating based on economic and political factors.',
      'high-carbon-areas': 'The Amazon stores approximately 150-200 billion tonnes of carbon, representing 10% of global terrestrial carbon storage.',
      'forest-density': 'Amazon forest density varies from sparse cerrado to dense terra firme forests, with canopy coverage ranging from 60-95%.',
      'climate-monitoring': 'Climate change is shifting precipitation patterns and increasing temperatures, potentially turning parts of the Amazon from carbon sink to carbon source.',
      'biodiversity-health': 'The Amazon hosts 10% of known species globally, but faces severe biodiversity loss due to habitat destruction and fragmentation.'
    },
    'congo': {
      'changes-over-time': 'The Congo Basin has experienced moderate deforestation rates of 0.2% annually, primarily due to slash-and-burn agriculture and logging.',
      'high-carbon-areas': 'Congo forests store approximately 60 billion tonnes of carbon, representing 8% of global forest carbon stocks.',
      'forest-density': 'Congo rainforest exhibits high canopy density with multiple forest layers supporting diverse wildlife communities.',
      'climate-monitoring': 'Changing rainfall patterns and rising temperatures threaten Congo forest stability and carbon storage capacity.',
      'biodiversity-health': 'The Congo Basin supports over 10,000 endemic plant species and critical wildlife populations including forest elephants and great apes.'
    },
    'taiga': {
      'changes-over-time': 'The Taiga experiences dynamic changes due to natural fire cycles, insect outbreaks, and climate-driven tree line shifts.',
      'high-carbon-areas': 'Boreal forests store carbon primarily in soils and peatlands, with total storage of approximately 272 billion tonnes.',
      'forest-density': 'Taiga density is relatively low compared to tropical forests, with open canopies and sparse understory vegetation.',
      'climate-monitoring': 'Climate change is causing rapid warming in boreal regions, leading to increased fire frequency and pest outbreaks.',
      'biodiversity-health': 'While less biodiverse than tropical forests, the Taiga supports key species like caribou, lynx, and numerous migratory birds.'
    },
    'daintree': {
      'changes-over-time': 'The Daintree has remained relatively stable but faces pressure from coastal development and climate change impacts.',
      'high-carbon-areas': 'This ancient rainforest stores significant carbon in both vegetation and soil, with high per-hectare carbon density.',
      'forest-density': 'The Daintree exhibits extremely high forest density with complex multi-layered canopy structure.',
      'climate-monitoring': 'Rising temperatures and changing precipitation patterns threaten the unique cool-climate species within the Daintree.',
      'biodiversity-health': 'As one of the world\'s oldest rainforests, the Daintree contains primitive plant families and endemic species found nowhere else.'
    }
  };

  return findingsMap[forest.id]?.[topic.id] || 'This forest region shows unique characteristics related to the selected research topic.';
};

export const generateInnovationIdea = (forest: Forest, topic: Topic): string => {
  const innovationMap: Record<string, Record<string, string>> = {
    'sundarbans': {
      'changes-over-time': 'AI-powered mangrove restoration mapping system using drone technology to identify optimal replanting locations',
      'high-carbon-areas': 'Blue carbon marketplace platform connecting mangrove conservation with carbon credit trading',
      'forest-density': 'Smart mangrove density monitoring using IoT sensors for early warning systems',
      'climate-monitoring': 'Adaptive mangrove species selection tool based on climate projections',
      'biodiversity-health': 'Tiger corridor optimization using wildlife tracking and habitat connectivity analysis'
    },
    'amazon': {
      'changes-over-time': 'Real-time deforestation alert system using machine learning and satellite imagery',
      'high-carbon-areas': 'Carbon-conscious supply chain verification platform for sustainable sourcing',
      'forest-density': 'Precision agroforestry planning using LiDAR and AI optimization',
      'climate-monitoring': 'Climate-resilient forest species recommendation engine',
      'biodiversity-health': 'Indigenous knowledge integration platform for biodiversity conservation'
    },
    'congo': {
      'changes-over-time': 'Community-based forest monitoring app with incentive mechanisms',
      'high-carbon-areas': 'Peat swamp forest conservation financing through carbon markets',
      'forest-density': 'Sustainable logging optimization using forest density mapping',
      'climate-monitoring': 'Early warning system for climate-induced forest stress',
      'biodiversity-health': 'Great ape habitat connectivity planning using genetic analysis'
    },
    'taiga': {
      'changes-over-time': 'Predictive fire management system using weather data and forest conditions',
      'high-carbon-areas': 'Permafrost carbon monitoring network with community involvement',
      'forest-density': 'Optimal forest thinning strategies for fire prevention and carbon storage',
      'climate-monitoring': 'Boreal forest migration mapping for conservation planning',
      'biodiversity-health': 'Wildlife corridor design for climate adaptation'
    },
    'daintree': {
      'changes-over-time': 'World Heritage monitoring dashboard with tourist education features',
      'high-carbon-areas': 'Ancient forest carbon valuation for conservation funding',
      'forest-density': 'Ecotourism carrying capacity calculator based on forest density',
      'climate-monitoring': 'Climate refuge identification for endemic species protection',
      'biodiversity-health': 'Evolutionary diversity mapping for conservation prioritization'
    }
  };

  return innovationMap[forest.id]?.[topic.id] || 'Innovative technology solution for forest conservation and monitoring';
};