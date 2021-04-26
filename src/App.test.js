import { render, screen } from '@testing-library/react';
import App from './App';

test('PROMOTIEWEBSITE - renders all elements', () => {
  render(<App />);

  // HEADER
  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('logo')).toBeInTheDocument();
  expect(screen.getByTestId('dashboardLink')).toBeInTheDocument();

  // LANDING
  expect(screen.getByTestId('landing')).toBeInTheDocument();
  expect(screen.getByTestId('landingImage')).toBeInTheDocument();
  expect(screen.getByTestId('innerLanding')).toBeInTheDocument();
  expect(screen.getByTestId('navigationButtons')).toBeInTheDocument();

  // ABOUT
  expect(screen.getByTestId('about')).toBeInTheDocument();

  // WHY
  expect(screen.getByTestId('why')).toBeInTheDocument();

  // TIPS
  expect(screen.getByTestId('tips')).toBeInTheDocument();

  // REVIEWS
  expect(screen.getByTestId('reviews')).toBeInTheDocument();

  // HELP
  expect(screen.getByTestId('help')).toBeInTheDocument();
  expect(screen.getByTestId('contact')).toBeInTheDocument();
  expect(screen.getByTestId('resources')).toBeInTheDocument();

  // FOOTER
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});
