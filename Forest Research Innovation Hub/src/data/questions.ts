import { Question } from '../types';

export const questions: Record<string, Question[]> = {
  'changes-over-time': [
    {
      id: '1',
      question: 'Which forest is the largest mangrove forest in the world?',
      options: ['Amazon', 'Congo', 'Sundarbans'],
      correctAnswer: 2,
      explanation: 'The Sundarbans is the world\'s largest mangrove forest ecosystem.'
    },
    {
      id: '2',
      question: 'What technology is commonly used in remote sensing to track forest changes?',
      options: ['SAR', 'MRI', 'X-ray'],
      correctAnswer: 0,
      explanation: 'Synthetic Aperture Radar (SAR) is extensively used for monitoring forest changes.'
    },
    {
      id: '3',
      question: 'Which natural disaster most threatens the Sundarbans?',
      options: ['Cyclones', 'Earthquakes', 'Tornadoes'],
      correctAnswer: 0,
      explanation: 'Cyclones are the primary natural threat to the Sundarbans region.'
    },
    {
      id: '4',
      question: 'True or False – SAR can monitor forests even in cloudy weather.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'SAR technology can penetrate clouds, making it ideal for all-weather monitoring.'
    },
    {
      id: '5',
      question: 'Which human activity is the primary cause of Amazon deforestation?',
      options: ['Agriculture', 'Tourism', 'Fishing'],
      correctAnswer: 0,
      explanation: 'Agricultural expansion is the leading driver of Amazon deforestation.'
    }
  ],
  'high-carbon-areas': [
    {
      id: '1',
      question: 'Which type of forest stores the most carbon?',
      options: ['Old-growth forests', 'Young forests', 'Grasslands'],
      correctAnswer: 0,
      explanation: 'Old-growth forests have accumulated carbon over decades or centuries.'
    },
    {
      id: '2',
      question: 'Why are peatlands important in carbon storage?',
      options: ['They contain large amounts of organic carbon', 'They have no trees', 'They produce methane only'],
      correctAnswer: 0,
      explanation: 'Peatlands store vast amounts of organic carbon in waterlogged soils.'
    },
    {
      id: '3',
      question: 'True or False – Young forests store more carbon than old forests.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation: 'Old forests typically store more carbon due to larger trees and soil accumulation.'
    },
    {
      id: '4',
      question: 'What is REDD+ in climate policy?',
      options: ['A program to reduce emissions from deforestation', 'A satellite mission', 'A soil measurement method'],
      correctAnswer: 0,
      explanation: 'REDD+ stands for Reducing Emissions from Deforestation and forest Degradation.'
    },
    {
      id: '5',
      question: 'Which region has the largest tropical carbon sinks?',
      options: ['Amazon Rainforest', 'Sahara Desert', 'Arctic Tundra'],
      correctAnswer: 0,
      explanation: 'The Amazon is the world\'s largest tropical carbon sink.'
    }
  ],
  'forest-density': [
    {
      id: '1',
      question: 'What does SAR backscatter intensity indicate?',
      options: ['Vegetation density', 'Water quality', 'Soil pH'],
      correctAnswer: 0,
      explanation: 'SAR backscatter intensity reflects the density and structure of vegetation.'
    },
    {
      id: '2',
      question: 'True or False – Denser forests reflect stronger radar signals.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'Dense forests with complex structures produce stronger radar backscatter.'
    },
    {
      id: '3',
      question: 'Which technology creates 3D forest density maps?',
      options: ['LiDAR', 'Ultrasound', 'GPS'],
      correctAnswer: 0,
      explanation: 'LiDAR uses laser pulses to create detailed 3D forest structure maps.'
    },
    {
      id: '4',
      question: 'Why is forest density important in biodiversity mapping?',
      options: ['It shows wildlife habitats', 'It measures soil erosion', 'It predicts rainfall'],
      correctAnswer: 0,
      explanation: 'Forest density indicates habitat quality and capacity for wildlife.'
    },
    {
      id: '5',
      question: 'Which forest type is less dense?',
      options: ['Boreal/Taiga', 'Tropical', 'Rainforest'],
      correctAnswer: 0,
      explanation: 'Boreal forests are typically less dense than tropical rainforests.'
    }
  ],
  'climate-monitoring': [
    {
      id: '1',
      question: 'What role do forests play in the carbon cycle?',
      options: ['Absorb CO₂', 'Release only methane', 'Reduce oxygen'],
      correctAnswer: 0,
      explanation: 'Forests absorb CO₂ from the atmosphere during photosynthesis.'
    },
    {
      id: '2',
      question: 'Which forest is often called "the lungs of the planet"?',
      options: ['Amazon Rainforest', 'Taiga', 'Sahara Desert'],
      correctAnswer: 0,
      explanation: 'The Amazon produces about 20% of the world\'s oxygen.'
    },
    {
      id: '3',
      question: 'True or False – Deforestation reduces Earth\'s carbon sink.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'Deforestation eliminates trees that would otherwise absorb CO₂.'
    },
    {
      id: '4',
      question: 'What is biomass in forest science?',
      options: ['The total mass of living plants and trees', 'Only soil weight', 'Rock density'],
      correctAnswer: 0,
      explanation: 'Biomass refers to the total mass of all living organic matter in forests.'
    },
    {
      id: '5',
      question: 'How does deforestation contribute to global warming?',
      options: ['By releasing stored carbon into the atmosphere', 'By creating more oxygen', 'By cooling Earth\'s surface'],
      correctAnswer: 0,
      explanation: 'Deforestation releases stored carbon and reduces CO₂ absorption capacity.'
    }
  ],
  'biodiversity-health': [
    {
      id: '1',
      question: 'Which forest hosts the highest biodiversity on Earth?',
      options: ['Amazon Rainforest', 'Taiga', 'Sahara Desert'],
      correctAnswer: 0,
      explanation: 'The Amazon contains an estimated 10% of all species on Earth.'
    },
    {
      id: '2',
      question: 'True or False – Taiga has more biodiversity than the Amazon.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation: 'The Amazon has significantly higher biodiversity than the Taiga.'
    },
    {
      id: '3',
      question: 'What is habitat fragmentation?',
      options: ['Breaking large forests into smaller patches', 'Tree planting', 'Soil erosion'],
      correctAnswer: 0,
      explanation: 'Habitat fragmentation divides continuous habitats into smaller, isolated patches.'
    },
    {
      id: '4',
      question: 'Which animal is a keystone species in the Sundarbans?',
      options: ['Bengal Tiger', 'Panda', 'Kangaroo'],
      correctAnswer: 0,
      explanation: 'The Bengal tiger is a keystone species that helps maintain ecosystem balance.'
    },
    {
      id: '5',
      question: 'Why is biodiversity important for ecosystems?',
      options: ['It increases resilience and provides ecosystem services', 'It reduces oxygen', 'It destroys soil fertility'],
      correctAnswer: 0,
      explanation: 'Biodiversity enhances ecosystem stability and provides essential services.'
    }
  ]
};