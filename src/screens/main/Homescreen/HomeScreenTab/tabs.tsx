import ForYou from './ForYou';
import Insure from './Insure';
import Pay from './Pay';
import Recharge from './Recharge';

interface TabItem {
  title: string;
  renderScene: () => JSX.Element;
}

const HomeScreenTabs: TabItem[] = [
  {
    title: 'FOR YOU',
    renderScene: () => <ForYou />,
  },
  {
    title: 'PAY',
    renderScene: () => <Pay />,
  },
  {
    title: 'RECHARGE',
    renderScene: () => <Recharge />,
  },
  {
    title: 'INSURE',
    renderScene: () => <Insure />,
  },
];
export default HomeScreenTabs;
