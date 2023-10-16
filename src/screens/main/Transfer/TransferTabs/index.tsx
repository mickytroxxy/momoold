import Beneficiaries from './Beneficiaries';
import RecentlyPaid from './RecentlyPaid';

type tabdataType = {
  title: string;
  renderScene: () => React.JSX.Element;
}[];
const TransferTabData: tabdataType = [
  {
    title: 'RECENTLY PAID',
    renderScene: () => <RecentlyPaid />,
  },
  {
    title: 'BENEFICIARIES',
    renderScene: () => <Beneficiaries />,
  },
];

export default TransferTabData;
