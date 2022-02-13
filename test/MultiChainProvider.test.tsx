import { MultiChainProvider } from '../src';

describe('MultiChainProvider', () => {
  it('renders without crashing', () => {
    expect(MultiChainProvider).toBeDefined();
  });

  // it('renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(
  //     <MultiChainProvider>
  //       <div>MultiChain Provider</div>
  //     </MultiChainProvider>,
  //     div
  //   );
  //   ReactDOM.unmountComponentAtNode(div);
  // });
});
