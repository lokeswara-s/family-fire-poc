import { 
  BanknotesIcon, 
  BuildingLibraryIcon, 
  HomeModernIcon, 
  CircleStackIcon,
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';

export const getInvestmentIcon = (type: string) => {
  switch (type) {
    case 'stocks':
      return BanknotesIcon;
    case 'bonds':
      return BuildingLibraryIcon;
    case 'realEstate':
      return HomeModernIcon;
    case 'crypto':
      return CircleStackIcon;
    default:
      return QuestionMarkCircleIcon;
  }
};

export const getInvestmentLabel = (type: string) => {
  switch (type) {
    case 'stocks':
      return 'Stocks & Mutual Funds';
    case 'bonds':
      return 'Bonds';
    case 'realEstate':
      return 'Real Estate';
    case 'crypto':
      return 'Cryptocurrency';
    default:
      return 'Other';
  }
};