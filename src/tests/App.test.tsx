import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';

describe('App Component', () => {
  test('render Video and EventList components', () => {

    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const videoElement = container.querySelector('.video-element');
    expect(videoElement).toBeTruthy();

    const listElement = container.querySelector('.list-wrapper');
    expect(listElement).toBeTruthy();
  });
});