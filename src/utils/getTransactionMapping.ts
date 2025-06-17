import Charging from '../data/charging-mapping.json';
import ClothesShoes from '../data/clothes-shoes-mapping.json';
import Groceries from '../data/groceries-mapping.json';
import HealthAndWellbeing from '../data/health-wellbeing-mapping.json';
import HomeAndGarden from '../data/home-garden-mapping.json';
import PhoneTvInternet from '../data/phone-tv-internet-mapping.json';
import CafeRestaurantMapping from '../data/cafe-restaurants-mapping.json';
import Entertainment from '../data/entertainment-mapping.json';
import Transport from '../data/transport-mapping.json';
import ToolAndParkingMapping from '../data/toll-parking-mapping.json';
import LoanMapping from '../data/loan-mapping.json';
import { TransactionMap } from '../types/Statements';

export const getTransactionMapping = () => {
  return <TransactionMap[]>[
    ...Charging,
    ...ClothesShoes,
    ...Groceries,
    ...HealthAndWellbeing,
    ...HomeAndGarden,
    ...PhoneTvInternet,
    ...Transport,
    ...CafeRestaurantMapping,
    ...Entertainment,
    ...ToolAndParkingMapping,
    ...LoanMapping,
  ];
};
